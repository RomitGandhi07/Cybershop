import { useState } from "react";
import { FaBriefcase, FaLaptopCode } from 'react-icons/fa';

export default function Signup() {
    const [selectedRole, setSelectedRole] = useState("client");
    const [isRoleSelected, setIsRoleSelected] = useState(false);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center">
                {/* Join Title */}
                <h1 className="text-2xl font-medium text-gray-900 mb-6">
                    Join as a client or freelancer
                </h1>

                {/* Options */}
                <div className="flex justify-center gap-4 mb-6">
                    {/* Client Option */}
                    <div
                        className={`block w-[220px] p-4 border rounded-lg cursor-pointer hover:bg-orange-50 transition duration-200
                            ${selectedRole === "client"
                                ? "border-orange-600"
                                : "border-gray-300"
                            }`}
                        onClick={() => setSelectedRole("client")}
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-gray-900">
                                <FaBriefcase className="text-2xl" />
                            </div>
                            <div
                                className={`w-4 h-4 border rounded-full flex items-center justify-center
                                    ${selectedRole === "client"
                                        ? "border-orange-600"
                                        : "border-gray-400"
                                    }`}
                            >
                                {selectedRole === "client" && (
                                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 text-left">
                            <span
                                className={`font-medium ${selectedRole === "client" ? "text-gray-900" : "text-gray-900"
                                    }`}
                            >
                                I’m a client, hiring for a project
                            </span>
                        </div>
                    </div>

                    {/* Freelancer Option */}
                    <div
                        className={`block w-[220px] p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition duration-200 ${selectedRole === "freelancer"
                                ? "border-orange-600"
                                : "border-gray-300"
                            }`}
                        onClick={() => setSelectedRole("freelancer")}
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-gray-900">
                                <FaLaptopCode className="text-2xl" />
                            </div>
                            <div
                                className={`w-4 h-4 border rounded-full flex items-center justify-center ${selectedRole === "freelancer"
                                        ? "border-orange-600"
                                        : "border-gray-400"
                                    }`}
                            >
                                {selectedRole === "freelancer" && (
                                    <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                                )}
                            </div>
                        </div>
                        <div className="mt-4 text-left">
                            <span
                                className={`font-medium ${selectedRole === "freelancer"
                                        ? "text-gray-900"
                                        : "text-gray-900"
                                    }`}
                            >
                                I’m a freelancer, looking for work
                            </span>
                        </div>
                    </div>
                </div>

                {/* Join Button */}
                <button className="w-[220px] bg-orange-600 text-white rounded-md p-3 text-sm font-medium hover:bg-orange-700 transition duration-200">
                    {selectedRole === "client"
                        ? "Join as a Client"
                        : "Join as a Freelancer"}
                </button>

                {/* Login Link */}
                <div className="mt-4">
                    <span className="text-sm text-gray-500">
                        Already have an account?
                    </span>
                    <a
                        href="#"
                        className="text-sm text-orange-600 font-medium hover:underline"
                    >
                        &nbsp;Log In
                    </a>
                </div>
            </div>
        </div>
    );
}
