// "use client";
// import { APIStore } from "@/utils/api-store";
// import { useParams } from "next/navigation";
// import React, { useEffect, useState } from "react";

// export default function InvitationToken() {
//     const [loading, setLoading] = useState(true);
//     const [isTokenValid, setIsTokenValid] = useState(false);
//     const { token } = useParams();

//     const validateToken = async () => {
//         try {
//             setLoading(true);

//             // Validate token
//             const response = await APIStore.forgotPasswordTokenValidation({
//                 resetToken: token
//             }, {
//                 hideErrorMessage: true,
//                 hideSuccessMessage: true
//             });

//             // Set whether the token is valid or not
//             setIsTokenValid(!response.success);

//             // Remove token from the route
//             const newUrl = window.location.pathname.replace(`/${token}`, '');
//             window.history.replaceState(null, '', newUrl);
//         }
//         catch(err) {
//             // Set token is invalid
//             setIsTokenValid(false);
//         }
//         finally {
//             setLoading(false);
//         }
//     }

//     useEffect(() => {
//         // If the token is present then validate the token and remove token from the URL
//         if(token) {
//             validateToken();
//         }
//         // setLoading(false); // TODO: Later remove it
//     }, [token]);

//     return (
//         loading ?
//             "Loading" :
//             (isTokenValid ? <PasswordRecoveryForm token={token as string}/> : <PasswordRecoveryTokenInvalid />)
//     )
// }