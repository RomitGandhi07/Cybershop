"use client";
import { BorderButton, PrimaryButton } from "@/shared/components/button";
import Modal from "@/shared/components/modal";
import StarRating from "@/shared/components/start-ratings";
import { useState } from "react";
import { FaCheck, FaClock, FaComment, FaCross, FaDollarSign, FaHandshake, FaHashtag, FaIndustry, FaMapMarkerAlt, FaPaperPlane, FaTag, FaThumbsDown, FaThumbsUp, FaUser } from "react-icons/fa";
import { FaHeart, FaPencil, FaPerson, FaXmark } from "react-icons/fa6";

interface IProposalDetails {
    id: string,
    title: string,
    request?: string,
    clientOrganization: {
        name: string,
        logo?: string | null,
        industry?: string | null,
        website?: string | null,
        tagline?: string | null,
        noOfEmployees?: number | null
    },
    partnerOrganization: {
        name: string,
        logo?: string | null,
        industry?: string | null,
        website?: string | null,
        tagline?: string | null,
        noOfEmployees?: number | null
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
    duration: string,
    createdAt: string
}
interface IJobListingCardProps {
    contract: IProposalDetails
}


const ContractListingCard: React.FC<IJobListingCardProps> = ({ contract }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Feedback">
                <div className="flex flex-col items-center content-center">
                    <div className="flex space-x-3">
                        <p>Rating: </p>
                        <StarRating rating={4}></StarRating>
                    </div>
                    <input type="text" placeholder="Enter Feedback" className="mt-5 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent" />
                    <PrimaryButton isLoader={false} className="mt-5" mergeClasses={true}>
                        Submit
                    </PrimaryButton>
                </div>
            </Modal>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-xs mb-2">Created at {new Date(contract.createdAt).toString()}</p>
                    <div className="flex space-x-4">
                        {/* <FaCheck
                            size={25}
                            className="text-green-500"
                        /> */}
                        {/* <button onClick={openModal}>
                            <FaXmark
                                size={25}
                                className="text-red-500"

                            />
                        </button> */}
                        <button onClick={openModal}>
                            <FaComment
                                size={20}
                                // className="text-orange-500"

                            />
                        </button>
                    </div>

                </div>
                {/* {
                    contract.request &&
                    (contract.request === "start" ?
                        <p className="font-semibold text-md mt-2">Do you want to start this?</p> :
                        <p className="font-semibold text-md mt-2">Do you want to end this?</p>)
                } */}
                <p className="text-orange-600 font-semibold text-xl mt-2">{contract.title}</p>
                {/* <div className="flex space-x-4 mb-2"> */}
                {/* <img src={proposal.organization.logo ?? "https://placehold.co/32x32"} className="w-12 h-12 rounded-full border border-gray-300" /> */}
                {/* <FaHandshake
                        size={25}
                        className="text-orange-600"
                    // onClick={handleWishlistToggle}
                    // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                    //     }`
                    // }
                    /> */}
                {/* </div> */}
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
                <div className="flex space-x-3 mt-4">
                    <img src={contract.clientOrganization.logo ?? "https://placehold.co/32x32"} className="w-8 h-8 rounded-full border border-gray-300" />
                    <span className="mt-1 font-bold text-gray-500">{contract.clientOrganization.name}</span>
                    <FaHandshake
                        size={35}
                    // className="ml-5"
                    // onClick={handleWishlistToggle}
                    // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                    //     }`
                    // }
                    />
                    <img src={contract.partnerOrganization.logo ?? "https://placehold.co/32x32"} className="w-8 h-8 rounded-full border border-gray-300" />
                    <span className="mt-1 font-bold text-gray-500">{contract.partnerOrganization.name}</span>
                </div>
                <div className="flex items-center mb-2 mt-4">
                    <FaClock size={20} className="text-gray-400"></FaClock>
                    <p className="text-gray-500 text-lg ml-3">Est. Time: {contract.duration}</p>
                </div>
                {contract.terms.type === "Project" &&
                    <div className="flex items-center mb-2 mt-4">
                        <FaDollarSign size={20} className="text-gray-400"></FaDollarSign>
                        <p className="text-gray-500 text-lg ml-3">By Project - ${contract.terms.fixedFee}</p>
                    </div>}


                {
                    contract.terms.type === "Milestone" &&
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
                                        (contract.terms.milestones ?? []).map((milestone: any) => {
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

                {/* <div className="flex items-center mb-2 mt-4">
                    <FaIndustry className="text-gray-400"></FaIndustry>
                    <span className="ml-2 text-sm text-gray-700">Cyber Security</span>
                </div>

                <div className="flex items-center mb-2 mt-4">
                    <FaPerson className="text-gray-400"></FaPerson>
                    <span className="ml-2 text-sm text-gray-700">{proposal.organization.noOfEmployees ?? 0}</span>
                </div> */}

                {/* <div className="flex items-center mb-2 mt-4">
                    <FaHashtag className="text-gray-400"></FaHashtag>
                    <span className="ml-2 text-sm text-gray-700">{proposal.organization.tagline}</span>
                </div> */}
            </div >
        </>
    )
};

export default ContractListingCard;