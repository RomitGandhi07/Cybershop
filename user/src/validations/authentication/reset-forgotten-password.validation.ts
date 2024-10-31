import { ValidationChain } from "express-validator";
import { stringValidator } from "../../utils/express-validator-wrapper";

export const ResetForgotPasswordRequestValidation = () => {
    const validations: ValidationChain[] = [];

    stringValidator([
        {
            name: "resetToken",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "Reset Token must be string and of max 100 characters long."
        },
        {
            name: "password",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "Password must be string and of max 100 characters long."
        },
    ], validations);

    return validations;

};

