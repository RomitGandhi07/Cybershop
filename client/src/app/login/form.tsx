import Form, { FormItems } from '@/lib/form/form'
import React, { useRef } from 'react'

function LoginForm() {
    const formRef = useRef(null);
    const onSubmitData = (data: any) => {
        console.info("data", data)
    }

    const onSubmit = () => {
        if (formRef && formRef.current) {
            // @ts-ignore
            formRef.current.submit();
        }
    };

    const fields = [
        {
            name: 'email',
            class: "mb-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Enter your email address",
            type: 'input',
            label: 'Email ',
            maxlength: 250,
            maxCharacter: 250,
        },
        {
            name: 'password',
            class: "mb-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Enter your password",
            type: 'password',
            label: 'Password',
            maxlength: 20
        },
    ]
    return (
        <>
            <Form onSubmit={onSubmitData} ref={formRef}>
                <FormItems fields={fields}></FormItems>
            </Form>
            <button className="w-full bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200 my-4"
                onClick={() => {
                    onSubmit();
                }}>
                Continue
            </button>
        </>

    )
}

export default LoginForm