"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ShoppingCart, User, Menu, X, LogOut, Package } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"

export function Navbar() {
  const router = useRouter()
  const { cartCount } = useCart()
  const { user, loading, logout } = useAuth()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  if (loading) {
    return <nav className="h-16 border-b border-gray-200 bg-white" />
  }

  const handleNavigate = (path: string) => {
    router.push(path)
    setMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    await logout()
    setMobileMenuOpen(false)
    router.push("/login")
  }

  const routes = ["products", "about", "contact", "compare", "faq", "returns"]

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-red-600"
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </motion.button>

            <motion.button
              onClick={() => handleNavigate("/")}
              className="text-2xl font-bold uppercase tracking-tight"
              whileHover={{ scale: 1.05 }}
            >
              Stand<span className="text-red-600">Ease</span>
            </motion.button>
          </div>

          {/* Center */}
          <div className="hidden md:flex items-center gap-8">
            {routes.map((route) => (
              <motion.button
                key={route}
                onClick={() => router.push(`/${route}`)}
                className="text-gray-700 hover:text-red-600 font-medium"
                whileHover={{ y: -2 }}
              >
                {route.charAt(0).toUpperCase() + route.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <motion.button
                  onClick={() => router.push("/account")}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">
                    {user.email?.split("@")[0]}
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => router.push("/orders")}
                  className="flex items-center gap-2 text-gray-700 hover:text-red-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <Package className="w-5 h-5" />
                  <span className="hidden sm:inline font-medium">
                    Orders
                  </span>
                </motion.button>

                <motion.button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                  whileHover={{ scale: 1.05 }}
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </>
            ) : (
              <motion.button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600"
                whileHover={{ scale: 1.05 }}
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline font-medium">Login</span>
              </motion.button>
            )}

            <motion.button
              onClick={() => router.push("/cart")}
              className="relative flex items-center gap-2 text-gray-700 hover:text-red-600"
              whileHover={{ scale: 1.05 }}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline font-medium">Cart</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {routes.map((route) => (
                <button
                  key={route}
                  onClick={() => handleNavigate(`/${route}`)}
                  className="text-left text-gray-700 hover:text-red-600 font-medium py-2"
                >
                  {route.charAt(0).toUpperCase() + route.slice(1)}
                </button>
              ))}

              {user ? (
                <>
                  <button
                    onClick={() => handleNavigate("/account")}
                    className="text-left text-gray-700 hover:text-red-600 font-medium py-2"
                  >
                    My Account
                  </button>

                  <button
                    onClick={() => handleNavigate("/orders")}
                    className="text-left text-gray-700 hover:text-red-600 font-medium py-2"
                  >
                    My Orders
                  </button>

                  <button
                    onClick={handleLogout}
                    className="text-left text-gray-700 hover:text-red-600 font-medium py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleNavigate("/login")}
                  className="text-left text-gray-700 hover:text-red-600 font-medium py-2"
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
