"use client";
import React, { useState } from "react";
import JobTitle from "./steps/title/title";
import JobServices from "./steps/services/services";
import ProposalCoverLetter from "./steps/cover-letter/cover-letter";
import Stepper from "./stepper";
import { JobPostContext } from "./job-post-context";
import ProposalDuration from "./steps/duration/services";
import JobExpertise from "./steps/expertise/expertise";
import JobComplexity from "./steps/complexity/complexity";
import ProposalTerms from "./steps/terms/terms";




const ProposalPost: React.FC<{}> = () => {
    const steps = [
        // { component: <JobTitle />, name: "Title" },
        // { component: <JobServices />, name: "Services" },
        // { component: <JobExpertise />, name: "Expertise" },
        // { component: <JobComplexity />, name: "Complexity" },
        { component: <ProposalCoverLetter />, name: "Cover Letter" },
        { component: <ProposalDuration />, name: "Duration" },
        { component: <ProposalTerms />, name: "Terms", nextButtonName: "Submit" },
    ];

    const [jobId, setJobId] = useState<string | null>(null);
    const [jobDetails, setJobDetails] = useState<Record<string, any>>({});

    return (
        <JobPostContext.Provider value={{ jobId, setJobId, jobDetails, setJobDetails }}>
            <p className="text-center mt-7 text-xl font-bold">Submitting Proposal for <span className="text-orange-600">Cybersecurity Expert Needed to Resolve Google Ads Domain Flagging Issue</span></p>
            <div className="h-full">
                <Stepper steps={steps} title="Proposal" displayHeaderTitle={true} />
            </div>

        </JobPostContext.Provider>
    );
}

export default ProposalPost;


