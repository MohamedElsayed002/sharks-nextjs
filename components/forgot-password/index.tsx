'use client'

import { useState } from "react"
import { SendEmail } from "./send-email";
import { CodeVerification } from "./code-verification";
import { NewPassword } from "./new-password";


export const ForgotPassword = () => {

    const [step, setStep] = useState<number>(1)
    const [email, setEmail] = useState<string>("")


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground flex items-center justify-center px-4">
            {step === 1 && <SendEmail setEmail={setEmail} setStep={setStep} />}
            {step === 2 && <CodeVerification email={email} setStep={setStep}/>}
            {step === 3 && <NewPassword email={email} setStep={setStep}/>}
        </div>
    )
}