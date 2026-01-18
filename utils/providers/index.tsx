import { NextIntlClientProvider, useLocale, useMessages, useNow, useTimeZone } from "next-intl"
import { Toaster } from "sonner"
import ReactQueryProvider from "./query-provider"

interface Props {
    children: React.ReactNode
}

export default function Providers({ children }: Props) {

    const messages = useMessages()
    const locale = useLocale()
    const timeZone = useTimeZone()
    const now = useNow()

    return (
        <NextIntlClientProvider
            messages={messages}
            timeZone={timeZone}
            now={now}
            locale={locale}
        >
            <ReactQueryProvider>
                {children}
                <Toaster />
            </ReactQueryProvider>
        </NextIntlClientProvider>
    )
}