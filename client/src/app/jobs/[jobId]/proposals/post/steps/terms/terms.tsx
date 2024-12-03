"use client";
import React, { forwardRef, useContext, useImperativeHandle, useState } from "react";
import { JobProposalPostContext } from "../../job-proposal-post-context";
import JobPostDescriptionForm from "./proposal-terms-form";
import { APIStore } from "@/utils/api-store";
import { Notification } from '@/lib/notification/notification';
import { NotificationTypesEnum } from "@/enums/notification-types.enum";
import { FaClock, FaTag } from "react-icons/fa";
import ProposalTermsMilestone from "./proposal-terms-milestones";
import { useRouter } from "next/navigation";

enum ProposalTermsTypesEnum {
    PROJECT = "Project",
    MILESTONES = "Milestones"
}

interface Milestone {
    id: number;
    name: string;
    date: string;
    amount: string;
}

// eslint-disable-next-line react/display-name
const ProposalTerms: React.FC<{}> = forwardRef((_, ref) => {
    const context = useContext(JobProposalPostContext);
    const router = useRouter();

    const [type, setType] = useState(ProposalTermsTypesEnum.MILESTONES);
    const [projectFees, setProjectFees] = useState("0");
    const [milestones, setMilestones] = useState<Milestone[]>([
        { id: 1, name: "Milestone 1", date: "", amount: "" },
    ]);

    const onNext = async () => {
        // Prepare terms
        const terms: Record<string, any> = {
            type
        };
        if (type === ProposalTermsTypesEnum.PROJECT) {
            if (!projectFees) {
                return false;
            }
            terms.projectFees = projectFees;
        }
        else {
            if (!milestones.length) {
                return false;
            }
            terms.milestones = milestones;
        };


        // Create proposal
        const response = await APIStore.createJobPostProposal(context.jobId, {
            ...context.proposal,
            terms
        });

        // If the reponse is success then redirect to job listing page
        if (response && response.success) {
            router.push(`/jobs/${context.jobId}/serviceProvider`);
            return true;
        }

        return false;
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
                    <div className="w-[40%]">
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
                            <div className={`w-[250px] p-4 border ${type === ProposalTermsTypesEnum.MILESTONES ? "border-orange-500 bg-orange-50" : "border-gray-300"} rounded-md flex items-center space-x-4 cursor-pointer`}
                                onClick={() => setType(ProposalTermsTypesEnum.MILESTONES)}
                            >
                                {/* <div className="w-[250px] p-4 border border-orange-500 rounded-md flex items-center space-x-4 bg-orange-50"> */}
                                <FaClock className="text-orange-500"></FaClock>
                                <span className="text-gray-700 font-medium">By Milestones</span>
                                {
                                    type === ProposalTermsTypesEnum.MILESTONES ?
                                        <div className="ml-auto h-5 w-5 border border-orange-500 rounded-full bg-orange-500 flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
                                        </div> : <div className="ml-auto h-5 w-5 border border-gray-400 rounded-full"></div>
                                }

                            </div>
                            <div className={`w-[250px] p-4 border ${type === ProposalTermsTypesEnum.PROJECT ? "border-orange-500 bg-orange-50" : "border-gray-300"} rounded-md flex items-center space-x-4  cursor-pointer`}
                                onClick={() => setType(ProposalTermsTypesEnum.PROJECT)}
                            >
                                <FaTag className="text-orange-500"></FaTag>
                                <span className="text-gray-700 font-medium">By Project</span>
                                {
                                    type === ProposalTermsTypesEnum.PROJECT ?
                                        <div className="ml-auto h-5 w-5 border border-orange-500 rounded-full bg-orange-500 flex items-center justify-center">
                                            <div className="h-2.5 w-2.5 bg-white rounded-full"></div>
                                        </div> : <div className="ml-auto h-5 w-5 border border-gray-400 rounded-full"></div>
                                }
                            </div>
                        </div>

                        {
                            type === ProposalTermsTypesEnum.PROJECT ?
                                <>
                                    <p className="mt-10 text-md text-gray-500">
                                        Set a price for the project and pay at the end, or you can divide the project into milestones and pay as each milestone is completed.
                                    </p>

                                    <div className="mt-6">
                                        <h2 className="text-md font-medium text-gray-900">What is the best cost estimate for this job?</h2>
                                        {/* <p className="mt-2 text-md text-gray-500">You can negotiate this cost and create milestones when you chat with your service provider.</p> */}
                                        <div className="mt-4 w-[100px]">
                                            <input type="number" value={projectFees} onChange={(e) => setProjectFees(e.target.value)} placeholder="0" className="w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500" />
                                        </div>
                                    </div>
                                </> :
                                <div className="mt-10">
                                    <ProposalTermsMilestone milestones={milestones} setMilestones={setMilestones} />
                                </div>
                        }
                    </div>
                </div>
            </div>

        </div >
    )
});

export default ProposalTerms;