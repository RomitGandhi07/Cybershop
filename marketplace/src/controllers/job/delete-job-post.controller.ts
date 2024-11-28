import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { JobStatusEnum } from "../../enums/job-status.enum";

export const deleteJobPost = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    const { jobId } = req.params;

    // Fetch job if not found or it is of different organization then throw an error
    const job = await Job.findById(jobId);
    if(!job || String(job.organizationId) !== String(req.currentUser.organizationId)) {
        throw new ApiError(500, "Job not found.");
    }

    // If the job is not in the draft mode then throw an error
    if(job.status !== JobStatusEnum.DRAFT) {
        throw new ApiError(500, "You can only remove the job once it is in the draft mode.");
    }

    // Delete job
    await job.deleteOne();

    // Send response
    return res
    .json(new ApiResponse(200, {
        id: String(job._id)
    }, "Job post deleted successfully."));
});