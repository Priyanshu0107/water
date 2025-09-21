"use client"

import type React from "react"
import { createBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Droplets } from "lucide-react"
import { LanguageSelector } from "@/components/ui/language-selector"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
    role: "homeowner",
    agreeToTerms: false,
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createBrowserClient()
    setIsLoading(true)
    setError(null)

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match | पासवर्ड मेल नहीं खाते")
      setIsLoading(false)
      return
    }
    if (!formData.agreeToTerms) {
      setError("Please agree to the terms | कृपया नियमों से सहमत हों")
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/dashboard`,
          data: {
            full_name: formData.fullName,
            organization: formData.organization,
            role: formData.role,
          },
        },
      })
      if (error) throw error
      router.push("/auth/sign-up-success")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
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

          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Droplets className="h-10 w-10 text-blue-300" />
              <h1 className="text-3xl font-bold text-white">जलनिगम | Jalnigam</h1>
            </div>
            <p className="text-blue-100 text-sm">
              नया खाता बनाएं और वर्षा जल संचयन मूल्यांकन तक पहुँचें | Create an account to access rainwater harvesting assessments
            </p>
            <div className="flex justify-center mt-4">
              <LanguageSelector />
            </div>
          </div>

          {/* SignUp Card */}
          <Card className="shadow-lg bg-blue-50/80 backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-blue-900">साइन अप | Sign Up</CardTitle>
              <CardDescription className="text-blue-700">
                Join thousands of professionals using AquaHarvest for sustainable water management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-blue-900">पूरा नाम | Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-900">ईमेल | Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="engineer@example.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-blue-900">संगठन | Organization</Label>
                  <Input
                    id="organization"
                    name="organization"
                    type="text"
                    placeholder="Engineering Consultancy Ltd."
                    value={formData.organization}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="text-blue-900">भूमिका | Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="homeowner">Homeowner | गृहस्वामी</SelectItem>
                      <SelectItem value="professional">Professional | पेशेवर</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-900">पासवर्ड | Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-blue-900">पासवर्ड पुष्टि | Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="h-11"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeToTerms: checked as boolean }))}
                  />
                  <Label htmlFor="terms" className="text-sm text-blue-900">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-700 hover:underline">Terms of Service</Link> and{" "}
                    <Link href="/privacy" className="text-blue-700 hover:underline">Privacy Policy</Link>
                  </Label>
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
                      Creating Account...
                    </div>
                  ) : (
                    "साइन अप | Sign Up"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-blue-100">
                खाता पहले से है?{" "}
                <Link
                  href="/auth/login"
                  className="text-blue-300 hover:text-white underline underline-offset-4 font-medium"
                >
                  साइन इन करें | Sign In
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <Link href="/" className="text-blue-100 hover:text-white text-sm">
              ← होम पर जाएँ | Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
