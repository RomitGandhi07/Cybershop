import { useEffect } from "react";
import LoginForm from "./login-form";
import http from "@/lib/http/http";

export default function Login(props: any) {
    async function loginUser() {
        await http.post({
            url: "/api/v1/authentication/login",
            data: {
                "email": "gandhiromit77@gmail.com",
                "password": "password"
            }
        });
    }
    // useEffect(() => {
    //     loginUser();
    // }, []);
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

                {/* <!-- Username/Email Input --> */}
                {/* <div className="mb-4">
                    <label className="sr-only">Username or Email</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="username"
                            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                            placeholder="Username or Email"
                        />
                        <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                    </div>
                </div> */}

                {/* <!-- Password Input --> */}
                {/* <div className="mb-4">
                    <label className="sr-only">Password</label>
                    <div className="relative">
                        <input
                            type="password"
                            id="password"
                            className="w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                            placeholder="Pasword"
                        />
                        <i className="fas fa-user absolute left-3 top-3 text-gray-400"></i>
                    </div>
                </div> */}

                {/* <!-- Continue Button --> */}
                {/* <button className="w-full bg-orange-600 text-white rounded-3xl p-3 text-sm font-medium hover:bg-orange-700 transition duration-200 my-4">
                    Continue
                </button> */}

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
                    <a
                        href="#"
                        className="block mt-6 w-full text-center text-orange-600 border border-orange-600 rounded-3xl p-3 text-sm font-medium hover:bg-orange-50 transition duration-200"
                    >
                        Sign Up
                    </a>
                </div>
            </div>
        </div>
    );
}
