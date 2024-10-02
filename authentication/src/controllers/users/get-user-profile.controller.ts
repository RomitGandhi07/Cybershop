import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiResponse } from "../../utils/ApiResponse";
import { ApiError } from "../../utils/ApiError";

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {
    // req.currentUser = {
    //     id: "66e6d47d026901b3dfbd67d9",
    //     email: "gandhiromit77@gmail.com",
    //     type: UserTypesEnum.CLIENT
    // }
    
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    // Find the user, if the user not found then throw internal server error
    const user = await User.findById(req.currentUser.id, {
        password: 0,
        emailVerificationToken: 0,
        emailVerificationExpiry: 0,
        forgotPasswordToken: 0,
        forgotPasswordExpiry: 0,
        refreshToken: 0
    }).lean().exec();
    if (!user) {
        throw new ApiError(500, "Something went wrong");
    }

    // Send response
    return res
      .status(200)
      .json(new ApiResponse(200, {
        ...user,
        id: String(user._id),
        _id: undefined
      }));
});