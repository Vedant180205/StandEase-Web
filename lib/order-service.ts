import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function createOrder(
  uid: string,
  order: {
    items: any[]
    address: any
    paymentMethod: "cod" | "upi" | "card"
    totalAmount: number
  }
) {
  const ref = await addDoc(collection(db, "orders"), {
    uid,
    items: order.items,
    address: order.address,
    paymentMethod: order.paymentMethod,
    status: "placed",
    totalAmount: Number(order.totalAmount),
    createdAt: serverTimestamp(),
  })

  return ref.id
}
