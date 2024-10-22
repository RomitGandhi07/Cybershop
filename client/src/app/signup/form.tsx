import Form, { FormItems } from '@/lib/form/form'
import React, { useRef } from 'react'
import * as Yup from 'yup';

function SignupForm() {
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
            className: "mt-2 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            mergeClasses: true,
            placeholder: "Enter your email address",
            type: 'input',
            label: 'Email'
        },
        {
            name: 'password',
            className: "mt-2 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            containerClass: "mt-4",
            placeholder: "Enter your password",
            type: 'password',
            label: 'Password',
            mergeClasses: true
        }
    ]
    return (
        <>
            <Form onSubmit={onSubmitData} validationSchema={Yup.object().shape({
                email: Yup
                    .string()
                    .email('Please enter a valid email')
                    .required('Email is required'),
                password: Yup
                    .string()
                    .required('Password is required')
                    .min(8, 'Password must be at least 8 characters long')
                    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                    .matches(/[0-9]/, 'Password must contain at least one number')
                    .matches(/[!@#\$%\^&\*]/, 'Password must contain at least one special character'),
                })} ref={formRef}>
                <FormItems fields={fields}></FormItems>
            </Form>
            <button className="mt-8 w-full bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200 my-4"
                onClick={() => {
                    onSubmit();
                }}>
                Continue
            </button>
        </>

    )
}

export default SignupForm