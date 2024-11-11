"use client";

import { title } from "process";
import JobListingCard from "./job-listing-card";

const JobsListing = () => {
    return (
        <div className="font-['Inter'] bg-gray-100 p-8">
            <div className="mx-10">
                {/* <!-- Search bar --> */}
                <div className="relative mb-6">
                    <input type="text" placeholder="Search for jobs" className="w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none" />
                    <i className="fas fa-search absolute top-3 left-4 text-gray-400"></i>
                </div>

                {/* <!-- Job header --> */}
                <h1 className="text-xl font-semibold mb-1">Jobs you might like</h1>

                {/* <!-- Tabs --> */}
                <div className="flex space-x-6 text-gray-500 mb-2 mt-5">
                    <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold">Best Matches</a>
                    <a href="#" className="hover:text-orange-600">Most Recent</a>
                    <a href="#" className="hover:text-orange-600">Saved Jobs (40)</a>
                </div>
                <p className="text-gray-500 text-sm my-4">Browse jobs that match your experience to a client&apos;s hiring preferences. Ordered by most relevant.</p>

                {/* <!-- Job Card 1 --> */}
                <JobListingCard job={{
                    id: "1",
                    title: "Need Threat Intelligence App",
                    description: "Need Threat Intelligence App Need Threat Intelligence App",
                    services: [
                        {
                            id: "1",
                            value: "Incident"
                        },
                        {
                            id: "2",
                            value: "Resilience"
                        }
                    ],
                    country: {
                        id: "1",
                        value: "India"
                    },
                    budget: {
                        type: "Fixed Fee",
                        fixedFee: 30
                    },
                    expertise: "Intermediate",
                    duration: "1 to 3 months",
                    proposals: 8,
                    publishedAt: "2024-10-30T19:59:40.693+00:00"
                }}
                />

                {/* <!-- Job Card 2 --> */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
                    <p className="text-gray-500 text-xs mb-2">Posted 11 minutes ago</p>
                    <h2 className="text-gray-900 font-semibold text-lg mb-2">Full-Stack React Developer</h2>
                    <p className="text-gray-500 text-sm mb-4">Hourly: $25-$40 - Intermediate - Est. Time: 1 to 3 months, 30+ hrs/week</p>
                    <p className="text-gray-700 text-sm">We are seeking an experienced Full-Stack Developer with strong skills in React and Node.js to join our dynamic team on a new web application project. In this role, you’ll be responsible for building efficient, scalable features from front to back, ensuring a seamless user experience. This position requires close collaboration with our design and product teams to deliver features that... <a href="#" className="text-orange-600">more</a></p>

                    {/* <!-- Actions --> */}
                    <div className="absolute top-4 right-4 flex space-x-3 text-gray-400">
                        <i className="fas fa-thumbs-down hover:text-gray-600 cursor-pointer"></i>
                        <i className="fas fa-heart hover:text-gray-600 cursor-pointer"></i>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobsListing