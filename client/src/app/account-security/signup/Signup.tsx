import React, { useContext, useEffect, useState } from "react";
import { UserTypesEnum } from "@/enums/user-types.enum";
import SignupForm from "./signup-form";
import UserTypeSelection from "./user-type-selection";
import { useSearchParams } from "next/navigation";
import { APIStore } from "@/utils/api-store";
import { ApiSuccessResponse } from "@/interfaces";

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
    const [invitationLoader, setInvitationLoader] = useState(true);
    const [organization, setOrganization] = useState(null);

    // Fetch invitation token from query
    const searchParams = useSearchParams();
    const token = searchParams.get("invitation");

    const validateInvitationToken = async (token: string) => {
        return await APIStore.invitationTokenValidation(token, {
            hideErrorMessage: true,
            hideSuccessMessage: true
        });
    }

    useEffect(() => {
        setInvitationLoader(true);

        // If token is there
        if (token) {
            // Call Validate invitation token API
            validateInvitationToken(token).then(response => {
                // If success response is there
                if (response.success) {
                    const data = (response as ApiSuccessResponse).data;

                    // If token is valid then set role and role selected
                    if (data.status) {
                        setRole(data.type);
                        setIsRoleSelected(true);
                        setOrganization(data.organization);
                    }
                }

                // Set invitation loader to false
                setInvitationLoader(false);
            });
        }
        else {
            // Set invitation loader to false
            setInvitationLoader(false);
        }

    }, [token])

    return (
        <SignUpContext.Provider value={{ role, isRoleSelected, setRole, setIsRoleSelected }}>
            {
                invitationLoader ? "Loading...." : (
                    <div className="flex justify-center items-center min-h-screen">
                        {isRoleSelected ?
                            <SignupForm invitationToken={token} organization={organization} /> :
                            <UserTypeSelection />}
                    </div>
                )
            }

        </SignUpContext.Provider>
    );
}
