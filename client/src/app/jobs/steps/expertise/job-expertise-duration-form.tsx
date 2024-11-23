import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import React, { useCallback, useRef } from "react";
import * as Yup from "yup";


interface IJobPostDescriptionForm {
    description: string,
    setDescription: (search: string) => void
}
const JobPostDurationForm: React.FC<IJobPostDescriptionForm> = ({ description, setDescription }) => {
    const formRef = useRef(null);

    const onChangeSearch = useCallback((data: Record<string, string>) => {
        setDescription(data.description);
    }, [setDescription])

    const fields = [{
        name: 'duration',
        className: "mt-4 bg-white w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        type: 'radio',
        options: [
            {label: "Entry", value: "64d6e38d5f3c7e6b2f9c820c", description: "Looking for someone relatively new to this field"},
            {label: "Intermediate", value: "64d6e38d5f3c7e6b2f9c820d", description: "Looking for substantial experience in this field"},
            {label: "Expert", value: "64d6e38d5f3c7e6b2f9c820e", description: "Looking for comprehensive and deep expertise in this field"}
        ],
        // label: "How long will your work take?",
        onChange: onChangeSearch
    }]

    const formValidations = Yup.object().shape({
        description: Yup.string()
        .required('Description is required')
        .max(5000, 'Description cannot exceed 5000 characters'),
    })

    return (
        <Form ref={formRef} defaultValues={{
            description
        }} validationSchema={formValidations}>
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
                Next
            </PrimaryButton>

        </Form>
    )
};

export default React.memo(JobPostDurationForm);