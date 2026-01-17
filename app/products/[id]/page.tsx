"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { useCart } from "@/lib/cart-context"
import { useCheckout } from "@/lib/checkout-context"
import { Check, Shield, Truck, RotateCcw, Star, User } from "lucide-react"

const productData = {
  "1": {
    id: 1,
    name: "StandEase Home Heel Band",
    variant: "homemakers",
    image: "/images/homemaker.jpg",
    price: 499.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["blue", "gray", "black"],
    badge: "For Homemakers / Home Workers",
    images: [
      "/images/homemaker-front.png",
      "/images/homemaker.jpg",
      "/images/homemaker-back.png",
      "/images/homemaker-opposite.png",
    ],
    imageLabels: ["Front View", "Side View", "Back/Heel View", "Usage View"],
    description:
      "Premium comfort heel band designed specifically for homemakers and home workers who spend hours on their feet.",
    inStock: true,
    rating: 4.5,
    reviews: 234,
  },
  "2": {
    id: 2,
    name: "StandEase Office Insole",
    variant: "office",
    image: "/images/office-insole-top.jpg",
    price: 449.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["black", "brown", "gray"],
    badge: "For Office / Outside Workers",
    images: [
      "/images/office-insole-all-views.png",
      "/images/office-insole-top.jpg",
      "/images/office-insole-right.png",
      "/images/office-insole-left.png",
    ],
    imageLabels: ["Multiple Views", "Top View", "Right Insole", "Left Insole"],
    description: "Heavy-duty gel heel cups engineered for demanding office and outdoor work environments.",
    inStock: true,
    rating: 4.7,
    reviews: 189,
  },
  "3": {
    id: 3,
    name: "StandEase Women's Heel Insole",
    variant: "office",
    image: "/images/heel-20-20-281-29.png",
    price: 499.99,
    sizes: ["5", "6", "7", "8", "9", "10"],
    colors: ["white", "gray", "blue"],
    badge: "For Office / Outside Workers",
    images: [
      "/images/heel-20-20-281-29.png",
      "/images/heel-20-20-281-29.png",
      "/images/heel-20-20-281-29.png",
      "/images/heel-20-20-281-29.png",
    ],
    imageLabels: ["Front View", "Side View", "Back View", "Usage View"],
    description: "Full-length cushioned insoles with specialized support for women who work on their feet all day.",
    inStock: true,
    rating: 4.6,
    reviews: 312,
  },
}

