"use client";
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { JobProposalPostContext } from "../../job-proposal-post-context";
import ProposalPostDurationForm from "./proposal-duration-form";

// eslint-disable-next-line react/display-name
const ProposalDuration: React.FC<{}> = forwardRef((_, ref) => {
    const context = useContext(JobProposalPostContext);

    const [duration, setDuration] = useState<string>("");

    const onNext = async () => {
        console.info("duration", duration);
        // If description is not there then return false
        if (!duration) {
            return false;
        }

        // Set description value
        context.setProposal({
            ...context.proposal,
            duration: duration
        });

        return true;

    };

    // Expose onNext to the parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
        onNext,
    }));

    return (
        <div className="w-[100%] flex items-center justify-center">

            <div className="p-8 flex flex-col justify-between">

                {/* <!-- Main Content Section --> */}
                <div className="flex justify-between items-start mt-4">
                    {/* <!-- Left Content --> */}
                    <div className="w-[50%]">
                        <h1 className="text-3xl font-semibold text-gray-900 leading-tight mb-3">
                            How much time will it take?
                        </h1>
                        <p className="text-gray-600 text-sm mb-4 mt-7">Providing a clear duration helps clients set realistic expectations and ensures smooth collaboration throughout the project.</p>
                        {/* <ul className="list-disc pl-5 text-gray-800 text-sm space-y-2 mt-7">
                            <li>It he</li>
                            <li>The skills required for your work</li>
                            <li>Good communication</li>
                            <li>Details about how you or your team like to work</li>
                        </ul> */}
                    </div>

                    {/* <!-- Right Content --> */}
                    <div className="w-[50%]">
                        {/* <!-- Description Field --> */}
                        {/* <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="description">
                            
                        </label> */}
                        <ProposalPostDurationForm
                            duration={duration}
                            setDuration={setDuration}
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

export default ProposalDuration;