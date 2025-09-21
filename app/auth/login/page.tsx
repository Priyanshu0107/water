"use client"

import type React from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Droplets } from "lucide-react"
<<<<<<< HEAD
=======
import { useI18n } from "@/lib/i18n/context"
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
import { LanguageSelector } from "@/components/ui/language-selector"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
<<<<<<< HEAD
=======
  const { t } = useI18n()
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createBrowserClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
      router.push("/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
<<<<<<< HEAD
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url('/bg-jalshakti.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="bg-blue-900/40 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">

          {/* Header / Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Droplets className="h-10 w-10 text-blue-300" />
              <h1 className="text-3xl font-bold text-white">जलनिगम | Jalnigam</h1>
            </div>
            <p className="text-blue-100 text-sm">
              लॉगिन करके अपनी वर्षा जल संचयन क्षमता जाँचें | Sign in to check your rainwater harvesting potential
            </p>
            <div className="flex justify-center mt-4">
              <LanguageSelector />
            </div>
          </div>

          {/* Card Form */}
          <Card className="shadow-lg bg-blue-50/80 backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900">साइन इन | Sign In</CardTitle>
              <CardDescription className="text-blue-700">
                अपनी वर्षा जल संचयन मूल्यांकन तक पहुँचें | Access your rainwater harvesting assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-900">ईमेल | Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="engineer@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-900">पासवर्ड | Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11"
                  />
                </div>

                {error && (
                  <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                    {error}
                  </div>
                )}

                <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white">
                  {isLoading ? (
                    <div className="flex items-center gap-2 justify-center">
                      <LoadingSpinner size="sm" />
                      Signing In...
                    </div>
                  ) : (
                    "साइन इन | Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 space-y-4 text-center text-blue-900 text-sm">
                नया खाता नहीं है?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-blue-700 hover:text-blue-900 underline underline-offset-4 font-medium"
                >
                  यहाँ साइन अप करें | Sign Up Here
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-100 hover:text-white text-sm">
              ← होम पर जाएँ | Back to Home
            </Link>
          </div>
=======
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/30 to-background p-6">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Droplets className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">{t("home.title")}</h1>
          </div>
          <p className="text-muted-foreground">{t("home.subtitle")}</p>
          <div className="flex justify-center mt-4">
            <LanguageSelector />
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{t("auth.signIn")}</CardTitle>
            <CardDescription>Sign in to access your rainwater harvesting assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="engineer@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11"
                />
              </div>

              {error && (
                <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                  {error}
                </div>
              )}

              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner size="sm" />
                    Signing In...
                  </div>
                ) : (
                  t("auth.signIn")
                )}
              </Button>
            </form>

            <div className="mt-6 space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                {t("auth.dontHaveAccount")}{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-secondary hover:text-secondary-foreground underline underline-offset-4 font-medium"
                >
                  {t("auth.signUpHere")}
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            ← {t("nav.home")}
          </Link>
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
        </div>
      </div>
    </div>
  )
}
