"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { motion } from "framer-motion"

type OrderItem = {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  color: string
  image?: string
}

type Order = {
  id: string
  uid: string
  createdAt: any
  items: OrderItem[]
  address: {
    fullName: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
  }
  paymentMethod: string
  totalAmount: number
  status: string
}

export default function OrderDetailPage() {
  const { orderId } = useParams()
  const router = useRouter()
  const { user, loading } = useAuth()

  const [order, setOrder] = useState<Order | null>(null)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push("/login")
      return
    }

    const fetchOrder = async () => {
      try {
        const ref = doc(db, "orders", orderId as string)
        const snap = await getDoc(ref)

        if (!snap.exists()) {
          router.push("/orders")
          return
        }

        const raw = snap.data()

        // 🔒 Security check
        if (raw.uid !== user.uid) {
          router.push("/orders")
          return
        }

        // ✅ NORMALIZATION (CRITICAL FIX)
        const normalizedOrder: Order = {
          ...(raw as any),
          id: snap.id,
          totalAmount: raw.totalAmount ?? raw.total ?? 0,
          items: raw.items ?? [],
          address: raw.address ?? {
            fullName: "",
            phone: "",
            email: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
          },
        }

        setOrder(normalizedOrder)
      } catch (err) {
        console.error("Failed to load order", err)
        router.push("/orders")
      } finally {
        setFetching(false)
      }
    }

    fetchOrder()
  }, [user, loading, orderId, router])

  if (loading || fetching) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="p-12 text-center">Loading order…</div>
      </div>
    )
  }

  if (!order) return null

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <h1 className="text-3xl font-bold mb-4">Order Details</h1>

          <div className="text-sm text-gray-600 mb-6">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
          </div>

          {/* ORDER STATUS TIMELINE */}
<div className="border-t pt-4 mb-6">
  <h2 className="font-bold mb-3">Order Status</h2>

  <div className="flex justify-between items-center">
    {["placed", "processing", "shipped", "delivered"].map((step, index) => {
      const steps = ["placed", "processing", "shipped", "delivered"]
      const active = steps.indexOf(order.status) >= index

      return (
        <div key={step} className="flex-1 text-center">
          <div
            className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center ${
              active
                ? "bg-green-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            ✓
          </div>
          <p
            className={`mt-1 text-sm ${
              active ? "text-green-600" : "text-gray-400"
            }`}
          >
            {step}
          </p>
        </div>
      )
    })}
  </div>
</div>


          {/* ITEMS */}
          <div className="border-t pt-4 space-y-4">
            {order.items.map((item) => (
              <div
                key={`${item.id}-${item.size}-${item.color}`}
                className="flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">
                    Size: {item.size} • {item.color}
                  </p>
                  <p className="text-sm">
                    Qty: {item.quantity} × ₹{item.price}
                  </p>
                </div>
                <div className="font-semibold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* ADDRESS */}
          <div className="border-t mt-6 pt-4">
            <h2 className="font-bold mb-2">Delivery Address</h2>
            <p className="text-sm text-gray-700">
              {order.address.fullName}<br />
              {order.address.address}<br />
              {order.address.city}, {order.address.state} - {order.address.pincode}<br />
              {order.address.phone}
            </p>
          </div>

          {/* PAYMENT */}
          <div className="border-t mt-6 pt-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-medium uppercase">{order.paymentMethod}</p>
            </div>
            <div className="text-xl font-bold text-red-600">
              ₹{order.totalAmount.toFixed(2)}
            </div>
          </div>

          <button
            onClick={() => router.push("/orders")}
            className="mt-6 text-sm font-medium text-gray-600 hover:text-red-600"
          >
            ← Back to Orders
          </button>
        </motion.div>
      </div>
    </div>
  )
}
