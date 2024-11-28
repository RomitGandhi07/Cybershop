import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiResponse } from "../../utils/ApiResponse";
import { escapeRegExp } from "../../utils";
import { JobStatusEnum } from "../../enums/job-status.enum";
import mongoose from "mongoose";

export const listActiveJobPostsForClient = asyncHandler(async (req: Request, res: Response) => {
    const { search } = req.query;

    // If search is passed then perapre search query
    const searchQuery: { "title"?: { $regex: string, $options: string }, status: string, organizationId: any } = {
        status: JobStatusEnum.ACTIVE,
        organizationId: new mongoose.mongo.ObjectId(req.currentUser?.organizationId)
    };
    if (search) {
        searchQuery["title"] = { $regex: `${escapeRegExp(search as string)}`, $options: "i" };
    }

    // Fetch wishlisted jobs 
    const jobs = await Job.aggregate([
        {
            $match: searchQuery
        },
        {
            $lookup: {
                from: "proposals",
                localField: "_id",
                foreignField: "jobId",
                as: "proposals"
            }
        },
        {
            $addFields: {
                id: "$_id",
                proposals: { $size: "$proposals" }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $project: {
                _id: 0
            }
        }
    ]);

    // Send response
    return res
        .json(new ApiResponse(200, jobs));
});