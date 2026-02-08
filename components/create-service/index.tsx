"use client"

import { useEffect, useRef, useState } from "react"
import { useAuthStore } from "@/context/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useLocale, useTranslations } from "next-intl"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { BasicInfo } from "./basic-info"
import { FinancialInfo } from "./financial-info"
import { UploadImage } from "./image-upload"
import { toast } from "sonner"
import Confetti from "react-confetti"
import { useRouter } from "next/navigation"



export const formSchema = z.object({
    imageUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    category: z.string().min(1, "Category is required"),
    isProfitable: z.boolean(),
    details: z.array(
        z.object({
            lang: z.enum(["en", "ar"], { required_error: "Language must be 'en' or 'ar'" }),
            title: z.string().min(3, "Title must be at least 3 characters"),
            description: z.string().min(10, "Description must be at least 10 characters"),
        })
    ).min(2, "You must provide details for both English and Arabic").max(2, "Only English and Arabic are supported"),
    averageMonthlyRevenue: z.number().nonnegative("Revenue must be >= 0"),
    averageMonthlyExpenses: z.number().nonnegative("Expenses must be >= 0"),
    netProfit: z.number().nonnegative("Net profit must be >= 0"),
    incomeSources: z.array(z.string().min(1, "Income source cannot be empty"))
        .min(1, "At least one income source is required"),
    revenueProofs: z.object({
        fileUrl: z.string().url("Must be a valid file URL"),
        fileId: z.string().min(1, "File ID is required"),
        fileType: z.string().min(1, "File type is required"),
        source: z.string().optional(),
    }),
})

export type FormSchema = z.infer<typeof formSchema>


export const CreateService = () => {

    const [currentStep, setCurrentStep] = useState(1)
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations()

    const [showConfetti, setShowConfetti] = useState(false)
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
    const confettiTimerRef = useRef<number | null>(null)

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            averageMonthlyExpenses: 0,
            averageMonthlyRevenue: 0,
            category: "",
            details: [
                { lang: "en", title: "", description: "" },
                { lang: "ar", title: "", description: "" }
            ],
            imageUrl: "",
            incomeSources: [],
            isProfitable: false,
            netProfit: 0,
            revenueProofs: {
                fileUrl: "",
                fileId: "",
                fileType: "",
                source: ""
            }
        },
    })

    const onSubmit = async (data: FormSchema) => {

        const token = useAuthStore.getState().accessToken

        try {
            const response = await fetch('/api/create-service', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ token, data })
            })

            const responseData = await response.json()
            if (!responseData.success) {
                throw new Error(responseData.message)
            }

            toast.success("Service created successfully / Wait for the approval")
            setShowConfetti(true)
            confettiTimerRef.current = window.setTimeout(() => {
                setShowConfetti(false)
                confettiTimerRef.current = null
            }, 5000)
            router.push(`/${locale}/`)

        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "An error occurred"
            toast.error(errorMessage)
        }
    }

    const validateStep = async (step: number): Promise<boolean> => {
        let fieldsToValidate: (keyof FormSchema)[] = []


        switch (step) {
            case 1:
                fieldsToValidate = ["category", "details"]
                break
            case 2:
                fieldsToValidate = ["averageMonthlyExpenses", "averageMonthlyExpenses", "netProfit", "incomeSources", "revenueProofs"]
                break
            case 3:
                fieldsToValidate = ["imageUrl"]
        }

        const result = await form.trigger(fieldsToValidate)
        return result
    }


    const handleNext = async () => {
        const isValid = await validateStep(currentStep)
        if (isValid && currentStep < 3) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleStepClick = async (step: number) => {
        if (step < currentStep) {
            setCurrentStep(step)
        } else if (step === currentStep + 1) {
            await handleNext()
        }
    }

    const totalSteps = 3
    const progress = (currentStep / totalSteps) * 100

    useEffect(() => {
        // set initial window size for Confetti
        const setSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
        setSize()
        window.addEventListener("resize", setSize)
        return () => window.removeEventListener("resize", setSize)
    }, [])

    useEffect(() => {
        return () => {
            // cleanup confetti timer if component unmounts
            if (confettiTimerRef.current) {
                clearTimeout(confettiTimerRef.current)
            }
        }
    }, [])

    return (
        <div className="min-h-screen relative overflow-hidden">

            {/* Confetti */}
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    numberOfPieces={2000}
                />
            )}

            {/* Animation */}
            <div className='absolute inset-0 opacity-30'>
                <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-12">
                {/* Progress bar */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className='relative'>
                        <div className="flex justify-between items-center mb-4">
                            {[1, 2, 3].map((step) => (
                                <Button
                                    key={step}
                                    onClick={() => handleStepClick(step)}
                                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${currentStep === step
                                        ? "border-blue-500 bg-blue-500 text-white scale-110"
                                        : currentStep > step
                                            ? "border-green-500 bg-green-500 text-white"
                                            : "border-slate-700 bg-slate-800 text-white"
                                        }`}
                                >
                                    {currentStep > step ? (
                                        <Check className="w-6 h-6" />
                                    ) : (
                                        <span className="font-bold">{step}</span>
                                    )}
                                </Button>
                            ))}
                        </div>

                        <div className="absolute top-6 left-0 right-0 h-1 bg-slate-700 -z-10">
                            <div
                                className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 transition-all duration-500"
                                style={{ width: `${progress - (100 / totalSteps / 2)}%` }}
                            />
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-sm text-slate-400 font-medium tracking-wide">
                            Step {currentStep} of {totalSteps}
                        </p>
                    </div>
                </div>

                {/* Form Container */}
                <div className="max-w-7xl mx-auto">
                    <div className=" rounded-2xl shadow-2xl p-8 md:p-12">
                        <div className='mb-8 text-center'>
                            <h1 className="text-4xl md:text-5xl font-bold font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                                {currentStep === 1 && "Basic Information"}
                                {currentStep === 2 && "Financial Details"}
                                {currentStep === 3 && "Service Image"}
                            </h1>
                            <p className="text-slate-400 text-sm md:text-base">
                                {currentStep === 1 && "Tell us about your service and provide details in both English and Arabic"}
                                {currentStep === 2 && "Share your revenue, expenses, and income sources"}
                                {currentStep === 3 && "Upload an image to represent your Service"}
                            </p>
                        </div>

                        {/* Step Content */}
                        <div className="min-h-[400px]">
                            {currentStep === 1 && <BasicInfo form={form} />}
                            {currentStep === 2 && <FinancialInfo form={form} />}
                            {currentStep === 3 && <UploadImage form={form} />}
                        </div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-800">
                            <Button
                                type='button'
                                onClick={handlePrevious}
                                disabled={currentStep === 1}
                                variant='outline'
                                className="border-slate-700 text-black hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Previous
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    type='button'
                                    onClick={handleNext}
                                    className="bg-blue-500 text-white"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <Button
                                    type='button'
                                    onClick={form.handleSubmit(onSubmit)}
                                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                                >
                                    <Check className="w-4 h-4 mr-2" />
                                    Submit Service
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}