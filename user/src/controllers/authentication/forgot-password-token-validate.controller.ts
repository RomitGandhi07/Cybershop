import { Request, Response } from "express";
import crypto from "crypto";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";

export const forgotPasswordTokenValidate = asyncHandler(async (req: Request, res: Response) => {
  const { resetToken } = req.body;

  // Create a hash of the incoming reset token
  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // See if user with hash similar to resetToken exists
  // If yes then check if token expiry is greater than current date
  const user = await User.findOne({
    forgotPasswordToken: hashedToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  // If either of the one is false that means the token is invalid or expired
  if (!user) {
    throw new ApiError(489, "Token is invalid or expired.");
  }

  // Send response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Token is valid."));
});