"use client";

import { useParams } from "next/navigation";
import JobProposalsAll from "./job-proposals-all";
import Tabs from "@/shared/components/tabs";
import { JobProposalsContext } from "./proposal-post-context";
import { useEffect, useState } from "react";
import { APIStore } from "@/utils/api-store";
import JobProposalsShortlisted from "./job-proposals-shortlisted";
import JobProposalsCancelled from "./job-proposals-cancelled";
import JobProposalsHired from "./job-proposals-hired";

const JobProposals = () => {
    const params = useParams<{ jobId: string }>();
    const [loading, setLoading] = useState(true);
    const [job, setJob] = useState<Record<string, any>>();

    async function fetchJobDetails() {
        // Fetch job details
        const response = await APIStore.getJobPostDetailsForClient(params.jobId, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setJob((response as any).data);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchJobDetails();
    }, [params.jobId]);

    const tabData = [
        {
            label: 'All',
            content: <JobProposalsAll />,
        },
        {
            label: 'Shortlisted',
            content: <JobProposalsShortlisted />,
        },
        {
            label: 'Cancelled',
            content: <JobProposalsCancelled />,
        },
        {
            label: 'Hired',
            content: <JobProposalsHired />,
        }
    ];

    const handleTabChange = (index: number) => {
        console.log('Active tab:', index);
    };

    return (
        loading ? "Loading..." :
            <JobProposalsContext.Provider value={{ jobId: params.jobId }}>
                <div className="bg-gray-100 px-8">
                    <div className="mx-10 mt-5">

                        {/* <!-- Job header --> */}
                        <h1 className="text-2xl font-semibold mb-3 text-slate-700 ml-3">Proposals of <span className="text-orange-600">{job?.job.title}</span></h1>

                        {/* <!-- Tabs --> */}
                        <Tabs tabs={tabData} onTabChange={handleTabChange} />

                        {/* <p className="text-gray-500 text-sm my-4">Browse jobs that match your experience to a client&apos;s hiring preferences. Ordered by most relevant.</p> */}
                        <div className="my-7"></div>
                    </div>
                </div>
            </JobProposalsContext.Provider>

    );
};

export default JobProposals