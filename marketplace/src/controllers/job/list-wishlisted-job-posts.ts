import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { escapeRegExp } from "../../utils";
import { JobsWhishlist } from "../../models/jobs-whishlist";

export const listWishlistedJobPosts = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    const { search } = req.query;

    // If search is passed then perapre search query
    const searchQuery: { "title"?: { $regex: string, $options: string }, userId: string } = {
        userId: req.currentUser.id
    };
    if (search) {
        searchQuery["title"] = { $regex: `${escapeRegExp(search as string)}`, $options: "i" };
    }
    
    // Fetch wishlisted jobs 
    const jobs = await JobsWhishlist.aggregate([
        {
            $match: searchQuery
        },
        {
            $lookup: {
                from: "jobs",
                localField: "jobId",
                foreignField: "_id",
                as: "job"
            }
        },
        {
            $unwind: {
                path: "$job"
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $replaceRoot: {
                newRoot: "$job"
            }
        },
        {
            $addFields: {
                id: "$_id"
            }
        },
        {
            $project: {
                _id: 0,
            }
        }
    ]);

    // Send response
    return res
    .json(new ApiResponse(200, jobs));
});