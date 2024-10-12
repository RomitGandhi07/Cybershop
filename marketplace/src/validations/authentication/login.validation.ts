import { ValidationChain } from "express-validator";
import { emailValidator, stringValidator } from "../../utils/express-validator-wrapper";

export const UserLoginValidation = () => {
    const validations: ValidationChain[] = [];

    stringValidator([
        {
            name: "password",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "Password must be string and of max 100 characters long."
        },
    ], validations);

    emailValidator([
        {
            name: "email",
            mandatory: true,
            message: "Email must be a valid email address"
        }
    ], validations);

    return validations;

};

