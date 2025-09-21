"use client"
import { useState } from "react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function StructureSuggestionsPage() {
  const suggestions = [
    {
      title: "Recharge Pit | रिचार्ज गड्ढा",
      description:
        "भूजल पुनर्भरण के लिए गड्ढे बनाएं, जो वर्षा जल को सीधे जमीन में भेजें।",
      details: "Recharge pits are shallow pits excavated in the ground to capture rainwater and allow it to percolate into the soil. They are most effective for small catchment areas and can recharge groundwater efficiently.",
      img: "/images/recharge-pit.jpg",
    },
    {
      title: "Recharge Trench | रिचार्ज ट्रेंच",
      description:
        "लंबे और संकीर्ण खांचे बनाएं जो बारिश के पानी को धीरे-धीरे भूजल में प्रवेश कराएं।",
      details: "Recharge trenches are long, narrow excavations that capture runoff water and allow gradual percolation. They are ideal for larger catchment areas and can prevent soil erosion.",
      img: "/images/recharge-trench.jpg",
    },
    {
      title: "Recharge Shaft | रिचार्ज शाफ्ट",
      description:
        "गहरी vertical shaft बनाएं ताकि बारिश का पानी जल्दी भूजल स्तर तक पहुंच सके।",
      details: "Recharge shafts are vertical structures drilled into the ground, often filled with gravel or stones, to allow rapid water percolation to deeper aquifers. Best suited for areas with deeper water tables.",
      img: "/images/recharge-shaft.jpg",
    },
  ]

  const [selected, setSelected] = useState<number | null>(null)

  return (
    <div
      className="min-h-screen bg-blue-50"
      style={{
        backgroundImage: "url('/bg-jalshakti.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-blue-900/40 min-h-screen py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
            संरचना सुझाव | Structure Suggestions
          </h1>
          <p className="text-lg text-white text-center mb-12 max-w-3xl mx-auto opacity-90">
            रिसर्च आधारित गड्ढे, ट्रेंच और शाफ्ट के सुझाव प्राप्त करें | Recommendations for recharge pits, trenches, shafts
          </p>

          {/* Suggestions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suggestions.map((sugg, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                onClick={() => setSelected(index)}
              >
                <img src={sugg.img} alt={sugg.title} className="h-48 w-full object-cover" />
                <CardContent className="p-6 text-center">
                  <CardTitle className="text-xl font-bold mb-2">{sugg.title}</CardTitle>
                  <CardDescription className="text-gray-700">{sugg.description}</CardDescription>
                </CardContent>
              </motion.div>
            ))}
          </div>

          {/* Modal */}
          <AnimatePresence>
            {selected !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-white rounded-lg max-w-xl w-full p-6 relative"
                >
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
                    onClick={() => setSelected(null)}
                  >
                    &times;
                  </button>
                  <img
                    src={suggestions[selected].img}
                    alt={suggestions[selected].title}
                    className="w-full h-64 object-cover rounded mb-4"
                  />
                  <h2 className="text-2xl font-bold mb-2">{suggestions[selected].title}</h2>
                  <p className="text-gray-700">{suggestions[selected].details}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back Button */}
          <div className="text-center mt-12">
            <Link href="/" passHref>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-transform hover:scale-105">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
