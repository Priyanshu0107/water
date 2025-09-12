"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, LogOut } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"
import { LanguageSelector } from "@/components/ui/language-selector"
import { createBrowserClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface NavigationProps {
  user?: any
}

export function Navigation({ user }: NavigationProps) {
  const { t } = useI18n()
  const supabase = createBrowserClient()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Droplets className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">{t("home.title")}</h1>
        </Link>

        <div className="flex items-center gap-4">
          <LanguageSelector />

          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">{t("nav.dashboard")}</Button>
              </Link>
              <Link href="/assessment/new">
                <Button variant="outline">{t("nav.newAssessment")}</Button>
              </Link>
              <Button variant="ghost" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                {t("nav.signOut")}
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline">{t("nav.signIn")}</Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button>{t("nav.signUp")}</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
