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
}
