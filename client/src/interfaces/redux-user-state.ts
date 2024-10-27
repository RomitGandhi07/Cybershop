export interface UserState {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    name: string,
    isEnabled: boolean
    type: string,
    isIndividualServiceProvider: boolean | null
  }