import { filtersParser } from "./filters-parser";
import { FilterQuery } from "../interfaces";

export const fetchFiltersFromMultipleSectionsBasedOnPermission = ({ filter, sections, assignedActions }:
    {filter: string, sections: {path: any, prefix?: string, action?: string}[], assignedActions?: Set<string>}) => {
    const mongoFilters: FilterQuery = {};
    sections.forEach(section => {
        if(!assignedActions || !section.action || assignedActions.has(section.action)) {
            const filters = filtersParser({
                filter,
                prefix: section.prefix,
                path: section.path,
                isSubSection: true
            });

            Object.assign(mongoFilters, filters);
        }
    });

    return mongoFilters;
};
