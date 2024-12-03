"use client";
import { PrimaryButton } from "@/shared/components/button";
import { APIStore } from "@/utils/api-store";
import { useParams } from "next/navigation";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { FaHandshake } from "react-icons/fa";
import { FaClock, FaTag } from "react-icons/fa6";
import ContractMilestoneForm from "./contract-terms-milestones";

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
const ContractStart: React.FC<{}> = forwardRef((_, ref) => {
    // const context = useContext(JobPostContext);
    const params = useParams<{ jobId: string, proposalId: string }>();
    const [proposal, setProposal] = useState<Record<string, any>>({});
    const [isLoading, setLoading] = useState(true);

    const [type, setType] = useState(ProposalTermsTypesEnum.MILESTONES);
    const [projectFees, setProjectFees] = useState("0");
    const [milestones, setMilestones] = useState<Milestone[]>([
        { id: 1, name: "Milestone 1", date: "", amount: "" },
    ]);

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

    async function fetchProposalDetails() {
        const response = await APIStore.getJobProposalDetails(
            params.jobId,
            params.proposalId,
            {
                hideSuccessMessage: true
            }
        );

        if (response && response.success) {
            setProposal((response as any).data);
            setType((response as any).data.terms.type);
            setProjectFees((response as any).data.terms.projectFees);
            setMilestones((response as any).data.terms.milestones);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchProposalDetails();
    }, [])

    // Expose onNext to the parent using useImperativeHandle
    useImperativeHandle(ref, () => ({
        onNext,
    }));

    return (
        isLoading ? "Loading..." :
            <div className="w-[100%] bg-white flex items-center justify-center">

                <div className="p-8 bg-white flex flex-col justify-between">
                    <p className="text-orange-600 text-center font-bold text-2xl">Cybersecurity Expert Needed to Resolve Google Ads Domain Flagging Issue</p>
                    <div className="mt-9 ml-72">
                        <div className="flex items-center content-center space-x-3">
                            <img src={proposal?.clientOrganization?.logo ?? ""} className="w-8 h-8 rounded-full border border-gray-300" />
                            <span className="mt-1 font-bold text-gray-500">{proposal?.clientOrganization?.name}</span>
                            <FaHandshake
                                size={35}
                            // className="ml-5"
                            // onClick={handleWishlistToggle}
                            // className={`cursor-pointer tran  sition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                            //     }`
                            // }
                            />
                            <img src={proposal?.serviceProviderOrganization?.logo ?? ""} className="w-8 h-8 rounded-full border border-gray-300" />
                            <span className="mt-1 font-bold text-gray-500">{proposal?.serviceProviderOrganization?.name}</span>
                        </div>
                    </div>
                    {/* <!-- Main Content Section --> */}
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
                                    <ContractMilestoneForm milestones={milestones} setMilestones={setMilestones} />
                                </div>
                        }
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