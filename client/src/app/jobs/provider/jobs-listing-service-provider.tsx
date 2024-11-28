"use client";

import Tabs from "@/shared/components/tabs";
import JobsMostRecentServiceProvider from "./jobs-most-recent-service-provider";
import JobsSavedServiceProvider from "./jobs-saved-service-provider";

const JobsListingServiceProvider = () => {
    const tabData = [
        {
            label: 'Most Recent',
            content: <JobsMostRecentServiceProvider />,
        },
        {
            label: 'Saved Jobs',
            content: <JobsSavedServiceProvider />,
        }
    ];

    const handleTabChange = (index: number) => {
        console.log('Active tab:', index);
    };
    
    return (
        <div className="p-6">
            <div className="mx-10">

                {/* <!-- Job header --> */}
                <h1 className="text-2xl font-semibold mb-3 text-slate-700 ml-3">Jobs</h1>
                <Tabs tabs={tabData} onTabChange={handleTabChange} />

                <div className="my-7"></div>
            </div>
        </div>
    );
};

export default JobsListingServiceProvider