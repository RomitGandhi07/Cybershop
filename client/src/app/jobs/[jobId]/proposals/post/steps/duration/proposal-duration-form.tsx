import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import React, { useCallback, useRef } from "react";
import * as Yup from "yup";


interface IProposalPostDurationForm {
    duration: string,
    setDuration: (search: string) => void
}
const ProposalDurationForm: React.FC<IProposalPostDurationForm> = ({ duration, setDuration }) => {
    const formRef = useRef(null);

    const onChangeSearch = useCallback((data: Record<string, string>) => {
        setDuration(data.duration);
    }, [setDuration])

    const fields = [{
        name: 'duration',
        className: "mt-4 bg-white w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        type: 'radio',
        options: [
            {label: "Less than 7 days", value: "Less than 7 days"},
            {label: "7 to 15 days", value: "7 to 15 days"},
            {label: "15 to 30 days", value: "15 to 30 days"},
            {label: "1 to 3 months", value: "1 to 3 months"},
            {label: "3 to 6 months", value: "3 to 6 months"},
            {label: "More than 6 month", value: "More than 6 month"},
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
            duration
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

export default React.memo(ProposalDurationForm);