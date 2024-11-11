"use client";

import { useParams, useSearchParams } from "next/navigation";
import RichTextEditor from "./rich-text-editor";


export default function QuillCollaborativeEditing() {
    const { incidentId } = useParams();

    const searchParams = useSearchParams();
    const username = searchParams.get("username");


    return (
        <>
            <div className="mt-5 flex flex-col items-center content-center">
                <p className="text-orange-600 text-2xl">Collaborative Editing </p>
                <span className="text-gray-600">Incident: {incidentId}</span>
                <span className="text-gray-600"> Username: {username}</span>
            </div>

            {/* <div className="mt-4">
                <h1 className="text-orange-600 text-center text-2xl">Using Quill</h1>
                <div className="mt-7">
                    <RichTextEditor2></RichTextEditor2>
                </div>
            </div> */}
            <div className="m-7">
                <h1 className="text-orange-600  text-xl">Using React Quill</h1>
                <div className="mt-7">
                    <RichTextEditor
                        incidentId={incidentId as string}
                        userName={username as string}
                    ></RichTextEditor>
                </div>

            </div>
        </>
    )
}