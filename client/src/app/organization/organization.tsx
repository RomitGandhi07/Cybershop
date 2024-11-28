"use client";

import { useEffect, useState } from "react";
import OrganizationDetails from "./organization-details";
import OrganizationMembers from "./organization-members";
import { APIStore } from "@/utils/api-store";
import { ApiSuccessResponse } from "@/interfaces";

export default function Organization() {
    const [isLoading, setIsLoading] = useState(true);
    const [organizationData, setOrganizationData] = useState<Record<string, null> | null>(null);
    const getOrganizationDetails = async () => {
        setIsLoading(true);
        const response = await APIStore.getOrganizationDetails({
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setOrganizationData((response as ApiSuccessResponse).data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getOrganizationDetails();
    }, [])

    return (
        (isLoading && !organizationData) ? "Loading..." :
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
            <div className="w-full max-w-6xl space-y-6">
                <div className="flex">
                    <img src={organizationData?.logo ?? ""} alt="Profile" className="w-12 h-12 rounded-full border border-gray-300" />
                    <h1 className="ml-5 mt-2 text-2xl font-medium mb-6">{organizationData?.name}</h1>
                </div>
                <OrganizationDetails data={organizationData ?? {}}/>
                <OrganizationMembers />
            </div>

        </div>
    )
}