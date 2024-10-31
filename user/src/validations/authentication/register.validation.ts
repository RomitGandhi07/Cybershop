import { ValidationChain } from "express-validator";
import { booleanValidator, emailValidator, mongoIDValidator, stringValidator } from "../../utils/express-validator-wrapper";
import { UserTypesEnum } from "../../enums/user-types.enum";

export const UserRegisterValidation = () => {
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
        },
        {
            name: "password",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "Password must be string and of max 100 characters long."
        },
        {
            name: "invitationToken",
            nullable: true,
            message: "Invitation Token must be valid string."
        },
        {
            name: "type",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            customValidators: [
                (value: string) => {
                    return value === UserTypesEnum.CLIENT || value === UserTypesEnum.SERVICE_PROVIDER;
                }
            ],
            message: `Type must be either ${UserTypesEnum.CLIENT} or ${UserTypesEnum.SERVICE_PROVIDER}`
        },
    ], validations);

    emailValidator([
        {
            name: "email",
            mandatory: true,
            message: "Email must be a valid email address"
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

