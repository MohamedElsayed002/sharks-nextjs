"use client"

import { useState } from "react"
import { Categories } from "./categories"
import { TellUsStep } from "./tell-us-step"
import { IncomeSourcesStep, type IncomeSourceId } from "./income-sources-step"
import type { SellCategory } from "./categories"
import type { TellUsFormValues } from "./tell-us-step"

export { Categories, type SellCategory, type SellCategoryId } from "./categories"
export { TellUsStep } from "./tell-us-step"
export { IncomeSourcesStep, INCOME_SOURCE_IDS, type IncomeSourceId } from "./income-sources-step"
export type { TellUsFormValues } from "./tell-us-step"

/** All data collected from the sell flow (step 1: category, step 2: form, step 3: income sources). Send this to your backend. */
export interface SellFlowData {
  category: SellCategory
  tellUsForm: TellUsFormValues
  incomeSources: IncomeSourceId[]
}

export function Sell() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedCategory, setSelectedCategory] = useState<SellCategory | null>(null)
  const [tellUsFormData, setTellUsFormData] = useState<TellUsFormValues | null>(null)
  const [incomeSources, setIncomeSources] = useState<IncomeSourceId[]>([])

  const handleCategorySelect = (category: SellCategory) => {
    setSelectedCategory(category)
    setStep(2)
  }

  const handleTellUsContinue = (data: TellUsFormValues) => {
    setTellUsFormData(data)
    setStep(3)
  }

  const handleIncomeSourcesContinue = (selected: IncomeSourceId[]) => {
    setIncomeSources(selected)
    // All data collected. Send to backend:
    if (selectedCategory && tellUsFormData) {
      const payload: SellFlowData = {
        category: selectedCategory,
        tellUsForm: tellUsFormData,
        incomeSources: selected,
      }
      console.log("Sell flow data (send to backend):", payload)
      // await fetch("/api/sell", { method: "POST", body: JSON.stringify(payload) })
    }
  }

  if (step === 2 && selectedCategory) {
    return (
      <div>
        <TellUsStep
          category={selectedCategory}
          onBack={() => {
            setStep(1)
            setSelectedCategory(null)
          }}
          onContinue={handleTellUsContinue}
        />
      </div>
    )
  }

  if (step === 3) {
    return (
      <div>
        <IncomeSourcesStep
          onBack={() => setStep(2)}
          onContinue={handleIncomeSourcesContinue}
        />
      </div>
    )
  }

  return (
    <div>
      <Categories onCategorySelect={handleCategorySelect} />
    </div>
  )
}
