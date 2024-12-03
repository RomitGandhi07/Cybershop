"use client";
import { APIStore } from "@/utils/api-store";
import { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

interface IJobDetails {
    id: string,
    title: string,
    description: string,
    services: {
        id: string,
        value: string
    }[],
    country: string,
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
    setRefreshPage?: (val: boolean) => void
}


const JobListingCard: React.FC<IJobListingCardProps> = ({ job, setRefreshPage }) => {
    const [wishlisted, setWishlisted] = useState(job.wishlisted);
    async function handleWishlistToggle() {
        const response = await APIStore.wishlistJobPost(job.id, {
            action: wishlisted ? "remove" : "add"
        }, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setWishlisted(!wishlisted);

            if (setRefreshPage) {
                setRefreshPage(true);
            }
        }
    }

    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <p className="text-gray-500 text-xs mb-2">Posted at {new Date(job.publishedAt).toString()}</p>
                <div className="flex justify-between items-center mb-2">
                <a href={`/jobs/${job.id}/provider`} target="_blank" className="text-orange-600 font-semibold text-lg mb-2">{job.title}</a>
                    <FaHeart
                        size={25}
                        title="Wishlist"
                        onClick={handleWishlistToggle}
                        className={`cursor-pointer transition-colors ${wishlisted ? "text-red-500" : "text-gray-400"
                            }`}
                    />
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

                {/* <!-- Job Details --> */}
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt className="text-gray-400"></FaMapMarkerAlt>
                        <span>{job.country}</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-4">Proposals: {job.proposals}</p>
            </div>
        </>
    )
};

export default JobListingCard;