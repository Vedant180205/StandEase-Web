"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function StandingTimeRecommender() {
  const [hours, setHours] = useState(6)
  const router = useRouter()

  const getRecommendation = () => {
    if (hours >= 2 && hours <= 5) {
      return {
        id: 1,
        name: "StandEase Home Heel Band",
        reason: "Perfect for moderate standing hours at home",
      }
    } else if (hours >= 6 && hours <= 9) {
      return {
        id: 2,
        name: "StandEase Office Insole",
        reason: "Designed for extended standing in work environments",
      }
    } else {
      return {
        id: 2,
        name: "StandEase Office Insole",
        reason: "Maximum support for long standing hours",
      }
    }
  }

  const recommendation = getRecommendation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-2xl p-8 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Match</h2>
      <p className="text-gray-600 mb-6">
        Tell us how long you stand daily, and we'll recommend the best product for you
      </p>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">How many hours do you stand daily?</label>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 font-medium">2h</span>
          <input
            type="range"
            min="2"
            max="12"
            value={hours}
            onChange={(e) => setHours(Number.parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
          <span className="text-sm text-gray-600 font-medium">12h</span>
        </div>
        <div className="text-center mt-3">
          <span className="text-3xl font-bold text-red-600">{hours}</span>
          <span className="text-lg text-gray-700 ml-2">hours</span>
        </div>
      </div>

      <motion.div
        key={recommendation.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-sm font-semibold text-red-600">RECOMMENDED FOR YOU</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{recommendation.name}</h3>
        <p className="text-gray-600 mb-4">{recommendation.reason}</p>
        <Button
          onClick={() => router.push(`/products/${recommendation.id}`)}
          className="w-full bg-red-500 hover:bg-red-600 text-white"
        >
          View Recommended Product
        </Button>
      </motion.div>
    </motion.div>
  )
}
