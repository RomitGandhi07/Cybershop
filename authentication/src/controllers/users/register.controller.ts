import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { pickFromObject, SALT_ROUNDS } from "../../utils";
import { User } from "../../models/user";
import { ApiError } from "../../utils/ApiError";
import { Country } from "../../models/country";
import bcrypt from "bcrypt";
import { ApiResponse } from "../../utils/ApiResponse";

export const registerUser = asyncHandler(async (req: Request, res: Response) => {
      // Fetch the required fields
      const userDetails = pickFromObject(req.body,
        ["email", "password", "firstName", "lastName", "type", "isIndividualServiceProvider", "country"]);

    // Check whther the user already exists or not
    const isUserAlreadyExists = await User.countDocuments({ email: userDetails.email });
    if(isUserAlreadyExists) {
        // Throw error that user already exists
        throw new ApiError(409, "User already exists.")
    }

    // Check whether country is valid or not, if not then throw an error
    const country = await Country.findById(userDetails.country).lean().exec();
    if(!country) {
        // Throw error that country is not valid
        throw new ApiError(404, "Invalid Country");
    }
    userDetails.country = {
        id: String(country._id),
        value: country.name
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userDetails.password, SALT_ROUNDS);


    // Save user details
    const user = await User.build({
        ...userDetails,
        password: hashedPassword
    }).save();

    // TODO: Need publisher of emitting event of user creation

    return res
    .status(201)
    .json(new ApiResponse(201, {
        id: String(user._id)
    }, "User signed up successfully"));
});