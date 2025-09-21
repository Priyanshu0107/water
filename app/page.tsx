"use client"
<<<<<<< HEAD
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Calculator, FileText, Info, MapPin } from "lucide-react"

export default function HomePage() {
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
      <div className="bg-blue-900/40 min-h-screen">

        {/* Header / Navbar */}
        <header className="bg-blue-200 shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* Left side: Logo */}
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-700" />
              <h1 className="text-2xl font-bold text-blue-900">जलनिगम | Jalnigam</h1>
            </div>

            {/* Right side: Photo + buttons */}
            <div className="flex items-center gap-4">
              <img
                src="/modi.png"
                alt="PM Modi"
                className="h-10 w-10 rounded-full border-2 border-blue-700"
              />
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-blue-700 text-blue-700 hover:bg-blue-300"
                >
                  लॉगिन | Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  शुरू करें | Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Navbar Links */}
          <nav className="bg-blue-300">
            <div className="container mx-auto px-4 py-2 flex gap-6">
              <Link href="/">
                <span className="cursor-pointer text-blue-900 font-medium hover:underline">Home</span>
              </Link>
              <Link href="/features/rtrwh-feasibility">
                <span className="cursor-pointer text-blue-900 font-medium hover:underline">RTRWH Feasibility</span>
              </Link>
              <Link href="/features/second-feature">
                <span className="cursor-pointer text-blue-900 font-medium hover:underline">Local Groundwater Info</span>
              </Link>
              <Link href="/features/rainfall-runoff">
                <span className="cursor-pointer text-blue-900 font-medium hover:underline">Rainfall & Runoff</span>
              </Link>
              <Link href="/features/structure-suggestions">
                <span className="cursor-pointer text-blue-900 font-medium hover:underline">Structure Suggestions</span>
              </Link>
              <Link href="/features/cost-benefit">
                <span className="cursor-pointer text-blue-900 font-medium hover:underline">Cost & Benefit</span>
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
              जलनिगम - वर्षा जल संचयन क्षमता जांचें | Estimate Your Rainwater Harvesting Potential
            </h2>
            <p className="text-lg mb-8 opacity-90">
              आसानी से अपनी छत पर वर्षा जल संचयन की संभावना जांचें और सतत जल पुनर्भरण योजना बनाएं | Easily check feasibility and plan sustainable groundwater recharge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  शुरू करें | Get Started
                </Button>
              </Link>
              <Link href="/features/rtrwh-feasibility">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-blue-700"
                >
                  अधिक जानें | Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12 text-white">
            <h3 className="text-3xl font-bold mb-4">मुख्य विशेषताएँ | Key Features</h3>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              हमारा प्लेटफ़ॉर्म जल संरक्षण और वर्षा जल संचयन को सरल बनाता है | Our platform simplifies groundwater conservation and rainwater harvesting
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* RTRWH */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>आरटीआरडब्ल्यूएच जांच | RTRWH Feasibility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  अपनी छत पर वर्षा जल संचयन की संभावना की गणना करें | Calculate the feasibility of rooftop rainwater harvesting
                </CardDescription>
                <Link href="/features/rtrwh-feasibility">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Explore</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Local Groundwater Info */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>स्थानीय भूजल जानकारी | Local Groundwater Info</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  अपने क्षेत्र में जलस्तर और प्रमुख जलस्रोत की जानकारी देखें | Get info about groundwater levels and aquifers
                </CardDescription>
                <Link href="/features/second-feature">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Explore</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Rainfall & Runoff */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>वर्षा और रनऑफ आंकड़े | Rainfall & Runoff</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  स्थानीय वर्षा डेटा और रनऑफ क्षमता देखें | View rainfall data and runoff generation
                </CardDescription>
                <Link href="/features/rainfall-runoff">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Explore</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Structure Suggestions */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>संरचना सुझाव | Structure Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  रिसर्च आधारित गड्ढे, ट्रेंच और शाफ्ट के सुझाव प्राप्त करें | Recommendations for recharge pits, trenches, shafts
                </CardDescription>
                <Link href="/features/structure-suggestions">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Explore</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Cost & Benefit */}
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>लागत और लाभ | Cost & Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  अनुमानित लागत और लागत-लाभ विश्लेषण प्राप्त करें | Get estimated cost and benefit analysis
                </CardDescription>
                <Link href="/features/cost-benefit">
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Explore</Button>
                </Link>
              </CardContent>
            </Card>

          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-blue-200 mt-16">
          <div className="container mx-auto px-4 py-6 text-center text-blue-900">
            &copy; 2024 Ministry of Jal Shakti | AquaHarvest - Rainwater Harvesting Platform
          </div>
        </footer>
      </div>
=======

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
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
    </div>
  )
}
