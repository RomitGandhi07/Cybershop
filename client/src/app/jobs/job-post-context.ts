import React from "react";

interface IContextValue {
    jobId: string | null,
    setJobId: (value: string | null) => void,
    jobDetails: Record<string, any> | null,
    setJobDetails: (data: Record<string, any>) => void
}
const defaultContextValue = {
    jobId: null,
    setJobId: (value: string | null) => {},
    jobDetails: null,
    setJobDetails: (data: Record<string, any>) => {}
};

export const JobPostContext = React.createContext<IContextValue>(defaultContextValue);