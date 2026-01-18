"use client"

import { useTranslations } from "next-intl";


const DashbaordPage = () => {

    const t = useTranslations()

    return (
        <div>
            <h1>Dashboard Page</h1>
            <h1>{t('hello')}</h1>
        </div>
    )
}

export default DashbaordPage;