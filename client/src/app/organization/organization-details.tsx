import { ApiSuccessResponse } from "@/interfaces";
import Description from "@/shared/components/description";
import { APIStore } from "@/utils/api-store";
import { useEffect, useState } from "react"
import { FaPencil } from "react-icons/fa6";

interface IOrganizationDetails {
    data: Record<string, any>
}

const OrganizationDetails: React.FC<IOrganizationDetails> = ({ data }) => {

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
                    {
                        Object.keys(fieldToTitleMapping ?? {}).map(record => {
                            return <Description key={record} title={fieldToTitleMapping[record]} description={data[record]}></Description>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default OrganizationDetails;