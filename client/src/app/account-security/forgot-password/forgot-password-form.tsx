import Form, { FormItems } from "@/lib/form/form";
import { PrimaryButton } from "@/shared/components/button";
import { APIStore } from "@/utils/api-store";
import { useCallback, useRef, useState } from "react";
import * as Yup from "yup";

interface IForgotPasswordFormProps {
    setRequestSuccessful: (status: boolean) => void
}

// Fields used in the form
const fields = [
    {
        name: 'email',
        className: "mt-2 w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent",
        mergeClasses: true,
        placeholder: "Enter your email address",
        type: 'input',
        label: 'Email'
    }
];

// Form fields validation
const formValidations = Yup.object().shape({
    email: Yup
        .string()
        .email('Please enter a valid email')
        .required('Email is required')
});

export const ForgotPasswordForm: React.FC<IForgotPasswordFormProps> = ({ setRequestSuccessful }) => {
    const [isAPILoder, setIsAPILoader] = useState(false);
    const formRef = useRef(null);


    const forgotPasswordRequest = useCallback(async ({ email }: { email: string }) => {
        try {
            // Set API Loader to true
            setIsAPILoader(true);

            // Send forgot password request and set it's success to request successful
            const response = await APIStore.forgotPasswordRequest({
                email,
            }, {
                hideSuccessMessage: true
            });

            setRequestSuccessful(response.success);


        }
        finally {
            setIsAPILoader(false);
        }
    }, [setRequestSuccessful]);

    // On submit on button click, submit the form
    const onSubmit = useCallback(() => {
        if (formRef && formRef.current) {
            // @ts-ignore
            formRef.current.submit();
        }
    }, []);

    return (
        <div className="w-[600px] h-[400px] flex flex-col items-center justify-start">
            {/* <!-- Logo --> */}
            {/* <div className="flex justify-start mb-12">
                <img height={50} width={50} src="https://img.freepik.com/free-vector/illustration-share-icon_53876-5843.jpg?t=st=1730142426~exp=1730146026~hmac=017dba8e595de53707805ed50760d0f70b756248423c7f6a2b49e8b70b43d6e1&w=740"/>
            </div> */}

            {/* <!-- Card Container --> */}
            <div className="bg-white shadow-md rounded-lg w-[400px] p-8">
                <h1 className="text-2xl font-semibold text-center mb-4">Password Recovery</h1>
                <p className="text-gray-600 text-center mb-6">Enter the email address associated with your Cybershop account.</p>

                <Form onSubmit={forgotPasswordRequest} validationSchema={formValidations} ref={formRef}>
                    <FormItems fields={fields}></FormItems>
                </Form>

                {/* <!-- Buttons --> */}
                <PrimaryButton
                    className={"mt-7"}
                    mergeClasses={true}
                    onClick={onSubmit}
                    isLoader={isAPILoder}
                >
                    Continue
                </PrimaryButton>
                <a href="/account-security/login" className="mt-4 text-orange-600 text-center block">Back</a>
            </div>
        </div>
    )
}

export default ForgotPasswordForm;
