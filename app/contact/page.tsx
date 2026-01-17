"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 mb-12">
            Have questions about StandEase? We're here to help you find the perfect solution for your needs.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">support@standease.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">London, United Kingdom</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please
                  call our support line.
                </p>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  {submitted ? (
                    <>✓ Message Sent!</>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-green-600 font-medium"
                  >
                    Thank you for reaching out! We'll get back to you soon.
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
