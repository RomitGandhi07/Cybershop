import { Server } from "socket.io";
import * as Y from 'yjs';
import DocumentModel from "../models/document";

// In-memory storage for documents
const documents: Record<string, Y.Doc> = {};


interface SyncUpdateData {
  docId: string;
  update: Uint8Array;
}

interface CursorPositionData {
  docId: string;
  userId: string;
  range: { index: number; length: number };
}

// Fetch or create a Yjs document from the database
async function getYDoc(docId: string): Promise<Y.Doc> {
  const doc = await DocumentModel.findOne({ docId });
  const ydoc = new Y.Doc();

  if (doc && doc.content) {
    // Convert Buffer to Uint8Array before applying to Yjs document
    Y.applyUpdate(ydoc, new Uint8Array(doc.content));
  } else {
    // If the document doesn't exist, create an initial entry in the database
    await DocumentModel.create({ docId, content: Buffer.from(Y.encodeStateAsUpdate(ydoc)) });
  }

  return ydoc;
}

// Save Yjs document state to the database
async function saveYDoc(docId: string, ydoc: Y.Doc) {
  const update = Buffer.from(Y.encodeStateAsUpdate(ydoc)); // Convert Uint8Array to Buffer
  await DocumentModel.updateOne(
    { docId },
    { content: update },
    { upsert: true } // Create a new document if it doesn't exist
  );
}

const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};


export class SocketService {
  io: Server;
  constructor(io: Server) {
    this.io = io;
    this.collaborationNamespace();
  }

  collaborationNamespace() {
    const collaboration = this.io.of("collaboration");

    collaboration.on("connection", async (socket) => {
      console.info("User connected in socket", socket.handshake.query.username, process.env.PORT ?? 3003);
      // console.info("socket.handshake", socket.handshake);
      // socket.on('join-room', async (docId: string) => {
      const docId = socket.handshake.query.docId;

      if (!docId) {
        throw new Error("DOC ID not found");
      }
      socket.data = {
        id: socket.handshake.query.username,
        name: socket.handshake.query.username,
        color: getRandomColor(),
        docId: socket.handshake.query.docId,
        range: null
      }

      // Join docID Room
      socket.join(docId);

      // Fetch all users of that room and broadcase that event to all
      const users = await collaboration.in(docId).fetchSockets();
      const connectedUsers = users.map(user => {
        return {
          id: user.data.name,
          name: user.data.name,
          color: user.data.color
        }
      });
      console.info("connectedUsers", connectedUsers);
      collaboration.to(docId).emit("users", connectedUsers);

      socket.on('disconnect', async () => {
        console.info("THIS USER DISCONNECTED", socket.data);
        const users = await collaboration.in(docId).fetchSockets();
        const connectedUsers = users.map(user => {
          return {
            id: user.data.name,
            name: user.data.name,
            color: user.data.color
          }
        });
        console.info("connectedUsers", connectedUsers);
        collaboration.to(docId).emit("users", connectedUsers);
      });

      // Get that doc and send that doc to the user
      const ydoc = await getYDoc(docId as string);

      const encodedUpdate = Buffer.from(Y.encodeStateAsUpdate(ydoc)).toString('base64');
      collaboration.emit('sync-update', encodedUpdate);


      // If get update
      socket.on('sync-update', async (data: SyncUpdateData) => {
        // Get data, apply update in YJS doc
        const update = Uint8Array.from(Buffer.from(data.update as any, 'base64'));
        Y.applyUpdate(ydoc, update);

        // Save the updated state to the database
        await saveYDoc(docId as string, ydoc);

        // Broadcase updated doc to every connected users
        const encodedUpdate = Buffer.from(update).toString('base64');
        collaboration.to(data.docId).emit('sync-update', encodedUpdate);
      });

      socket.on('cursor-position', async (data: CursorPositionData) => {
        // console.info("CURSOR POSITION", data);
        const users = await collaboration.in(docId).fetchSockets();
        const user = users.find(user => user.data.id === data.userId);
        if(user) {
          user.data.range = data.range;
          // console.info("User After cursor position", user.id, data.range);
          collaboration.to(docId).emit('cursor-position', {
            ...data,
            color: user.data.color
          });
        }

        // // Update the user's cursor position and broadcast to others
        // const userIndex = documentUsers[docId].findIndex((u) => u.userId === data.userId);
        // if (userIndex !== -1) documentUsers[docId][userIndex].range = data.range;
  
        // io.to(docId).emit('cursor-position', data);
      });
    })
  }


}