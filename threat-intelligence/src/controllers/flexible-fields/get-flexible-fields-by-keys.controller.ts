import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { FlexibleField } from "../../models/flexible-fields";
import { Country } from "../../models/country";
import { FlexibleFieldValue } from "../../interfaces";
import { sortByPropertyInObject } from "../../utils";

export const getFlexibleFieldsByKeys = asyncHandler(async (req: Request, res: Response) => {
    const { keys }: { keys: string[] } = req.body;

    const response: Record<string, {
        id: string,
        values: FlexibleFieldValue[]
    }> = {};

    // Fetch flexible fields
    const flexibleFields = await FlexibleField.find({ key: keys });

    // Loop through all flexible fields and add entry in the response
    flexibleFields.forEach(field => {
        response[field.key] = {
            id: String(field._id),
            values: field.values.sort(sortByPropertyInObject("value"))
        };
    });

    // If the key includes country then fetch countries and add it in the response
    if (keys.includes("country")) {
        // Fetch countries
        const countries = await Country.find({}).lean().exec();

        // Transofrm countries and sort it and add it in the response
        response.country = {
            id: "country",
            values: countries.map(country => {
                return {
                    id: String(country._id),
                    value: country.name
                }
            }).sort(sortByPropertyInObject("value"))
        };
    }


    // Send response
    return res
        .status(200)
        .json(new ApiResponse(200, response));
});