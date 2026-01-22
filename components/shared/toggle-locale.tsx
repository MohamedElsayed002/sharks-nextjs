"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { usePathname, useRouter } from "@/i18n/routing";
// import USAImage from "@/public/flags/flag1.png";
// import EgyImage from "@/public/flags/flag2.jpg";

export default function LocaleToggle() {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  //   Locale
  const locale = useLocale();
  // Translation
  const t = useTranslations();

  // Function
  const switchLocale = (locale: "en" | "ar") => {
    router.push(`${pathname}?${searchParams.toString()}`, { locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Toggle Language" className="outline-none">
        {locale === "en" ? (
          <div className="flex items-center gap-2 rounded-md border border-yellow-700 p-1 ">
            <h1>EN</h1>
            {/* <Image className="object-cover" src={USAImage} width={30} height={30} alt="USA Flag" /> */}
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-md border border-yellow-700 p-1 ">
            <h1>العربيه</h1>
            {/* <Image className="object-cover" src={EgyImage} width={30} height={30} alt="Egypt Flag" /> */}
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => switchLocale("en")}>
          {/* <Image className="object-cover" src={USAImage} width={30} height={30} alt="USA Flag" /> */}
          {t("english")}{" "}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLocale("ar")}>
          {/* <Image className="object-cover" src={EgyImage} width={30} height={30} alt="Egypt Flag" /> */}
          {t("arabic")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}