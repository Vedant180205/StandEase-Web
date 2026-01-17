"use client"

import { motion } from "framer-motion"
import { Package, Clock, MessageCircle, Shield, Mail } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Warranty</h1>
          <p className="text-gray-600 mb-12">
            Your satisfaction is important to us. Here's everything you need to know about returns and warranty
            coverage.
          </p>

          <div className="space-y-8">
            {/* Return Eligibility */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Package className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>We accept returns for products that meet the following conditions:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Product is unused and in original condition</li>
                      <li>Original packaging is intact</li>
                      <li>All tags and labels are attached</li>
                      <li>No signs of wear or damage</li>
                    </ul>
                    <p className="text-sm text-gray-600 mt-4">
                      Note: For hygiene reasons, we cannot accept returns of products that have been worn or used.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Time Window */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Return Time Window</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>
                      You have <strong>30 days</strong> from the date of delivery to initiate a return.
                    </p>
                    <p>
                      Returns initiated after 30 days will not be accepted. We recommend trying the product within the
                      first week to ensure you have enough time to request a return if needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Initiate a Return */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <MessageCircle className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Initiate a Return</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>To start a return:</p>
                    <ol className="list-decimal list-inside space-y-2 ml-4">
                      <li>Contact our support team through the Contact page</li>
                      <li>Include your order number and reason for return</li>
                      <li>Our team will send you return instructions within 24-48 hours</li>
                      <li>Pack the product securely in original packaging</li>
                      <li>Ship to the address provided in the return instructions</li>
                    </ol>
                    <p className="text-sm text-gray-600 mt-4">
                      Refunds are processed within 5-7 business days after we receive the returned product.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Warranty Coverage */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Warranty Coverage</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>
                      All StandEase products come with a <strong>1-year warranty</strong> that covers:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Manufacturing defects</li>
                      <li>Material degradation under normal use</li>
                      <li>Cushioning failure or premature wear</li>
                      <li>Strap or fastener issues</li>
                    </ul>
                    <p className="mt-4">The warranty does not cover:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Normal wear and tear</li>
                      <li>Damage from improper use or care</li>
                      <li>Damage from washing incorrectly</li>
                      <li>Accidental damage</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Contact */}
            <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Support Contact Information</h2>
                  <div className="text-gray-700 leading-relaxed space-y-3">
                    <p>Have questions about returns or warranty? We're here to help.</p>
                    <div className="bg-gray-50 p-4 rounded-lg mt-4">
                      <p className="font-semibold text-gray-900">Contact Options:</p>
                      <ul className="space-y-2 mt-3">
                        <li>
                          Visit our{" "}
                          <a href="/contact" className="text-red-600 hover:text-red-700 underline">
                            Contact Page
                          </a>
                        </li>
                        <li>Response time: 24-48 hours (business days)</li>
                        <li>Please include your order number for faster assistance</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
