// /* eslint-disable max-statements */
// import { fetchModuleFilterFields } from "./fetch-module-filter-fields";
// import { FilterOperators } from "../enums/filter-operators";
// import { fetchSectionFilterFields } from "./fetch-single-section-filter-fields";
// import { ValueTypesEnum } from "../enums/value-types.enum";
// import { convertToObjectId, sanitizeEmail, sanitizeIP, sanitizeURI, escapeRegExp, isValidMongoObjectId } from "./index";
// import { FilterFields, FilterQuery } from "../interfaces";

// const splitOperateFieldValue = (query: string) => {
//     const [field, operator, ...rest] = query.split(" ");
//     const value = rest.join(" ") ?? null;

//     return {
//         field: field.trim(),
//         operator,
//         value
//     };
// };

// const checkFieldAllowed = ({ field, operator, fieldsMap }: {field: string, operator: FilterOperators, fieldsMap: Map<string, FilterFields>}) => {
//     const fieldObj = fieldsMap.get(field);
//     return !(!fieldObj || !fieldObj.allowedFilters.map(field => field.value).includes(operator));
// };

// const formatValue = ({ field, fieldsMap, operator, value }: {field: string, operator: FilterOperators, fieldsMap: Map<string, FilterFields>, value: string}) => {
//     const response: {
//         isAllowed: boolean,
//         value: any
//     } = {
//         isAllowed: false,
//         value: null
//     };

//     const fieldObj = fieldsMap.get(field);
//     if (!fieldObj) {
//         return response;
//     }

//     // If operator is isBlank is then make isAllowed to true
//     if(operator === FilterOperators.IS_BLANK) {
//         response.isAllowed = true;
//         return response;
//     }

//     let formattedValue;
//     const isArrayValue = operator === FilterOperators.IN || operator === FilterOperators.NIN;
//     if (isArrayValue) {
//         const matches = (value || "").match(/\((.*?)\)/);
//         if (matches && matches.length >= 2) {
//             formattedValue = matches[1].split(",");
//             formattedValue = formattedValue.map(val => {
//                 let v = val.trim();
//                 if (v.startsWith("'") && v.endsWith("'")) {
//                     v = v.slice(1).slice(0, -1);
//                 }
//                 return v;
//             });
//         }
//         else {
//             return response;
//         }
//     }
//     else {
//         if (value.startsWith("'") && value.endsWith("'")) {
//             formattedValue = value.slice(1).slice(0, -1);
//         }
//     }

//     if(!formattedValue) {
//         return response;
//     }

//     // Number or percentage or currency
//     if (fieldObj.type === ValueTypesEnum.NUMBER || fieldObj.type === ValueTypesEnum.PERCENTAGE || fieldObj.type === ValueTypesEnum.CURRENCY) {
//         if (isArrayValue) {
//             // Convert every element to number
//             formattedValue = (formattedValue as string[]).map(val => {
//                 return Number(val);
//             });

//             // If any element is not a number than return not valid
//             const everyValueNumber = formattedValue.every(val => !isNaN(val));
//             if (!everyValueNumber) {
//                 return response;
//             }
//         }
//         else {
//             // Convert to number
//             const numberValue = Number(formattedValue);
//             if (isNaN(numberValue)) {
//                 return response;
//             }
//             formattedValue = numberValue;
//         }
//     }
//     // IP Address
//     else if (fieldObj.type === ValueTypesEnum.IP_ADDRESS) {
//         if (isArrayValue) {
//             // Convert every element to IP Address
//             formattedValue = (formattedValue as string[]).map(val => {
//                 return fieldObj.ignoreSanitize ? val : sanitizeIP(val || "");
//             });
//         }
//         else if (operator === FilterOperators.STARTS_WITH) {
//             const vals = (formattedValue as string).split(".");
//             if (vals.length === 4 || vals.length === 6) {
//                 formattedValue = fieldObj.ignoreSanitize ? formattedValue : sanitizeIP(String(formattedValue));
//             }
//         }
//         else if (operator === FilterOperators.ENDS_WITH) {
//             const vals = (formattedValue as string).split(".");
//             if (vals.length >= 2) {
//                 formattedValue = fieldObj.ignoreSanitize ? formattedValue : sanitizeIP(String(formattedValue));
//             }
//         }
//         else {
//             formattedValue = fieldObj.ignoreSanitize ? formattedValue : sanitizeIP(String(formattedValue));
//         }
//     }
//     else if (fieldObj.type === ValueTypesEnum.URL) {
//         if (isArrayValue) {
//             formattedValue = (formattedValue as string[]).map(val => {
//                 return fieldObj.ignoreSanitize ? val : sanitizeURI(val || "");
//             });
//         }
//         else {
//             formattedValue = fieldObj.ignoreSanitize ? formattedValue : sanitizeURI(String(formattedValue));
//         }
//     }
//     else if (fieldObj.type === ValueTypesEnum.EMAIL) {
//         if (isArrayValue) {
//             formattedValue = (formattedValue as string[]).map(val => {
//                 return fieldObj.ignoreSanitize ? val : sanitizeEmail(val || "");
//             });
//         }
//         else {
//             formattedValue = fieldObj.ignoreSanitize ? formattedValue : sanitizeEmail(String(formattedValue));
//         }
//     }
//     else if (fieldObj.type === ValueTypesEnum.DROPDOWN) {
//         if (isArrayValue) {
//             if (!fieldObj.ignoreSanitize) {
//                 // Check every element mongo id, if not return mongo ID
//                 const isEveryElementMongoID = (formattedValue as string[]).every(val => {
//                     return isValidMongoObjectId(val);
//                 });

