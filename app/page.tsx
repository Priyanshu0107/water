"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Calculator, FileText } from "lucide-react"
import { LanguageSelector } from "@/components/ui/language-selector"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">AquaHarvest</h1>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <Link href="/auth/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Smarter Rainwater Harvesting for Everyone
          </h2>
          <p className="text-xl text-muted-foreground text-pretty mb-8">
            Plan, assess, and implement rainwater harvesting systems with ease. Sustainable and cost-effective water solutions for a better tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Our Key Features</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to plan and implement an effective rainwater harvesting system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardHeader>
              <Calculator className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Professional Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get accurate, data-driven insights for your rainwater harvesting setup.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Droplets className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Cost Effective Solutions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Save money while conserving water with optimized harvesting techniques.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <CardTitle>Comprehensive Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate detailed, easy-to-understand reports tailored to your project.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 AquaHarvest. Professional rainwater harvesting assessment platform.</p>
        </div>
      </footer>
    </div>
  )
}
