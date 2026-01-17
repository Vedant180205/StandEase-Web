import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

export async function saveCart(uid: string, items: any[]) {
  const ref = doc(db, "users", uid)
  await setDoc(
    ref,
    {
      cart: {
        items,
        updatedAt: serverTimestamp(),
      },
    },
    { merge: true }
  )
}

export async function loadCart(uid: string) {
  const ref = doc(db, "users", uid)
  const snap = await getDoc(ref)
  return snap.exists() ? snap.data()?.cart?.items ?? [] : []
}
