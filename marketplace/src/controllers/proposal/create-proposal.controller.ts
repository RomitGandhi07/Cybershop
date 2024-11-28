import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { Proposal } from "../../models/proposal";
import { JobStatusEnum } from "../../enums/job-status.enum";
import { pickFromObject } from "../../utils";

export const creteProposal = asyncHandler(async (req: Request, res: Response) => {
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

    // If the job status is not active then throw an error as can send proposal in active jobs only
    if (job.status !== JobStatusEnum.ACTIVE) {
        throw new ApiError(409, "Job is not active.");
    }

    // Check whether user already sent proposal for the job or not, if yes then throw an error
    const alreadyApplied = await Proposal.findOne({
        organizationId: req.currentUser.organizationId,
        jobId
    });
    if (alreadyApplied) {
        throw new ApiError(409, "Your organization already applied for this job.");
    }

    //
    const proposalDetails = pickFromObject(req.body, [
        "coverLetter",
        "duration",
        "terms"
    ]);


    // Create new proposal
    const proposal = await Proposal.build({
        organizationId: req.currentUser.organizationId,
        userId: req.currentUser.id,
        jobId,
        ...proposalDetails
    }).save();

    // Send response
    return res
        .json(new ApiResponse(200, {
            id: String(proposal._id)
        }, "Proposal has been sent."));
});