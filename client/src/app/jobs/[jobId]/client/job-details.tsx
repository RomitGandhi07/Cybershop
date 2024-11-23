"use client";

import { ApiSuccessResponse } from "@/interfaces";
import { PrimaryButton } from "@/shared/components/button";
import { APIStore } from "@/utils/api-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBrain, FaClock, FaFileContract } from "react-icons/fa";
import { FaMoneyCheckDollar } from "react-icons/fa6";

const JobDetails: React.FC<{}> = () => {
    const [job, setJob] = useState<Record<string, any>>({});
    const [client, setClient] = useState<Record<string, any>>({});
    const [user, setUser] = useState<Record<string, any>>({
        wishlist: false,
        proposal: false
    });
    const [loading, setLoading] = useState(true);
    const { jobId } = useParams();


    const fetchJobPostDetails = async (): Promise<void> => {
        setLoading(true);
        const response = await APIStore.getJobPostDetails(jobId as string, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setJob((response as ApiSuccessResponse).data.job);
            setClient((response as ApiSuccessResponse).data.client);
            setUser((response as ApiSuccessResponse).data.user);
        }
        setLoading(false);
    };

    const wishListJob = async (): Promise<void> => {
        const response = await APIStore.wishlistJobPost(jobId as string, {
            action: user.wishlist ? "remove" : "add"
        }, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setUser({
                ...user,
                wishlist: !user.wishlist
            })
        }
    }

    useEffect(() => {
        if (jobId) {
            fetchJobPostDetails();
        }
    }, [jobId]);

    return (
        loading ? <p>Loading...</p> :
            <div className="w-full mx-auto bg-white p-8 rounded shadow-md flex">
                {/* <!-- Left Column --> */}
                <div className="w-full pr-8">
                    {/* <!-- Job Title --> */}
                    <div className="mb-4">
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
                            <PrimaryButton
                                isLoader={false}
                                className="w-1/5"
                            >
                                View All Proposals
                            </PrimaryButton>
                        </div>
                        <p className="text-gray-600 mb-1">Posted at {new Date(job.publishedAt).toString()}</p>
                    </div>

                    {/* <p className="text-gray-600 mb-4 flex items-center">
                        <i className="fas fa-globe text-gray-500 mr-2"></i>Worldwide
                    </p> */}

                    {/* <!-- Specialized Profile Notice --> */}
                    {/* <p className="text-sm text-gray-700 mb-4">
                            <i className="fas fa-lightbulb text-gray-500 mr-2"></i> Specialized profiles can help you better highlight your expertise when submitting proposals to jobs like these.
                            <a href="#" className="text-green-600 font-medium">Create a specialized profile.</a>
                        </p> */}

                    {/* <!-- Job Description --> */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        {/* <div dangerouslySetInnerHTML={{__html: job.description}}></div> */}
                        {job.description}
                    </div>

                    {/* <!-- Pricing and Project Details --> */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        <div className="mb-2 mt-4">
                            <div className="flex items-center">
                                <FaMoneyCheckDollar className="text-orange-600" size={25} />
                                <div className="flex flex-col ml-1">
                                    <span className="text-gray-900 font-semibold ml-2">{job.budget.fixedFee ? `$${job.budget.fixedFee}` : `${job.budget.hourlyRate.to} - ${job.budget.hourlyRate.from}`}</span>
                                    <span className="text-gray-600 text-sm ml-2">{job.budget.type}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-2 mt-10">
                            <div className="flex items-center">
                                <FaBrain className="text-orange-600" size={25} />
                                <div className="flex flex-col ml-1">
                                    <span className="text-gray-900 font-semibold ml-2">{job.expertise}</span>
                                    <span className="text-gray-600 text-sm ml-2">Expertise</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-2 mt-10">
                            <div className="flex items-center">
                                <FaClock className="text-orange-600" size={25} />
                                <div className="flex flex-col ml-1">
                                    <span className="text-gray-900 font-semibold ml-2">{job.duration}</span>
                                    <span className="text-gray-600 text-sm ml-2">Duration</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4 mt-10">
                            <div className="flex items-center">
                                <FaFileContract className="text-orange-600" size={25} />
                                <div className="flex flex-col ml-1">
                                    <span className="text-gray-900 font-semibold ml-2">{job.proposals || 8}</span>
                                    <span className="text-gray-600 text-sm ml-2">Proposals</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Skills and Expertise --> */}
                    <div className="border-t border-gray-300 pt-4 mb-4">
                        {/* <h2 className="text-lg font-semibold text-gray-900 mb-2">Services</h2>
                            <span className="inline-block bg-gray-100 text-gray-900 text-sm font-medium px-3 py-1 rounded">JavaScript</span> */}
                        <p className="text-lg font-semibold text-gray-900 mb-2">Services</p>
                        <div className="flex flex-wrap gap-2">
                            {
                                job.services.map((service: any) => {
                                    return (
                                        <span key={service.id} className="flex items-center space-x-1 border border-orange-600 rounded-full py-1 px-3 text-sm text-gray-900">
                                            <span>{service.value}</span>
                                            <i className="fa fa-times text-gray-400 cursor-pointer"></i>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {/* <!-- Activity on this job --> */}
                    {/* <div className="border-t border-gray-300 pt-4 mb-4">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">Activity on this job</h2>
                        <p className="text-gray-900 mb-1">Proposals: <span className="font-semibold text-orange-600">{job.proposals ?? 0}</span></p>
                        <p className="text-gray-900 mb-1">Interviewing: 1</p>
                        <p className="text-gray-900 mb-1">Invites sent: 1</p>
                        <p className="text-gray-900 mb-1">Unanswered invites: 0</p>
                    </div> */}
                </div>
            </div>
    )
}

export default JobDetails;