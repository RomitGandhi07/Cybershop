"use client";
import { PrimaryButton } from "@/shared/components/button";
import { useRouter } from "next/navigation";

export default function ForgotPasswordSuccess() {
    const router = useRouter();

    return (
        <div className="w-full max-w-md px-6">
            {/* <!-- Logo --> */}
            {/* <div className="flex justify-start mb-12">
                <img height={50} width={50} src="https://img.freepik.com/free-vector/illustration-share-icon_53876-5843.jpg?t=st=1730142426~exp=1730146026~hmac=017dba8e595de53707805ed50760d0f70b756248423c7f6a2b49e8b70b43d6e1&w=740"/>
            </div> */}

            {/* <!-- Card Container --> */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-md text-center">
                {/* <!-- Title --> */}
                <h1 className="text-2xl font-semibold text-gray-900 mb-4">Check your email</h1>
                {/* <!-- Description --> */}
                <p className="text-gray-700 mb-4">
                    We’ve sent you an email with instructions to reset your password. Check your inbox and follow the steps there.
                </p>
                <p className="text-gray-700 mb-8">
                    If you didn’t request a password change or would like to log in to a different account, select &quot;Return to login.&quot;
                </p>
                {/* <!-- Button --> */}
                {/* <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-full">
                    Return to login
                </button> */}
                <PrimaryButton
                    isLoader={false}
                    onClick={() => router.push("/account-security/login")}
                >
                    Return to login
                </PrimaryButton>
            </div>
        </div>
    )
}