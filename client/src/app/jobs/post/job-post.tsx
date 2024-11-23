"use client";
import React, { useState } from "react";
import JobTitle from "../steps/title/title";
import JobServices from "../steps/services/services";
import JobDescription from "../steps/description/description";
import Stepper from "./stepper";
import { JobPostContext } from "../job-post-context";
import JobDuration from "../steps/duration/services";
import JobExpertise from "../steps/expertise/expertise";
import JobComplexity from "../steps/complexity/complexity";
import JobBudget from "../steps/budget/budget";




const JobPost: React.FC<{}> = () => {
    const steps = [
        { component: <JobTitle />, name: "Title" },
        { component: <JobServices />, name: "Services" },
        { component: <JobExpertise />, name: "Expertise" },
        { component: <JobDuration />, name: "Duration" },
        { component: <JobComplexity />, name: "Complexity" },
        { component: <JobBudget />, name: "Budget" },
        { component: <JobDescription />, name: "Description", nextButtonName: "Publish" },
    ];

    const [jobId, setJobId] = useState<string | null>(null);
    const [jobDetails, setJobDetails] = useState<Record<string, any>>({});

    return (
        <JobPostContext.Provider value={{ jobId, setJobId, jobDetails, setJobDetails }}>
            <div className="h-full">
                <Stepper steps={steps} title="Job Post" displayHeaderTitle={true} />
            </div>
        </JobPostContext.Provider>
    );
}

export default JobPost;


