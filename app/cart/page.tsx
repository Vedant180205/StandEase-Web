"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { useCart } from "@/lib/cart-context"
import { useCheckout } from "@/lib/checkout-context"
import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const router = useRouter()
  const { cart, updateQuantity, removeFromCart } = useCart()
  const { setCheckoutFromCart } = useCheckout()

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return
    setCheckoutFromCart(cart)
    router.push("/checkout")
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8 uppercase">Your Cart</h1>

          {cart.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add some products to get started</p>
              <motion.button
                onClick={() => router.push("/products")}
                className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors uppercase tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Shop Now
              </motion.button>
            </div>
          ) : (
            <div className="space-y-6">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.size}-${item.color}`}
                    className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="w-32 h-32 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                        <div className="flex gap-4 text-sm text-gray-600 mb-4">
                          <span>Size: UK {item.size}</span>
                          <span>•</span>
                          <span className="capitalize">Color: {item.color}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <motion.button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus className="w-4 h-4 text-gray-700" />
                            </motion.button>

                            <span className="w-12 text-center font-semibold text-gray-900">{item.quantity}</span>

                            <motion.button
                              onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="w-4 h-4 text-gray-700" />
                            </motion.button>
                          </div>

                          {/* Price and Remove */}
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-red-500">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">${item.price.toFixed(2)} each</div>
                            </div>

                            <motion.button
                              onClick={() => removeFromCart(item.id, item.size, item.color)}
                              className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Trash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-semibold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-red-500">${totalPrice.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleProceedToCheckout}
                  className="w-full py-6 text-lg font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg uppercase tracking-wide"
                >
                  Proceed to Checkout
                </Button>

                <motion.button
                  onClick={() => router.push("/products")}
                  className="w-full mt-4 py-3 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  Continue Shopping
                </motion.button>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
