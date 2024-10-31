"use client";

import { APIStore } from "@/utils/api-store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VerifyEmailTokenInvalid from "./token-invalid";

export default function VerifyEmailToken() {
    const [loading, setLoading] = useState(true);
    const { token } = useParams();
    const router = useRouter();

    const validateToken = async () => {
        try {
            setLoading(true);

            // Validate token
            const response = await APIStore.verifyUserEmail(
                token as string, {
                hideErrorMessage: true
            });

            if(response.success) {
                router.push("/account-security/login");
            }
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // If the token is present then validate the token
        if (token) {
            validateToken();
        }
        else {
            setLoading(false);
        }
    }, [token]);

    return (
        loading ?
            "Loading" :
            <VerifyEmailTokenInvalid />
    )
}