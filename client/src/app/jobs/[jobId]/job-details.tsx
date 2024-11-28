"use client";

import { ApiSuccessResponse } from "@/interfaces";
import { BorderButton, PrimaryButton } from "@/shared/components/button";
import StarRating from "@/shared/components/start-ratings";
import { APIStore } from "@/utils/api-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBrain, FaBriefcase, FaClock, FaDollarSign, FaFileContract, FaHeart, FaIndustry, FaMapMarkerAlt, FaThumbsUp, FaUser } from "react-icons/fa";
import { FaCircleInfo, FaMoneyCheckDollar } from "react-icons/fa6";

const JobDetails: React.FC<{}> = () => {
    const [job, setJob] = useState<Record<string, any>>({});
    const [client, setClient] = useState<Record<string, any>>({});
    const [user, setUser] = useState<Record<string, any>>({
        wishlist: false,
        proposal: true
    });
    const [loading, setLoading] = useState(true);
    const { jobId } = useParams();


    const fetchJobPostDetails = async (): Promise<void> => {
        setLoading(true);
        const response = await APIStore.getJobPostDetailsForServiceProvider(jobId as string, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setJob((response as ApiSuccessResponse).data.job);
            setClient((response as ApiSuccessResponse).data.client);
            // setUser((response as ApiSuccessResponse).data.user);
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
            <div className="w-full mx-auto bg-gray p-8 mt-3 flex">
                {/* <!-- Left Column --> */}
                <div className="w-full pr-8">
                    {/* <!-- Job Title --> */}
                    <div className="mb-4">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h1>
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
                                    <span className="text-gray-900 font-semibold ml-2">{job.proposals ?? 0}</span>
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

                {/* <!-- Right Column --> */}
                <div className="w-1/3">
                    {/* <!-- Apply and Save buttons --> */}
                    <div className="bg-white shadow-md p-4 rounded-lg border border-gray-300 mb-4">

                        {
                            user.proposal ? (
                                <PrimaryButton
                                    isLoader={false}
                                    className="w-full bg-gray-400 text-white rounded-3xl p-3 text-sm font-medium hover:bg-gray-400 transition duration-200"
                                >
                                    <div className="flex">
                                        <span className="ml-2">Already Applied</span>
                                    </div>
                                </PrimaryButton>
                            ) : (
                                <PrimaryButton
                                    isLoader={false}
                                >
                                    <div className="flex">
                                        <span className="ml-2">Apply Now</span>
                                    </div>
                                </PrimaryButton>
                            )
                        }
                        <BorderButton
                            isLoader={false}
                            className="mt-5"
                            mergeClasses={true}
                            onClick={wishListJob}
                        >

                            {
                                user.wishlist ? (
                                    <div className="flex">
                                        <FaThumbsUp className="mt-0.5"></FaThumbsUp>
                                        <span className="ml-2">Job Saved</span>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <FaHeart className="mt-0.5"></FaHeart>
                                        <span className="ml-2">Save Job</span>
                                    </div>
                                )
                            }




                        </BorderButton>
                        {/* <button className="bg-green-600 text-white font-semibold py-2 rounded mb-2 w-full">Apply now</button> */}
                        {/* <button className="text-green-600 font-semibold py-2 rounded border border-green-600 w-full">Save job</button> */}
                        {/* <button className="text-gray-600 font-medium py-2 rounded mt-2 w-full">Flag as inappropriate</button> */}
                    </div>

                    {/* <!-- Client Information --> */}
                    <div className="bg-gray-100 p-4 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">About the client</h2>
                        {/* <div className="flex items-center mb-2">
                                <i className="fas fa-check-circle text-green-500 mr-2"></i>
                                <span className="text-gray-900">Payment method verified</span>
                            </div> */}
                        <div className="flex items-center mb-2 mt-4">
                            {/* <i className="fas fa-star text-yellow-500 mr-2"></i>
                            <span className="text-gray-900 font-semibold">5.0</span>
                            <span className="text-gray-600 ml-2">of 38 reviews</span> */}
                            <StarRating rating={4} noOfReviews={1}></StarRating>
                        </div>
                        <div className="flex items-center mb-2 mt-4">
                            <FaMapMarkerAlt className="text-gray-400"></FaMapMarkerAlt>
                            <span className="ml-2">{client.location}</span>
                        </div>

                        <div className="flex items-center mb-2 mt-4">
                            <FaBriefcase className="text-gray-400"></FaBriefcase>
                            <span className="ml-2">{client.totalJobs} Jobs Posted</span>
                        </div>

                        <div className="flex items-center mb-2 mt-4">
                            <FaCircleInfo className="text-gray-400"></FaCircleInfo>
                            <span className="ml-2">{client.openJobs} Open Jobs</span>
                        </div>

                        <div className="flex items-center mb-2 mt-4">
                            <FaDollarSign className="text-gray-400"></FaDollarSign>
                            <span className="ml-2">${client.totalSpent ?? "0"} total spent</span>
                        </div>

                        {/* <p className="text-gray-900 mb-1"><span className="font-semibold">$35K total spent</span></p>
                        <p className="text-gray-600 mb-1">77 hires, 8 active</p> */}
                        {/* <p className="text-gray-900 mb-1"><span className="font-semibold">$42.16/hr avg hourly rate paid</span></p>
                        <p className="text-gray-600">49 hours</p> */}

                        <div className="flex items-center mb-2 mt-4">
                            <FaIndustry className="text-gray-400"></FaIndustry>
                            <span className="ml-2">{client.industry ?? "--"}</span>
                        </div>

                        <div className="flex items-center mb-2 mt-4">
                            <FaUser className="text-gray-400"></FaUser>
                            <span className="ml-2">{client.noOfEmployees || client.noOfEmployees === 0 ? `${client.noOfEmployees} Employees` : "--"}</span>
                        </div>

                        <div className="flex items-center mb-2 mt-4">
                            <FaClock className="text-gray-400"></FaClock>
                            <span className="ml-2">Member Since {new Date(client.memberSince).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>

                        {/* <!-- Job Link --> */}
                        <div className="border-t border-gray-300 pt-4 mt-4">
                            <p className="text-gray-600 font-medium mb-2">Job link</p>
                            <div className="flex items-center">
                                <input type="text" className="bg-gray-200 text-gray-900 text-sm px-3 py-2 rounded-l w-full" value={window.location.toString()} />
                                {/* <button className="bg-orange-600 text-white font-semibold px-4 rounded-r">Copy link</button> */}
                                <PrimaryButton
                                    isLoader={false}
                                    className="bg-orange-600 text-white font-semibold px-4 ml-2 rounded w-2/4"
                                >
                                    Copy Link
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default JobDetails;