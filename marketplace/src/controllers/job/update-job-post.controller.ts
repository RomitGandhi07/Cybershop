import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { Job } from "../../models/job";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { JobStatusEnum } from "../../enums/job-status.enum";
import { intersectTwoObjects, pickFromObject } from "../../utils";
import { Service } from "../../models/service";

export const updateJobPost = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }
    const loggedInUser = {
        id: req.currentUser.id,
        value: req.currentUser.name
    }

    // Fetch job, if not found then throw an error
    const { jobId } = req.params;

    const job = await Job.findById(jobId);
    if (!job) {
        throw new ApiError(404, "Job not found.");
    }

    // If the job is not in either draft or active mode then it's details can't be updated
    if (job.status !== JobStatusEnum.DRAFT && job.status !== JobStatusEnum.ACTIVE) {
        throw new ApiError(409, "You can only edit the job post once it is in the draft or active mode.");
    }

    // Fetch the details from actual job details which can get updated
    const jobDetails = pickFromObject(job, [
        "title",
        "services",
        "complexity",
        "expertise",
        "duration",
        "budget",
        "description"
    ]);

    // If servies is passed then check whether it's valid or not if not then throw and error otherwise transform it 
    if(req.body.hasOwnProperty("services") && req.body.services.length) {
        const services = await Service.find({ _id: { $in: req.body.services } }).lean().exec();
        if(services.length !== req.body.services.length) {
            throw new ApiError(404, "Services not found.");
        }

        req.body.services = services.map(service => {
            return {
                id: String(service._id),
                value: service.name
            }
        })
    }
    
    // Fetch data which got updated
    const updatedData = intersectTwoObjects(jobDetails, req.body);

    // If anything got updated then save the details in the DB
    if (Object.keys(updatedData).length) {
        Object.assign(job, updatedData);
        job.updatedBy = loggedInUser;

        await job.save();
    }

    // Send response
    return res
        .json(new ApiResponse(200, updatedData, "Job post updated successfully."));
});