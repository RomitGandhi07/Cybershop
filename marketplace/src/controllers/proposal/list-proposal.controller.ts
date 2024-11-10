import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { Proposal } from "../../models/proposal";

export const listProposal = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Fetch job, if not found then throw an error
    const { jobId } = req.params;

    const job = await Job.findById(jobId).lean().exec();
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    // Fetch proposals
    const proposals = await Proposal.find({
        jobId
    });


    // Send response
    return res
        .json(new ApiResponse(200, proposals));
});