//                 if (!isEveryElementMongoID) {
//                     return response;
//                 }

//                 // Convert to mongoID
//                 formattedValue = (formattedValue as string[]).map(val => {
//                     return convertToObjectId(val);
//                 });
//             }

//         }
//         else {
//             if (!fieldObj.ignoreSanitize) {
//                 const isMongoID = isValidMongoObjectId(formattedValue as string);
//                 if (!isMongoID) {
//                     return response;
//                 }

//                 formattedValue = convertToObjectId(formattedValue as string);
//             }

//         }
//     }
//     else if (fieldObj.type === ValueTypesEnum.DATE) {
//         if (isArrayValue) {
//             // Check every element date, if not return not valid
//             const isEveryElementDate = (formattedValue as string[]).every(val => {
//                 return new Date(val).toString() === "Invalid Date";
//             });
//             if (!isEveryElementDate) {
//                 return response;
//             }

//             // Convert every element to date
//             formattedValue = (formattedValue as string[]).map(val => {
//                 return new Date(val);
//             });
//         }
//         else {
//             const date = new Date(formattedValue as string);
//             if (date.toString() === "Invalid Date") {
//                 return response;
//             }
//             formattedValue = date;
//         }
//     }
//     else if (fieldObj.type === ValueTypesEnum.BOOLEAN) {
//         if (isArrayValue) {
//             // Convert every element to IP Address
//             formattedValue = (formattedValue as string[]).map(val => {
//                 return (val === "true");
//             });
//         }
//         else {
//             formattedValue = (formattedValue === "true");
//         }
//     }

//     response.isAllowed = true;
//     response.value = formattedValue;
//     return response;
// };

// export const filtersParser = ({ filter, path, prefix = "", isSubSection = false, includeFieldOperatorMapping = false }:
//                                   { filter: string, path: any, prefix?: string, isSubSection?: boolean, includeFieldOperatorMapping?: boolean }) => {
//     let fields: FilterFields[] = [];

//     // Fetch fields
//     if (isSubSection) {
//         fields = fetchSectionFilterFields(path);
//     }
//     else {
//         fields = fetchModuleFilterFields(path);
//     }

//     const mongoFilters: FilterQuery = {};
//     const fieldOperatorMapping: { [key: string]: { value: any, operator: FilterOperators } } = {};
//     if (!fields.length) {
//         return mongoFilters;
//     }

//     // Make fields map
//     const fieldsMap: Map<string, FilterFields> = new Map();
//     fields.forEach((field) => {
//         fieldsMap.set(field.name, field);
//     });

//     // Split filter with and
//     // eslint-disable-next-line security/detect-unsafe-regex
//     const filters = filter.split(/(?<=^([^']|'[^']*')*) and /gm);
//     filters.forEach(filterQuery => {
//         const query = filterQuery.trim();

//         // Get field and value and check whether field is allowed or not
//         const fieldValue = splitOperateFieldValue(query);
//         const operator: any = fieldValue.operator;

//         // If operator is allowed then only continue
//         if(operator) {
//             if (fieldValue && checkFieldAllowed({ field: fieldValue.field, fieldsMap, operator })) {

//                 // Fetch formatted value
//                 const formattedValue = formatValue({
//                     field: fieldValue.field,
//                     value: fieldValue.value ?? "",
//                     operator,
//                     fieldsMap
//                 });

//                 // Check is value allowed
//                 if (formattedValue.isAllowed) {
//                     const value: any = formattedValue.value;

//                     fieldOperatorMapping[fieldValue.field] = { value, operator: operator };

//                     // Apply mongo filter based on operator
//                     if(operator === FilterOperators.IS_BLANK) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $in: [null, "", []] };
//                     }
//                     else if (operator === FilterOperators.STARTS_WITH) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $regex: `^${escapeRegExp(value.trim())}`, $options: "im" };
//                     }
//                     else if (operator === FilterOperators.ENDS_WITH) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $regex: `${escapeRegExp(value.trim())}$`, $options: "im" };
//                     }
//                     else if (operator === FilterOperators.CONTAINS) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $regex: `${escapeRegExp(value.trim())}`, $options: "im" };
//                     }
//                     else if (operator === FilterOperators.EQ) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = value;
//                     }
//                     else if (operator === FilterOperators.NE) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $ne: value };
//                     }
//                     else if (operator === FilterOperators.GE) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $gte: value };
//                     }
//                     else if (operator === FilterOperators.LE) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $lte: value };
//                     }
//                     else if (operator === FilterOperators.IN) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $in: value };
//                     }
//                     else if (operator === FilterOperators.NIN) {
//                         mongoFilters[`${prefix ? prefix + "." : ""}${fieldValue.field}`] = { $nin: value };
//                     }
//                 }
//             }
//         }
//     });

//     if (includeFieldOperatorMapping) {
//         return {
//             fieldOperatorMapping,
//             mongoFilters
//         };
//     }

//     return mongoFilters;
// };

export const filtersParser = (data: Record<string, any>) => {

}

// TODO: Need to setup filters parser and in future need to use this for filter