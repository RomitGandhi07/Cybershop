import Description from "@/shared/components/description";
import { useState } from "react"
import { FaPencil } from "react-icons/fa6";

export default function OrganizationDetails() {
    const [data, setData] = useState<Record<string, any>>({
        website: `www.crowdstrike.com`,
        industry: "Cyber Security",
        noOfEmployees: 500,
        tagline: "We Stop Breaches!",
        description: "CrowdStrike is an American cybersecurity technology company based in Austin, Texas. It provides endpoint security, threat intelligence, and cyberattack response services. Until July 2024 it was best known for deploying immediate updates upon detecting threats, distributing as many as 10-12 per day. Since then it has been offering phased or staggered update rollout.",
    });

    const fieldToTitleMapping: Record<string, string> = {
        website: "Website",
        industry: "Industry",
        noOfEmployees: "Number Of Employees",
        tagline: "Tagline",
        description: "Description"
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-xl font-medium mb-4  text-orange-600">Basic Information</h2>
                        <FaPencil
                            size={20}
                        // className="text-red-600"
                        // onClick={handleWishlistToggle}
                        // className={`cursor-pointer transition-colors ${job.wishlisted ? "text-red-500" : "text-gray-400"
                        //     }`
                        // }
                        />
                    </div>
                    {/* <div className="absolute top-4 right-4">
                        <button className="text-green-600 bg-gray-100 rounded-full p-2">
                            <i className="fas fa-pen"></i>
                        </button>
                    </div> */}
                    {
                        Object.keys(fieldToTitleMapping ?? {}).map(record => {
                            return <Description key={record} title={fieldToTitleMapping[record]} description={data[record]}></Description>
                        })
                    }
                    {/* <p className="text-gray-600">User ID</p>
                    <p className="mb-4">romitgandhi</p>
                    <p className="text-gray-600">Name</p>
                    <p className="mb-4">Romit Gandhi</p>
                    <p className="text-gray-600">Email</p>
                    <p className="mb-4">g******77@gmail.com</p> */}
                </div>
            </div>
        </div>
    )
}