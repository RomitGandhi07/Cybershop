"use client";
import Form, { FormItems } from '@/lib/form/form'
import React, { useContext, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import { SignUpContext } from './Signup';
import { UserTypesEnum } from '@/enums/user-types.enum';
import { useRouter } from 'next/navigation';
import { APIStore } from '@/utils/api-store';
import { ApiSuccessResponse } from '@/interfaces';
import { PrimaryButton } from '@/shared/components/button';

interface ISignupFormProps {
    invitationToken: string | null,
    organization: { id: string, name: string } | null
}

export const SignupForm: React.FC<ISignupFormProps> = ({ invitationToken, organization }) => {
    const formRef = useRef(null);
    const context = useContext(SignUpContext);
    const router = useRouter();
    const [flexibleFields, setFlexibleFields] = useState<Record<string, {
        id: string,
        values: { id: string, value: string }[]
    }>>({});
    const [isApiLoader, setApiLoader] = useState(false);


    const fetchCountries = async () => {
        // Fetch country
        const response = await APIStore.fetchUserFlexibleFields({
            keys: ["country"]
        });

        // If API gives success then
        if (response.success) {
            setFlexibleFields((response as ApiSuccessResponse).data);
        }
    }

    useEffect(() => {
        fetchCountries();
    }, []);

    const onSubmitData = async (data: any) => {
        setApiLoader(true);
        // If organization is there means invitation token is valid then add that token in the request body
        if (organization) {
            data.invitationToken = invitationToken;
        }

        data.type = context.role

        delete data.confirmPassword;


        const response = await APIStore.signUpUser(data);
        if (response.success) {
            router.push("/account-security/login")
        }

        setApiLoader(false);
    }

    const onSubmit = () => {
        if (formRef && formRef.current) {
            // @ts-ignore
            formRef.current.submit();
        }
    };

    const clearForm = () => {
        if (formRef && formRef.current) {
            console.info(formRef);
            // @ts-ignore
            formRef.current.resetAll();
        }
    }

    const fields: Array<any> = [
        {
            name: 'firstName',
            className: "mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "First Name",
            type: 'input'
        },
        {
            name: 'lastName',
            className: "mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Last Name",
            type: 'input'
        },
        {
            name: 'email',
            className: "mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Email Address",
            type: 'input',
        },
        {
            name: 'password',
            className: "mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Password",
            type: 'password',
        },
        {
            name: 'confirmPassword',
            className: "mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Confirm Password",
            type: 'password',
        },
        {
            name: 'country',
            className: "mt-4 bg-white w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Select Country",
            options: (flexibleFields?.country?.values ?? []).map(record => {
                return {
                    label: record.value,
                    value: record.id
                }
            }),
            type: 'select'
        }
    ];


    const formValidations = Yup.object().shape({
        firstName: Yup.string()
            .required('First name is required')
            .max(100, 'First name cannot exceed 100 characters'),

        lastName: Yup.string()
            .required('Last name is required')
            .max(100, 'Last name cannot exceed 100 characters'),
        email: Yup
            .string()
            .email('Please enter a valid email')
            .required('Email is required'),
        password: Yup
            .string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), ""], 'Passwords must match')
            .required('Confirm password is required'),
        country: Yup.string()
            .required('Country is required'),
    });

    return (
        <div className="flex justify-center items-center min-h-7">
            <div className="w-[400px] p-8 border border-gray-300 rounded-lg shadow-lg bg-white">
                {/* <!-- Logo --> */}
                {/* <div className="flex justify-center mb-8"> */}
                {/* <Image
                        src="https://placehold.co/120x30"
                        alt="Upwork Logo"
                        className="h-8"
                        height={100}
                        width={100}
                    /> */}
                {/* </div> */}

                {/* <!-- Signup Title --> */}
                <h1 className="text-center text-2xl font-medium text-gray-900 mb-3">
                    {context.role === UserTypesEnum.CLIENT ? "Signup to get work done" : "Singup to provide services"}
                </h1>

                {organization && (
                    <div className="text-center">
                        <span className="text-sm text-orange-600 text-center">You are joining <b>{organization.name}</b></span>
                    </div>
                )}
                <Form onSubmit={onSubmitData} defaultValues={{}} validationSchema={formValidations} ref={formRef}>
                    <FormItems fields={fields}></FormItems>
                </Form>

                {/* Submit Button */}
                <PrimaryButton
                    isLoader={isApiLoader}
                    className='mt-8'
                    mergeClasses={true}
                    onClick={() => {
                        onSubmit();
                    }}
                >
                    Continue
                </PrimaryButton>

                {/* Switch role Link */}
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500">
                        {
                            context.role === UserTypesEnum.CLIENT ?
                                "Providing services?" :
                                "Looking for a help?"
                        }
                    </span>
                    <a
                        href="#"
                        className="text-sm text-orange-600 font-medium hover:underline"
                        onClick={() => {
                            clearForm();
                            context.setRole(
                                context.role === UserTypesEnum.CLIENT ?
                                    UserTypesEnum.SERVICE_PROVIDER :
                                    UserTypesEnum.CLIENT
                            )
                        }}
                    >
                        &nbsp;{
                            context.role === UserTypesEnum.CLIENT ?
                                "Join as a Service Provider" :
                                "Join as a Client"
                        }
                    </a>
                </div>

                {/* Login Link */}
                <div className="mt-4 text-center">
                    <span className="text-sm text-gray-500">
                        Already have an account?
                    </span>
                    <a
                        href="/account-security/login"
                        className="text-sm text-orange-600 font-medium hover:underline"
                        onClick={() => ""}
                    >
                        &nbsp;Log In
                    </a>
                </div>
            </div>
        </div>

    )
}

export default SignupForm;