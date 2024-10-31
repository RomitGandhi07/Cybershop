"use client";
import { BorderButton, PrimaryButton } from "@/shared/components/button";
import LoginForm from "./login-form";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export default function Login(props: any) {
    const router = useRouter();

    // This function is responsible for redirect user to signup page
    const redirectToSignup = useCallback(() => {
        router.push("/account-security/signup");
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen">
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

                {/* <!-- Login Title --> */}
                <h1 className="text-center text-2xl font-medium text-gray-900 mb-6">
                    Log in to Cybershop
                </h1>

                <LoginForm />


                {/* <!-- Or Separator --> */}
                <div className="flex items-center justify-center my-6">
                    <hr className="w-full border-gray-300" />
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <hr className="w-full border-gray-300" />
                </div>

                {/* <!-- Sign Up Link --> */}
                <div className="text-center">
                    <span className="text-sm text-gray-500">
                        Don&apos;t have an Cybershop account?
                    </span>
                    <BorderButton
                        isLoader={false}
                        className="mt-6"
                        mergeClasses={true}
                        onClick={redirectToSignup}
                    >
                        Sign Up
                    </BorderButton>
                </div>
            </div>
        </div>
    );
}
