"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useTranslations } from "next-intl"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UploadDropzone } from "@/utils/uploadthing"
import { toast } from "sonner"
import { Loader2, FileText, X } from "lucide-react"




export function SubmitRequestForm() {
  const t = useTranslations("helpCenter.form")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const supportFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    listingUrl: z.string(),
    subject: z.string().min(1, "Subject is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    attachments: z.array(z.object({ url: z.string(), name: z.string() })),
  })

  type SupportFormValues = z.infer<typeof supportFormSchema>


  const form = useForm<z.infer<typeof supportFormSchema>>({
    resolver: zodResolver(supportFormSchema),
    defaultValues: {
      email: "",
      listingUrl: "",
      subject: "",
      description: "",
      attachments: [],
    },
  })

  const attachments = form.watch("attachments")

  const removeAttachment = (index: number) => {
    const next = attachments.filter((_, i) => i !== index)
    form.setValue("attachments", next)
  }

  const onSubmit = async (values: SupportFormValues) => {
    setIsSubmitting(true)
    try {
      const payload = {
        ...values,
        attachmentUrls: values.attachments.map((a) => a.url),
      }
      console.log(payload)
      // TODO: call submitSupportRequest(payload)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("emailLabel")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...field}
                  className="rounded-md border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="listingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("listingUrlLabel")}</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder={t("listingUrlPlaceholder")}
                  {...field}
                  className="rounded-md border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("subjectLabel")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("subjectPlaceholder")}
                  {...field}
                  className="rounded-md border"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("descriptionLabel")} <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("descriptionPlaceholder")}
                  rows={6}
                  className="resize-y rounded-md border"
                  {...field}
                />
              </FormControl>
              <FormDescription>{t("descriptionHelper")}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="attachments"
          render={() => (
            <FormItem>
              <FormLabel>
                <Badge className="rounded-md bg-blue-600 px-2 py-0.5 text-white hover:bg-blue-600">
                  {t("attachmentsLabel")}
                </Badge>
              </FormLabel>
              <FormControl>
                <div className="space-y-3">
                  <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 p-6">
                    <UploadDropzone
                      endpoint="supportAttachment"
                      onClientUploadComplete={(res) => {
                        if (res && res.length > 0) {
                          const newFiles = res.map((f) => ({ url: f.url, name: f.name }))
                          form.setValue("attachments", [...attachments, ...newFiles])
                        }
                      }}
                      onUploadError={(error: Error) => {
                        toast.error(error.message)
                      }}
                      appearance={{
                        container: "border-none bg-transparent min-h-[120px]",
                        uploadIcon: "text-blue-600",
                        label: "text-blue-600 hover:text-blue-700",
                        allowedContent: "text-muted-foreground text-xs",
                        button:
                          "bg-blue-600 hover:bg-blue-700 text-white ut-ready:bg-blue-600 ut-uploading:bg-muted",
                      }}
                      config={{ mode: "auto" }}
                    />
                  </div>
                  {attachments.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {attachments.map((file, index) => (
                        <li
                          key={file.url}
                          className="flex items-center justify-between gap-2 rounded-md border bg-muted/50 px-3 py-2 text-sm"
                        >
                          <div className="flex min-w-0 items-center gap-2">
                            <FileText className="size-4 shrink-0 text-muted-foreground" />
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="truncate text-blue-600 hover:underline"
                            >
                              {file.name}
                            </a>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="shrink-0 rounded p-1 text-muted-foreground hover:bg-muted hover:text-destructive"
                            aria-label="Remove file"
                          >
                            <X className="size-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-600 hover:bg-blue-700 float-end -mt-3"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            t("submit")
          )}
        </Button>
      </form>
    </Form>
  )
}
