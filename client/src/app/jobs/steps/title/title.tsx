/* eslint-disable react/display-name */
import React, { useImperativeHandle, forwardRef, useContext, useState } from "react";
import { JobPostContext } from "../../job-post-context";
import JobPostTitleForm from "./job-post-title-form";
import { APIStore } from "@/utils/api-store";
import { ApiSuccessResponse } from "@/interfaces";


const JobTitle: React.FC<{}> = forwardRef((_, ref) => {
    const context = useContext(JobPostContext);
    const [title, setTitle] = useState<string>(context.jobDetails?.title ?? "");

    const onNext = async () => {
        // // If title is not there then return false
        // if(!title) {
        //     return false;
        // }

        // // If context has jobId means it is edit form then call update API
        // if (context.jobId) {
        //     const response = await APIStore.updateJobPost(
        //         context.jobId,
        //         {
        //             title
        //         }
        //     );

        //     return response.success;
        // }
        // // Means first we need to create a draft and set the jobId
        // else {
        //     // Create job post
        //     const response = await APIStore.createJobPost({
        //         title
        //     });

        //     // If it gives success then set JobId and return true
        //     if (response.success) {
        //         context.setJobId((response as ApiSuccessResponse).data.id);
        //         return true;
        //     }

        //     // return false
        //     return false;
        // }
        return true;
    };

    // Expose onNext to the parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
        onNext,
    }));

    return (
        <div className="w-[100%] bg-white flex items-center justify-center">

            <div className="p-8 bg-white flex flex-col justify-between">

                {/* <!-- Main Content Section --> */}
                <div className="flex justify-between items-start mt-4">
                    {/* <!-- Left Content --> */}
                    <div className="w-[50%]">
                        <h1 className="text-3xl font-semibold text-gray-900 leading-tight mb-3">
                            Let&apos;s start with a strong title.
                        </h1>
                        <p className="text-gray-600 text-sm mb-8">
                            This helps your job post stand out to the right candidates. It&apos;s the first thing they’ll see, so make it count!
                        </p>
                    </div>

                    {/* <!-- Right Content --> */}
                    <div className="w-[40%]">
                        <JobPostTitleForm title={title} setTitle={setTitle} />
                        {/* <div className="flex items-center">
                            {title}
                            {context.jobId}
                        </div> */}

                        {/* <!-- Example Titles Section --> */}
                        <div className="mt-6">
                            <p className="text-gray-800 text-sm font-medium mb-2">Example titles</p>
                            <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside">
                                <li>Cybersecurity Expert Needed to Resolve Google Ads Domain Flagging Issue</li>
                                <li>Penetration Tester Required for Web Application Security Assessment & Documentation</li>
                                <li>Seeking Expert Server Specialist for Security and Maintenance</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
});

export default JobTitle