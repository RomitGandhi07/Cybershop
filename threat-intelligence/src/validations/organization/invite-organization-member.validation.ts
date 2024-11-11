import { emailValidator } from "../../utils/express-validator-wrapper";

export const InviteOrganizationMemberValidation = [
    ...emailValidator([
        {
            name: "email",
            mandatory: true,
            message: "Email address must be valid."
        }
    ])
];

