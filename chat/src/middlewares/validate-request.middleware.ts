// @ts-nocheck
import { Request, Response, NextFunction } from "express";
import { validationResult, FieldValidationError  } from "express-validator";
import { ApiError } from "../utils/ApiError";

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 *
 *
 * @description This middleware is responsible to catch request body/param/query parameters errors from express-validator
 */
export const validateRequest = (
    req: Request,
    _: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
 
    if (!errors.isEmpty()) {
        const errorsArray = errors.array();

        const invalidPathParams = errorsArray.filter(error => error.location === "params");
        if (invalidPathParams && invalidPathParams.length) {
            throw new ApiError(
                400,
                "Specified path parameters are invalid.",
                [{
                    parameters: [{
                        attributes: invalidPathParams.map(error => error.path),
                        message: "These path parameters must be valid."
                    }]
                }] as Array<never>
            );
        }
 
        const requiredQueryParams = errorsArray.filter(error => error.location === "query" && error.value === undefined);
        if (requiredQueryParams && requiredQueryParams.length) {
            throw new ApiError(
                422,
                "One or more required parameters are missing.",
                [{
                    parameters: [{
                        attributes: requiredQueryParams.map(error => error.path),
                        message: "These paramters are missing."
                    }]
                }] as Array<never>
            );
        }
 
        const invalidQueryParams = errorsArray.filter(error => error.location === "query");
        if (invalidQueryParams && invalidQueryParams.length) {
            throw new ApiError(
                400,
                "One or more query parameters specified in the request are invalid.",
                [{
                    parameters: invalidQueryParams.map(error => {
                        return { name: error.path, value: error.value, message: error.msg };
                    })
                }] as Array<never>
            );
        }
 
        const requiredBodyParams = errorsArray.filter(error => error.location === "body" && error.value === undefined);
        if (requiredBodyParams && requiredBodyParams.length) {
            throw new ApiError(
                422,
                "One or more required parameters are missing.",
                [{
                    parameters: [{
                        attributes: requiredBodyParams.map(error => error.path),
                        message: "These paramters are missing."
                    }]
                }] as Array<never>
            );
        }
 
        throw new ApiError(
            400,
            "One or more request body parameters are invalid.",
            [{
                parameters: errorsArray.map(error => {
                    return { name: error.path, value: error.value, message: error.msg };
                })
            }] as Array<never>
        );
    }

 
    next();
};