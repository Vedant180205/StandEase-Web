"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { saveCart, loadCart } from "@/lib/cart-service"

export interface CartItem {
  id: number
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number, size: string, color: string) => void
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void
  clearCart: () => void
  cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const { user } = useAuth()

  /* ----------------------------------
     LOAD + MERGE CART ON LOGIN
  -----------------------------------*/
  useEffect(() => {
    if (!user) return

    const loadAndMerge = async () => {
      const firestoreCart = await loadCart(user.uid)
      const guestCart: CartItem[] = JSON.parse(
        localStorage.getItem("standease-cart") || "[]"
      )

      const merged = [...firestoreCart]

      guestCart.forEach((g) => {
        const match = merged.find(
          (i) =>
            i.id === g.id &&
            i.size === g.size &&
            i.color === g.color
        )

        if (match) {
          match.quantity += g.quantity
        } else {
          merged.push(g)
        }
      })

      setCart(merged)
      await saveCart(user.uid, merged)
      localStorage.removeItem("standease-cart")
    }

    loadAndMerge()
  }, [user])

  /* ----------------------------------
     LOAD GUEST CART
  -----------------------------------*/
  useEffect(() => {
    if (user) return

    const saved = localStorage.getItem("standease-cart")
    if (saved) {
      setCart(JSON.parse(saved))
    } else {
      setCart([])
    }
  }, [user])

  /* ----------------------------------
     CART ACTIONS (IMMEDIATE SAVE)
  -----------------------------------*/

  const persist = (updated: CartItem[]) => {
    if (user) {
      saveCart(user.uid, updated)
    } else {
      localStorage.setItem("standease-cart", JSON.stringify(updated))
    }
  }

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const updated = (() => {
        const existing = prev.find(
          (i) =>
            i.id === item.id &&
            i.size === item.size &&
            i.color === item.color
        )

        if (existing) {
          return prev.map((i) =>
            i.id === item.id && i.size === item.size && i.color === item.color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        }

        return [...prev, { ...item, quantity: 1 }]
      })()

      persist(updated)
      return updated
    })
  }

  const removeFromCart = (id: number, size: string, color: string) => {
    setCart((prev) => {
      const updated = prev.filter(
        (i) => !(i.id === id && i.size === size && i.color === color)
      )
      persist(updated)
      return updated
    })
  }

  const updateQuantity = (
    id: number,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(id, size, color)
      return
    }

    setCart((prev) => {
      const updated = prev.map((i) =>
        i.id === id && i.size === size && i.color === color
          ? { ...i, quantity }
          : i
      )
      persist(updated)
      return updated
    })
  }

  const clearCart = () => {
    setCart([])
    if (user) {
      saveCart(user.uid, [])
    } else {
      localStorage.removeItem("standease-cart")
    }
  }

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
