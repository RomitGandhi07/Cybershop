"use client";
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { JobProposalPostContext } from "../../job-proposal-post-context";
import ProposalPostCoverLetterForm from "./proposal-cover-letter-form";

// eslint-disable-next-line react/display-name
const ProposalCoverLetter: React.FC<{}> = forwardRef((_, ref) => {
    const context = useContext(JobProposalPostContext);

    const [coverLetter, setCoverLetter] = useState<string>("");

    const onNext = async () => {
        // If description is not there then return false
        if (!coverLetter) {
            return false;
        }

        // Set description value
        context.setProposal({
            ...context.proposal,
            coverLetter
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
                            Talk About
                        </h1>
                        {/* <p className="text-gray-800 text-sm font-medium mb-4">Talent are looking for:</p> */}
                        <ul className="list-disc pl-5 text-gray-800 text-sm space-y-2">
                            <li>Your past experiences</li>
                            <li>Details about how you or your team like to work</li>
                            <li>Any help required from the client</li>
                            <li>How you will approach this work</li>
                        </ul>
                    </div>

                    {/* <!-- Right Content --> */}
                    <div className="w-[50%]">
                        {/* <!-- Description Field --> */}
                        {/* <label className="block text-gray-800 text-sm font-medium mb-2" htmlFor="description">
                            
                        </label> */}
                        <ProposalPostCoverLetterForm
                            description={coverLetter}
                            setDescription={setCoverLetter}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
});

export default ProposalCoverLetter;