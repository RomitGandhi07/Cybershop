import { everyElementMongoId } from "../../utils/common-custom-validators";
import { arrayValidator, stringValidator } from "../../utils/express-validator-wrapper";

export const UpdateJobPostValidation = [
    ...stringValidator([
        {
            name: "title",
            maxLength: 100,
            minLength: 1,
            mandatory: false,
            message: "Title must be string and of max 100 characters long."
        },
        {
            name: "complexity",
            maxLength: 100,
            minLength: 1,
            mandatory: false,
            message: "Title must be string and of max 100 characters long."
        },
        {
            name: "expertise",
            maxLength: 100,
            minLength: 1,
            mandatory: false,
            message: "Title must be string and of max 100 characters long."
        },
        {
            name: "duration",
            maxLength: 100,
            minLength: 1,
            mandatory: false,
            message: "Title must be string and of max 100 characters long."
        },
        {
            name: "description",
            maxLength: 5000,
            minLength: 1,
            mandatory: false,
            message: "Title must be string and of max 100 characters long."
        },
    ]),
    ...arrayValidator([
        {
            name: "services",
            maxLength: 100,
            minLength: 1,
            mandatory: false,
            customValidators: [everyElementMongoId],
            message: "Services must be valid array with min 1 element."
        },
    ])
];

// TODO: Complete validation