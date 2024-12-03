import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { Proposal } from "../../models/proposal";
import { ProposalStatusEnum } from "../../enums/job-status.enum copy";

export const updateProposalStatus = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Fetch job, if not found then throw an error
    const { jobId, proposalId } = req.params;
    const { status } = req.body;

    if(status !== ProposalStatusEnum.SHORTLISTED && status !== ProposalStatusEnum.CANCELLED) {
        throw new ApiError(400, "Status must be either shortlisted or cancelled");
    }

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    // Fetch proposal, if not found then throw an error
    const proposal = await Proposal.findById(proposalId);
    if (!proposal || String(proposal.jobId) !== jobId || String(job.organizationId) !== String(req.currentUser.organizationId)) {
        throw new ApiError(404, "Proposal not found.");
    }

    if(proposal.status !== ProposalStatusEnum.ACTIVE) {
        throw new ApiError(409, "Proposal must be active.");
    }

    proposal.status = status;
    await proposal.save();


    // Send response
    return res
        .json(new ApiResponse(200, {}, "Proposal status updated successfully."));
});