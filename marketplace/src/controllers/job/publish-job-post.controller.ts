import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { JobStatusEnum } from "../../enums/job-status.enum";

export const publishJobPost = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Fetch job, if not found then throw an error
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    // If job status is not in draft mode then throw an error
    if (job.status !== JobStatusEnum.DRAFT) {
        throw new ApiError(409, "You can only publish draft jobs.")
    }

    // If all the fields are not present then throw an error
    if(!job.services || !job.complexity || !job.expertise || !job.duration || !job.budget || !job.description)  {
        throw new ApiError(400, "All the fields must be present.")
    }

    // Save published and publishedAt
    job.published = true;
    job.publishedAt = new Date().toISOString();
    await job.save();

    // Send response
    return res
        .json(new ApiResponse(200, {
            id: String(job._id),
            published: true
        }, "Job post published successfully."));
});