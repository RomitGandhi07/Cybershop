import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiResponse } from "../../utils/ApiResponse";

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.body;
  await User.findByIdAndUpdate(
    id, // TODO: Change this to get it from req.user
    {
      $set: {
        refreshToken: '',
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});