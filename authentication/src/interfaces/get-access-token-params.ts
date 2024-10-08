import { UserTypesEnum } from "../enums/user-types.enum";

export interface GetAccessTokenParams {
  id: string,
  email: string,
  type: UserTypesEnum,
  isIndividualServiceProvider: boolean | null
}
