import React from "react";

interface IContextValue {
    proposal: Record<string, any>,
    setProposal: (data: Record<string, any>) => void,
    jobId: string
}
const defaultContextValue = {
    proposal: {},
    setProposal: (data: Record<string, any>) => {},
    jobId: ""
};

export const JobProposalPostContext = React.createContext<IContextValue>(defaultContextValue);