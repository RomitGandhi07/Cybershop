import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { Proposal } from "../../models/proposal";
import { Organization } from "../../models/organization";

export const getProposalDetails = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Fetch job, if not found then throw an error
    const { jobId, proposalId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    // Fetch proposal, if not found then throw an error
    const proposal = await Proposal.findById(proposalId).lean().exec();
    if (!proposal || String(proposal.jobId) !== jobId) {
        throw new ApiError(404, "Proposal not found.");
    }

    // Fetch client and service provider organization
    const clientOrganization = await Organization.findById(job.organizationId, { name: 1, logo: 1 });
    if(!clientOrganization) {
        throw new ApiError(500, "Something went wrong");
    }

    const serviceProviderOrganization = await Organization.findById(proposal.organizationId, { name: 1, logo: 1 });
    if(!serviceProviderOrganization) {
        throw new ApiError(500, "Something went wrong");
    }

    // Send response
    return res
        .json(new ApiResponse(200, {
            ...proposal,
            id: String(proposal._id),
            _id: undefined,
            clientOrganization,
            serviceProviderOrganization
        }));
});