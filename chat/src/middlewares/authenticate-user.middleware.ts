import mongoose from "mongoose";

import { asyncHandler } from "../utils/asyncHandler";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { User } from "../models/user";
import { ICurrentUser } from "../interfaces";
import { getUserName } from "../utils";

// import { removeUnusedMulterImageFilesOnError } from "../utils/helpers.js";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 *
 * @description This middleware is responsible to validate that user is authenticated or not {@link asyncHandler}
 */
const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Fetch the token from signed cookies
        const token = req.signedCookies?.Token1 ?? null;
        if (!token) {
            throw new ApiError(401, "Invalid Or Expired Token");
        }

        try {
            // Verify JWT is valid or not
            const userPayload = jwt.verify(
                token,
                String(process.env.JWT_SECRET),
                { algorithms: ["HS256"] }
            ) as ICurrentUser;

            // Verify user is valid or not, if not then throw an error
            const user = await User.findById(userPayload.id).lean().exec();
            if (!user) {
                throw new Error();
            }

            // Set the data in the current user object
            req.currentUser = {
                id: String(user._id),
                email: user.email,
                type: user.type,
                name: getUserName(user),
                isEnabled: user.isEnabled
            }

            next();
        }
        catch (err) {
            throw new ApiError(401, "Invalid Or Expired Token");
        }
    }
    catch (err) {
        next(err);
    }

};

export { authenticateUser };
