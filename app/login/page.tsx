"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Mail, Lock, UserIcon } from "lucide-react"

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function LoginPage() {
  const router = useRouter()

  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
        console.log("User signed up")
      } else {
        await signInWithEmailAndPassword(auth, email, password)
        console.log("User logged in")
      }

      router.push("/") // redirect after success
    } catch (err) {
      console.error("Auth error:", err)
      alert("Authentication failed. Check console.")
    } finally {
      setLoading(false)
    }
  }

  const handleGuestCheckout = () => {
    router.push("/cart")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <motion.div
            className="bg-white border-2 border-gray-200 rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-6 uppercase text-center">
              {isSignUp ? "Sign Up" : "Login"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors uppercase tracking-wide disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading
                  ? "Please wait..."
                  : isSignUp
                  ? "Create Account"
                  : "Login"}
              </motion.button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500 font-medium">
                    OR
                  </span>
                </div>
              </div>

              <motion.button
                onClick={handleGuestCheckout}
                className="w-full mt-6 py-4 border-2 border-gray-900 text-gray-900 font-bold rounded-lg hover:bg-gray-900 hover:text-white transition-colors uppercase tracking-wide"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue as Guest
              </motion.button>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gray-600 hover:text-red-600 font-medium transition-colors"
              >
                {isSignUp
                  ? "Already have an account? Login"
                  : "Don't have an account? Sign Up"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
