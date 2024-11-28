import { ApiSuccessResponse } from "@/interfaces";
import { APIStore } from "@/utils/api-store";
import { useEffect, useState } from "react";
import JobListingCard from "./job-listing-card";
import JobPostSearchForm from "./job-post-search-form";

const JobsActiveClient: React.FC<{}> = () => {
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState<string | null>(null);

    async function fetchActiveJobs() {
        const response = await APIStore.getActiveJobsForClient(search, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setData((response as ApiSuccessResponse).data)
        }
    }

    useEffect(() => {
        fetchActiveJobs();
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
                            <JobListingCard
                                key={record.id}
                                job={record}
                                displayDeleteButton={true}
                                displayEditButton={true}
                            />
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

export default JobsActiveClient;