import { APIStore } from "@/utils/api-store";
import { useContext, useEffect, useState } from "react";
import { JobProposalsContext } from "./proposal-post-context";
import ProposalListingCard from "./proposal-listing-card";

const JobProposalsAll: React.FC = () => {
    const context = useContext(JobProposalsContext);
    const [data, setData] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(true);
    const [refreshPage, setRefreshPage] = useState(true);

    async function fetchJobAllProposals() {
        const response = await APIStore.getJobProposals(context.jobId, "", {
            hideSuccessMessage: true
        });

        if (response && response.success) {
            setData((response as any).data)
        }
        setLoading(false);
    }

    useEffect(() => {
        if (refreshPage) {
            fetchJobAllProposals();
            setRefreshPage(false);
        }
    }, [refreshPage]);

    return (
        loading ? "Loading..." : (
            data.length ? <>
                {data.map(record => {
                    return <ProposalListingCard key={record.id} proposal={record} displayIcon={true} displayStatus={true} setRefreshPage={setRefreshPage} />
                })}
                <ProposalListingCard proposal={{
                    id: "3",
                    status: "Active",
                    organization: {
                        name: "Sentine One",
                        logo: "https://media.licdn.com/dms/image/v2/D560BAQEHRgaiKjS7MA/company-logo_200_200/company-logo_200_200/0/1712717323000/sentinelone_logo?e=1740009600&v=beta&t=kpPbrRdDS1cqeokhKm-HUqw2EgWo4xL4v1B50dsPwE8",
                        tagline: "We Stop Attacks!",
                        noOfEmployees: 100,
                        industry: "Cyber Services"
                    },
                    coverLetter: `Our company is seeking a cybersecurity expert to help resolve an issue preventing us from running ads on Google. Our domain has been flagged by Google for allegedly containing malicious content, though we’ve conducted thorough checks and found no signs of compromising code or malicious content on our site. We need an expert to analyze our website’s code and identify the cause of this issue to help us get our domain cleared.`,
                    services: [
                        {
                            id: "1",
                            value: "Application Security"
                        }
                    ],
                    country: {
                        id: "1",
                        value: "England"
                    },
                    terms: {
                        type: "Project",
                        projectFees: 200
                    },
                    expertise: "Expert",
                    duration: "7 to 15 days",
                    proposals: 7,
                    createdAt: "2024-10-22T14:59:40.693+00:00",
                    wishlisted: true,
                    createdBy: "Vaibhav Talati",
                }}
                displayIcon={true} displayStatus={true} setRefreshPage={setRefreshPage}
            /> </> : "No Proposals Found..."
        )
    );
}

export default JobProposalsAll;