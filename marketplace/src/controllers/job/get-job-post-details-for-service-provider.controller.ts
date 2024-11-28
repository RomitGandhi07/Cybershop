import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { JobsWhishlist } from "../../models/jobs-whishlist";
import { Proposal } from "../../models/proposal";
import { JobStatusEnum } from "../../enums/job-status.enum";
import { Organization } from "../../models/organization";
import { User } from "../../models/user";

export const getJobPostDetailsForSeviceProvider = asyncHandler(async (req: Request, res: Response) => {
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
        organizationId: req.currentUser.organizationId,
        jobId
    }).lean().exec();
    
    // Fetch total and open jobs posted by client
    const totalJobs = await Job.countDocuments({ organizationId: job.organizationId, status: { $ne: JobStatusEnum.DRAFT } });
    const openJobs = await Job.countDocuments({ organizationId: job.organizationId, status: JobStatusEnum.ACTIVE });

    // Fetch Industry of user and no of employeed
    const organization = await Organization.findById(job.organizationId).lean().exec();

    // Fetch User's location and memberSince
    const user = await User.findById(job.createdBy.id).lean().exec();

    // Send response
    return res
        .json(new ApiResponse(200, {
            job: {...job.toJSON(), proposals },
            user: {
                wishlist: !!wishlist,
                proposal: !!proposal
            },
            client: {
                totalJobs,
                openJobs,
                industry: organization?.industry ?? null,
                noOfEmployees: organization?.noOfEmployees ?? null,
                memberSince: user?.createdAt ?? null,
                location: user?.country ? user.country.value : null,
                totalSpent: 0 // TODO: Need to change this
            } 
            
        }));
});