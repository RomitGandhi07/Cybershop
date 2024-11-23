"use client";
import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import Modal from "@/shared/components/modal";
import { useRef, useState } from "react";
import { FaClock, FaCross, FaDollarSign, FaHandshake, FaHashtag, FaIndustry, FaMapMarkerAlt, FaPaperPlane, FaTag, FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import { FaHeart, FaPencil, FaPerson, FaXmark } from "react-icons/fa6";

interface IProposalDetails {
    id: string,
    organization: {
        name: string,
        logo?: string | null,
        industry?: string | null,
        website?: string | null,
        tagline?: string | null,
        noOfEmployees?: number | null
    }
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
        fixedFee?: number | null
        milestones?: {
            name: string,
            date: string,
            fee: number
        }[] | null
    },
    expertise: string,
    duration: string,
    proposals: number,
    publishedAt: string,
    wishlisted: boolean,
    proposedBy: string
}
interface IJobListingCardProps {
    job: IProposalDetails
}


const ProposalListingCard: React.FC<IJobListingCardProps> = ({ job: proposal }) => {
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

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} title={`Send Message to ${proposal.proposedBy} (${proposal.organization.name})`}>
                <div className="">
                    <Form ref={formRef} defaultValues={{}}>
                        <div className="flex space-x-2">
                            <div className="w-full">
                                <FormItems
                                    fields={fields}
                                />
                            </div>
                            {/* <div> */}
                            <FaPaperPlane
                                size={20}
                                className="mt-7 text-orange-600"
                            // onClick={handleWishlistToggle}
                            // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                            //     }`
                            // }
                            />
                            {/* </div> */}
                        </div>

                    </Form>
                </div>
            </Modal>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-xs mb-2">Proposed at {new Date(proposal.publishedAt).toString()}</p>
                    <div className="flex space-x-4">
                        <FaThumbsUp
                            size={20}
                            className="text-green-500"
                        // onClick={handleWishlistToggle}
                        // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                        //     }`
                        // }
                        />
                        <FaThumbsDown
                            size={20}
                            className="text-red-400"
                        // onClick={handleWishlistToggle}
                        // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                        //     }`
                        // }
                        />
                        <button onClick={openModal}>
                            <FaPaperPlane
                                size={20}
                                className="text-blue-500"
                            // onClick={handleWishlistToggle}
                            // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                            //     }`
                            // }
                            />
                        </button>

                        <FaHandshake
                            size={25}
                            className="text-orange-600"
                        // onClick={handleWishlistToggle}
                        // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                        //     }`
                        // }
                        />

                    </div>

                </div>
                <div className="flex space-x-4 mb-2">
                    <img src={proposal.organization.logo ?? "https://placehold.co/32x32"} className="w-12 h-12 rounded-full border border-gray-300" />
                    <span className="text-orange-600 font-semibold text-lg mt-2">{proposal.organization.name}</span>
                    {/* <FaHandshake
                        size={25}
                        className="text-orange-600"
                    // onClick={handleWishlistToggle}
                    // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                    //     }`
                    // }
                    /> */}
                </div>
                {/* <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-sm mb-4">{job.budget.type} - {job.expertise} - Est. Time: {job.duration} - Est. Budget: {job.budget.fixedFee ? `$${job.budget.fixedFee}` : `$${job.budget.hourlyRate?.from} - $${job.budget.hourlyRate?.to}`}</p>
                    <FaHandshake
                        size={25}
                        className="text-orange-600"
                    // onClick={handleWishlistToggle}
                    // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                    //     }`
                    // }
                    />
                </div> */}
                <div className="flex items-center mb-2 mt-4">
                    <FaUser size={20} className="text-gray-400"></FaUser>
                    <p className="text-gray-500 text-lg ml-3">Proposed By: {proposal.proposedBy}</p>
                </div>
                <div className="flex items-center mb-2 mt-4">
                    <FaClock size={20} className="text-gray-400"></FaClock>
                    <p className="text-gray-500 text-lg ml-3">Est. Time: {proposal.duration}</p>
                </div>
                {proposal.terms.type === "Project" &&
                    <div className="flex items-center mb-2 mt-4">
                        <FaDollarSign size={20} className="text-gray-400"></FaDollarSign>
                        <p className="text-gray-500 text-lg ml-3">By Project - ${proposal.terms.fixedFee}</p>
                    </div>}


                {
                    proposal.terms.type === "Milestone" &&
                    <>
                        <div className="flex items-center mb-2 mt-4">
                            <FaDollarSign size={20} className="text-gray-400"></FaDollarSign>
                            <p className="text-gray-500 text-lg ml-3">By Milestone</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-md">
                            <table className="w-full text-left border-collapse">
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
                                                    <td className="py-2 px-4 border-b text-gray-700">${milestone.fee}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </>
                }

                <p className="text-gray-700 text-md mb-3 mt-4">{proposal.coverLetter}
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

                <div className="flex items-center mb-2 mt-4">
                    <FaIndustry className="text-gray-400"></FaIndustry>
                    <span className="ml-2 text-sm text-gray-700">Cyber Security</span>
                </div>

                <div className="flex items-center mb-2 mt-4">
                    <FaPerson className="text-gray-400"></FaPerson>
                    <span className="ml-2 text-sm text-gray-700">{proposal.organization.noOfEmployees ?? 0}</span>
                </div>

                {/* <div className="flex items-center mb-2 mt-4">
                    <FaHashtag className="text-gray-400"></FaHashtag>
                    <span className="ml-2 text-sm text-gray-700">{proposal.organization.tagline}</span>
                </div> */}
            </div>
        </>
    )
};

export default ProposalListingCard;