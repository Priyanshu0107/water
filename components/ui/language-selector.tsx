"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export function LanguageSelector() {
  const { language, setLanguage, t } = useI18n()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <Globe className="h-4 w-4 mr-2" />
          {language === "en" ? "EN" : "ES"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("en")}>{t("common.english")}</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("es")}>{t("common.spanish")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
