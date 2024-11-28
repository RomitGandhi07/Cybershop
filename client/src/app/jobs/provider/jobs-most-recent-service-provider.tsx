import { ApiSuccessResponse } from "@/interfaces";
import { APIStore } from "@/utils/api-store";
import { useEffect, useState } from "react";
import JobListingCard from "./job-listing-card";
import JobPostSearchForm from "./job-post-search-form";

const JobsMostRecentServiceProvider: React.FC<{}> = () => {
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState<string | null>(null);

    async function fetchMostRecentJobs() {
        const response = await APIStore.getMostRecentJobsForServiceProvider(search, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setData((response as ApiSuccessResponse).data)
        }
    }

    useEffect(() => {
        fetchMostRecentJobs();
    }, [search]);
    return (
        <>
            <div className="relative mb-6">
                <JobPostSearchForm setSearch={setSearch} />
            </div>

            {
                data.length ? (
                    data.map((record: any) => {
                        return (
                            <JobListingCard key={record.id} job={record} />
                        )
                    })
                ) :
                    <div className="flex items-center content-center">
                        <p>No Jobs Found</p>
                    </div>
            }
        </>
    )
};

export default JobsMostRecentServiceProvider;