"use client"

import { UseFormReturn } from "react-hook-form"
import { FormSchema } from "."
import { Form, FormControl, FormLabel, FormField, FormMessage, FormItem, FormDescription } from "../ui/form"
import { UploadDropzone, UploadButton } from "@/utils/uploadthing"
import { useState } from "react"
import { Image as ImageIcon, CheckCircle2, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

interface Props {
  form: UseFormReturn<FormSchema>
}

export const UploadImage = ({ form }: Props) => {
  const t = useTranslations("addService")
  const [uploadedImageurl, setUploadImageUrl] = useState<string>(form.getValues("imageUrl") || "")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string>("")

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="text-center">
          <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-slate-200 text-[#C9A227]">
            <ImageIcon className="h-10 w-10" />
          </div>
          <h3 className="mb-2 text-2xl font-semibold text-slate-800">{t("uploadServiceImage")}</h3>
          <p className="mx-auto max-w-md text-sm text-slate-600">{t("uploadServiceImageDesc")}</p>
        </div>

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-800">{t("serviceImage")}</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {!uploadedImageurl ? (
                    <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 transition-colors hover:bg-slate-100/50">
                      <UploadDropzone
                        endpoint="imageUpload"
                        onClientUploadComplete={(res) => {
                          if (res?.[0]) {
                            const url = res[0].url
                            setUploadImageUrl(url)
                            form.setValue("imageUrl", url)
                            setUploadError("")
                            setIsUploading(false)
                          }
                        }}
                        onUploadError={(error: Error) => {
                          setUploadError(error.message)
                          setIsUploading(false)
                        }}
                        onUploadBegin={() => {
                          setIsUploading(true)
                          setUploadError("")
                        }}
                        appearance={{
                          container: "border-none bg-transparent",
                          uploadIcon: "text-[#C9A227]",
                          label: "text-slate-600 hover:text-slate-800",
                          allowedContent: "text-xs text-slate-500",
                          button: "bg-[#C9A227] text-white hover:bg-[#B8921F] ut-ready:bg-[#B8921F] ut-uploading:bg-slate-400",
                        }}
                        config={{ mode: "auto" }}
                      />
                      {isUploading && (
                        <div className="mt-4 text-center">
                          <div className="inline-flex items-center gap-2 text-[#C9A227]">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#C9A227] border-t-transparent" />
                            <span className="text-sm">{t("uploadingImage")}</span>
                          </div>
                        </div>
                      )}
                      {uploadError && (
                        <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-red-600">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm">{uploadError}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="group relative overflow-hidden rounded-xl border-2 border-emerald-500/30 bg-slate-100">
                        <Image
                          src={uploadedImageurl}
                          alt={t("servicePreview")}
                          width={600}
                          height={600}
                          className="h-auto w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-slate-900/80 opacity-0 transition-opacity group-hover:opacity-100">
                          <div className="absolute bottom-4 left-4 right-4">
                            <button
                              type="button"
                              onClick={() => {
                                setUploadImageUrl("")
                                form.setValue("imageUrl", "")
                              }}
                              className="w-full rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                            >
                              {t("removeImage")}
                            </button>
                          </div>
                        </div>
                        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-emerald-500/90 px-3 py-1.5 text-sm font-medium text-white">
                          <CheckCircle2 className="h-4 w-4" />
                          {t("uploaded")}
                        </div>
                      </div>
                      <div className="text-center">
                        <UploadButton
                          endpoint="imageUpload"
                          onClientUploadComplete={(res) => {
                            if (res?.[0]) {
                              const url = res[0].url
                              setUploadImageUrl(url)
                              form.setValue("imageUrl", url)
                              setUploadError("")
                              setIsUploading(false)
                            }
                          }}
                          onUploadError={(error: Error) => {
                            setUploadError(error.message)
                            setIsUploading(false)
                          }}
                          onUploadBegin={() => {
                            setIsUploading(true)
                            setUploadError("")
                          }}
                          appearance={{
                            button: "bg-[#C9A227] text-white hover:bg-[#B8921F] ut-ready:bg-[#B8921F] ut-uploading:bg-slate-400 rounded-lg px-6 py-2",
                            allowedContent: "text-xs text-slate-500",
                          }}
                        />
                        <p className="mt-2 text-sm text-slate-600">{t("uploadDifferent")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription className="text-sm text-slate-600">{t("imageFormat")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}
