"use client";

import { PrimaryButton } from "@/shared/components/button";
import JobListingCard from "./job-listing-card";

const JobsListing = () => {
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
                    <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold">Active</a>
                    {/* <a href="#" className="hover:text-orange-600">Most Recent</a> */}
                    <a href="#" className="hover:text-orange-600">Draft</a>
                    <a href="#" className="hover:text-orange-600">Completed</a>
                </div>
                {/* <p className="text-gray-500 text-sm my-4">Browse jobs that match your experience to a client&apos;s hiring preferences. Ordered by most relevant.</p> */}
                <div className="my-7"></div>
                {/* <!-- Job Card 1 --> */}
                <JobListingCard job={{
                    id: "1",
                    title: "Cyber security expert",
                    description: `We’re seeking a skilled cybersecurity expert to help with a project focused on enhancing our company’s security policies and implementing secure access protocols. This gig involves creating essential documentation for business continuity, incident management, and data protection, as well as setting up secure access solutions like MFA and VPN.`,
                    services: [
                        {
                            id: "1",
                            value: "Security Policy Development"
                        }
                    ],
                    country: {
                        id: "1",
                        value: "India"
                    },
                    budget: {
                        type: "Fixed Fee",
                        fixedFee: 2000
                    },
                    expertise: "Intermediate",
                    duration: "1 to 3 months",
                    proposals: 8,
                    publishedAt: "2024-10-22T19:59:40.693+00:00",
                    wishlisted: false
                }}
                />

                {/* <!-- Job Card 2 --> */}
                <JobListingCard job={{
                    id: "2",
                    title: "Cybersecurity Expert Needed to Resolve Google Ads Domain Flagging Issue",
                    description: `Our company is seeking a cybersecurity expert to help resolve an issue preventing us from running ads on Google. Our domain has been flagged by Google for allegedly containing malicious content, though we’ve conducted thorough checks and found no signs of compromising code or malicious content on our site. We need an expert to analyze our website’s code and identify the cause of this issue to help us get our domain cleared.`,
                    services: [
                        {
                            id: "1",
                            value: "Application Security"
                        }
                    ],
                    country: {
                        id: "1",
                        value: "England"
                    },
                    budget: {
                        type: "Hourly Rate",
                        hourlyRate: {
                            from: 30,
                            to: 50
                        }
                    },
                    expertise: "Expert",
                    duration: "7 to 15 days",
                    proposals: 7,
                    publishedAt: "2024-10-22T14:59:40.693+00:00",
                    wishlisted: true
                }}
                />
            </div>
        </div>
    );
};

export default JobsListing