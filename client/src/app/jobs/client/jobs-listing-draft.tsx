"use client";

import { FaPencil } from "react-icons/fa6";
import JobListingCard from "./job-listing-card";
import { FaTrash } from "react-icons/fa";
import { PrimaryButton } from "@/shared/components/button";

const JobsListingDraft = () => {
    return (
        <div className="bg-gray-100 p-8">
            <div className="mx-10">
                {/* <!-- Search bar --> */}
                <div className="relative mb-6 flex justify-between items-center">
                    <input type="text" placeholder="Search for jobs" className="w-1/3 p-3 pl-10 rounded-full border border-gray-300 focus:outline-none" />
                    <PrimaryButton
                        className="w-[10%]"
                        isLoader={false}
                    >
                        Create New Job
                    </PrimaryButton>
                </div>

                {/* <!-- Job header --> */}
                {/* <h1 className="text-xl font-semibold mb-1">Jobs you might like</h1> */}

                {/* <!-- Tabs --> */}
                <div className="flex space-x-6 text-gray-500 mb-2 mt-10">
                    <a href="#" className="hover:text-orange-600">Active</a>
                    <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold">Draft</a>
                    {/* <a href="#" className="hover:text-orange-600">Most Recent</a> */}
                    <a href="#" className="hover:text-orange-600">Completed</a>
                </div>
                {/* <p className="text-gray-500 text-sm my-4">Browse jobs that match your experience to a client&apos;s hiring preferences. Ordered by most relevant.</p> */}
                <div className="my-7"></div>
                {/* <!-- Job Card 1 --> */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 text-xs mb-2">Created at {new Date("2024-11-02T18:30:05.268+00:00").toString()}</p>
                        <FaPencil
                            size={15}
                        />
                    </div>

                    <div className="flex justify-between items-center mb-2">
                        <span className="text-orange-600 font-semibold text-lg mb-2">Cyber Security Expert Needed For AD Hardening</span>
                        <FaTrash
                            size={15}
                            className="text-red-600"
                        />
                    </div>
                </div>

                {/* <!-- Job Card 2 --> */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 text-xs mb-2">Created at {new Date("2024-11-02T01:10:05.268+00:00").toString()}</p>
                        <FaPencil
                            size={15}
                        />
                    </div>

                    <div className="flex justify-between items-center mb-2">
                        <span className="text-orange-600 font-semibold text-lg mb-2">Need MFA Setup</span>
                        <FaTrash
                            size={15}
                            className="text-red-600"
                        />
                    </div>
                </div>

                {/* <!-- Job Card 3 --> */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-gray-500 text-xs mb-2">Created at {new Date("2024-11-01T12:30:05.268+00:00").toString()}</p>
                        <FaPencil
                            size={15}
                        />
                    </div>

                    <div className="flex justify-between items-center mb-2">
                        <span className="text-orange-600 font-semibold text-lg mb-2">Cyber Expert Needed For Setting Up Firewall</span>
                        <FaTrash
                            size={15}
                            className="text-red-600"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default JobsListingDraft