"use client";
import { FaMapMarkerAlt } from "react-icons/fa";

interface IJobDetails {
    id: string,
    title: string,
    description: string,
    services: {
        id: string,
        value: string
    }[],
    country: {
        id: string,
        value: string
    },
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
    publishedAt: string
}
interface IJobListingCardProps {
    job: IJobDetails
}


const JobListingCard: React.FC<IJobListingCardProps> = ({ job }) => {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                <p className="text-gray-500 text-xs mb-2">Posted at {new Date(job.publishedAt).toString()}</p>
                <div className="flex content-between">
                    <span className="text-orange-600 font-semibold text-lg mb-2">{job.title}</span>
                    {/* <span>
                        <FaHeart className="hover:text-gray-600 cursor-pointer"></FaHeart>
                    </span> */}

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
                    {/* <div className="flex items-center space-x-1">
                        <i className="fas fa-shield-alt text-gray-400"></i>
                        <span>Payment verified</span>
                    </div> */}
                    {/* <div className="flex items-center space-x-1 text-yellow-500">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </div>
                    <span className="text-gray-700">$900+ spent</span> */}
                    <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt className="text-gray-400"></FaMapMarkerAlt>
                        <span>{job.country.value}</span>
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-4">Proposals: {job.proposals}</p>
                {/* <!-- Actions --> */}
                {/* <div className="absolute top-4 right-4 flex space-x-3 text-gray-400"> */}
                {/* <i className="fas fa-thumbs-down hover:text-gray-600 cursor-pointer">L</i>
                    <i className="fas fa-heart "></i> */}
                {/* <FaHeart className="hover:text-gray-600 cursor-pointer"></FaHeart> */}
                {/* </div> */}
            </div>
        </>
    )
};

export default JobListingCard;