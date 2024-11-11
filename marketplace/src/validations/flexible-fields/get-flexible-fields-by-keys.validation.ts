import { arrayValidator } from "../../utils/express-validator-wrapper";

export const GetFlexibleFieldsByKeysValidation = [
    ...arrayValidator([
        {
            name: "keys",
            mandatory: true,
            minLength: 1,
            message: "Keys must be valid array with min 1 element."
        }
    ])
];

