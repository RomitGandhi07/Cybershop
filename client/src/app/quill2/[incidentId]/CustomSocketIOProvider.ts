// CustomSocketIOProvider.ts
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { io, Socket } from 'socket.io-client';
import QuillCursors from "quill-cursors";

interface CustomSocketIOProviderOptions {
    socketQuery: Record<string, any>,
    socketPath: string,
    editor: any,
    userId: string,
    setUsers: (data: Array<any>) => void
}

class CustomSocketIOProvider {
    userId: string;
    ydoc: Y.Doc;
    socket: Socket;
    cursors: QuillCursors;
    // private users?: any;

    constructor({ editor, userId, socketQuery, socketPath, setUsers }: CustomSocketIOProviderOptions) {
        // Set userId
        this.userId = userId;

        // Create YDoc
        this.ydoc = new Y.Doc();

        // Connect to socket server
        this.socket = io(`http://localhost:3003/statusUpdatesNotesCollaboration`, {
            transports: ['websocket'],
            // upgrade: false,
            // forceNew: true,
            query: {...socketQuery, color: this.getRandomColor()},
            path: socketPath,
            withCredentials: true,
        }); // Socket.IO server URL

        // Console status of socket connection
        this.socket.on('connect', () => {
            console.log('Socket connected');
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Socket disconnected', reason);
        });

        this.socket.on('connect_error', (error) => {
            console.log('not able to connect socket ', error);
        });

        // Initialize the cursor module
        this.cursors = editor.getModule('cursors');

        // If cursor position is changed then emit that event so, other users can display that
        editor.on('selection-change', (range: any) => {
            console.info("SELECTOIN CHANGE", range, this.userId)
            if (range) {
                this.socket.emit('status-update-notes-collaboration-cursor-pointer-update', { userId: this.userId, range });
            }
        });

        // Listen on list of users
        this.socket.on('connected-status-update-notes-collaboration-users', (data) => {
            setUsers(data);
            data.forEach((record: any) => {
                if (record.userId !== this.userId) {
                    this.cursors.createCursor(data.userId, data.userId, data.color);
                    this.cursors.moveCursor(data.userId, data.range);
                }
            });
        });

        // Listen for cursor updates from other users
        this.socket.on('status-update-notes-collaboration-cursor-pointer-update', (data) => {
            console.info("CURSOR POSITION CHANGES", this.userId, data, this.cursors?.cursors());
            if (data.userId !== this.userId) {
                this.cursors.createCursor(data.userId, data.userId, data.color);
                this.cursors.moveCursor(data.userId, data.range);
            }
        });

        // Once doc updates then need to send that event to other users. So, we can save it in DB and notify other users
        this.ydoc.on('update', (update: Uint8Array, origin) => {
            // ignore updates applied by this provider
            if (origin !== this) {
                const encodedUpdate = Buffer.from(update).toString('base64'); // Encode as base64
                this.socket.emit('status-update-notes-collaboration-sync-update', { update: encodedUpdate });
            }

        });

        // Once we get the update of other user then we will update content of ours
        this.socket.on('status-update-notes-collaboration-sync-update', (encodedUpdate: string) => {
            const update = Uint8Array.from(Buffer.from(encodedUpdate, 'base64')); // Decode from base64
            Y.applyUpdate(this.ydoc as Y.Doc, update);
        });

        // Bind Yjs document with Quill editor for collaboration
        const ytext = this.ydoc.getText('quill');
        new QuillBinding(ytext, editor);
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      };

    destroy() {
        this.socket.disconnect();
        this.ydoc.destroy();
    }
}

export default CustomSocketIOProvider;
