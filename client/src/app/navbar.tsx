"use client";
import { BorderButton } from "@/shared/components/button";

const Navbar = () => {
    return (
        <div className="w-full mx-auto flex items-center justify-between py-2 px-4 border-b border-gray-200">
            {/* <!-- Left Side --> */}
            <div className="flex items-center space-x-6">
                {/* <!-- Logo --> */}
                <a href="#" className="text-black text-lg font-bold">
                    <img src="https://ucarecdn.com/bef3d92a-9985-417b-a973-9e29c06383e1/logo.png" alt="Profile" className="w-13 h-14 rounded-full border border-gray-300" />

                </a>


                {/* <!-- Navigation Links --> */}
                <div>
                    <nav className="flex items-center space-x-4 m-2">
                        <a href="#" className="text-slate-800 hover:text-orange-700 text-sm">Jobs</a>
                        {/* <a href="#" className="text-slate-800 hover:text-orange-700 text-sm">Proposals</a> */}
                        <a href="#" className="text-slate-800 hover:text-orange-700 text-sm">Contracts</a>
                        <a href="/organization" className="text-slate-800 hover:text-orange-700 text-sm">Organization</a>
                        <a href="#" className="text-slate-800 hover:text-orange-700 text-sm">Messages</a>
                        <a href="#" className="text-slate-800 hover:text-orange-700 text-sm">Threat Intelligence</a>
                    </nav>
                </div>

            </div>

            {/* <!-- Right Side --> */}
            <div className="flex items-center space-x-4">
                {/* <!-- Profile Picture --> */}
                <div className="relative">
                    {/* <img src="https://placehold.co/32x32" alt="Profile" className="w-8 h-8 rounded-full border border-gray-300" /> */}
                    <div
                        className={`rounded-full bg-orange-500 flex items-center justify-center overflow-hidden w-8 h-8`}
                    >
                                <span className="text-white text-lg font-semibold">RG</span>
                    </div>
                    <div className="absolute right-0 mt-1 px-2 py-1 bg-white border border-gray-200 shadow-lg rounded-md text-gray-900 text-sm hidden group-hover:block">
                        Profile and account
                    </div>
                </div>
                <a href="#" className="text-slate-800 hover:text-orange-700 text-sm">Logout</a>
            </div>
        </div>
    )
}

export default Navbar;