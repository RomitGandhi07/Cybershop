import { ApiSuccessResponse } from "@/interfaces";
import { APIStore } from "@/utils/api-store";
import { useEffect, useState } from "react";
import JobPostSearchForm from "./job-post-search-form";
import JobDraftListingCard from "./job-draft-listing-card";

const JobsDraftClient: React.FC<{}> = () => {
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState<string | null>(null);
    const [refreshPage, setRefreshPage] = useState(true);

    async function fetchDraftJobs() {
        const response = await APIStore.getDraftJobsForClient(search, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setData((response as ApiSuccessResponse).data)
        }
    }

    useEffect(() => {
        if (refreshPage) {
            fetchDraftJobs();
            setRefreshPage(false);
        }
    }, [search, refreshPage]);
    return (
        <>
            <div className="relative mb-6">
                <JobPostSearchForm setSearch={setSearch} />
            </div>

            {
                data.length ? (
                    data.map((record: any) => {
                        return (
                            <JobDraftListingCard
                                setRefreshPage={setRefreshPage}
                                key={record.id}
                                job={record}
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

export default JobsDraftClient;