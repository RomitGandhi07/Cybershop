import Form, { FormItems } from '@/lib/form/form'
import React, { useCallback, useRef, useState } from 'react'
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { APIStore } from '@/utils/api-store';
import { PrimaryButton } from '@/shared/components/button';

// Fields used in the form
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
];

// Form fields validation
const formValidations = Yup.object().shape({
    email: Yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required'),
    password: Yup
        .string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
});

export default function LoginForm() {
    const router = useRouter();
    const [isApiLoader, setApiLoader] = useState(false);

    const formRef = useRef(null);

    // This function is responsible for login user and redirects to home page
    const onSubmitData = useCallback(async (data: Record<any, any>) => {
        try {
            // Set API loader to true
            setApiLoader(true)

            // Call API and if we get success response then redirect user to homepage
            const response = await APIStore.loginUser(data);
            if (response.success) {
                router.push("/");
            }

        }
        finally {
            // Set API Loader to false
            setApiLoader(false)
        }
        // Login user and if API returns success then 
    }, [router]);

    // On submit on button click, submit the form
    const onSubmit = useCallback(() => {
        if (formRef && formRef.current) {
            // @ts-ignore
            formRef.current.submit();
        }
    }, []);


    return (
        <>
            <Form onSubmit={onSubmitData} validationSchema={formValidations} ref={formRef}>
                <FormItems fields={fields}></FormItems>
            </Form>

            {/* Forgot Password */}
            <div className="mt-4 text-right">
                <a href="/account-security/forgot-password" className="font-normal text-sm text-orange-600 dark:text-orange-00 hover:underline">Forgot Passowrd?</a>
            </div>

            {/* Submit Button */}
            <PrimaryButton
                isLoader={isApiLoader}
                className='mt-6'
                mergeClasses={true}
                onClick={() => {
                    onSubmit();
                }}
            >
                Continue
            </PrimaryButton>
        </>
    )
}