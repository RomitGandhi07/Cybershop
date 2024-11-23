import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { JobsWhishlist } from "../../models/jobs-whishlist";
import { Proposal } from "../../models/proposal";

export const getJobPostDetails = asyncHandler(async (req: Request, res: Response) => {
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

    // Fetch number of proposals
    const proposals = await Proposal.countDocuments({
        jobId
    });

    // Check if user has wishilisted this job or not
    const wishlist = await JobsWhishlist.findOne({
        userId: req.currentUser.id,
        jobId
    }).lean().exec();

    // Check if user has sent an proposal or not
    const proposal = await Proposal.findOne({
        userId: req.currentUser.id,
        jobId
    }).lean().exec();

    // Send response
    return res
        .json(new ApiResponse(200, {
            job: {...job.toJSON(), proposals },
            user: {
                wishlist: !!wishlist,
                proposal: !!proposal
            },
            client: {} 
            
        }));
});