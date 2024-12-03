import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { Proposal } from "../../models/proposal";
import { Organization } from "../../models/organization";
import mongoose from "mongoose";
import { ProposalStatusEnum } from "../../enums/job-status.enum copy";

export const listProposal = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Fetch job, if not found then throw an error
    const { jobId } = req.params;
    const { status } = req.query;

    const job = await Job.findById(jobId).lean().exec();
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    const matchQuery: {jobId: any, status?: string} = {
        jobId: new mongoose.mongo.ObjectId(jobId)
    };

    if(status) {
        matchQuery.status = status as string;
    }

    // Fetch proposals
    const proposals = await Proposal.aggregate([
        {
            $match: matchQuery
        },
        {
            $lookup: {
                from: "organizations",
                localField: "organizationId",
                foreignField: "_id",
                as: "organization"
            }
        },
        {
            $unwind: {
                path: "$organization"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: {
                path: "$user"
            }
        },
        {
            $addFields: {
                id: "$_id",
                createdBy: { $concat: [ "$user.firstName", " ", "$user.lastName" ] }
            }
        },
        {
            $project: {
                _id: 0,
                user: 0
            }
        }
    ]);

    // Send response
    return res
        .json(new ApiResponse(200, proposals));
});