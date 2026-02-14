import sgMail from "@sendgrid/mail"

const apiKey = process.env.SENDGRID_API_KEY
if (apiKey) sgMail.setApiKey(apiKey)

export type SendEmailOptions = {
  to: string | string[]
  from?: string
  subject: string
  text?: string
  html?: string
}

export async function sendEmail(opts: SendEmailOptions): Promise<void> {
  if (!apiKey) throw new Error("SENDGRID_API_KEY is not set.")
  const { to, subject, text, html } = opts
  const from = opts.from ?? process.env.SENDGRID_FROM_EMAIL ?? "noreply@example.com"
  await sgMail.send({ to, from, subject, text: text ?? html ?? "", html: html ?? text ?? undefined })
}
