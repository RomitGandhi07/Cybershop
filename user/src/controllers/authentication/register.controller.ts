import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getUserName, pickFromObject, SALT_ROUNDS } from "../../utils";
import { User } from "../../models/user";
import { ApiError } from "../../utils/ApiError";
import { Country } from "../../models/country";
import bcrypt from "bcrypt";
import { ApiResponse } from "../../utils/ApiResponse";
import { TokenService } from "../../services/tokens";
import { MailService } from "../../services/mail";
import { Organization } from "../../models/organization";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
    // Fetch the required fields
    const userDetails = pickFromObject(req.body,
        ["email", "password", "firstName", "lastName", "type", "country"]);

    // Check whther the user already exists or not
    const isUserAlreadyExists = await User.countDocuments({ email: userDetails.email });
    if (isUserAlreadyExists) {
        // Throw error that user already exists
        throw new ApiError(409, "User already exists.")
    }

    // Check whether country is valid or not, if not then throw an error
    const country = await Country.findById(userDetails.country).lean().exec();
    if (!country) {
        // Throw error that country is not valid
        throw new ApiError(404, "Invalid Country");
    }
    userDetails.country = {
        id: String(country._id),
        value: country.name
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetails.password, SALT_ROUNDS);

    /**
     * unHashedToken: unHashed token is something we will send to the user's mail
    * hashedToken: we will keep record of hashedToken to validate the unHashedToken in verify email controller
    * tokenExpiry: Expiry to be checked before validating the incoming token
    */
    const { unHashedToken, hashedToken, tokenExpiry } =
        TokenService.generateTemporaryToken();

    /**
     * assign hashedToken and tokenExpiry in DB till user clicks on email verification link
     * The email verification is handled by {@link verifyEmail}
     */
    userDetails.emailVerificationToken = hashedToken;
    userDetails.emailVerificationExpiry = tokenExpiry;

    // Save user details
    const user = await User.build({
        ...userDetails,
        password: hashedPassword
    }).save();

    // Sending email
    await new MailService().sendEmailVerificationEmail({
        email: user.email,
        host: `${req.protocol}://${req.get(
            "host"
        )}`,
        token: unHashedToken,
        userName: `${getUserName(user)}`
    });

    // If user is not part of any other organization then need to create an organization with blank data
    const organization = await Organization.findOne({ team: user.email }).lean().exec();

    if (!organization) {
        await Organization.build({
            owner: String(user._id)
        }).save();
    }
    // TODO: Need publisher of emitting event of user creation

    return res
        .status(201)
        .json(new ApiResponse(201, {
            id: String(user._id)
        }, "User registered successfully and verification email has been sent on your email."));
});