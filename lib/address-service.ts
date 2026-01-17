import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Address } from "@/lib/types/address"

/* ---------------- GET ADDRESSES ---------------- */

export async function getUserAddresses(
  uid: string
): Promise<Address[]> {
  const ref = collection(db, "users", uid, "addresses")
  const q = query(ref, orderBy("createdAt", "desc"))
  const snap = await getDocs(q)

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Address, "id">),
  }))
}

/* ---------------- ADD ADDRESS ---------------- */

export async function addUserAddress(
  uid: string,
  address: Omit<Address, "id" | "createdAt">
) {
  const ref = collection(db, "users", uid, "addresses")

  await addDoc(ref, {
    ...address,
    createdAt: serverTimestamp(),
  })
}
