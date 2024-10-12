import { ValidationChain } from "express-validator";
import { mongoIDValidator, stringValidator } from "../../utils/express-validator-wrapper";

export const UpdateUserProfileValidation = () => {
    const validations: ValidationChain[] = [];

    stringValidator([
        {
            name: "firstName",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "First Name must be string and of max 100 characters long."
        },
        {
            name: "lastName",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "Last Name must be string and of max 100 characters long."
        }
    ], validations);

    mongoIDValidator([
        {
            name: "country",
            mandatory: true,
            message: "Country must be a valid Mongo ID"
        }
    ], validations);

    return validations;

};

