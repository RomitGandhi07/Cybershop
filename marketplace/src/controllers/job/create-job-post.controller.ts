import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";

export const creteJobPost = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }
    const loggedInUser = {
        id: req.currentUser.id,
        value: req.currentUser.name
    }

    const { title }: { title: string } = req.body;

    // Create job 
    const job = await Job.build({
        organizationId: req.currentUser.organizationId,
        title,
        createdBy: loggedInUser
    }).save();

    // Send response
    return res
    .json(new ApiResponse(200, {
        id: String(job._id)
    }, "Job post created in the draft mode."));
});