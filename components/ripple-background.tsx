"use client"

import { motion } from "framer-motion"

export function RippleBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 59, 59, 0.08) 0%, transparent 70%)",
          right: "10%",
          top: "20%",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255, 229, 217, 0.12) 0%, transparent 70%)",
          right: "15%",
          top: "35%",
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245, 245, 245, 0.15) 0%, transparent 70%)",
          right: "20%",
          top: "50%",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>
  )
}
