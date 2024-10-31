import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { Organization } from "../../models/organization";
import { getUserName } from "../../utils";

export const getOrganizationMembers = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Find the organization, if the organization not found then throw an error
    const organization = await Organization.findOne({
        $or: [
            { owner: req.currentUser.id },
            { team: req.currentUser.email }
        ]
    }).lean().exec();
    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    // Fetch owner details, if not found then throw an error
    const owner = await User.findById(organization.owner, {
        firstName: 1,
        lastName: 1,
        email: 1,
        isEnabled: 1
    }).lean().exec();
    if (!owner) {
        console.error("Orgnization owner not found", organization._id);
        throw new ApiError(500, "Something went wrong");
    }

    // Fetch team information
    const team = await User.find({ email: { $in: organization.team } }, {
        firstName: 1,
        lastName: 1,
        email: 1,
        isEnabled: 1
    }).lean().exec();

    // Fetch users who are present in our system who are invited, also bifurcate them by enabled property
    const userEmailsExistsInTeam: Set<String> = new Set();

    const enabledUsersExistFromTeam: {
        id: string,
        name: string,
        email: string,
        isEnabled: boolean
    }[] = [];

    const disabledUsersExistFromTeam: {
        id: string,
        name: string,
        email: string,
        isEnabled: boolean
    }[] = [];
    
    team.forEach(user => {
        userEmailsExistsInTeam.add(user.email);

        const data = {
            id: String(user._id),
            name: getUserName(user),
            email: user.email,
            isEnabled: user.isEnabled
        };

        if(user.isEnabled) {
            enabledUsersExistFromTeam.push(data);
        }
        else {
            disabledUsersExistFromTeam.push(data);
        }
    });

    // Fetch users who are not present in our system who are invited
    const usersNotExistFromTeam = (organization.team ?? []).filter(email => !userEmailsExistsInTeam.has(email));

    // Send response
    return res
        .status(200)
        .json(new ApiResponse(200, {
            owner: {
                id: String(owner._id),
                name: getUserName(owner),
                email: owner.email,
                isEnabled: owner.isEnabled
            },
            team: {
                usersExist: {
                    enabled: enabledUsersExistFromTeam,
                    disabled: disabledUsersExistFromTeam
                },
                usersNotExist: usersNotExistFromTeam
            }
        }));
});