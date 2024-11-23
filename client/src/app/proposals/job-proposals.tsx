"use client";

import { PrimaryButton } from "@/shared/components/button";
import ProposalListingCard from "./proposal-listing-card";

const JobProposals = () => {
    return (
        <div className="bg-gray-100 px-8">
            {/* <div className="mx-10"> */}
            {/* <!-- Search bar --> */}
            {/* <div className="relative mb-6 flex justify-between items-center">
                    <input type="text" placeholder="Search for jobs" className="w-1/3 p-3 pl-10 rounded-full border border-gray-300 focus:outline-none" />
                    <PrimaryButton
                        className="w-[10%]"
                        isLoader={false}
                    >
                        Create New Job
                    </PrimaryButton>
                </div> */}

            {/* <!-- Job header --> */}
            {/* <h1 className="text-xl font-semibold mb-1">Jobs you might like</h1> */}

            {/* <!-- Tabs --> */}
            <div className="flex space-x-6 text-gray-500 mb-2 mt-10">
                <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold">All Proposals</a>
                {/* <a href="#" className="hover:text-orange-600">Most Recent</a> */}
                <a href="#" className="hover:text-orange-600">Shortlisted</a>
                <a href="#" className="hover:text-orange-600">Cancelled</a>
                <a href="#" className="hover:text-orange-600">Hired</a>
            </div>
            {/* <p className="text-gray-500 text-sm my-4">Browse jobs that match your experience to a client&apos;s hiring preferences. Ordered by most relevant.</p> */}
            <div className="my-7"></div>
            {/* <!-- Job Card 1 --> */}
            <ProposalListingCard job={{
                id: "1",
                organization: {
                    name: "Crowd Strike",
                    logo: "https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_200_200/company-logo_200_200/0/1633985771177/crowdstrike_logo?e=1740009600&v=beta&t=8duqSF0EAlEK6SB-UBNKPykiMqpXfZwXG8u7LhJWtGs",
                    tagline: "We Stop Breaches!",
                    noOfEmployees: 500

                },
                coverLetter: `We’re seeking a skilled cybersecurity expert to help with a project focused on enhancing our company’s security policies and implementing secure access protocols. This gig involves creating essential documentation for business continuity, incident management, and data protection, as well as setting up secure access solutions like MFA and VPN.`,
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
                terms: {
                    type: "Milestone",
                    milestones: [
                        {
                            "name": "Milestone 1",
                            "date": "2024/11/10",
                            "fee": 500
                        },
                        {
                            "name": "Milestone 2",
                            "date": "2024/11/25",
                            "fee": 700
                        },
                        {
                            "name": "Milestone 3",
                            "date": "2024/12/05",
                            "fee": 600
                        }
                    ]
                },
                expertise: "Intermediate",
                duration: "1 to 3 months",
                proposals: 8,
                publishedAt: "2024-10-22T19:59:40.693+00:00",
                wishlisted: false,
                proposedBy: "Romit Gandhi",
            }}
            />

            {/* <!-- Job Card 2 --> */}
            <ProposalListingCard job={{
                id: "2",
                organization: {
                    name: "Sentine One",
                    logo: "https://media.licdn.com/dms/image/v2/D560BAQEHRgaiKjS7MA/company-logo_200_200/company-logo_200_200/0/1712717323000/sentinelone_logo?e=1740009600&v=beta&t=kpPbrRdDS1cqeokhKm-HUqw2EgWo4xL4v1B50dsPwE8",
                    tagline: "We Stop Attacks!",
                    noOfEmployees: 100
                },
                coverLetter: `Our company is seeking a cybersecurity expert to help resolve an issue preventing us from running ads on Google. Our domain has been flagged by Google for allegedly containing malicious content, though we’ve conducted thorough checks and found no signs of compromising code or malicious content on our site. We need an expert to analyze our website’s code and identify the cause of this issue to help us get our domain cleared.`,
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
                terms: {
                    type: "Project",
                    fixedFee: 2000
                },
                expertise: "Expert",
                duration: "7 to 15 days",
                proposals: 7,
                publishedAt: "2024-10-22T14:59:40.693+00:00",
                wishlisted: true,
                proposedBy: "Vaibhav Talati",
            }}
            />
            {/* </div> */}
        </div>
    );
};

export default JobProposals