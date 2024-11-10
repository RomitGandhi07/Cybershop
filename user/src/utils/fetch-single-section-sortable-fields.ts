export const fetchSingleSectionSortableFields = (path: any) => {
    const fields :string[] = [];

    if(Array.isArray(path)) {
        // Loop through all fields of that section
        path.forEach((field: any) => {
            if(field.sortable) {
                fields.push(field.name);
            }
        });
    }
    return fields;
};
