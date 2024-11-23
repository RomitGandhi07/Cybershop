"use client";
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { JobPostContext } from "../../job-post-context";
import JobPostDescriptionForm from "./proposal-terms-form";
import { APIStore } from "@/utils/api-store";
import { Notification } from '@/lib/notification/notification';
import { NotificationTypesEnum } from "@/enums/notification-types.enum";
import { FaClock, FaTag } from "react-icons/fa";

// eslint-disable-next-line react/display-name
const ProposalTerms: React.FC<{}> = forwardRef((_, ref) => {
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
                            Tell us about your proposed fees.
                        </h1>
                        <p className="text-gray-600 text-sm mb-4 mt-7">Specify the fee you will charge for the job.</p>
                        {/* <ul className="list-disc pl-5 text-gray-800 text-sm space-y-2 mt-7">
                            <li>It he</li>
                            <li>The skills required for your work</li>
                            <li>Good communication</li>
                            <li>Details about how you or your team like to work</li>
                        </ul> */}
                    </div>

                    {/* <!-- Right Content --> */}
                    <div className="w-[50%]">
                        <p className="text-md">How do you want to be paid?</p>
                        {/* <!-- Budget Options --> */}
                        <div className="mt-6 flex space-x-4">
                            <div className="w-[250px] p-4 border border-gray-300 rounded-md flex items-center space-x-4">
                            {/* <div className="w-[250px] p-4 border border-orange-500 rounded-md flex items-center space-x-4 bg-orange-50"> */}
                                <FaClock className="text-orange-500"></FaClock>
                                <span className="text-gray-700 font-medium">By Milestones</span>
                                <div className="ml-auto h-5 w-5 border border-gray-400 rounded-full"></div>
                                {/* <div className="ml-auto h-5 w-5 border border-orange-500 rounded-full bg-orange-500 flex items-center justify-center">
                                    <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
                                </div> */}
                            </div>
                            {/* <div className="w-[250px] p-4 border border-gray-300 rounded-md flex items-center space-x-4"> */}
                                <div className="w-[250px] p-4 border border-orange-500 rounded-md flex items-center space-x-4 bg-orange-50">
                                <FaTag className="text-orange-500"></FaTag>
                                <span className="text-gray-700 font-medium">By Project</span>
                                <div className="ml-auto h-5 w-5 border border-orange-500 rounded-full bg-orange-500 flex items-center justify-center">
                                    <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
                                </div>
                                {/* <div className="ml-auto h-5 w-5 border border-gray-400 rounded-full"></div> */}
                            </div>
                        </div>

                        {/* Fixed Fee  */}
                        <>
                            <p className="mt-10 text-md text-gray-500">
                                Set a price for the project and pay at the end, or you can divide the project into milestones and pay as each milestone is completed.
                            </p>

                            <div className="mt-6">
                                <h2 className="text-md font-medium text-gray-900">What is the best cost estimate for this job?</h2>
                                {/* <p className="mt-2 text-md text-gray-500">You can negotiate this cost and create milestones when you chat with your service provider.</p> */}
                                <div className="mt-4 w-[100px]">
                                    <input type="text" placeholder="0" className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                                </div>
                            </div>
                        </>

                        {/* Hourly Rate */}
                        {/* <div className="mt-10">
                            <h1 className="text-md">How many milestones do you want to include?</h1>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <span className="text-gray-900 font-medium">1</span>
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="milestone-1-description" className="sr-only">Description</label>
                                        <input id="milestone-1-description" type="text" value="Milestone 1" className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                                    </div>
                                    <div>
                                        <label htmlFor="milestone-1-date" className="sr-only">Due date</label>
                                        <div className="relative">
                                            <input id="milestone-1-date" type="date" value="2024-11-22" className="px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <label htmlFor="milestone-1-amount" className="sr-only">Amount</label>
                                        <div className="relative">
                                            <input id="milestone-1-amount" type="text" value="12.00" className="pl-7 pr-3 py-2 w-[120px] text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button className="mt-6 text-orange-600 font-medium hover:underline">+ Add milestone</button>
                        </div> */}

                        {/* <div>
                            <p className="font-medium text-lg">What level of experience will it need?</p>
                            <p className="text-gray-600 mt-2">This won't restrict any proposals, but helps match expertise to your budget.</p>
                        </div> */}
                        {/* <JobPostDescriptionForm
                            description={description}
                            setDescription={setDescription}
                        /> */}

                        {/* <!-- Help Section --> */}
                        {/* <p className="text-gray-800 text-sm font-medium mb-1">Need help?</p>
                        <a href="#" className="text-orange-700 text-sm hover:underline mb-4 inline-block">See examples of effective descriptions</a> */}

                        {/* <!-- Attach File Button --> */}
                        {/* <button className="flex items-center space-x-2 text-orange-700 bg-white border border-orange-700 rounded-full py-2 px-4 hover:bg-orange-100 focus:outline-none">
                            <i className="fas fa-paperclip"></i>
                            <span>Attach file</span>
                        </button>
                        <p className="text-gray-400 text-xs mt-1">Max file size: 100MB</p> */}
                    </div>
                </div>
            </div>

        </div >
    )
});

export default ProposalTerms;