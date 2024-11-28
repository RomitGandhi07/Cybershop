import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import React, { useCallback, useRef } from "react";

interface IServicesSearchForm {
    setSearch: (search: string) => void,
}
const JobPostSearchForm: React.FC<IServicesSearchForm> = ({ setSearch }) => {
    const formRef = useRef(null);

    const onChangeSearch = useCallback((data: Record<string, string>) => {
        setSearch(data.search);
    }, [setSearch])

    const fields = [{
        name: 'search',
        className: "w-full p-3 pl-10 rounded-full border border-gray-300 focus:outline-none",
        placeholder: "Search for jobs",
        type: 'input',
        onChange: onChangeSearch
    }]

    return (
        <Form ref={formRef} defaultValues={{}}>
            {/* <div className="flex items-center content-center"> */}
            <FormItems
                fields={fields}
            />

            <PrimaryButton
                isLoader={false}
                className="ml-4 mt-4 w-1/12 hidden"
                disabled={true}
            >
                Search
            </PrimaryButton>
            {/* </div> */}
        </Form>
    )
};

export default React.memo(JobPostSearchForm);