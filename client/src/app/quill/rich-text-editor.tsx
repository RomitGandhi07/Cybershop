import { useRef, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import * as Y from 'yjs'
import { QuillBinding } from 'y-quill'

const richTextModules = {
    toolbar: [
        ['bold', 'italic', 'strike'],
        ['link', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ size: ['small', false, 'large', 'huge'] }],
    ],
};
const formats = ['bold', 'italic', 'strike', 'blockquote', 'link', 'list', 'bullet', 'size'];

export default function RichTextEditor() {
    const [value, setValue] = useState('');


    // A Yjs document holds the shared data
    const ydoc = new Y.Doc()
    // Define a shared text type on the document
    const ytext = ydoc.getText('quill')

    const quillRef = useRef(null);
    return (
        <>
            <ReactQuill
                // @ts-ignore
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
        </>
    )
}