const reviewsData = {
  "1": [
    {
      context: "Home kitchen work, ~7-8 hrs/day",
      review: "Makes a noticeable difference during meal prep and cleaning. My heels don't ache anymore.",
    },
    {
      context: "Stay-at-home parent, constant movement",
      review: "Perfect for barefoot use while chasing kids around all day. Comfortable and stays in place.",
    },
    {
      context: "Home baker, 4-6 hours standing",
      review: "Lightweight enough that I forget I'm wearing them. No more tired feet after baking sessions.",
    },
  ],
  "2": [
    {
      context: "Retail counter job, 8 hrs standing",
      review: "These gel cups are a game changer. I can make it through full shifts without foot pain now.",
    },
    {
      context: "Office standing desk use, 6+ hrs",
      review: "Fits well in my work shoes. Noticed improvement in posture and reduced heel pressure.",
    },
    {
      context: "Warehouse work, 10 hrs daily",
      review: "Holds up well to heavy use. The cushioning doesn't flatten out like cheaper insoles.",
    },
  ],
  "3": [
    {
      context: "Healthcare worker, 12-hour shifts",
      review: "Full-length support makes a huge difference. My feet and back feel better at end of shift.",
    },
    {
      context: "Teacher, standing 6 hrs/day",
      review: "Great for dress shoes and flats. Provides cushioning without making shoes feel tight.",
    },
    {
      context: "Event coordinator, long days on feet",
      review: "Can wear heels for longer periods now. The arch support really helps during events.",
    },
  ],
}

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const product = productData[params.id as keyof typeof productData] || productData["1"]
  const productReviews = reviewsData[params.id as keyof typeof reviewsData] || reviewsData["1"]

  const { addToCart } = useCart()
  const { setCheckoutFromBuyNow } = useCheckout()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedPack, setSelectedPack] = useState<"single" | "pair">("single")
  const [selectedImage, setSelectedImage] = useState(1)
  const [activeTab, setActiveTab] = useState("variant")
  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize) return

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
    })

    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    if (!selectedSize) return

    setCheckoutFromBuyNow({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      image: product.image,
      quantity: 1,
    })

    router.push("/checkout")
  }

  const tabs = [
    { id: "variant", label: "Why This Variant" },
    { id: "sizing", label: "Sizing Guide" },
    { id: "care", label: "Care & Durability" },
    { id: "returns", label: "Returns & Replacement" },
  ]

  return (
    <motion.div
      className="min-h-screen bg-white text-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.div className="relative mb-6 group">
              <motion.div
                className="bg-gray-50 rounded-3xl p-12 border border-gray-200 flex items-center justify-center shadow-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                style={{ perspective: 1000 }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-auto max-w-md object-contain"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "0 0 40px rgba(239, 68, 68, 0.2)",
                  }}
                />
              </motion.div>
            </motion.div>

            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-gray-50 rounded-xl p-4 border-2 transition-all overflow-hidden ${
                    selectedImage === idx ? "border-red-500 shadow-lg" : "border-gray-200 hover:border-gray-300"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="aspect-square flex items-center justify-center">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} - ${product.imageLabels[idx]}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="text-xs text-gray-600 text-center mt-2">{product.imageLabels[idx]}</div>
                </motion.button>
              ))}
            </div>

            {/* Compression View */}
            <motion.div
              className="mt-6 bg-gray-50 rounded-2xl p-6 border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900">
                <span className="text-red-500">⚙️</span> Compression Technology
              </h3>
              <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: "75%" }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">Advanced cushioning responds to pressure for optimal support</p>
            </motion.div>
          </motion.div>

          {/* Right Side - Product Info */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Badge */}
            <motion.div
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 bg-red-50 text-red-600 border border-red-200"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(239, 68, 68, 0.2)",
                  "0 0 10px rgba(239, 68, 68, 0.3)",
                  "0 0 0px rgba(239, 68, 68, 0.2)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {product.badge}
            </motion.div>

            {/* Product Title & Rating */}
            <h1 className="text-4xl font-bold mb-2 text-gray-900">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">{product.rating} out of 5</span>
              </div>
              <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">
                {product.reviews} reviews
              </span>
            </div>

            <div className="border-b border-gray-200 pb-4 mb-4">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900">${product.price}</div>
              <div className="text-sm text-gray-600 mt-1">FREE delivery on orders over $50</div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-600 font-semibold">In Stock</span>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Select UK Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all ${
                      selectedSize === size
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={selectedSize === size ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    UK {size}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Select Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`relative w-12 h-12 rounded-full border-2 ${
                      selectedColor === color ? "border-red-500 shadow-lg" : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor:
                        color === "blue"
                          ? "#3b82f6"
                          : color === "gray"
                            ? "#6b7280"
                            : color === "black"
                              ? "#000000"
                              : color === "brown"
                                ? "#92400e"
                                : color === "white"
                                  ? "#ffffff"
                                  : "#10b981",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {selectedColor === color && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                          border: "2px solid rgba(239, 68, 68, 0.5)",
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Pack Type Selector */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 text-gray-900">Pack Type</h3>
              <div className="grid grid-cols-2 gap-4">
                {["single", "pair"].map((pack) => (
                  <motion.button
                    key={pack}
                    onClick={() => setSelectedPack(pack as "single" | "pair")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPack === pack ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-lg font-semibold capitalize text-gray-900">{pack}</div>
                    <div className="text-sm text-gray-600">{pack === "single" ? "$29.99" : "$54.99 (Save 8%)"}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full py-6 text-lg font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl relative overflow-hidden shadow-lg"
              >
                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="success"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      ✓ Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                    >
                      {selectedSize ? "Add to Cart" : "Select a Size"}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Subtle shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 1,
                  }}
                />
              </Button>
            </motion.div>

            {/* Buy Now Button */}
            <motion.div className="mt-4" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleBuyNow}
                disabled={!selectedSize}
                className="w-full py-6 text-lg font-bold bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg"
              >
                {selectedSize ? "Buy Now" : "Select a Size"}
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <div className="border-t border-gray-200 pt-6 mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Free delivery on orders over $50</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <RotateCcw className="w-5 h-5 text-green-600" />
                <span>30-day returns policy</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Shield className="w-5 h-5 text-green-600" />
                <span>1-year warranty included</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Sections */}
        <div className="mt-16 space-y-8">
          {/* Key Features */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Reduces concentrated heel pressure during extended standing periods
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Breathable materials prevent moisture buildup and odor</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Lightweight design allows natural foot movement</span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">Compatible with barefoot use and inside shoes</span>
              </li>
            </ul>
          </div>

          {/* Product Description */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Description</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                StandEase products are designed for people who spend long hours standing on their feet. Whether you're
                working from home, in an office, or outdoors, our cushioning technology provides targeted support where
                you need it most.
              </p>
              <p>
                The ergonomic design distributes pressure evenly across your heel, reducing fatigue and discomfort. Made
                with high-quality materials that maintain their cushioning properties over time, StandEase products
                offer reliable comfort day after day.
              </p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Experiences</h2>
            <div className="space-y-4">
              {productReviews.map((review, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{review.context}</p>
                      <p className="text-gray-700 leading-relaxed">{review.review}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Additional Information</h2>
            <div className="space-y-4">
              <div className="grid md:grid-cols-[200px_1fr] gap-4 pb-4 border-b border-gray-200">
                <span className="font-semibold text-gray-900">Material:</span>
                <span className="text-gray-700">Medical-grade silicone gel, breathable fabric</span>
              </div>
              <div className="grid md:grid-cols-[200px_1fr] gap-4 pb-4 border-b border-gray-200">
                <span className="font-semibold text-gray-900">Care Instructions:</span>
                <span className="text-gray-700">Hand wash with mild soap, air dry</span>
              </div>
              <div className="grid md:grid-cols-[200px_1fr] gap-4">
                <span className="font-semibold text-gray-900">Intended Use:</span>
                <span className="text-gray-700">Extended standing, home and office environments</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 py-12">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mb-6 px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-900 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.3)" }}
          >
            ↑ Back to Top
          </motion.button>
          <p>© 2026 StandEase. Premium Comfort Technology.</p>
        </div>
      </footer>
    </motion.div>
  )
}
