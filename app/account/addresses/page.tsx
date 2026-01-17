"use client"

import { useEffect, useState } from "react"
import { AuthGuard } from "@/components/auth-guard"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/lib/auth-context"
import { motion } from "framer-motion"
import { addUserAddress, getUserAddresses } from "@/lib/address-service"
import { Address } from "@/lib/types/address"

export default function AddressesPage() {
  const { user } = useAuth()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
 
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
  })

  /* ---------------- FETCH ADDRESSES ---------------- */

  useEffect(() => {
    if (!user) return

    const load = async () => {
      setLoading(true)
      const data = await getUserAddresses(user.uid)
      setAddresses(data as Address[])
      setLoading(false)
    }

    load()
  }, [user])

  /* ---------------- ADD ADDRESS ---------------- */

  const handleAddAddress = async () => {
    if (!user) return
    setSaving(true)

    await addUserAddress(user.uid, {
      ...form,
      isDefault: addresses.length === 0, // first address default
    })

    setOpen(false)
    setSaving(false)

    setForm({
      fullName: "",
      phone: "",
      email: "",
      addressLine: "",
      city: "",
      state: "",
      pincode: "",
    })

    const updated = await getUserAddresses(user.uid)
    setAddresses(updated as Address[])
  }

  /* ---------------- UI ---------------- */

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Saved Addresses</h1>

            <button
              onClick={() => setOpen(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              + Add Address
            </button>
          </div>

          {/* STATES */}
          {loading && <p className="text-gray-600">Loading addresses…</p>}

          {!loading && addresses.length === 0 && (
            <p className="text-gray-600">
              No saved addresses yet.
            </p>
          )}

          {/* ADDRESS LIST */}
          <div className="space-y-4">
            {addresses.map((a) => (
              <div
                key={a.id}
                className="bg-white border rounded-xl p-5 shadow-sm flex justify-between"
              >
                <div>
                  <p className="font-semibold">{a.fullName}</p>
                  <p className="text-sm text-gray-600">{a.phone}</p>
                  <p className="text-sm text-gray-600">{a.email}</p>

                  <p className="text-sm mt-2">
                    {a.addressLine}, {a.city}, {a.state} – {a.pincode}
                  </p>
                </div>

                {a.isDefault && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full h-fit">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ADD ADDRESS MODAL */}
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <h2 className="text-xl font-bold mb-4">
                Add Address
              </h2>

              <div className="space-y-3">
                <Input
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={(v) => setForm({ ...form, fullName: v })}
                />
                <Input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                />
                <Input
                  placeholder="Email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                />
                <Input
                  placeholder="Address Line"
                  value={form.addressLine}
                  onChange={(v) =>
                    setForm({ ...form, addressLine: v })
                  }
                />
                <Input
                  placeholder="City"
                  value={form.city}
                  onChange={(v) => setForm({ ...form, city: v })}
                />
                <Input
                  placeholder="State"
                  value={form.state}
                  onChange={(v) => setForm({ ...form, state: v })}
                />
                <Input
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={(v) => setForm({ ...form, pincode: v })}
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAddress}
                  disabled={saving}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </AuthGuard>
  )
}

/* ---------------- SMALL INPUT COMPONENT ---------------- */

function Input({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2"
    />
  )
}
