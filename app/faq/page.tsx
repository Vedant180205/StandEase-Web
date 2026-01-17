"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"

const faqData = [
  {
    section: "Fit & Usage",
    questions: [
      {
        q: "How does StandEase fit?",
        a: "StandEase products are designed to fit comfortably based on your UK shoe size. The Home Heel Band wraps around the heel with an adjustable strap, while insoles fit directly inside your shoes. We recommend selecting your regular shoe size for the best fit.",
      },
      {
        q: "Can it be used barefoot?",
        a: "Yes, the Home Heel Band is specifically designed for barefoot use around the home or office. The soft, breathable materials prevent irritation during extended wear without shoes.",
      },
      {
        q: "Can it be worn inside shoes?",
        a: "The Office Insole and Women's Heel Insole are designed to fit inside most shoe types. They work well with sneakers, work boots, dress shoes, and casual footwear. The slim profile ensures they don't make shoes feel too tight.",
      },
    ],
  },
  {
    section: "Comfort & Durability",
    questions: [
      {
        q: "How long can I wear StandEase daily?",
        a: "StandEase products are designed for all-day wear. Many customers wear them for 8-12 hours daily without discomfort. We recommend starting with a few hours and gradually increasing wear time as your feet adjust.",
      },
      {
        q: "Is it suitable for long standing hours?",
        a: "Absolutely. StandEase was specifically created for people who stand for extended periods—whether at home, in an office, or outdoors. The cushioning technology provides consistent support throughout the day.",
      },
      {
        q: "How durable is the product?",
        a: "With proper care, StandEase products typically last 6-12 months with daily use. The medical-grade materials maintain their cushioning properties over time, and the construction is built to withstand regular wear.",
      },
    ],
  },
  {
    section: "Care",
    questions: [
      {
        q: "Is StandEase washable?",
        a: "Yes, all StandEase products are washable. We recommend hand washing with mild soap and air drying. Do not machine wash or use harsh chemicals, as this may degrade the cushioning materials.",
      },
      {
        q: "How should I clean it?",
        a: "For best results: (1) Remove from shoes if applicable, (2) Hand wash with mild soap and warm water, (3) Rinse thoroughly, (4) Pat dry with a towel, (5) Air dry completely before next use. Avoid direct sunlight or heat sources during drying.",
      },
    ],
  },
  {
    section: "Orders & Returns",
    questions: [
      {
        q: "What is the return policy?",
        a: "We offer a 30-day return policy for unused products in original packaging. If you're not satisfied with your purchase, contact our support team to initiate a return. Please see our Returns & Warranty page for complete details.",
      },
      {
        q: "How do I contact support?",
        a: "You can reach our support team through the Contact page on our website. We typically respond within 24-48 hours during business days. Include your order number if you have questions about a specific purchase.",
      },
    ],
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 text-gray-700 leading-relaxed">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 mb-12">Find answers to common questions about StandEase products</p>

          <div className="space-y-8">
            {faqData.map((section) => (
              <div key={section.section}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.section}</h2>
                <div className="space-y-3">
                  {section.questions.map((item, idx) => (
                    <FAQItem key={idx} question={item.q} answer={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
