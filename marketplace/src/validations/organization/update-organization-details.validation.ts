import { ValidationChain } from "express-validator";
import { numberValidator, stringValidator, urlValidator } from "../../utils/express-validator-wrapper";

export const UpdateOrganizationDetailsValidation = () => {
    const validations: ValidationChain[] = [];

    stringValidator([
        {
            name: "name",
            maxLength: 100,
            minLength: 1,
            nullable: true,
            message: "Name must be string and of max 100 characters long."
        },
        {
            name: "industry",
            maxLength: 100,
            minLength: 1,
            nullable: true,
            message: "Industry must be string and of max 100 characters long."
        },
        {
            name: "tagline",
            maxLength: 100,
            minLength: 1,
            nullable: true,
            message: "Tagline must be string and of max 100 characters long."
        },
        {
            name: "description",
            maxLength: 2000,
            minLength: 1,
            nullable: true,
            message: "Description must be string and of max 2000 characters long."
        },
        {
            name: "logo",
            maxLength: 500,
            minLength: 1,
            nullable: true,
            message: "logo must be string and of max 500 characters long."
        },
    ], validations);

    urlValidator([
        {
            name: "website",
            nullable: true,
            message: "Website must be a valid URL."
        }
    ], validations);

    numberValidator([
        {
            name: "noOfEmployees",
            min: 0,
            maxLength: 16,
            nullable: true,
            message: "Number of employees must be positive number and of max 16 digits long."
        }
    ], validations);

    return validations;

};

