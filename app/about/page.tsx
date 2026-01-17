"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Users, Target, Lightbulb, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4 uppercase">
            About <span className="text-red-600">StandEase</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Creating comfort for people who stand, one heel at a time
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              StandEase was born from a simple observation: millions of people spend their entire day standing, yet most
              foot support products are designed only for walking or running.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We realized that homemakers, office workers, retail employees, and outdoor professionals needed something
              different—something that addresses the unique challenge of prolonged standing without restricting natural
              movement.
            </p>
          </div>
        </motion.section>

        {/* The Problem */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">The Problem</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Concentrated Heel Pressure</h3>
              <p className="text-gray-600">
                When standing for extended periods, the heel bears up to 80% of your body weight, causing fatigue, pain,
                and long-term damage.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-3">One-Size-Fits-All Solutions</h3>
              <p className="text-gray-600">
                Traditional insoles are designed for athletic activities, not for the specific biomechanics of prolonged
                standing.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Our Solution */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Our Solution</h2>
          </div>
          <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
            <p className="text-gray-800 leading-relaxed mb-4 font-medium">
              StandEase products are engineered specifically for prolonged standing. Our advanced cushioning technology
              distributes heel pressure evenly, reducing fatigue and discomfort.
            </p>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Targeted heel pressure relief without sacrificing natural movement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Works barefoot or inside shoes for maximum versatility</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Lightweight, breathable materials for all-day comfort</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 font-bold">•</span>
                <span>Designed for different work environments and surfaces</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Who It's For */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-red-600" />
            <h2 className="text-3xl font-bold text-gray-900">Who It's For</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Homemakers / Home Workers</h3>
              <p className="text-gray-600">
                Perfect for cooking, cleaning, and daily household activities on hard floors.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Office / Standing Jobs</h3>
              <p className="text-gray-600">
                Ideal for retail workers, teachers, healthcare professionals, and standing desk users.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Outdoor Workers</h3>
              <p className="text-gray-600">
                Engineered for construction, landscaping, and outdoor professionals on uneven surfaces.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Our Philosophy */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Philosophy</h2>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <p className="text-gray-700 leading-relaxed mb-4">
              We believe that comfort shouldn't be a luxury—it should be a standard. Every person who stands for their
              work deserves support that's designed for their specific needs.
            </p>
            <p className="text-gray-700 leading-relaxed">
              That's why we focus on creating simple, effective, affordable solutions that make a real difference in
              people's daily lives. No gimmicks, no over-engineering—just honest products that work.
            </p>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
