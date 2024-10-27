import Form, { FormItems } from '@/lib/form/form'
import React, { useContext, useRef } from 'react'
import * as Yup from 'yup';
import { SignUpContext } from './Signup';
import { UserTypesEnum } from '@/enums/user-types.enum';

function SignupForm() {
    const formRef = useRef(null);
    const context = useContext(SignUpContext);

    const onSubmitData = (data: any) => {
        console.info("data", data)
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
            className: "mt-4 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
            placeholder: "Country",
            type: 'input', // TODO: Change it to select
        }
    ];



    if(context.role === UserTypesEnum.CLIENT) {
        if(fields[fields.length - 1].name === "isIndividualServiceProvider") {
            fields.pop();
        }
    }
    else {
     
        if(fields[fields.length - 1].name !== "isIndividualServiceProvider") {
            fields.push({
                name: 'isIndividualServiceProvider',
                className: "mt-4",
                placeholder: "Individual Service Provider",
                values: [{label: "Is Individual Service Provider", value: true}],
                type: 'checkbox',
                mergeClasses: true,
            });

        }
    }

    return (
        <div className="flex justify-center items-center min-h-7">
            <div className="w-[400px] p-8 border border-gray-300 rounded-lg shadow-lg">
                {/* <!-- Logo --> */}
                <div className="flex justify-center mb-8">
                    {/* <Image
                        src="https://placehold.co/120x30"
                        alt="Upwork Logo"
                        className="h-8"
                        height={100}
                        width={100}
                    /> */}
                </div>

                {/* <!-- Signup Title --> */}
                <h1 className="text-center text-2xl font-medium text-gray-900 mb-3">
                    {context.role === UserTypesEnum.CLIENT ? "Signup to get work done" : "Singup to provide services"}
                </h1>
                <Form onSubmit={onSubmitData} defaultValues={{}} validationSchema={Yup.object().shape({
                            email: Yup
                                .string()
                                .email('Please enter a valid email')
                                .required('Email is required'),
                            password: Yup
                                .string()
                                .required('Password is required')
                                .min(8, 'Password must be at least 8 characters long')
                            // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                            // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                            // .matches(/[0-9]/, 'Password must contain at least one number')
                            // .matches(/[!@#\$%\^&\*]/, 'Password must contain at least one special character'),
                        })} ref={formRef}>
                            <FormItems fields={fields}></FormItems>
                        </Form>
               
                <button className="mt-8 w-full bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200 my-4"
                    onClick={() => {
                        onSubmit();
                    }}>
                    Continue
                </button>

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
                        href="#"
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

export default SignupForm