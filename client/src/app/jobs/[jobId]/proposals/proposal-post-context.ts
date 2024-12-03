import React from "react";

interface IContextValue {
    jobId: string
}
const defaultContextValue = {
    jobId: ""
};

export const JobProposalsContext = React.createContext<IContextValue>(defaultContextValue);