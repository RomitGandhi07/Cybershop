import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";

export const getJobPostDetails = asyncHandler(async (req: Request, res: Response) => {
    // Fetch job, if not found then throw an error
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    // Send response
    return res
        .json(new ApiResponse(200, job));
});