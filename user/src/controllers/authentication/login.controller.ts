import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcrypt";
import { TokenService } from "../../services/tokens";
import { ApiResponse } from "../../utils/ApiResponse";
import { MailService } from "../../services/mail";
import { getUserName } from "../../utils";
import app from "../../app";

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
    // Fetch the required fields
    const { email, password } = req.body;

    // Check whther the user exists with specified email, if not then throw an error
    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist with specified credentials");
    }

    // Check whether user's passwords are matching or not, if not then throw an error
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
        throw new ApiError(404, "User does not exist with specified credentials");
    }

    // If the user is already verified then generate access and refresh token. Save it in the cookie and send response
    if (user.isEmailVerified) {

        // Generate access token and refresh token
        const { accessToken } = await TokenService.getAccessToken({
            id: String(user._id),
            email: user.email,
            type: user.type,
            name: getUserName(user),
            isEnabled: user.isEnabled
        });

        const { refreshToken } = await TokenService.getRefreshToken({
            id: String(user._id)
        });

        // user.refreshToken = refreshToken;
        await user.save();

        // Set access token and refresh token
        res.cookie("Token1", accessToken, app.locals.cookieOptions);
        res.cookie("Token2", refreshToken, app.locals.cookieOptions);

        // Send response
        return res
            .json(new ApiResponse(200, {}, "User Successfully Logged in"));
    }
    else {
        // If email verification expiry is not found then throw an error
        if (!user.emailVerificationExpiry) {
            throw new ApiError(500, "Something went wrong");

        }

        // If email verification is not expired then send response to indicate need to do email verification
        if (new Date(user.emailVerificationExpiry) > new Date()) {
            throw new ApiError(401, "Please verify your email address to login into the application, verification email has already been sent on your email");
        }

        // Here email verification is expired, so need to send another email to verify
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
        user.emailVerificationToken = hashedToken;
        user.emailVerificationExpiry = tokenExpiry;

        // Save user details
        await user.save();

        // Sending email
        await new MailService().sendEmailVerificationEmail({
            email: user.email,
            host: `${req.protocol}://${req.get(
                "host"
            )}`,
            token: unHashedToken,
            userName: `${getUserName(user)}`
        });

        throw new ApiError(401, "Please verify your email address to login into the application, verification email has been sent on your email");
    }
});