"use client";
import React, { useEffect, useState } from "react";
import ProposalCoverLetter from "./steps/cover-letter/cover-letter";
import Stepper from "./stepper";
import { JobProposalPostContext } from "./job-proposal-post-context";
import ProposalDuration from "./steps/duration/duration";
import ProposalTerms from "./steps/terms/terms";
import { useParams } from "next/navigation";
import { APIStore } from "@/utils/api-store";


const JobProposalPost: React.FC<{}> = () => {
    const params = useParams<{ jobId: string }>();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [proposal, setProposal] = useState<Record<string, any>>({});

    async function fetchJobDetails() {
        const response = await APIStore.getJobPostDetailsForServiceProvider(params.jobId, {
            hideSuccessMessage: true
        });
        if (response && response.success) {
            setData((response as any).data)
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchJobDetails();
    }, [])

    const steps = [
        { component: <ProposalCoverLetter />, name: "Cover Letter" },
        { component: <ProposalDuration />, name: "Duration" },
        { component: <ProposalTerms />, name: "Terms", nextButtonName: "Submit" },
    ];


    return (
        isLoading ? "Loading..." :
            <JobProposalPostContext.Provider value={{ proposal, setProposal, jobId: params.jobId }}>
                <p className="text-center mt-7 text-xl font-bold">Submitting Proposal for <span className="text-orange-600">{data.job.title}</span></p>
                <div className="h-full -mt-10">
                    {/* {JSON.stringify(proposal)} */}
                    <Stepper steps={steps} title="Proposal" displayHeaderTitle={true} />
                </div>

            </JobProposalPostContext.Provider>
    );
}

export default JobProposalPost;


