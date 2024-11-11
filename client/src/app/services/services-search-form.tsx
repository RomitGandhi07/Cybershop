import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import React, { useCallback, useRef } from "react";

interface IServicesSearchForm {
    setSearch: (search: string) => void
    fetchServicesByCategory: () => Promise<void>
}
const ServicesSearchForm: React.FC<IServicesSearchForm> = ({ setSearch }) => {
    const formRef = useRef(null);

    const onChangeSearch = useCallback((data: Record<string, string>) => {
        setSearch(data.search);
    }, [setSearch])

    const fields = [{
        name: 'search',
        className: "text-black mt-4 rounded-3xl w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        placeholder: "Search Services",
        type: 'input',
        onChange: onChangeSearch
    }]

    return (
        <Form ref={formRef} defaultValues={{}}>
            <div className="flex items-center content-center">
                <FormItems
                    fields={fields}
                />
            </div>

            <PrimaryButton
                isLoader={false}
                className="ml-4 mt-4 w-32 hidden"
                disabled={true}
            >
                Search
            </PrimaryButton>

        </Form>
    )
};

export default React.memo(ServicesSearchForm);