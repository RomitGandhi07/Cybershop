import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { InvitedUsers } from "../../models/invited-users";
import { User } from "../../models/user";
import { base64Decode, getUserName } from "../../utils";
import { Organization } from "../../models/organization";

export const getInvitationDetails = asyncHandler(async (req: Request, res: Response) => {
    const { token } = req.query

    // Base 64 decode of that token to fetch user's email address
    const email = base64Decode((token as string) ?? "");

    // Check if user is already there, if yes then send status false
    const user = await User.findOne({ email: email }).lean().exec();
    if (user) {
        return res
            .status(200)
            .json({ status: false });
    }

    // Find the invited user, if entry not found then send status false
    const invitedUserEntry = await InvitedUsers.findOne({ email }).lean().exec();
    if (!invitedUserEntry) {
        return res
            .status(200)
            .json({ status: false });
    }

    // Fetch the organization of the user in which he/she got invited. If not then throw an error
    const organization = await Organization.findOne({
        team: email
    }, {
        name: 1
    }).lean().exec();
    if(!organization) {
        throw new ApiError(500, "Something went wrong.");
    }

    // Fetch name of user who invited this user
    const invitedUser = await User.findById(invitedUserEntry.userId).lean().exec();
    if (!invitedUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Send response
    return res
        .status(200)
        .json(new ApiResponse(200, {
            status: true,
            name: getUserName(invitedUser),
            type: invitedUser.type,
            organization: {
                id: String(organization._id),
                name: organization.name
            }

        }));
});