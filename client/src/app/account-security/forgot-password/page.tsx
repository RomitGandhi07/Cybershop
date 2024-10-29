"use client"
import { useState } from "react";
import ForgotPasswordSuccess from "./forgot-password-success";
import ForgotPasswordForm from "./forgot-password-form";

export default function ForgotPassword() {
  const [requestSuccessful, setRequestSuccessful] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen">
      {
        <>
          {requestSuccessful ? <ForgotPasswordSuccess /> : <ForgotPasswordForm setRequestSuccessful={setRequestSuccessful} />}
        </>
      }
    </div>
  );
}
