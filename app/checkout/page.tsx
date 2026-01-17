"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { useCheckout } from "@/lib/checkout-context"
import { Button } from "@/components/ui/button"
import { ShoppingBag, CreditCard, Wallet, Banknote } from "lucide-react"
import { AuthGuard } from "@/components/auth-guard"
import { createOrder } from "@/lib/order-service"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import OrderSuccessOverlay from "@/components/OrderSuccessOverlay"



export default function CheckoutPage() {
  const router = useRouter()
  const {
  checkoutItems,
  paymentMethod,
  setPaymentMethod,
  setAddress,
  clearCheckout,
} = useCheckout()

  


  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (checkoutItems.length === 0) {
      router.push("/cart")
    }
  }, [checkoutItems, router])

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal + shipping

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"
    if (!formData.state.trim()) newErrors.state = "State is required"
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required"

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { user } = useAuth()
  const { clearCart } = useCart()
  const [showSuccess, setShowSuccess] = useState(false)




const handleProceedToPayment = async () => {
  if (!validateForm() || !user) return

  setAddress(formData)

  if (paymentMethod === "cod") {
    await createOrder(user.uid, {
      items: checkoutItems,
      address: formData,
      paymentMethod: "cod",
      totalAmount: total,
    })

    clearCart()
    setShowSuccess(true)

    setTimeout(() => {
      router.push("/orders")
    }, 2500)

    return // ✅ correct place
  }

  // UPI / CARD
  router.push("/payment")
}




  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (checkoutItems.length === 0) {
    return null
  }

  return (
    <AuthGuard>
      {showSuccess && <OrderSuccessOverlay />}

      <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-red-500" />
                  Delivery Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-red-500`}
                        placeholder="+1 234 567 8900"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-red-500`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Address Line *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.address ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-red-500`}
                      placeholder="123 Main Street, Apt 4B"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.city ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-red-500`}
                        placeholder="New York"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.state ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-red-500`}
                        placeholder="NY"
                      />
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode *</label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange("pincode", e.target.value)}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.pincode ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-red-500`}
                        placeholder="10001"
                      />
                      {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-red-500" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <motion.button
                    onClick={() => setPaymentMethod("cod")}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                      paymentMethod === "cod" ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Banknote className="w-6 h-6 text-gray-700" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive the product</div>
                    </div>
                    {paymentMethod === "cod" && (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => setPaymentMethod("upi")}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                      paymentMethod === "upi" ? "border-red-500 bg-red-50" : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Wallet className="w-6 h-6 text-gray-700" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">UPI</div>
                      <div className="text-sm text-gray-600">Pay using UPI apps</div>
                    </div>
                    {paymentMethod === "upi" && (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </motion.button>

                  <motion.button
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                      paymentMethod === "card"
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white hover:bg-gray-50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <CreditCard className="w-6 h-6 text-gray-700" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-gray-900">Credit / Debit Card</div>
                      <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
                    </div>
                    {paymentMethod === "card" && (
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {checkoutItems.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-4">
                      <div className="w-20 h-20 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-200">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-contain p-2"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                        <div className="text-xs text-gray-600 mt-1">
                          Size: UK {item.size} • {item.color}
                        </div>
                        <div className="text-sm text-gray-900 mt-1">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span className="text-red-500">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleProceedToPayment}
                  className="w-full mt-6 py-6 text-lg font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Proceed to Payment
                </Button>

                <motion.button
                  onClick={() => router.back()}
                  className="w-full mt-3 py-3 text-gray-700 hover:text-red-600 font-medium transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  Back to Cart
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>

    </AuthGuard>
    
  )
}
