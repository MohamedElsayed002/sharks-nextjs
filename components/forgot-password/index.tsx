'use client'

import { useState } from "react"
import { SendEmail } from "./send-email";
import { CodeVerification } from "./code-verification";
import { NewPassword } from "./new-password";


export const ForgotPassword = () => {

    const [step, setStep] = useState<number>(1)


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground flex items-center justify-center px-4">
            {step === 1 && <SendEmail setStep={setStep} />}
            {step === 2 && <CodeVerification setStep={setStep}/>}
            {step === 3 && <NewPassword setStep={setStep}/>}
        </div>
    )
}