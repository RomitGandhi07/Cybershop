import { ValueTypesEnum } from "../enums/value-types.enum";

export interface FilterFields {
    displayName?: string,
    name: string,
    isFlexibleField: boolean,
    key?: string | null,
    allowedFilters: {label: string, value: string}[],
    type: ValueTypesEnum,
    values?: {id: string, value: string}[]  | null,
    isBooleanField?: boolean,
    isQuickFilter?: boolean
}
