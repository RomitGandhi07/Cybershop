"use client";

import { PrimaryButton } from "@/shared/components/button";
import ContractListingCard from "./contract-listing-card";

const Contracts = () => {
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
                {/* <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold">Active</a> */}
                <a href="#" className="hover:text-orange-600">Active</a>
                {/* <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold">Pending Requests</a> */}
                <a href="#" className="hover:text-orange-600">Pending</a>
                {/* <a href="#" className="hover:text-orange-600">Completed</a> */}
                <a href="#" className="text-orange-600 border-b-2 border-orange-600 pb-1 font-semibold">Completed</a>
                <a href="#" className="hover:text-orange-600">Cancelled</a>
            </div>
            {/* <p className="text-gray-500 text-sm my-4">Browse jobs that match your experience to a client&apos;s hiring preferences. Ordered by most relevant.</p> */}
            <div className="my-7"></div>
            {/* <!-- Job Card 1 --> */}
            <ContractListingCard contract={{
                id: "1",
                title: "Cyber Expert Needed",
                request: "start",
                clientOrganization: {
                    name: "Rapidops Inc.",
                    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHnIYV_Yd7XFw/company-logo_200_200/company-logo_200_200/0/1719839287141/rapidops_inc_logo?e=1740009600&v=beta&t=IAi6hn536sb0QLhXqZs1WhkENp7yA5yI2X4rUAPEeNA",
                    tagline: "We Stop Breaches!",
                    noOfEmployees: 500

                },
                partnerOrganization: {
                    name: "Crowd Strike",
                    logo: "https://media.licdn.com/dms/image/v2/C560BAQFxQkzeHZxIYg/company-logo_200_200/company-logo_200_200/0/1633985771177/crowdstrike_logo?e=1740009600&v=beta&t=8duqSF0EAlEK6SB-UBNKPykiMqpXfZwXG8u7LhJWtGs",
                    tagline: "We Stop Breaches!",
                    noOfEmployees: 500

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
                duration: "1 to 3 months",
                createdAt: "2024-10-22T19:59:40.693+00:00"
            }}
            />

            {/* <!-- Job Card 2 --> */}
            {/* <ContractListingCard contract={{
                id: "2",
                request: "complete",
                title: "Cybersecurity Expert Needed to Resolve Google Ads Domain Flagging Issue",
                clientOrganization: {
                    name: "Rapidops Inc.",
                    logo: "https://media.licdn.com/dms/image/v2/D4D0BAQHnIYV_Yd7XFw/company-logo_200_200/company-logo_200_200/0/1719839287141/rapidops_inc_logo?e=1740009600&v=beta&t=IAi6hn536sb0QLhXqZs1WhkENp7yA5yI2X4rUAPEeNA",
                    tagline: "We Stop Breaches!",
                    noOfEmployees: 500

                },
                partnerOrganization: {
                    name: "Sentine One",
                    logo: "https://media.licdn.com/dms/image/v2/D560BAQEHRgaiKjS7MA/company-logo_200_200/company-logo_200_200/0/1712717323000/sentinelone_logo?e=1740009600&v=beta&t=kpPbrRdDS1cqeokhKm-HUqw2EgWo4xL4v1B50dsPwE8",
                    tagline: "We Stop Breaches!",
                    noOfEmployees: 500

                },
                terms: {
                    type: "Project",
                    fixedFee: 2000
                },
                duration: "7 to 15 days",
                createdAt: "2024-10-22T14:59:40.693+00:00"
            }}
            /> */}
            {/* </div> */}
        </div>
    );
};

export default Contracts