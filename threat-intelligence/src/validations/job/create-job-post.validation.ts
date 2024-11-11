import { stringValidator } from "../../utils/express-validator-wrapper";

export const CreateJobPostValidation = [
    ...stringValidator([
        {
            name: "title",
            maxLength: 100,
            minLength: 1,
            mandatory: true,
            message: "Title must be string and of max 100 characters long."
        },
    ])
];

