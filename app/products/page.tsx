"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { ProductCard } from "@/components/product-card"
import { FilterSidebar } from "@/components/filter-sidebar"
import { Navbar } from "@/components/navbar"
import { StandingTimeRecommender } from "@/components/standing-time-recommender"

const products = [
  {
    id: 1,
    name: "StandEase Home Heel Band",
    variant: "homemakers",
    image: "/images/homemaker.jpg",
    price: 499.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["blue", "gray", "black"],
    badge: "For Homemakers / Home Workers",
  },
  {
    id: 2,
    name: "StandEase Office Insole",
    variant: "office",
    image: "/images/office-insole-top.jpg",
    price: 449.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["black", "brown", "gray"],
    badge: "For Office / Outside Workers",
  },
  {
    id: 3,
    name: "StandEase Women's Heel Insole",
    variant: "office",
    image: "/images/heel-20-20-281-29.png",
    price: 499.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["white", "gray", "blue"],
    badge: "For Office / Outside Workers",
  },
]

function ProductListingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialType = searchParams.get("type") || "all"

  const [filters, setFilters] = useState({
    workType: initialType,
  })

  const [filteredProducts, setFilteredProducts] = useState(products)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    setIsTransitioning(true)
    setTimeout(() => {
      const filtered = products.filter((product) => {
        if (filters.workType === "all") return true
        if (filters.workType === "homemakers" && product.variant === "homemakers") return true
        if (filters.workType === "office" && product.variant === "office") return true
        return false
      })
      setFilteredProducts(filtered)
      setIsTransitioning(false)
    }, 300)
  }, [filters])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          className="mb-8 pb-6 border-b-2 border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 uppercase">
            {filters.workType === "homemakers"
              ? "Homemakers / Home Workers"
              : filters.workType === "office"
                ? "Office / Outside Workers"
                : "All Products"}
          </h1>
          <p className="text-gray-600">{filteredProducts.length} products available</p>
        </motion.div>

        {/* Standing Time Recommender section */}
        <div className="mb-12">
          <StandingTimeRecommender />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <FilterSidebar filters={filters} setFilters={setFilters} />

          {/* Product Grid */}
          <div className="flex-1">
            <motion.div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6" layout>
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && !isTransitioning && (
              <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters to see more results</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductListingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <ProductListingContent />
    </Suspense>
  )
}
