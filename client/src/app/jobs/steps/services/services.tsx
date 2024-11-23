"use client";
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { JobPostContext } from "../../job-post-context";
import JobPostDescriptionForm from "./job-post-services-form";
import { APIStore } from "@/utils/api-store";
import { Notification } from '@/lib/notification/notification';
import { NotificationTypesEnum } from "@/enums/notification-types.enum";

// eslint-disable-next-line react/display-name
const JobServices: React.FC<{}> = forwardRef((_, ref) => {
    const context = useContext(JobPostContext);

    const [description, setDescription] = useState<string>(context.jobDetails?.description ?? "");

    const onNext = async () => {
        // // If title is not there then return false
        // if (!description) {
        //     return false;
        // }

        // // We need to call update API
        // if (context.jobId) {
        //     const response = await APIStore.updateJobPost(
        //         context.jobId,
        //         {
        //             description
        //         }
        //     );

        //     return response.success;
        // }
        // // Display notificatin that something went wrong
        // else {
        //     Notification({
        //         type: NotificationTypesEnum.ERROR,
        //         message: "Something went wrong",
        //     });
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
                            What are the services you are opting for?
                        </h1>
                        <p className="text-gray-600 text-sm mb-4 mt-7">Discover and choose from a range of cybersecurity services tailored to your needs, including job posting, secure communication, and access to trusted experts. Explore solutions that fit your budget, timeline, and specific requirements.</p>
                        {/* <ul className="list-disc pl-5 text-gray-800 text-sm space-y-2 mt-7">
                            <li>It he</li>
                            <li>The skills required for your work</li>
                            <li>Good communication</li>
                            <li>Details about how you or your team like to work</li>
                        </ul> */}
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

                        {/* <!-- Help Section --> */}
                        {/* <p className="text-gray-800 text-sm font-medium mb-1">Need help?</p>
                        <a href="#" className="text-green-700 text-sm hover:underline mb-4 inline-block">See examples of effective descriptions</a> */}

                         {/* <!-- Attach File Button --> */}
                        {/* <button className="flex items-center space-x-2 text-green-700 bg-white border border-green-700 rounded-full py-2 px-4 hover:bg-green-100 focus:outline-none">
                            <i className="fas fa-paperclip"></i>
                            <span>Attach file</span>
                        </button>
                        <p className="text-gray-400 text-xs mt-1">Max file size: 100MB</p> */}
                    </div>
                </div>
            </div>

        </div>
    )
});

export default JobServices;