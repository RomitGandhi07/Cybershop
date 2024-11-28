"use client";

import Tabs from "@/shared/components/tabs";
import JobsActiveClient from "./jobs-active-client";
import JobsCompletedClient from "./jobs-completed-client";
import JobsDraftClient from "./jobs-draft-client";

const JobsListingClient = () => {
    const tabData = [
        {
            label: 'Active',
            content: <JobsActiveClient />,
        },
        {
            label: 'Draft',
            content: <JobsDraftClient />,
        },
        {
            label: 'Completed',
            content: <JobsCompletedClient />,
        }
    ];

    const handleTabChange = (index: number) => {
        console.log('Active tab:', index);
    };

    return (
        <div className="p-6">
            <div className="mx-10">
                {/* <!-- Search bar --> */}

                {/* <!-- Job header --> */}
                {/* <h1 className="text-xl font-semibold mb-1">Jobs you might like</h1> */}
                <div className="flex justify-between items-center mb-2">
                <h1 className="text-2xl font-semibold mb-1 text-slate-700 ml-3">Jobs</h1>
                    <button
                        className="w-1/12 bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200"
                        // isLoader={false}
                    >
                        Create
                    </button>
                </div>
                <div>
                    <Tabs tabs={tabData} onTabChange={handleTabChange} />
                </div>

                <div className="my-7"></div>
            </div>
        </div>
    );
};

export default JobsListingClient