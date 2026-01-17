"use client"

import { AuthProvider } from "@/lib/auth-context"
import { CartProvider } from "@/lib/cart-context"
import { CheckoutProvider } from "@/lib/checkout-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          {children}
        </CheckoutProvider>
      </CartProvider>
    </AuthProvider>
  )
}
