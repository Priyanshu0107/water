"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, MapPin, Info } from "lucide-react"

export default function LocalGroundwaterPage() {
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
      <div className="bg-blue-900/40 min-h-screen">
        
        {/* Header / Navbar */}
        <header className="bg-blue-200 shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-700" />
              <h1 className="text-2xl font-bold text-blue-900">जलनिगम | Jalnigam</h1>
            </div>

            {/* Right side */}
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
              <Link href="/" className="text-blue-900 font-medium hover:underline">
                Home
              </Link>
              <Link href="/features/rtrwh-feasibility" className="text-blue-900 font-medium hover:underline">
                RTRWH Feasibility
              </Link>
              <Link href="/features/second-feature" className="text-blue-900 font-semibold underline">
                Local Groundwater Info
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
              स्थानीय भूजल जानकारी | Local Groundwater Info
            </h2>
            <p className="text-lg mb-8 opacity-90">
              अपने क्षेत्र में जलस्तर और प्रमुख जलस्रोत की जानकारी देखें |  
              Get detailed info about groundwater levels and aquifers in your area
            </p>
          </div>
        </section>

        {/* Info Cards Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>जलस्तर जानकारी | Groundwater Levels</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  अपने क्षेत्र के औसत जलस्तर की जानकारी प्राप्त करें |  
                  Access average groundwater level details of your location
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>मुख्य जलस्रोत | Principal Aquifers</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  अपने क्षेत्र के प्रमुख जलस्रोत और एक्वीफर की पहचान करें |  
                  Identify major aquifers and water sources in your region
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center bg-white shadow-lg">
              <CardHeader>
                <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>जल संरक्षण सुझाव | Conservation Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  स्थानीय परिस्थिति के अनुसार जल संरक्षण उपाय जानें |  
                  Get groundwater conservation suggestions tailored to your area
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
