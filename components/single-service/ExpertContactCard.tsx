"use client"

import { useState } from "react"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { UserRound } from "lucide-react"

interface ExpertContactCardProps {
  serviceTitle: string
  serviceCategory: string
  serviceImageUrl?: string
  serviceId?: string
}

interface ContactExpertForm {
  name: string
  email: string
  phone: string
  message: string
}

export function ExpertContactCard({
  serviceTitle,
  serviceCategory,
  serviceImageUrl,
  serviceId,
}: ExpertContactCardProps) {
  const t = useTranslations("singleService")
  const [open, setOpen] = useState(false)
  const te = (key: string) => t(`expertContact.${key}`)

  const { register, handleSubmit, reset } = useForm<ContactExpertForm>({
    defaultValues: { name: "", email: "", phone: "", message: "" },
  })

  const onSubmit = (data: ContactExpertForm) => {
    const payload = {
      ...data,
      service: {
        id: serviceId,
        title: serviceTitle,
        category: serviceCategory,
        imageUrl: serviceImageUrl,
      },
    }
    console.log("Expert contact submission:", payload)
    reset()
    setOpen(false)
  }

  return (
    <div className="rounded-2xl bg-blue-50 p-6 shadow-sm dark:bg-blue-950/20">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">
            {te("title")}
          </h3>
          <p className="text-sm text-muted-foreground">
            {te("description")}
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                {te("cta")}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md rounded-2xl p-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {te("modal-title")}
                </DialogTitle>
              </DialogHeader>

              <div className="mb-4 flex gap-3 rounded-xl border bg-muted/30 p-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {serviceImageUrl ? (
                    <Image
                      src={serviceImageUrl}
                      alt={serviceTitle}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      <span className="text-2xl">—</span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{serviceTitle}</p>
                  <Badge variant="secondary" className="mt-1">
                    {serviceCategory}
                  </Badge>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="expert-name">{te("name")}</Label>
                  <Input
                    id="expert-name"
                    placeholder={te("name-placeholder")}
                    {...register("name", { required: true })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expert-email">{te("email")}</Label>
                  <Input
                    id="expert-email"
                    type="email"
                    placeholder={te("email-placeholder")}
                    {...register("email", { required: true })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expert-phone">{te("phone")}</Label>
                  <Input
                    id="expert-phone"
                    type="tel"
                    placeholder={te("phone-placeholder")}
                    {...register("phone", { required: true })}
                    className="rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expert-message">{te("message")}</Label>
                  <Textarea
                    id="expert-message"
                    placeholder={te("message-placeholder")}
                    rows={3}
                    className="resize-none rounded-lg"
                    {...register("message")}
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  {te("send")}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex shrink-0 justify-center sm:justify-end">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-100 dark:bg-blue-900/40">
            <UserRound className="size-12 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 border-t border-blue-200/60 pt-6 dark:border-blue-800/40">
        <div className="text-center">
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">500+</p>
          <p className="text-xs text-muted-foreground">{te("stats-stores")}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">+15</p>
          <p className="text-xs text-muted-foreground">{te("stats-years")}</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-blue-700 dark:text-blue-300">24/7</p>
          <p className="text-xs text-muted-foreground">{te("stats-support")}</p>
        </div>
      </div>
    </div>
  )
}
