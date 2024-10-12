import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { UserTypesEnum } from "../../enums/user-types.enum";
import { Organization } from "../../models/organization";

export const getOrganizationDetails = asyncHandler(async (req: Request, res: Response) => {
    req.currentUser = {
        id: "66e6d47d026901b3dfbd67d9",
        email: "gandhiromit77@gmail.com",
        type: UserTypesEnum.CLIENT
    }
    
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Find the organization, if the organization not found then throw an error
    const organization = await Organization.findOne({
        $or: [
            { owner: req.currentUser.id },
            { team: req.currentUser.id }
        ]
    }, {
        owner: 0,
        team: 0
    }).lean().exec();
    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    // Send response
    return res
      .status(200)
      .json(new ApiResponse(200, {
        ...organization,
        id: String(organization._id),
        _id: undefined
      }));
});