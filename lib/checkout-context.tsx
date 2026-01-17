"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { CartItem } from "./cart-context"

/* ---------------- TYPES ---------------- */

export type Address = {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  pincode: string
}

export type PaymentMethod = "cod" | "upi" | "card"

interface CheckoutContextType {
  checkoutItems: CartItem[]

  address: Address | null
  paymentMethod: PaymentMethod

  setAddress: (address: Address | null) => void

  setPaymentMethod: (method: PaymentMethod) => void

  setCheckoutFromCart: (items: CartItem[]) => void
  setCheckoutFromBuyNow: (item: CartItem) => void

  clearCheckout: () => void
}

/* ---------------- CONTEXT ---------------- */

const CheckoutContext = createContext<CheckoutContextType | undefined>(undefined)

/* ---------------- PROVIDER ---------------- */

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([])
  const [address, setAddress] = useState<Address | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")

  const setCheckoutFromCart = (items: CartItem[]) => {
    setCheckoutItems(items)
  }

  const setCheckoutFromBuyNow = (item: CartItem) => {
    setCheckoutItems([item])
  }

  const clearCheckout = () => {
    setCheckoutItems([])
    setAddress(null)
    setPaymentMethod("cod")
  }

  return (
    <CheckoutContext.Provider
      value={{
        checkoutItems,

        address,
        paymentMethod,

        setAddress,
        setPaymentMethod,

        setCheckoutFromCart,
        setCheckoutFromBuyNow,

        clearCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

/* ---------------- HOOK ---------------- */

export function useCheckout() {
  const context = useContext(CheckoutContext)
  if (!context) {
    throw new Error("useCheckout must be used within a CheckoutProvider")
  }
  return context
}
