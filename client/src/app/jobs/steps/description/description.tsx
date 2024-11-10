"use client";
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { JobPostContext } from "../../job-post-context";
import JobPostDescriptionForm from "./job-post-description-form";
import { APIStore } from "@/utils/api-store";
import { Notification } from '@/lib/notification/notification';
import { NotificationTypesEnum } from "@/enums/notification-types.enum";

const JobDescription: React.FC<{}> = forwardRef((_, ref) => {
    const context = useContext(JobPostContext);

    const [description, setDescription] = useState<string>(context.jobDetails?.description ?? "");

    const onNext = async () => {
        // If title is not there then return false
        if (!description) {
            return false;
        }

        // We need to call update API
        if (context.jobId) {
            const response = await APIStore.updateJobPost(
                context.jobId,
                {
                    description
                }
            );

            return response.success;
        }
        // Display notificatin that something went wrong
        else {
            Notification({
                type: NotificationTypesEnum.ERROR,
                message: "Something went wrong",
            });
            return false;
        }

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
                            Start the conversation.
                        </h1>
                        <p className="text-gray-800 text-sm font-medium mb-4">Talent are looking for:</p>
                        <ul className="list-disc pl-5 text-gray-800 text-sm space-y-2">
                            <li>Clear expectations about your task or deliverables</li>
                            <li>The skills required for your work</li>
                            <li>Good communication</li>
                            <li>Details about how you or your team like to work</li>
                        </ul>
                    </div>

                    {/* <!-- Right Content --> */}
                    <div className="w-[40%]">
                        {/* <!-- Description Field --> */}
                        {/* <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="description">
                            
                        </label> */}
                        <JobPostDescriptionForm
                            description={description}
                            setDescription={setDescription}
                        />
                        {/* <p className="text-gray-400 text-xs text-right">49,876 characters left</p> */}

                        {/* <!-- Warning Message --> */}
                        <div className="flex items-start text-yellow-600 text-xs mt-2 mb-6">
                            <i className="fas fa-exclamation-circle mr-2 mt-1"></i>
                            <span>Your description looks a little short. Add details like your project milestones and a bit about your team.</span>
                        </div>

                        {/* <!-- Help Section --> */}
                        <p className="text-gray-800 text-sm font-medium mb-1">Need help?</p>
                        <a href="#" className="text-green-700 text-sm hover:underline mb-4 inline-block">See examples of effective descriptions</a>

                        {/* <!-- Attach File Button --> */}
                        <button className="flex items-center space-x-2 text-green-700 bg-white border border-green-700 rounded-full py-2 px-4 hover:bg-green-100 focus:outline-none">
                            <i className="fas fa-paperclip"></i>
                            <span>Attach file</span>
                        </button>
                        <p className="text-gray-400 text-xs mt-1">Max file size: 100MB</p>
                    </div>
                </div>
            </div>

        </div>
    )
});

export default JobDescription;