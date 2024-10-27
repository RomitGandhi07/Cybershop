"use client";
import { useRouter } from "next/navigation"

export default function PasswordRecoveryTokenInvalid () {
    const router = useRouter();

    return (
        <div className="bg-white flex items-center justify-center h-screen">
            <div className="w-[600px] h-[400px] flex flex-col items-center justify-start">
                {/* <!-- Logo -->
                <div className="flex justify-start w-full mb-10">
                    <img src="https://placehold.co/100x40" alt="Upwork Logo" className="ml-6 w-24 h-10">
                </div> */}

                {/* <!-- Card Container --> */}
                <div className="bg-white shadow-md rounded-lg w-[400px] p-8 text-center">
                    <h1 className="text-2xl font-semibold mb-4">Password Recovery Error</h1>
                    <p className="text-gray-600 mb-6">Cybershop could not locate the information needed to recover your password. Please try again.</p>

                    {/* <!-- Start Over Button --> */}
                    <button className="w-full bg-orange-600 text-white font-bold py-2 rounded-lg hover:bg-orange-700"
                        onClick={() => router.push("/login")}>
                        Start Over
                    </button>
                </div>
            </div>
        </div>
    )
}