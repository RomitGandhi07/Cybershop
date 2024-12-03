import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import React, { useCallback, useRef } from "react";
import * as Yup from "yup";


interface IProposalPostCoverLetterForm {
    description: string,
    setDescription: (search: string) => void
}
const ProposalCoverLetterForm: React.FC<IProposalPostCoverLetterForm> = ({ description, setDescription }) => {
    const formRef = useRef(null);

    const onChangeSearch = useCallback((data: Record<string, string>) => {
        setDescription(data.description);
    }, [setDescription])

    const fields = [{
        name: 'description',
        className: "text-black mt-4 rounded-3xl w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        type: 'textarea',
        label: "Cover Letter",
        rows: 10,
        cols: 40,
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

export default React.memo(ProposalCoverLetterForm);