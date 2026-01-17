"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface Product {
  id: number
  name: string
  variant: string
  image: string
  price: number
  sizes: string[]
  colors: string[]
  badge: string
}

interface ProductCardProps {
  product: Product
  index: number
}

export function ProductCard({ product, index }: ProductCardProps) {
  const router = useRouter()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group cursor-pointer bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
      onClick={() => router.push(`/products/${product.id}`)}
      whileHover={{ y: -8 }}
    >
      {/* Badge */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md text-xs font-bold bg-red-600 text-white uppercase">
        {product.badge.split(" ").slice(0, 2).join(" ")}
      </div>

      {/* Product Image - Grounded */}
      <div className="relative bg-gray-50 p-8 flex items-center justify-center h-72">
        <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="p-6 bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-2xl font-bold text-red-600 mb-3">${product.price}</p>

        {/* Sizes */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {product.sizes.slice(0, 4).map((size) => (
            <span key={size} className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
              UK {size}
            </span>
          ))}
          {product.sizes.length > 4 && (
            <span className="px-2 py-1 text-sm text-gray-500">+{product.sizes.length - 4}</span>
          )}
        </div>

        {/* CTA Button */}
        <motion.button
          className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-red-600 transition-colors uppercase tracking-wide"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation()
            router.push(`/products/${product.id}`)
          }}
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  )
}
