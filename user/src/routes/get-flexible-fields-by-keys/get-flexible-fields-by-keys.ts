import express, { Request, Response, NextFunction } from "express"
import { Country } from "../../models/country";
import { FlexibleFieldsResponse } from "../../interfaces";

const router = express.Router()

router.put("/fields/byKeys", async (req: Request, res: Response, next: NextFunction) => {
    // Fetch the required fields
    const { keys } = req.body;

    const response: Array<FlexibleFieldsResponse> = [];

    if(keys.includes("country")) {
        const countries = await Country.find({}).sort({name: 1}).lean().exec();

        response.push({
            key: "country",
            values: countries.map(country => {
                return {
                    id: String(country._id),
                    value: country.name
                }
            })
        })

    }

    // Send response
    return res.json({
        status: 200,
        data: response,
    });
})