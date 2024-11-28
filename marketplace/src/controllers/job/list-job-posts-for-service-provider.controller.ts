import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiResponse } from "../../utils/ApiResponse";
import { escapeRegExp } from "../../utils";
import { JobStatusEnum } from "../../enums/job-status.enum";

export const listJobPostsForServiceProvider = asyncHandler(async (req: Request, res: Response) => {
    const { search } = req.query;

    // If search is passed then perapre search query
    const searchQuery: { "title"?: { $regex: string, $options: string }, status: string } = {
        status: JobStatusEnum.ACTIVE
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
            $lookup: {
                from: "users",
                localField: "createdBy.id",
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
            $lookup: {
                from: "jobswhishlists",
                localField: "_id",
                foreignField: "jobId",
                as: "wishlisted",
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: [
                                    "$userId",
                                    { "$toObjectId": req.currentUser?.id }
                                ]
                            }
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                id: "$_id",
                proposals: { $size: "$proposals" },
                country: "$user.country.value",
                wishlisted: {
                    $cond: {
                        if: { "$gt": [{ "$size": "$wishlisted" }, 0] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $sort: {
                createdAt: -1
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
        .json(new ApiResponse(200, jobs));
});