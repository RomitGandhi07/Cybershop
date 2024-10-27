import { stringValidator } from "../../utils/express-validator-wrapper";

export const ForgotPasswordTokenValidation = [
    ...stringValidator([
        {
            name: "resetToken",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "Reset Token must be string and of max 100 characters long."
        }
    ])
];

