"use client"

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { useCheckout } from "@/lib/checkout-context"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Check, CreditCard, Wallet } from "lucide-react"
import { createOrder } from "@/lib/order-service"
import { useAuth } from "@/lib/auth-context"
import OrderSuccessOverlay from "@/components/OrderSuccessOverlay"


export default function PaymentPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { checkoutItems, address, paymentMethod, clearCheckout } = useCheckout()
  const { clearCart } = useCart()

  const [processing, setProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [error, setError] = useState("")

  const [showSuccess, setShowSuccess] = useState(false)



  useEffect(() => {
    if (!user || checkoutItems.length === 0) {
      router.push("/checkout")
    }
  }, [checkoutItems, user, router])

  const total = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // 🔒 SINGLE ORDER CREATION FUNCTION
  const finalizeOrder = async () => {
    await createOrder(user!.uid, {
      items: checkoutItems,
      address,
      paymentMethod,
      totalAmount: total,
    })

    setShowSuccess(true)

setTimeout(() => {
  clearCheckout()
  clearCart()
  router.push("/orders")
}, 2500)

  }

  // ✅ COD FLOW
  const handleCODConfirm = async () => {
    if (processing) return
    setProcessing(true)
    await finalizeOrder()
  }

  // ✅ MOCK ONLINE PAYMENT FLOW
  const handleOnlinePayment = async (result: "success" | "failure") => {
    if (processing) return
    setProcessing(true)

    // simulate gateway delay
    await new Promise((res) => setTimeout(res, 1500))

    if (result === "failure") {
      setProcessing(false)
      setError("Payment failed. Please try again.")
      return
    }

    await finalizeOrder()
  }

  if (checkoutItems.length === 0) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {showSuccess && <OrderSuccessOverlay />}

      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-4xl font-bold mb-8">Payment</h1>

        <div className="bg-white rounded-2xl p-8 border shadow-sm">
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span className="text-red-500">₹{total.toFixed(2)}</span>
          </div>

          {/* COD FLOW */}
          {paymentMethod === "cod" && (
            <Button
              onClick={handleCODConfirm}
              disabled={processing}
              className="w-full py-6 text-lg bg-red-600 hover:bg-red-700"
            >
              Confirm Cash on Delivery
            </Button>
          )}

          {/* ONLINE PAYMENT FLOW */}
          {paymentMethod !== "cod" && (
            <>
              <div className="mb-4 flex items-center gap-2 text-gray-700">
                {paymentMethod === "upi" ? <Wallet /> : <CreditCard />}
                <span>
                  Paying via <strong>{paymentMethod.toUpperCase()}</strong>
                </span>
              </div>

              {error && <p className="text-red-600 mb-3">{error}</p>}

              <Button
                onClick={() => handleOnlinePayment("success")}
                disabled={processing}
                className="w-full py-5 bg-green-600 hover:bg-green-700 mb-3"
              >
                Simulate Payment Success
              </Button>

              <Button
                onClick={() => handleOnlinePayment("failure")}
                disabled={processing}
                variant="outline"
                className="w-full py-5"
              >
                Simulate Payment Failure
              </Button>
            </>
          )}

          <motion.button
            onClick={() => router.back()}
            className="w-full mt-6 text-gray-600 hover:text-red-600"
            whileHover={{ scale: 1.02 }}
          >
            Back
          </motion.button>
        </div>
      </div>
    </div>
  )
}
