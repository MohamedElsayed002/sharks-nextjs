'use client'

import { useState } from "react"
import { SendEmail } from "./send-email";
import { CodeVerification } from "./code-verification";
import { NewPassword } from "./new-password";


export const ForgotPassword = () => {

    const [step, setStep] = useState<number>(1)
    const [email, setEmail] = useState<string>("")


    return (
        <div className="w-full max-w-md">
            {step === 1 && <SendEmail setEmail={setEmail} setStep={setStep} />}
            {step === 2 && <CodeVerification email={email} setStep={setStep} />}
            {step === 3 && <NewPassword email={email} setStep={setStep} />}
        </div>
    )
}