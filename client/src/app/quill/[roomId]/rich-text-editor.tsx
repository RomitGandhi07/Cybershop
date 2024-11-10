import React, { use, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill';
import { WebsocketProvider } from 'y-websocket';
import CustomSocketIOProvider from './CustomSocketIOProvider';
import { io } from 'socket.io-client';
import UsersAvatar from './user-avatar';
import QuillCursors from 'quill-cursors';
import dynamic from 'next/dynamic';
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// const { Quill } = dynamic(() => import("react-quill"), { ssr: false });


const richTextModules = {
    toolbar: [
        ['bold', 'italic', 'strike'],
        ['link', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ size: ['small', false, 'large', 'huge'] }],
    ],
    cursors: true,
    history: {
        userOnly: true
    }
};
const formats = ['bold', 'italic', 'strike', 'blockquote', 'link', 'list', 'bullet', 'size'];

interface IRichTextEditorProps {
    roomId: string,
    userName: string
}

Quill.register("modules/cursors", QuillCursors);

const RichTextEditor: React.FC<IRichTextEditorProps> = ({ roomId, userName }) => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<Array<any>>([]);
    const [isCursorSet, setIsCursorSet] = useState(false);
    const quillRef = useRef<any>(null);

    useEffect(() => {
        // alert("HERE");
        // A Yjs document holds the shared data
        const ydoc = new Y.Doc()
        // const provider = new WebsocketProvider(`http://localhost:3003/socket.io/connection`, roomId, ydoc);

        // // Debug connection status
        // provider.on('status', (event: any) => {
        //     console.log(`WebSocket status: ${event.status}`);
        //   });

        //   provider.on('synced', (isSynced: any) => {
        //     console.log(`Synced: ${isSynced}`);
        //   });

        //   provider.on('connection-close', (event: any) => {
        //     console.log("Connection closed:", event);
        //   });

        //   provider.on('connection-error', (event: any) => {
        //     console.log("Connection error:", event);
        //   });

        // const socket = io('http://localhost:3003', {
        //     transports: ['websocket'],
        //     // upgrade: false,
        //     // forceNew: true,
        //     // query: this.query,
        //     path: '/socket.io/connection',
        //     withCredentials: true,
        // }); // Socket.IO server URL

        // Define a shared text type on the document
        // const yText = ydoc.getText('quill')


        let quill;
        let provider: CustomSocketIOProvider;
        if (quillRef && quillRef.current && quillRef.current.getEditor) {
            quill = quillRef.current.getEditor();

            // const binding = new QuillBinding(yText, quill);
            // const binding = new QuillBinding(yText, quill, provider.awareness);
            provider = new CustomSocketIOProvider({ docId: roomId, ydoc, editor: quill, username: userName })

            provider.socket?.on("users", (data: any) => {
                console.info("users data recieved", data);
                if(!isCursorSet) {
                    const user = data.find((record: any) => record.id === userName);
                    if(user) {
                        provider.cursors?.createCursor(user.id, user.name, user.color);
                    }
                    setIsCursorSet(true);
                }
                
                setUsers(data);
            })
        }
        return () => {
            provider?.destroy();
            ydoc.destroy();
        }
    }, []);

    return (
        <>
            {/* {JSON.stringify(users)} */}
            <UsersAvatar users={users} />

            <div className='mt-7'>
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder={"Enter here."}
                    modules={richTextModules}
                    formats={formats}
                // readOnly={elementProps.disabled}
                // bounds={'.my-editor-container'}
                />
            </div>

        </>
    )
};

export default RichTextEditor;