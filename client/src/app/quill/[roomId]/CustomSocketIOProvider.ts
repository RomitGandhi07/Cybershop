// CustomSocketIOProvider.ts
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
import { io, Socket } from 'socket.io-client';
import { Observable } from "lib0/observable";
import QuillCursors from "quill-cursors";

interface CustomSocketIOProviderOptions {
    docId: string;
    ydoc: Y.Doc;
    editor: any;
    username: string;
    // setUsers: (data: Array<any>) => void
}

const ports = [3003, 3004, 3003, 3004, 3003, 3004, 3003, 3004];

class CustomSocketIOProvider {
    private name: string;
    private id: string;
    private ydoc?: Y.Doc;
    socket?: Socket;
    private docId?: string;
    cursors?: QuillCursors;
    // private users?: any;

    constructor({ docId, ydoc, editor, username }: CustomSocketIOProviderOptions) {
        this.name = this.id = username;
        if (docId && username) {
            this.ydoc = ydoc;
            this.docId = docId;
            const port = ports[Math.floor(Math.random() * ports.length)];
            console.info(port, username);
            this.socket = io(`http://localhost:${port}/collaboration`, {
                transports: ['websocket'],
                // upgrade: false,
                // forceNew: true,
                query: {
                    docId,
                    username
                },
                path: '/socket.io/connection',
                withCredentials: true,
            }); // Socket.IO server URL

            // Initialize the cursor module
            this.cursors = editor.getModule('cursors');

            // Update the cursor position and send it to other users
            editor.on('selection-change', (range: any) => {
                console.info("SELECTOIN CHANGE", range, username)
                if (range) {
                    this.socket?.emit('cursor-position', { docId, userId: username, range });
                    // this.cursors?.moveCursor(username, range);
                } else {
                    // console.info("Removing cursor of user", username);
                    // this.cursors?.removeCursor(username);
                }
            });

            // Listen for cursor updates from other users
            this.socket.on('cursor-position', (data) => {
                console.info("CURSOR POSITION CHANGES", username, data, this.cursors?.cursors());
                if (data.userId !== this.id) {
                    this.cursors?.createCursor(data.userId, data.userId, data.color);
                    this.cursors?.moveCursor(data.userId, data.range);
                }
            });

            this.socket.on('connect', () => {
                // Connected, lets sign-up for to receive messages for this room
                // socketObj.emit('room', room);
                console.log('Socket connected');
            });

            this.socket.on('disconnect', (reason) => {
                console.log('Socket disconnected', reason);
            });

            this.socket.on('connect_error', (error) => {
                console.log('not able to connect socket ', error);
            });

            // Sync Yjs document with server
            this.socket.emit('join-room', docId);

            // this.socket.on('users', (users: Array<any>) => {
            //     console.info("USERS", users);
            //     setUsers(users);
            // });

            // Set up listeners to sync document changes
            // ydoc.on('update', (update: Uint8Array) => {
            //     this.socket.emit('sync-update', { docId, update });
            // });
            ydoc.on('update', (update: Uint8Array, origin) => {
                // ignore updates applied by this provider
                if (origin !== this) {
                    const encodedUpdate = Buffer.from(update).toString('base64'); // Encode as base64
                    this.socket?.emit('sync-update', { docId, update: encodedUpdate });
                }

            });

            // this.socket.on('sync-update', (update: Uint8Array) => {
            //   Y.applyUpdate(this.ydoc, update);
            // });
            this.socket.on('sync-update', (encodedUpdate: string) => {
                const update = Uint8Array.from(Buffer.from(encodedUpdate, 'base64')); // Decode from base64
                Y.applyUpdate(this.ydoc as Y.Doc, update);
            });

            // Bind Yjs document with Quill editor for collaboration
            const ytext = ydoc.getText('quill');
            new QuillBinding(ytext, editor);
        }
    }

    destroy() {
        this.socket?.disconnect();
    }
}

export default CustomSocketIOProvider;
