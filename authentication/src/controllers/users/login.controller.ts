import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiError } from "../../utils/ApiError";
import bcrypt from "bcrypt";
import { jsonWebToken } from "../../services/json-web-token";

export const login = asyncHandler(async (req: Request, res: Response) => {
      // Fetch the required fields
    const { email, password, pkceEnabled = false } = req.body;

    // Check whther the user exists with specified email, if not then throw an error
    const user = await User.findOne({ email }).lean().exec();

    if(!user) {
        throw new ApiError(404, "User does not exists with specified credentials");
    }

    // Check whether user's passwords are matching or not, if not then throw an error
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if(!isPasswordMatching) {
        throw new ApiError(404, "User does not exists with specified credentials");
    }

    // Generate access token and refresh token
    const accessToken = await jsonWebToken.getAccessToken({
        id: String(user._id),
        email: user.email
    });

    const refreshToken = await jsonWebToken.getRefreshToken({
        id: String(user._id),
        pkceEnabled
    });

    // Set access token and refresh token
    // res.cookie("Token1", accessToken, app.locals.cookieOptions);
    // res.cookie("Token2", refreshToken, app.locals.cookieOptions);

    // Send response
    return res.json({
        status: 200,
        message: "Login successful",
    });
});