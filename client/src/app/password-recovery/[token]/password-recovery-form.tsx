"use client"

import Form, { FormItems } from "@/lib/form/form";
import { APIStore } from "@/utils/api-store";
import { redirect } from "next/navigation";
import { useRef } from "react";
import * as Yup from "yup";

interface IPasswordRecoveryFormProps {
    token: string
}

const PasswordRecoveryForm: React.FC<IPasswordRecoveryFormProps> = ({ token }) => {
    const formRef = useRef(null);

    // This function is used to reset the password after providing password
    const onSubmitData = async (data: { password: string }) => {
        // Reset the forgotten password
        const response = await APIStore.resetForgottenPassword({
            resetToken: token,
            password: data.password
        });

        if (response.success) {
            redirect("/login");
        }


    }

    // This function is used to click the form's submit button
    const onSubmit = () => {
        if (formRef && formRef.current) {
            // @ts-ignore
            formRef.current.submit();
        }
    };

    // Fields of the form
    const fields = [
        {
            name: 'password',
            className: "mt-2 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            containerClass: "mt-4",
            placeholder: "Enter your password",
            type: 'password',
            label: 'Enter Password',
            mergeClasses: true
        },
        {
            name: 'confirmPassword',
            className: "mt-2 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            containerClass: "mt-4",
            placeholder: "Re-enter your password",
            type: 'password',
            label: 'Re-enter Password',
            mergeClasses: true
        }
    ];

    const formValidations = Yup.object().shape({
        password: Yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#\$%\^&\*]/, 'Password must contain at least one special character'),
        confirmPassword: Yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[!@#\$%\^&\*]/, 'Password must contain at least one special character'),
    });

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="w-[600px] h-[400px] flex flex-col items-center justify-start">
                {/* <!-- Logo --> */}
                {/* <div className="flex justify-start w-full mb-10">
                    <img src="https://placehold.co/100x40" alt="Upwork Logo" className="ml-6 w-24 h-10" />
                </div> */}

                {/* <!-- Card Container --> */}
                <div className="bg-white shadow-md rounded-lg w-[400px] p-8">
                    <h1 className="text-2xl font-semibold text-center mb-4">Enter new password</h1>

                    <Form onSubmit={onSubmitData} validationSchema={formValidations} ref={formRef}>
                        <FormItems fields={fields}></FormItems>
                    </Form>

                    {/* <!-- Change Password Button --> */}
                    <button className="mt-8 w-full bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200 my-4"
                        onClick={onSubmit}>
                        Change password
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PasswordRecoveryForm;