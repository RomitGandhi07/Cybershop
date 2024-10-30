"use client";

import RichTextEditor from "./rich-text-editor";
import RichTextEditor2 from "./rich-text-editor2";

export default function QuillCollaborativeEditing () {
    return (
        <>
            <div>
                <RichTextEditor></RichTextEditor>
            </div>
            <div className="mt-72">
                <RichTextEditor2></RichTextEditor2>
            </div>
        </>
    )
}