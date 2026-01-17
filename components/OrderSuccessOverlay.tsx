"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export default function OrderSuccessOverlay() {
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="bg-white rounded-2xl p-10 text-center shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-green-600" />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-900">
          Order Placed Successfully
        </h2>

        <p className="text-gray-600 mt-2">
          Redirecting to your orders…
        </p>
      </motion.div>
    </div>
  )
}
