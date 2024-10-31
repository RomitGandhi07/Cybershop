export const DEFAULT_NOTIFICATION_DISPLAY_TIME = 5000;

export const convertCamelCaseToTitle = (text: string) => {
    const result = text.replace(/([A-Z])/g, " $1");
    return result.charAt(0).toUpperCase() + result.slice(1);
}