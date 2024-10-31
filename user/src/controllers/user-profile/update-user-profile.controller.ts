import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { User } from "../../models/user";
import { ApiResponse } from "../../utils/ApiResponse";
import { UserTypesEnum } from "../../enums/user-types.enum";
import { ApiError } from "../../utils/ApiError";
import { intersectTwoObjects, pickFromObject } from "../../utils";
import { Country } from "../../models/country";

export const updateUserProfile = asyncHandler(async (req: Request, res: Response) => {
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
    const user = await User.findById(req.currentUser.id);
    if (!user) {
        throw new ApiError(500, "Something went wrong");
    }

    // Fetch fields from request body which can updated
    const userDetails = pickFromObject(req.body,
        ["firstName", "lastName", "country"]);

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

    // Fetch fields which are updated
    const updatedData = intersectTwoObjects(user, userDetails);


    // If there are any fields which are updated then save those fields
    if (Object.keys(updatedData).length) {
        Object.assign(user, updatedData);
        await user.save();
    }

    // Send response
    return res
        .status(200)
        .json(new ApiResponse(200, {
            updatedData
        }, "User details updated successfully."));
});