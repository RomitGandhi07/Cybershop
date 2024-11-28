import { ApiSuccessResponse } from "@/interfaces";
import { APIStore } from "@/utils/api-store";
import { useEffect, useState } from "react";
import JobListingCard from "./job-listing-card";
import JobPostSearchForm from "./job-post-search-form";

const JobsSavedServiceProvider: React.FC<{}> = () => {
    const [data, setData] = useState<any>([]);
    const [search, setSearch] = useState<string | null>(null);
    const [refreshPage, setRefreshPage] = useState(true);

    async function fetchWishlistedJobs() {
        const response = await APIStore.getWishlistedJobsForServiceProvider(search, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setData((response as ApiSuccessResponse).data)
        }
    }

    useEffect(() => {
        if(refreshPage) {
            fetchWishlistedJobs();
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
                            <JobListingCard key={record.id}
                                setRefreshPage={setRefreshPage}
                                job={
                                    {
                                        ...record,
                                        wishlisted: true
                                    }
                                } />
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

export default JobsSavedServiceProvider;