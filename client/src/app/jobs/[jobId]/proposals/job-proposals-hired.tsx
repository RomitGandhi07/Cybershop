import { APIStore } from "@/utils/api-store";
import { useContext, useEffect, useState } from "react";
import { JobProposalsContext } from "./proposal-post-context";
import ProposalListingCard from "./proposal-listing-card";

const JobProposalsHired: React.FC = () => {
    const context = useContext(JobProposalsContext);
    const [data, setData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);

    async function fetchJobHiredProposals() {
        const response = await APIStore.getJobProposals(context.jobId, "Hired", {
            hideSuccessMessage: true
        });

        if(response && response.success) {
            setData((response as any).data)
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchJobHiredProposals();
    }, []);

    return (
        loading ? "Loading..." : (
            data.length ? data.map(record => {
                return <ProposalListingCard key={record.id} proposal={record} displayIcon={false} />
            }) : "No Proposals Found..."
        )
    );
}

export default JobProposalsHired;