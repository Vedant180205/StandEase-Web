"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Shield, Heart, Footprints, Feather, ChevronRight, ChevronDown } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative">
          <div className="ripple-background">
            <div className="circle xxlarge shade1"></div>
            <div className="circle xlarge shade2"></div>
            <div className="circle large shade3"></div>
            <div className="circle medium shade4"></div>
            <div className="circle small shade5"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-2">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 lg:pl-4"
            >
              <motion.div
                className="inline-block px-4 py-2 bg-red-50 text-red-600 rounded-full text-sm font-semibold uppercase tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                New Collection
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight uppercase"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Stand<span className="text-red-600">Ease</span>
              </motion.h1>

              <motion.h2
                className="text-xl md:text-2xl font-semibold text-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Built for people who <span className="text-red-600">stand</span>, not just shoes.
              </motion.h2>

              <motion.p
                className="text-base text-gray-600 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                StandEase reduces concentrated heel pressure caused by long hours of standing. Designed for homes,
                offices, and outdoor work without restricting natural movement.
              </motion.p>

              <motion.div
                className="grid grid-cols-2 gap-x-6 gap-y-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  { icon: Shield, label: "Heel Pressure Relief" },
                  { icon: Heart, label: "All-Day Standing Comfort" },
                  { icon: Footprints, label: "Works Barefoot & With Shoes" },
                  { icon: Feather, label: "Lightweight, Flexible Support" },
                ].map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="flex items-center gap-2 text-sm"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <feature.icon className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium leading-tight">{feature.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  onClick={() => router.push("/products")}
                  className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 uppercase tracking-wide"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Shop Now
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right - Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative flex items-center justify-center lg:justify-end z-2"
            >
              {/* Product image */}
              <div className="bg-gray-50 rounded-2xl p-8 relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-40 rounded-2xl" />
                <img
                  src="/images/homemaker.png"
                  alt="StandEase Product"
                  className="w-full h-auto object-contain relative z-10"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex flex-col items-center justify-center mt-16 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-sm uppercase tracking-wide mb-1">Scroll to explore</span>
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Shield, label: "Pressure Relief" },
              { icon: Heart, label: "All-Day Comfort" },
              { icon: Footprints, label: "Barefoot & Shoes" },
              { icon: Feather, label: "Lightweight" },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                className="flex flex-col items-center text-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="w-8 h-8 text-red-600" />
                <span className="font-semibold text-gray-900">{feature.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto px-4 py-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 uppercase"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Shop by <span className="text-red-600">Category</span>
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Homemakers", image: "/images/homemaker.png", filter: "homemakers" },
            { title: "Office Workers", image: "/images/ofice-worker.jpg", filter: "office" },
            { title: "All Products", image: "/images/heel-20-20-281-29.png", filter: "all" },
          ].map((category, index) => (
            <motion.div
              key={category.title}
              className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => router.push(`/products?type=${category.filter}`)}
              whileHover={{ y: -8 }}
            >
              <div className="h-64 overflow-hidden bg-gray-50">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 bg-white border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <motion.div className="flex items-center gap-2 text-red-600 font-semibold" whileHover={{ x: 4 }}>
                  Shop Now <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
