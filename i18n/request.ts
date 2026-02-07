import { getRequestConfig } from "next-intl/server";
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({requestLocale}) => {

    let locale = await requestLocale 

    if(!locale || !routing.locales.includes(locale as Locale)) {
        locale = routing.defaultLocale
    }

    const messages = (await import(`./messages/${locale}.json`)).default
    const helpCenter = (await import(`./messages/help-center-${locale}.json`)).default
    return {
        locale,
        messages: { ...messages, helpCenter }
    }
})