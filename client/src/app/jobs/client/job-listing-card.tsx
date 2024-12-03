"use client";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPencil, FaXmark } from "react-icons/fa6";

interface IJobDetails {
    id: string,
    title: string,
    description: string,
    services: {
        id: string,
        value: string
    }[],
    // country: string,
    budget: {
        type: string,
        fixedFee?: number | null
        hourlyRate?: {
            from: number,
            to: number
        } | null
    },
    expertise: string,
    duration: string,
    proposals: number,
    publishedAt: string,
    wishlisted: boolean,
}
interface IJobListingCardProps {
    job: IJobDetails,
    displayEditButton?: boolean
    displayDeleteButton?: boolean
}


const JobListingCard: React.FC<IJobListingCardProps> = ({ job, displayEditButton = true, displayDeleteButton = true }) => {
    const router = useRouter();
    async function cancelJobPost() {
        // TODO: need logic of cancel job post
    }

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <div className="flex justify-between items-center mb-2">
                    <p className="text-gray-500 text-xs mb-2">Posted at {new Date(job.publishedAt).toString()}</p>
                    {
                        displayEditButton && <FaPencil
                            size={15}
                            title="Edit"
                            className="cursor-pointer"
                            onClick={() => {
                                router.push(`/jobs/${job.id}/edit`);
                            }}
                        // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                        //     }`
                        // }
                        />
                    }

                </div>
                <div className="flex justify-between items-center mb-2">
                    <a href={`/jobs/${job.id}/client`} target="_blank" className="text-orange-600 font-semibold text-lg mb-2">{job.title}</a>
                    {
                        displayDeleteButton && <FaXmark
                            size={20}
                            title="Cancel"
                            className="text-red-600 cursor-pointer"
                            onClick={cancelJobPost}
                        // onClick={handleWishlistToggle}
                        // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                        //     }`
                        // }
                        />
                    }

                </div>
                <p className="text-gray-500 text-sm mb-4">{job.budget.type} - {job.expertise} - Est. Time: {job.duration} - Est. Budget: {job.budget.fixedFee ? `$${job.budget.fixedFee}` : `$${job.budget.hourlyRate?.from} - $${job.budget.hourlyRate?.to}`}</p>
                <p className="text-gray-700 text-sm mb-3">{job.description}
                    {/* <a href="#" className="text-orange-600">more</a> */}
                </p>

                {/* <!-- Tags --> */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {
                        job.services.map(service => {
                            return (
                                <span key={service.id} className="bg-gray-100 text-gray-700 text-xs py-1 px-3 rounded-full">{service.value}</span>
                            )
                        })
                    }
                </div>

                {
                    job.hasOwnProperty("proposals") &&
                        job.proposals ? <p className="text-orange-600 text-sm mt-4 cursor-pointer" onClick={() => {
                            router.push(`/jobs/${job.id}/proposals`)
                        }}>Proposals: {job.proposals}</p> : <p className="text-orange-600 text-sm mt-4">Proposals: {job.proposals}</p>
                    // <a href="#" className="text-orange-600 text-sm mt-4">Proposals: {job.proposals}</a>

                }
            </div>
        </>
    )
};

export default JobListingCard;