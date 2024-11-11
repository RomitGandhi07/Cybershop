import React, { use, useEffect, useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill, { Quill } from 'react-quill';
import * as Y from 'yjs'
import CustomSocketIOProvider from './CustomSocketIOProvider';
import UsersAvatar from './user-avatar';
import QuillCursors from 'quill-cursors';


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
    incidentId: string,
    userName: string
}

Quill.register("modules/cursors", QuillCursors);

const RichTextEditor: React.FC<IRichTextEditorProps> = ({ incidentId, userName }) => {
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<Array<any>>([]);
    const quillRef = useRef<any>(null);

    useEffect(() => {
        let provider: CustomSocketIOProvider;

        // If quill ref is there and if we get editor then set that in quill and set custom provider for updates
        if (quillRef && quillRef.current && quillRef.current.getEditor) {
            const quill = quillRef.current.getEditor();

            provider = new CustomSocketIOProvider({
                editor: quill,
                userId: userName,
                setUsers,
                socketQuery: {
                    incidentId,
                    updateId: incidentId,
                    widgetId: incidentId,
                    userId: userName
                },
                socketPath: "/v1/incidents/socket.io/connection"
            });
        }
        return () => {
            // Destroy provider
            provider?.destroy();
        }
    }, []);

    return (
        <>
            {JSON.stringify(users)}
            {/* <UsersAvatar users={users} /> */}

            {/* {value} */}

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