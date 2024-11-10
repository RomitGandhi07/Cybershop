import { isValidMongoObjectId } from "./index";

export const everyElementMongoId = (valueIds: string[]) => {
    return valueIds.every(valueId => {
        return isValidMongoObjectId(valueId);
    });
};

export const urlValidation = (value: string) => {
    /* eslint-disable-next-line */
    const urlValidation = /^$|^((ftp|http|https):\/\/)?(www.)?[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+(\.[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+)+((\/)[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+)*(\/[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+\?[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+=[^&=]+(&[\w$-_.+!*'(),#%\{\}|\\^~\[\]`<>#%"]+=[^&=]+)*)?$/im;
    return urlValidation.test(value);
};

export const isMoxIdIsInValidFormat = (val: string) => {
    return new RegExp("^MOX\\d{2}-\\d{4}$", "im").test(val);
};
