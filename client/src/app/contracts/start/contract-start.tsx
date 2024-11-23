"use client";
import { PrimaryButton } from "@/shared/components/button";
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { FaClock, FaHandshake, FaTag } from "react-icons/fa";

// eslint-disable-next-line react/display-name
const ContractStart: React.FC<{}> = forwardRef((_, ref) => {
    // const context = useContext(JobPostContext);

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
                <p className="text-orange-600 text-center font-bold text-2xl">Cybersecurity Expert Needed to Resolve Google Ads Domain Flagging Issue</p>
                <div className="mt-9 ml-72">
                    <div className="flex items-center content-center space-x-3">
                        <img src={"https://media.licdn.com/dms/image/v2/D4D0BAQHnIYV_Yd7XFw/company-logo_200_200/company-logo_200_200/0/1719839287141/rapidops_inc_logo?e=1740009600&v=beta&t=IAi6hn536sb0QLhXqZs1WhkENp7yA5yI2X4rUAPEeNA"} className="w-8 h-8 rounded-full border border-gray-300" />
                        <span className="mt-1 font-bold text-gray-500">Rapidops Inc.</span>
                        <FaHandshake
                            size={35}
                        // className="ml-5"
                        // onClick={handleWishlistToggle}
                        // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                        //     }`
                        // }
                        />
                        <img src={"https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_200_200/company-logo_200_200/0/1633985771177/crowdstrike_logo?e=1740009600&v=beta&t=8duqSF0EAlEK6SB-UBNKPykiMqpXfZwXG8u7LhJWtGs"} className="w-8 h-8 rounded-full border border-gray-300" />
                        <span className="mt-1 font-bold text-gray-500">Crowd Strike</span>
                    </div>

                </div>
                {/* <!-- Main Content Section --> */}
                <div className="flex justify-between items-start mt-16">
                    {/* <!-- Left Content --> */}
                    <div className="w-[50%]">
                        <h1 className="text-3xl font-semibold text-gray-900 leading-tight mb-3">
                            Tell us about pricing.
                        </h1>
                        <p className="text-gray-600 text-sm mb-4 mt-7">Specify the pricing that is fixed between you and service provider.</p>
                        {/* <ul className="list-disc pl-5 text-gray-800 text-sm space-y-2 mt-7">
                            <li>It he</li>
                            <li>The skills required for your work</li>
                            <li>Good communication</li>
                            <li>Details about how you or your team like to work</li>
                        </ul> */}
                    </div>

                    {/* <!-- Right Content --> */}
                    <div className="w-[40%]">
                        <p className="text-lg">What are the payment terms?</p>

                        <div className="flex items-center space-x-2 mt-5">
                            <input
                                type="checkbox"
                                id="custom-checkbox"
                                className="h-5 w-5 accent-orange-600 rounded border-gray-300 focus:ring-2 focus:ring-orange-500 focus:outline-none"
                            />
                            <label htmlFor="custom-checkbox" className="text-gray-700">
                                Same as proposal
                            </label>
                        </div>

                        {/* Fixed Fee  */}
                        {/* <>
                            <p className="mt-10 text-md text-gray-500">
                                Set a price for the project and pay at the end, or you can divide the project into milestones and pay as each milestone is completed.
                            </p>

                            <div className="mt-6">
                                <h2 className="text-md font-medium text-gray-900">What is the cost estimate for this job?</h2>
                                <div className="mt-4 w-[100px]">
                                    <input type="text" placeholder="0" className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                                </div>
                            </div>
                        </> */}

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
                <div className="w-1/2 mt-12 flex items-center content-center ml-64">
                    <div className="ml-32">
                        <PrimaryButton
                            // className="ml-48"
                            mergeClasses={true}
                            isLoader={false}
                        >
                            Initiate Contract
                        </PrimaryButton>
                    </div>
                </div>

            </div>

        </div >
    )
});

export default ContractStart;