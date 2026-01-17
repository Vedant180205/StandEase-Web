"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User, onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

type AuthContextType = {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setLoading(false)

      if (!user) return

      const userRef = doc(db, "users", user.uid)

      try {
        const snap = await getDoc(userRef)

        if (!snap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            createdAt: serverTimestamp(),
          })
          console.log("User document created")
        }
      } catch (err) {
        console.error("Failed to create user document:", err)
      }
    })

    return unsubscribe
  }, [])

  const logout = () => signOut(auth)

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return ctx
}
