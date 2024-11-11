import { SortQuery } from "../interfaces";
import { fetchSingleSectionSortableFields } from "./fetch-single-section-sortable-fields";

export const fetchSortFromMultipleSectionsBasedOnPermission = ({ sort, sections, assignedActions }:
    {sort: string, sections: {path: any, prefix?: string, action?: string}[], assignedActions?: Set<string>}) => {
    const sortQuery: SortQuery = {};

    // If query is not valid then return empty sort object
    const sortSplit = sort.split(" ");
    if(sortSplit.length !== 2 || (sortSplit[1] !== "asc" && sortSplit[1] !== "desc")) {
        return sortQuery;
    }

    // Loop through all sections
    for(const section of sections) {
        // if user has that action assigned
        if(!assignedActions || !section.action || assignedActions.has(section.action)) {
            // Fetch sortable fields of that section
            const fields = fetchSingleSectionSortableFields(section.path);

            // If that section contains that field
            if(new Set(fields).has(sortSplit[0])) {
                // Add entry in sort query
                sortQuery[`${section.prefix ? section.prefix + "." : ""}${sortSplit[0]}`] = sortSplit[1] === "asc" ? 1 : -1;
                break;
            }
        }
    }

    return sortQuery;
};
