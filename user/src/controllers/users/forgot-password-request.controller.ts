import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import { TokenService } from "../../services/tokens";
import { MailService } from "../../services/mail";

export const forgotPasswordRequest = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  // Get email from the client and check if user exists
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exists", []);
  }


  // Generate a temporary token
  const { unHashedToken, hashedToken, tokenExpiry } =
    TokenService.generateTemporaryToken(); // generate password reset creds

  // save the hashed version a of the token and expiry in the DB
  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save();

  // Send mail with the password reset link. It should be the link of the frontend url with token
  // Sending verification email
  // ! NOTE: Following link should be the link of the frontend page responsible to request password reset
  // ! Frontend will send the below token with the new password in the request body to the backend reset password endpoints
  await new MailService().sendForgotPasswordEmail(user.email, `${process.env.FORGOT_PASSWORD_REDIRECT_URL}/${unHashedToken}`, // TODO: Set FORGOT_PASSWORD_REDIRECT_URL
    `${user.firstName} ${user.lastName}`
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        {},
        "Password reset mail has been sent on your mail id"
      )
    );
});