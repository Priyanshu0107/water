"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Calculator, FileText, Info, MapPin } from "lucide-react"
import { useI18n } from "@/lib/i18n/context"

export default function HomePage() {
  const { t } = useI18n()

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
            
            {/* Left side: Logo + Hindi name */}
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-700" />
              <h1 className="text-2xl font-bold text-blue-900">जलनिगम | Jalnigam</h1>
            </div>

            {/* Right side: Modi Ji photo + buttons */}
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
                  {t("nav.signIn")} | Sign In
                </Button>
              </Link>
              <Link href="/auth/sign-up">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  {t("home.getStarted")} | Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
              {t("home.subtitle")} | Estimate Your Rainwater Harvesting Potential
            </h2>
            <p className="text-lg mb-8 opacity-90">
              {t("home.description")} | Easily check feasibility and plan sustainable groundwater recharge
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/sign-up">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  {t("home.getStarted")} | Get Started
                </Button>
              </Link>
              <Link href="/demo">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-white text-white hover:bg-blue-700"
                >
                  {t("home.learnMore")} | Learn More
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
            
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>आरटीआरडब्ल्यूएच जांच | RTRWH Feasibility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  आपकी छत पर वर्षा जल संचयन की संभावना की गणना करें | Calculate the feasibility of rooftop rainwater harvesting
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>स्थानीय भूजल जानकारी | Local Groundwater Info</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  क्षेत्र में मुख्य जलस्रोत और जलस्तर की जानकारी प्राप्त करें | Get info about principal aquifer and groundwater levels
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>वर्षा और रनोफ आंकड़े | Rainfall & Runoff</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  स्थानीय वर्षा और रनऑफ क्षमता का विवरण देखें | View local rainfall data and runoff generation capacity
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>संरचना सुझाव | Structure Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  रिसर्च आधारित पुनर्भरण गड्ढे, ट्रेंच और शाफ्ट के सुझाव | Research-based recommended recharge pits, trenches, and shafts
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>लागत और लाभ | Cost & Benefit</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  लागत अनुमान और लागत-लाभ विश्लेषण प्राप्त करें | Get cost estimation and cost-benefit analysis
                </CardDescription>
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
    </div>
  )
}
