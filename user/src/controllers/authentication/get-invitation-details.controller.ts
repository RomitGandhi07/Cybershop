import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { InvitedUsers } from "../../models/invited-users";
import { User } from "../../models/user";
import { base64Decode, getUserName } from "../../utils";

export const getInvitationDetails = asyncHandler(async (req: Request, res: Response) => {
    const { token }: { token: string } = req.body

    // Base 64 decode of that token to fetch user's email address
    const email = base64Decode(token);

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
        .json({ status: false });    }

    // Fetch name of user who invited this user
    const invitedUser = await User.findById(invitedUserEntry.userId).lean().exec();
    if(!invitedUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Send response
    return res
        .status(200)
        .json(new ApiResponse(200, {
            status: true,
            name: getUserName(invitedUser)
        }));
});