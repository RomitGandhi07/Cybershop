import { ValidationChain } from "express-validator";
import { emailValidator } from "../../utils/express-validator-wrapper";

export const ForgotPasswordRequestValidation = () => {
    const validations: ValidationChain[] = [];

    emailValidator([
        {
            name: "email",
            mandatory: true,
            message: "Email must be a valid email address"
        }
    ], validations);

    return validations;

};

