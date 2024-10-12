import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { UserTypesEnum } from "../../enums/user-types.enum";
import { Organization } from "../../models/organization";
import { getUserName } from "../../utils";

export const getOrganizationMembers = asyncHandler(async (req: Request, res: Response) => {
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
    }).lean().exec();
    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    // Gather all userIds and fetch users, from that generate object where key is user id and value is object of name and email
    const userIds = [organization.owner, ...(organization.team ?? [])]
    const users = await User.find({ _id: { $in: userIds } }, {
        firstName: 1,
        lastName: 1,
        email: 1,
        isEnabled: 1
    }).lean().exec();

    const usersObject: Record<string, {
        name: string,
        email: string,
        isEnabled: boolean
    }> = {}; 

    users.forEach(user => {
        usersObject[String(user._id)] = {
            name: getUserName(user),
            email: user.email,
            isEnabled: user.isEnabled
        }
    });

    // Send response
    return res
      .status(200)
      .json(new ApiResponse(200, {
        owner: {
            id: String(organization.owner),
            ...(usersObject[String(organization.owner)] ?? {})
        },
        team: (organization.team ?? []).forEach(user => {
            return {
                id: String(user),
                ...(usersObject[String(user)] ?? {})
            }
        })
      }));
});