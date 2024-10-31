import { UserTypesEnum } from "@/enums/user-types.enum"
// import { useRouter } from "next/router";
import React, { useContext } from "react";
import UserTypeSelectionCard from "./user-type-selection-card";
import { SignUpContext } from "./Signup";

const UserTypeSelection: React.FC = () => {
    // const router = useRouter();
    const context = useContext(SignUpContext);

    return (
        <div className="text-center">
            {/* Join Title */}
            <h1 className="text-2xl font-medium text-gray-900 mb-6">
                Join as a client or service provider
            </h1>

            {/* Options */}
            <div className="flex justify-center gap-4 mb-6">
                {/* Client Option */}
                <UserTypeSelectionCard type={UserTypesEnum.CLIENT} selected={context.role === UserTypesEnum.CLIENT} onSelect={context.setRole}></UserTypeSelectionCard>
                <UserTypeSelectionCard type={UserTypesEnum.SERVICE_PROVIDER} selected={context.role === UserTypesEnum.SERVICE_PROVIDER} onSelect={context.setRole}></UserTypeSelectionCard>
            </div>

            {/* Join Button */}
            <button className="w-[220px] bg-orange-600 text-white rounded-md p-3 text-sm font-medium hover:bg-orange-700 transition duration-200"
                onClick={() => context.setIsRoleSelected(true)}>
                {context.role === UserTypesEnum.CLIENT
                    ? "Join as a Client"
                    : "Join as a Service Provider"}
            </button>

            {/* Login Link */}
            <div className="mt-4">
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
    )
}

export default UserTypeSelection;