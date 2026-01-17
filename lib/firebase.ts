import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "firebase_api_key",
  authDomain: "standease-backend.firebaseapp.com",
  projectId: "standease-backend",
  storageBucket: "standease-backend.firebasestorage.app",
  messagingSenderId: "658858685096",
  appId: "1:658858685096:web:d5084070f80c4e0994c89d",
}

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export const db = getFirestore(app)
export const auth = getAuth(app)
