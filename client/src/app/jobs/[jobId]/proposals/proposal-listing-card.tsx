"use client";
import Form, { FormItems } from "@/lib/form/form";
import Modal from "@/shared/components/modal";
import { APIStore } from "@/utils/api-store";
import { useContext, useRef, useState } from "react";
import { FaClock, FaDollarSign, FaHandshake, FaIndustry, FaPaperPlane, FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { JobProposalsContext } from "./proposal-post-context";

interface IProposalDetails {
    id: string,
    organization: {
        name: string,
        logo?: string | null,
        industry?: string | null,
        website?: string | null,
        tagline?: string | null,
        noOfEmployees?: number | null
    },
    status: string,
    coverLetter: string,
    services: {
        id: string,
        value: string
    }[],
    country: {
        id: string,
        value: string
    },
    terms: {
        type: string,
        projectFees?: number | null
        milestones?: {
            name: string,
            date: string,
            fee: number
        }[] | null
    },
    expertise: string,
    duration: string,
    proposals: number,
    createdAt: string,
    wishlisted: boolean,
    createdBy: string
}
interface IJobListingCardProps {
    proposal: IProposalDetails,
    displayIcon?: boolean,
    displayStatus?: boolean,
    setRefreshPage?: any
}


const ProposalListingCard: React.FC<IJobListingCardProps> = ({ proposal, displayIcon, displayStatus, setRefreshPage }) => {
    const context = useContext(JobProposalsContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const formRef = useRef(null);

    const fields = [{
        name: 'search',
        className: "text-black mt-4 rounded-3xl w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        placeholder: "Enter message",
        type: 'input',
        // onChange: onChangeSearch
    }]

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    async function shortlistProposal() {
        // Shortlist the job
        const response = await APIStore.updateProposalStatus({
            jobId: context.jobId,
            proposalId: proposal.id
        }, {
            status: "Shortlisted"
        }, {
            hideSuccessMessage: true
        });

        if(setRefreshPage && response && response.success) {
            setRefreshPage(true);
        }
    }

    async function cancelProposal() {
        // Shortlist the job
        const response = await APIStore.updateProposalStatus({
            jobId: context.jobId,
            proposalId: proposal.id
        }, {
            status: "Cancelled"
        }, {
            hideSuccessMessage: true
        });

        if(setRefreshPage && response && response.success) {
            setRefreshPage(true);
        }
    }

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={`Send Message to ${proposal.createdBy} (${proposal.organization.name})`}>
                <div className="">
                    <Form ref={formRef} defaultValues={{}}>
                        <div className="flex space-x-2">
                            <div className="w-full">
                                <FormItems
                                    fields={fields}
                                />
                            </div>
                            <FaPaperPlane
                                size={20}
                                className="mt-7 text-orange-600"
                            />
                        </div>
                    </Form>
                </div>
            </Modal>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-xs mb-2">Proposed at {new Date(proposal.createdAt).toString()}</p>
                    <div className="flex space-x-4">
                        { displayIcon && proposal.status === "Active" && <FaThumbsUp
                            size={20}
                            title="Shortlist"
                            className="cursor-pointer text-green-500"
                            onClick={shortlistProposal}
                        />}
                        {displayIcon && (proposal.status === "Active" || proposal.status === "Shortlisted") && <FaThumbsDown
                            size={20}
                            title="Cancel"
                            className="cursor-pointer text-red-400"
                            onClick={cancelProposal}
                        />}
                        {proposal.status !== "Cancelled" && <button onClick={openModal}>
                            <FaPaperPlane
                                size={20}
                                title="Send Message"
                                className="cursor-pointer text-blue-500"
                            />
                        </button>}

                        {displayIcon && proposal.status !== "Cancelled" && proposal.status !== "Hired" && <FaHandshake
                            size={25}
                            title="Contract"
                            className="cursor-pointer text-orange-600"
                        />}

                    </div>

                </div>
                <div className="flex space-x-4 mb-2">
                    <img src={proposal.organization.logo ?? "https://placehold.co/32x32"} className="w-12 h-12 rounded-full border border-gray-300" />
                    <span className="text-orange-600 font-semibold text-lg mt-2">{proposal.organization.name}</span>
                    {
                        displayStatus && proposal.status === "Active" && <span className="space-x-1 border bg-slate-300 rounded-full py-3 px-2 text-sm text-gray-900 text-center">Active</span>
                    }
                    {
                        displayStatus && proposal.status === "Shortlisted" && <span className="space-x-1 border bg-green-400 rounded-full py-3 px-2 text-sm text-gray-900 text-center">Shortlisted</span>
                    }
                    {
                        displayStatus && proposal.status === "Cancelled" && <span className="space-x-1 border bg-red-400 rounded-full py-3 px-2 text-sm text-gray-900 text-center">Cancelled</span>
                    }
                    {
                        displayStatus && proposal.status === "Hired" && <span className="space-x-1 border bg-orange-400 rounded-full py-3 px-2 text-sm text-gray-900 text-center">Hired</span>
                    }
                </div>

                <div className="flex items-center mb-2 mt-4 ml-3">
                    <FaUser size={15} className="text-gray-400"></FaUser>
                    <p className="text-gray-500 text-md ml-3">Proposed By: {proposal.createdBy}</p>
                </div>
                <div className="flex items-center mb-2 mt-4 ml-3">
                    <FaClock size={15} className="text-gray-400"></FaClock>
                    <p className="text-gray-500 text-md ml-3">Est. Time: {proposal.duration}</p>
                </div>
                {proposal.terms.type === "Project" &&
                    <div className="flex items-center mb-2 mt-4 ml-3">
                        <FaDollarSign size={15} className="text-gray-400"></FaDollarSign>
                        <p className="text-gray-500 text-md ml-3">By Project - ${proposal.terms.projectFees}</p>
                    </div>}


                {
                    proposal.terms.type === "Milestones" &&
                    <>
                        <div className="flex items-center mb-2 mt-4 ml-3">
                            <FaDollarSign size={15} className="text-gray-400"></FaDollarSign>
                            <p className="text-gray-500 text-md ml-3">By Milestone</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="bg-gray-200 text-sm font-semibold text-gray-600">
                                        <th className="py-2 px-4 border-b">Title</th>
                                        <th className="py-2 px-4 border-b">Date</th>
                                        <th className="py-2 px-4 border-b">Fees</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (proposal.terms.milestones ?? []).map((milestone: any) => {
                                            return (
                                                <tr key={milestone.name}>
                                                    <td className="py-2 px-4 border-b text-gray-700">{milestone.name}</td>
                                                    <td className="py-2 px-4 border-b text-gray-700">{milestone.date}</td>
                                                    <td className="py-2 px-4 border-b text-gray-700">${milestone.amount}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }

                <p className="text-gray-700 text-md mb-3 mt-4 ml-3">{proposal.coverLetter}
                    {/* <a href="#" className="text-orange-600">more</a> */}
                </p>

                {/* <!-- Tags --> */}
                {/* <div className="flex flex-wrap gap-2 mb-4">
                    {
                        proposal.services.map(service => {
                            return (
                                <span key={service.id} className="bg-gray-100 text-gray-700 text-xs py-1 px-3 rounded-full">{service.value}</span>
                            )
                        })
                    }
                </div> */}

                <div className="flex items-center mb-2 mt-4 ml-3">
                    <FaIndustry className="text-gray-400"></FaIndustry>
                    <span className="ml-2 text-sm text-gray-700">{proposal.organization.industry ?? "--"}</span>
                </div>

                <div className="flex items-center mb-2 mt-4 ml-3">
                    <FaPerson className="text-gray-400"></FaPerson>
                    <span className="ml-2 text-sm text-gray-700">{proposal.organization.noOfEmployees ?? "--"}</span>
                </div>
            </div>
        </>
    )
};

export default ProposalListingCard;