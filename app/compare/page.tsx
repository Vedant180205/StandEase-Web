"use client"

import { motion } from "framer-motion"
import { Check, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

const products = [
  {
    id: 1,
    name: "StandEase Home Heel Band",
    image: "/images/homemaker.png",
    price: 499.99,
    intendedUse: "Home & kitchen work, light standing",
    barefootCompatible: true,
    shoeCompatible: false,
    standingDuration: "2-6 hours daily",
    cushioningFocus: "Heel-specific support",
  },
  {
    id: 2,
    name: "StandEase Office Insole",
    image: "/images/ofice-worker.jpg",
    price: 449.99,
    intendedUse: "Office, standing desk, outdoor work",
    barefootCompatible: false,
    shoeCompatible: true,
    standingDuration: "6-12 hours daily",
    cushioningFocus: "Full heel cup with gel",
  },
  {
    id: 3,
    name: "StandEase Women's Heel Insole",
    image: "/images/heel-20-20-281-29.png",
    price: 499.99,
    intendedUse: "Office, retail, service work",
    barefootCompatible: false,
    shoeCompatible: true,
    standingDuration: "4-10 hours daily",
    cushioningFocus: "Full-length support",
  },
]

export default function ComparePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Comparison</h1>
          <p className="text-gray-600 mb-12">Compare our products to find the perfect fit for your needs</p>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                  {products.map((product) => (
                    <th key={product.id} className="p-4">
                      <div className="text-center">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-32 h-32 object-contain mx-auto mb-3 rounded-lg"
                        />
                        <div className="font-bold text-gray-900 mb-1">{product.name}</div>
                        <div className="text-lg font-semibold text-red-600">${product.price}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium text-gray-900">Intended Use</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center text-gray-700">
                      {product.intendedUse}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Barefoot Compatible</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      {product.barefootCompatible ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium text-gray-900">Shoe Compatible</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      {product.shoeCompatible ? (
                        <Check className="w-6 h-6 text-green-600 mx-auto" />
                      ) : (
                        <X className="w-6 h-6 text-gray-400 mx-auto" />
                      )}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">Standing Duration</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center text-gray-700">
                      {product.standingDuration}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-medium text-gray-900">Cushioning Focus</td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center text-gray-700">
                      {product.cushioningFocus}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4"></td>
                  {products.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      <Button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        View Product
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="border border-gray-200 rounded-xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900">{product.name}</h3>
                    <p className="text-lg font-semibold text-red-600">${product.price}</p>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Intended Use:</span>
                    <span className="text-gray-900">{product.intendedUse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Barefoot:</span>
                    {product.barefootCompatible ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">In Shoes:</span>
                    {product.shoeCompatible ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <X className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Duration:</span>
                    <span className="text-gray-900">{product.standingDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700 font-medium">Cushioning:</span>
                    <span className="text-gray-900">{product.cushioningFocus}</span>
                  </div>
                </div>
                <Button
                  onClick={() => router.push(`/products/${product.id}`)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  View Product
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
