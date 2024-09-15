import { Request, Response } from "express";
import crypto from "crypto";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiError } from "../../utils/ApiError";
import { ApiResponse } from "../../utils/ApiResponse";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../utils";


export const resetForgottenPassword = asyncHandler(async (req: Request, res: Response) => {
  const { resetToken, password } = req.body;

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
    throw new ApiError(489, "Token is invalid or expired");
  }

  // If everything is ok and token id valid
  // reset the forgot password token and expiry
  user.forgotPasswordToken = null;
  user.forgotPasswordExpiry = null;

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Set the password as hashed password
  user.password = hashedPassword;
  
  await user.save();

  // Send response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password reset successfully"));
});