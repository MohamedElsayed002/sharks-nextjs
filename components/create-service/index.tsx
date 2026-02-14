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
  details: z
    .array(
      z.object({
        lang: z.enum(["en", "ar"], { required_error: "Language must be 'en' or 'ar'" }),
        title: z.string().min(3, "Title must be at least 3 characters"),
        description: z.string().min(10, "Description must be at least 10 characters"),
      })
    )
    .min(2, "You must provide details for both English and Arabic")
    .max(2, "Only English and Arabic are supported"),
  averageMonthlyRevenue: z.number().nonnegative("Revenue must be >= 0"),
  averageMonthlyExpenses: z.number().nonnegative("Expenses must be >= 0"),
  netProfit: z.number().nonnegative("Net profit must be >= 0"),
  incomeSources: z
    .array(z.string().min(1, "Income source cannot be empty"))
    .min(1, "At least one income source is required"),
  revenueProofs: z
    .array(
      z.object({
        fileUrl: z.string().url("Must be a valid file URL"),
        fileId: z.string().min(1, "File ID is required"),
        fileType: z.string().min(1, "File type is required"),
        source: z.string().optional(),
      })
    )
    .min(1, "At least one revenue proof is required"),
})

export type FormSchema = z.infer<typeof formSchema>

export const CreateService = () => {
  const t = useTranslations("addService")
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const locale = useLocale()

  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const confettiTimerRef = useRef<number | null>(null)

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      averageMonthlyExpenses: 0,
      averageMonthlyRevenue: 0,
      category: "",
      details: [
        { lang: "en", title: "", description: "" },
        { lang: "ar", title: "", description: "" },
      ],
      imageUrl: "",
      incomeSources: [],
      isProfitable: false,
      netProfit: 0,
      revenueProofs: [],
    },
  })

  const onSubmit = async (data: FormSchema) => {
    const token = useAuthStore.getState().accessToken
    try {
      const response = await fetch("/api/create-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, data }),
      })

      const responseData = await response.json()
      if (!responseData.success) throw new Error(responseData.message)

      toast.success(t("successToast"))
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
        fieldsToValidate = ["averageMonthlyExpenses", "averageMonthlyRevenue", "netProfit", "incomeSources", "revenueProofs"]
        break
      case 3:
        fieldsToValidate = ["imageUrl"]
    }
    return await form.trigger(fieldsToValidate)
  }

  const handleNext = async () => {
    const isValid = await validateStep(currentStep)
    if (isValid && currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleStepClick = async (step: number) => {
    if (step < currentStep) setCurrentStep(step)
    else if (step === currentStep + 1) await handleNext()
  }

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  useEffect(() => {
    const setSize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    setSize()
    window.addEventListener("resize", setSize)
    return () => window.removeEventListener("resize", setSize)
  }, [])

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current) clearTimeout(confettiTimerRef.current)
    }
  }, [])

  const stepTitle = currentStep === 1 ? t("step1Title") : currentStep === 2 ? t("step2Title") : t("step3Title")
  const stepSubtitle = currentStep === 1 ? t("step1Subtitle") : currentStep === 2 ? t("step2Subtitle") : t("step3Subtitle")

  return (
    <div className="min-h-screen bg-[#F9F8F4] relative overflow-hidden">
      {showConfetti && (
        <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={2000} />
      )}

      <div className="relative z-10 container mx-auto px-4 py-10 md:py-12">
        {/* Progress */}
        <div className="mx-auto mb-8 max-w-4xl">
          <div className="relative">
            <div className="mb-4 flex items-center justify-between">
              {[1, 2, 3].map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => handleStepClick(step)}
                  className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    currentStep === step
                      ? "border-[#C9A227] bg-[#C9A227] text-white scale-110 shadow-md"
                      : currentStep > step
                        ? "border-emerald-500 bg-emerald-500 text-white"
                        : "border-slate-300 bg-white text-slate-600"
                  }`}
                >
                  {currentStep > step ? <Check className="h-6 w-6" /> : <span className="font-bold">{step}</span>}
                </button>
              ))}
            </div>
            <div className="absolute top-6 left-0 right-0 -z-10 h-1 bg-slate-200">
              <div
                className="h-full bg-[#C9A227] transition-all duration-500"
                style={{ width: `${Math.max(0, progress - (100 / totalSteps / 2))}%` }}
              />
            </div>
          </div>
          <p className="mt-6 text-center text-sm font-medium text-slate-600">
            {t("stepOf", { current: currentStep, total: totalSteps })}
          </p>
        </div>

        {/* Card */}
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
            <div className="mb-8 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C9A227]">SHARKMKT</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-800 md:text-4xl">
                {stepTitle}
              </h1>
              <p className="mt-2 text-sm text-slate-600 md:text-base">{stepSubtitle}</p>
            </div>

            <div className="min-h-[380px]">
              {currentStep === 1 && <BasicInfo form={form} />}
              {currentStep === 2 && <FinancialInfo form={form} />}
              {currentStep === 3 && <UploadImage form={form} />}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6">
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="border-slate-200 text-slate-800 hover:bg-slate-50 disabled:opacity-50"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                {t("previous")}
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#C9A227] text-white hover:bg-[#B8921F]"
                >
                  {t("next")}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-[#C9A227] text-white hover:bg-[#B8921F]"
                >
                  <Check className="mr-2 h-4 w-4" />
                  {t("submitService")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
