import { useCallback, useEffect, useRef, useState } from "react"
import Quill from 'quill';
import * as Y from 'yjs';
import { QuillBinding } from 'y-quill';
// import { io } from "socket.io-client"
// import { useParams } from "react-router-dom"

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

export default function RichTextEditor2() {
    const editorRef = useRef<HTMLDivElement>(null);
    const ydocRef = useRef<Y.Doc | null>(null);

    useEffect(() => {
        const initializeEditor = async () => {
          const ydoc = new Y.Doc();
          ydocRef.current = ydoc;
    
        //   const socket = io('http://localhost:3000'); // Adjust URL as needed
        //   socketRef.current = socket;
    
        //   socket.on('connect', () => {
        //     console.log('Connected to socket server');
        //   });
    
          const quill = new Quill(editorRef.current as HTMLDivElement, {
            theme: 'snow',
            placeholder: "Enter Here"
          });
    
          const ytext = ydoc.getText('quill');
          new QuillBinding(ytext, quill);
    
        //   socket.on('yjs-update', (update: Uint8Array) => {
        //     Y.applyUpdate(ydoc, update);
        //   });
    
          ydoc.on('update', (update: Uint8Array) => {
            // socket.emit('send-yjs-update', update);
          });
    
          return () => {
            // socket.disconnect();
            ydoc.destroy();
          };
        };
    
        initializeEditor();
      }, []);

    return <div ref={editorRef} id="editor"></div>;


}