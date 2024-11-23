import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import React, { useCallback, useRef } from "react";
import * as Yup from "yup";

interface IJobPostTitleForm {
    title: string,
    setTitle: (search: string) => void
}
const JobPostTitleForm: React.FC<IJobPostTitleForm> = ({ title, setTitle }) => {
    const formRef = useRef(null);

    const onChangeSearch = useCallback((data: Record<string, string>) => {
        setTitle(data.title);
    }, [setTitle])

    const fields = [{
        name: 'title',
        className: "text-black mt-4 rounded-3xl w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        placeholder: "Enter job title",
        type: 'input',
        label: "Write a title for your job post",
        onChange: onChangeSearch
    }]

    const formValidations = Yup.object().shape({
        title: Yup.string()
        .required('Title is required')
        .max(100, 'Title cannot exceed 100 characters'),
    })

    return (
        <Form ref={formRef} defaultValues={{
            title
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

export default React.memo(JobPostTitleForm);