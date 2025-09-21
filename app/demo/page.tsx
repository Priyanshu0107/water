<<<<<<< HEAD
"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets, Calculator, MapPin, FileText, Info } from "lucide-react"

export default function DemoPage() {
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
            {/* Logo + Hindi + English */}
            <div className="flex items-center gap-3">
              <Droplets className="h-8 w-8 text-blue-700" />
              <h1 className="text-2xl font-bold text-blue-900">जलनिगम | Jalnigam</h1>
            </div>

            {/* Modi photo + buttons */}
            <div className="flex items-center gap-4">
              <img
                src="/modi.png"
                alt="PM Modi"
                className="h-10 w-10 rounded-full border-2 border-blue-700"
              />
              <Link href="/auth/login">
                <Button variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-300">
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
        </header>

        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center text-white">
          <h2 className="text-5xl font-bold mb-6 drop-shadow-lg">
            अधिक जानें | Learn More
          </h2>
          <p className="text-lg mb-8 opacity-90">
            हमारे प्लेटफ़ॉर्म की प्रमुख सुविधाएँ और जानकारी देखें | Explore key features of our platform
          </p>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">आरटीआरडब्ल्यूएच जांच | RTRWH Feasibility</h3>
              <p className="text-gray-700">
                अपनी छत पर वर्षा जल संचयन की संभावना की गणना करें | Calculate rooftop rainwater harvesting feasibility
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">स्थानीय भूजल जानकारी | Local Groundwater Info</h3>
              <p className="text-gray-700">
                क्षेत्र में मुख्य जलस्रोत और जलस्तर की जानकारी प्राप्त करें | Get info about principal aquifer and groundwater levels
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Droplets className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">वर्षा और रनऑफ आंकड़े | Rainfall & Runoff</h3>
              <p className="text-gray-700">
                स्थानीय वर्षा और रनऑफ क्षमता देखें | View local rainfall data and runoff generation capacity
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">संरचना सुझाव | Structure Suggestions</h3>
              <p className="text-gray-700">
                रिसर्च आधारित पुनर्भरण गड्ढे, ट्रेंच और शाफ्ट के सुझाव | Recommended recharge pits, trenches, and shafts
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Info className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">लागत और लाभ | Cost & Benefit</h3>
              <p className="text-gray-700">
                लागत अनुमान और लागत-लाभ विश्लेषण प्राप्त करें | Get cost estimation and cost-benefit analysis
              </p>
            </div>

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
=======
// app/learn/page.tsx
import { ArrowRight, Droplet, Building, Trees } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Hero */}
      <section className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold text-blue-700">Learn Rainwater Harvesting</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Understand the importance of Rooftop Rainwater Harvesting (RTRWH) and Artificial Recharge (AR) 
          — conserve groundwater, save costs, and secure the future.
        </p>
      </section>

      {/* What is RTRWH */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-8 text-center">What is RTRWH?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow">
            <Droplet className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Collect</h3>
            <p>Capture rainwater falling on rooftops during rainfall events.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <Building className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Recharge</h3>
            <p>Direct water into recharge pits, trenches, or shafts to replenish aquifers.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <Trees className="h-10 w-10 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Sustain</h3>
            <p>Ensure long-term groundwater sustainability and reduce water scarcity.</p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 px-6 bg-blue-50">
        <h2 className="text-2xl font-semibold text-blue-600 mb-8 text-center">Benefits</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            "Replenishes groundwater",
            "Saves water bills",
            "Prevents flooding",
            "Supports environment",
          ].map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-md">
              <p className="font-medium">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold text-blue-600 mb-8 text-center">How to Assess?</h2>
        <ol className="space-y-6">
          {[
            "Enter your location & roof details",
            "Fetch rainfall & aquifer info",
            "Calculate annual harvest potential",
            "Get recommended structure dimensions",
            "See cost & impact analysis",
          ].map((step, i) => (
            <li key={i} className="flex items-start space-x-4">
              <span className="h-8 w-8 flex items-center justify-center bg-blue-600 text-white rounded-full">
                {i + 1}
              </span>
              <p className="pt-1">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <a
          href="/assess"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
        >
          Try Assessment Tool <ArrowRight className="h-5 w-5" />
        </a>
      </section>
    </div>
  );
>>>>>>> d9ea4dd52e5151b7d7a3b9e7f958a04232a2b6cf
}
