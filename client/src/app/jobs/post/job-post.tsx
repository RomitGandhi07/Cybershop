"use client";
import React, { useState } from "react";
import JobTitle from "../steps/title/title";
import JobServices from "./services";
import JobDescription from "../steps/description/description";
import Stepper from "./stepper";
import { JobPostContext } from "../job-post-context";




const JobPost: React.FC<{}> = () => {
    const steps = [
        { component: <JobTitle />, name: "Title" },
        // { component: <JobServices />, name: "Services" },
        { component: <JobDescription />, name: "Description", nextButtonName: "Publish" },
    ];

    const [jobId, setJobId] = useState<string | null>(null);
    const [jobDetails, setJobDetails] = useState<Record<string, any>>({});

    return (
        <JobPostContext.Provider value={{ jobId, setJobId, jobDetails, setJobDetails }}>
            {/* <div className="flex flex-col content-center items-center"> */}
                <Stepper steps={steps} title="Job Post" displayHeaderTitle={true} />
            {/* </div> */}
        </JobPostContext.Provider>
    );
}

export default JobPost;


