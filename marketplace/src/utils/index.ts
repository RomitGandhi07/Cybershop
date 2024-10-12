/* eslint-disable no-useless-escape */

import mongoose from "mongoose";
import * as fs from "fs";
import { UserDoc } from "../models/user";

export const ipV46Regex =
    // eslint-disable-next-line max-len,security/detect-unsafe-regex
    /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/gm;

/* eslint-disable-next-line */
const urlRegex = /^$|^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+(\.[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+)+((\/)[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+)*(\/[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+\?[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+=[^&=]+(&[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+=[^&=]+)*)?$/im;

export const USER_TEMPORARY_TOKEN_EXPIRY = 20 * 60 * 1000; // 20 minutes

export const DEFAULT_LIMIT = 100;
export const DEFAULT_PAGE = 1;
export const SALT_ROUNDS = 10;


export const escapeRegExp = (s: string) => {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const getRandomString = (length = 16) => {
    let text = "";
    const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i += 1) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const pickFromObject = (
    obj: any,
    fields: string[],
    includeNullIfNotFound = true
) => {
    const result: any = {};
    for (const field of fields) {
        result[String(field)] =
            obj[String(field)] ?? (includeNullIfNotFound ? null : undefined);
    }
    return result;
};

export const intersectTwoObjects = (from: any, to: any) => {
    const result: any = {};
    for (const param in from) {
        if (
            to.hasOwnProperty(param) &&
            JSON.stringify(to[String(param)]) !== JSON.stringify(from[String(param)])
        ) {
            result[String(param)] = to[String(param)];
        }
    }
    return result;
};

export const hasWhiteSpace = (str: string) => {
    return /\s/.test(str);
};

export const camalize = (str: string) => {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
};

export const maxAllowedNumber = (noOfDigits = 1) => {
    return Number("9".repeat(noOfDigits));
};

export const sortByPropertyInObject = (property: string) => {
    return (a: { [key: string]: any }, b: { [key: string]: any }) =>
        a[String(property)].localeCompare(b[String(property)]);
};

export const restrictSpacesAfterPeriod = (number: number, spaces = 2) => {
    const splitNumber = String(number).split(".");
    if (splitNumber.length > 2) {
        return false;
    }

    if (splitNumber.length === 2 && splitNumber[1].length > +spaces) {
        return false;
    }

    return true;
};


export const groupBy = <T>(array: T[], predicate: (value: T, index: number, array: T[]) => string) =>
    array.reduce((acc, value, index, array) => {
        (acc[predicate(value, index, array)] ||= []).push(value);
        return acc;
    }, {} as { [key: string]: T[] });

// We will convert sync function into a promise function
// so when is ready will provide the result without blocking.
export const fileExists = async (path: string) => {
    return await new Promise((resolve) => {
        // eslint-disable-next-line no-sync,security/detect-non-literal-fs-filename
        resolve(fs.existsSync(path));
    });
};

export const calculateMonthDifference = (date1: string, date2: string) => {
    let months;
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    // Because we want to include start month also.
    months += 1;
    return months <= 0 ? 0 : months;
};

export const groupByMultipleProperties = (array: [], f: any) => {
    const groups: any = {};
    array.forEach(function (o) {
        const group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    });
};


export const removeMultipleKeysFromObject = (obj: any, keys: string[]) => {
    keys.forEach(key => {
        delete obj[String(key)];
    });
    return obj;
};


export function convertToObjectId(id: string) {
    return new mongoose.Types.ObjectId(id);
}

export const isValidMongoObjectId = (id: string) => {
    return mongoose.isObjectIdOrHexString(id);
};

export const isIPAddress = (value: string) => ipV46Regex.test(value || "");

export const isValidURL = (value: string) => urlRegex.test(value || "");

export const getUserName = (user: UserDoc | Partial<UserDoc>) => {
    return `${user.firstName} ${user.lastName}`;
}