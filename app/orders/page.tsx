"use client"

import { useEffect, useState } from "react"
import { collection, query, where, getDocs, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useAuth } from "@/lib/auth-context"
import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"

type Order = {
  id: string
  totalAmount: number
  status: string
  createdAt?: any
  paymentMethod?: string
  itemsCount?: number
  address?: {
    fullName: string
    phone: string
  }
}


export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchOrders = async () => {
      const q = query(
        collection(db, "orders"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      )

      const snap = await getDocs(q)

      const data: Order[] = snap.docs.map((doc) => {
        const raw = doc.data()

        return {
  id: doc.id,
  totalAmount: raw.totalAmount ?? raw.total ?? 0,
  status: raw.status ?? "placed",
  createdAt: raw.createdAt,
  paymentMethod: raw.paymentMethod ?? "cod",
  itemsCount: raw.items?.length ?? 0,
  address: raw.address
    ? {
        fullName: raw.address.fullName,
        phone: raw.address.phone,
      }
    : undefined,
}

      })

      setOrders(data)
      setLoading(false)
    }

    fetchOrders()
  }, [user])

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

          {loading && (
            <p className="text-gray-600">Loading orders…</p>
          )}

          {!loading && orders.length === 0 && (
            <p className="text-gray-600">You have not placed any orders yet.</p>
          )}

          <div className="space-y-4">
            {orders.map((order) => (
              <div
  key={order.id}
  onClick={() => router.push(`/orders/${order.id}`)}
  className="bg-white border border-gray-200 rounded-xl p-5 cursor-pointer hover:shadow-md transition"
>
  <div className="flex justify-between items-start">
    <div>
      <p className="text-sm text-gray-500">
        Order #{order.id.slice(0, 10)}
      </p>

      <p className="text-sm text-gray-600 mt-1">
        Placed on{" "}
        {order.createdAt?.toDate
          ? order.createdAt.toDate().toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "—"}{" "}
        • {order.itemsCount} items
      </p>

      {order.address && (
        <div className="mt-2 text-sm text-gray-700">
          <p>
            Delivering to: <strong>{order.address.fullName}</strong>
          </p>
          <p>Phone: {order.address.phone}</p>
        </div>
      )}
    </div>

    <div className="text-right">
      <p className="text-sm text-gray-500">Total</p>
      <p className="text-lg font-bold text-gray-900">
        ₹{order.totalAmount.toFixed(2)}
      </p>
    </div>
  </div>

  <div className="mt-4 flex justify-between items-center text-sm">
    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
      {order.status}
    </span>
    <span className="text-gray-600">
      Payment:{" "}
      {order.paymentMethod === "cod"
        ? "Cash on Delivery"
        : order.paymentMethod?.toUpperCase()}
    </span>
  </div>
</div>

            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}
