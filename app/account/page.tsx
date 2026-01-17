"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { useAuth } from "@/lib/auth-context"
import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { motion } from "framer-motion"

/* ---------------- AVATARS ---------------- */

const AVATARS = [
  "avatar-default",
  "avatar-m1",
  "avatar-m2",
  "avatar-f1",
  "avatar-f2",
  "avatar-f3",
]

/* ---------------- PAGE ---------------- */

export default function AccountPage() {
  const { user } = useAuth()
  const router = useRouter()

  const [avatar, setAvatar] = useState("avatar-default")
  const [pickerOpen, setPickerOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  /* ---------------- LOAD AVATAR ---------------- */

  useEffect(() => {
    if (!user) return

    const loadAvatar = async () => {
      const ref = doc(db, "users", user.uid)
      const snap = await getDoc(ref)

      if (snap.exists() && snap.data()?.avatar) {
        setAvatar(snap.data().avatar)
      }
    }

    loadAvatar()
  }, [user])

  /* ---------------- SAVE AVATAR ---------------- */

  const saveAvatar = async (selected: string) => {
    if (!user || saving) return

    setSaving(true)
    setAvatar(selected)

    await setDoc(
      doc(db, "users", user.uid),
      { avatar: selected },
      { merge: true }
    )

    setSaving(false)
    setPickerOpen(false)
  }

  /* ---------------- SAFE FALLBACK ---------------- */

  if (!user) {
    return (
      <AuthGuard>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
        </div>
      </AuthGuard>
    )
  }

  /* ---------------- DERIVED DATA ---------------- */

  const displayName =
    user.displayName ||
    user.email?.split("@")[0]?.replace(/[0-9]/g, "") ||
    "User"

  const memberSince = user.metadata.creationTime
    ? new Date(user.metadata.creationTime).toDateString()
    : "—"

  /* ---------------- UI ---------------- */

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <h1 className="text-4xl font-bold mb-10">My Account</h1>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* PROFILE CARD */}
            <div className="bg-white border rounded-xl p-6 shadow-sm text-center">
              <img
                src={`/avatars/${avatar}.png`}
                alt="Avatar"
                className="w-32 h-32 mx-auto rounded-full border"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    "/avatars/avatar-default.png"
                }}
              />

              <button
                onClick={() => setPickerOpen(true)}
                className="mt-4 text-sm text-red-600 hover:underline"
              >
                Change Avatar
              </button>

              <h2 className="text-xl font-semibold mt-6 capitalize">
                {displayName}
              </h2>

              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-500 text-sm mt-1">
                Member since {memberSince}
              </p>
            </div>

            {/* DETAILS */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white border rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Account Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Authentication</p>
                    <p className="font-medium">
                      {user.providerData[0]?.providerId === "google.com"
                        ? "Google"
                        : "Email / Password"}
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <p className="text-gray-500">User ID</p>
                    <p className="font-mono text-xs break-all">
                      {user.uid}
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="grid sm:grid-cols-3 gap-4">
                <ActionCard
                  title="My Orders"
                  desc="Track & manage orders"
                  onClick={() => router.push("/orders")}
                />
                <ActionCard
                  title="Saved Address"
                  desc="Delivery locations"
                  onClick={() => router.push("/account/addresses")}
                />
                <ActionCard
                  title="Cart"
                  desc="Continue shopping"
                  onClick={() => router.push("/cart")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* AVATAR PICKER MODAL */}
        {pickerOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
            >
              <h3 className="text-lg font-semibold mb-4">
                Choose an Avatar
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {AVATARS.map((a) => (
                  <img
                    key={a}
                    src={`/avatars/${a}.png`}
                    alt={a}
                    onClick={() => saveAvatar(a)}
                    className={`w-20 h-20 rounded-full border cursor-pointer ${
                      avatar === a ? "border-red-500" : ""
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setPickerOpen(false)}
                disabled={saving}
                className="mt-6 text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

/* ---------------- ACTION CARD ---------------- */

function ActionCard({
  title,
  desc,
  onClick,
}: {
  title: string
  desc: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border rounded-xl p-5 text-left hover:border-red-500 hover:shadow-sm transition"
    >
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-600 mt-1">{desc}</p>
    </button>
  )
}
