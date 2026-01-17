"use client"

import { auth } from "@/lib/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"

export default function TestAuth() {
  const signup = async () => {
    await createUserWithEmailAndPassword(auth, "test@standease.com", "123456")
    alert("User signed up")
  }

  const login = async () => {
    await signInWithEmailAndPassword(auth, "test@standease.com", "123456")
    alert("User logged in")
  }

  const logout = async () => {
    await signOut(auth)
    alert("User logged out")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Auth Test</h1>
      <button onClick={signup}>Sign Up</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
