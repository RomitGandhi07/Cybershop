import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { ApiResponse } from "../../utils/ApiResponse";
import { PipelineStage } from "mongoose";
import { Service, ServiceDoc } from "../../models/service";
import { escapeRegExp, fetchDefaultSortObject } from "../../utils";
import { SortQuery } from "../../interfaces";
import { ApiError } from "../../utils/ApiError";

export const getServices = asyncHandler(async (req: Request, res: Response) => {
    // If current user not found then throw internal server error
    if (!req.currentUser) {
        throw new ApiError(500, "Something went wrong");
    }

    const { sort, search, groupByCategory } = req.query;

    // If search is passed then perapre search query
    const searchQuery: { "name"?: { $regex: string, $options: string } } = {};
    if (search) {
        searchQuery["name"] = { $regex: `${escapeRegExp(search as string)}`, $options: "i" };
    }

    const aggregateQuery: PipelineStage[] = [
        {
            "$match": searchQuery
        }
    ];

    // If sort query is passed
    const sortQuery: SortQuery = fetchDefaultSortObject(sort as string);
    if (sort) {
        // Split by space
        const sortSplit = (sort as string).split(" ");

        // If it's length is 2 and field name is name then
        if (sortSplit.length === 2 && sortSplit[0] === "name") {
            // Based on asc and desc we will add it in the sortQuery
            if (sortSplit[1] === "asc") {
                sortQuery.name = 1;
            }
            else if (sortSplit[1] === "desc") {
                sortQuery.name = -1;
            }
        }
    }

    // If there is any value in sort query then add it in the aggregate query
    if (Object.keys(sortQuery).length) {
        aggregateQuery.push({
            $sort: sortQuery
        })
    }

    // Add new id field and remove _id
    aggregateQuery.push({
        $addFields: {
            "id": "$_id"
        }
    });
    aggregateQuery.push({
        $project: {
            "_id": 0
        }
    });

    // If groupByCategory is passed then we will send response in groupBy Format
    if (groupByCategory && groupByCategory === "true") {
        aggregateQuery.push({
            $group: {
                _id: "$type.id",
                "type": { $first: "$type.value" },
                services: {
                    $push: "$$ROOT"
                }
            },
        }, {
            $sort: {
                type: 1
            }
        })
    }

    const services = await Service.aggregate(aggregateQuery);

    // If groupBycategory is true then transofrm the response
    if (groupByCategory && groupByCategory === "true") {
        const response: Record<string, ServiceDoc[]> = {};
        services.forEach(service => {
            response[service.type] = service.services;
        });

        return res
            .status(200)
            .json(new ApiResponse(200, response));
    }

    // Send response
    return res
        .status(200)
        .json(new ApiResponse(200, services));
});