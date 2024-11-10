import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { JobStatusEnum } from "../../enums/job-status.enum";
import { JobsWhishlist } from "../../models/jobs-whishlist";

export const wishlistJobPost = asyncHandler(async (req: Request, res: Response) => {
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

    // Check if user has already wishlisted this job, if yes then throw an error
    const data = {
        userId: req.currentUser.id,
        jobId
    };

    const wishlistedJob = await JobsWhishlist.findOne(data).lean().exec();

    if(wishlistedJob) {
        throw new ApiError(409, "You have already wishlisted this job.");
    }

    // If the job is not active then we can not wishlist it
    if (job.status !== JobStatusEnum.ACTIVE) {
        throw new ApiError(409, "You can only wishlist the job post if it is not in active mode.");
    }

    // Add entry in the JobsWhishlist
    await JobsWhishlist.build(data).save();


    // Send response
    return res
        .json(new ApiResponse(200, data, "Job post wishlisted successfully."));
});