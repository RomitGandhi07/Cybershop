import React, { useContext, useState } from "react";
import { UserTypesEnum } from "@/enums/user-types.enum";
import SignupForm from "./signup-form";
import UserTypeSelection from "./user-type-selection";

interface IContextValue {
    role: UserTypesEnum,
    isRoleSelected: boolean,
    setRole: (role: UserTypesEnum) => void,
    setIsRoleSelected: (selected: boolean) => void,
}
const defaultContextValue = {
    role: UserTypesEnum.CLIENT,
    isRoleSelected: false,
    setRole: (role: UserTypesEnum) => { },
    setIsRoleSelected: (selected: boolean) => { }
};

export const SignUpContext = React.createContext<IContextValue>(defaultContextValue);

export default function Signup() {
    const [role, setRole] = useState(UserTypesEnum.CLIENT);
    const [isRoleSelected, setIsRoleSelected] = useState(false);
    return (
        <SignUpContext.Provider value={{ role, isRoleSelected, setRole, setIsRoleSelected }}>
            <div className="flex justify-center items-center min-h-screen">
                {isRoleSelected ? <SignupForm /> : <UserTypeSelection />}
            </div>
        </SignUpContext.Provider>
    );
}
