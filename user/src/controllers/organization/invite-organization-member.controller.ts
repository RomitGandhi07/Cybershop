import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";
import { Organization } from "../../models/organization";
import { InvitedUsers } from "../../models/invited-users";
import { MailService } from "../../services/mail";

export const inviteOrganizationMember = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    const { email }: { email: string } = req.body;

    // If user already exists then throw an error
    const userAlreadyExists = await User.findOne({ email: email }).lean().exec();
    if (userAlreadyExists) {
        throw new ApiError(409, "User already exists.");
    }

    // If user already invited then throw an error
    const userAlreadyInvited = await InvitedUsers.findOne({ email: email }).lean().exec();
    if (userAlreadyInvited) {
        throw new ApiError(409, "User already invited.");
    }

    // Find the organization, if the organization not found then throw an error
    const organization = await Organization.findOne({
        $or: [
            { owner: req.currentUser.id },
            { team: req.currentUser.email }
        ]
    });
    if (!organization) {
        throw new ApiError(404, "Organization not found");
    }

    // Add user's email in the team
    if (organization.team) {
        organization.team.push(email);
    }
    else {
        organization.team = [email];
    }

    // Add entry in the invited users
    const invitedUser = InvitedUsers.build({
        userId: req.currentUser.id,
        email,
    })

    // Save data of organization and invited user
    await Promise.all([organization.save(), invitedUser.save()]);

    // Send invitation email to user
    await new MailService().sendInviteMemberEmail({
        email,
        host: `${req.protocol}://${req.get(
            "host"
        )}`,
        userName: req.currentUser.name
    });

    // Send response
    return res
        .status(200)
        .json(new ApiResponse(200, {
            email
        }, "User invited successfully."));
});