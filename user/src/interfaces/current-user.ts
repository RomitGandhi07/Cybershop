import { UserTypesEnum } from "../enums/user-types.enum";

export interface ICurrentUser {
    id: string,
    email: string,
    type: UserTypesEnum,
    name: string,
    isEnabled: boolean,
    organizationId: string
}