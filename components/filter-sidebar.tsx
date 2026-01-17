"use client"

import { motion } from "framer-motion"
import { Home, Briefcase, Grid3x3 } from "lucide-react"

interface Filters {
  workType: string
}

interface FilterSidebarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

export function FilterSidebar({ filters, setFilters }: FilterSidebarProps) {
  const workTypes = [
    { value: "all", label: "All Products", icon: Grid3x3 },
    { value: "homemakers", label: "Homemakers", icon: Home },
    { value: "office", label: "Office / Outside", icon: Briefcase },
  ]

  return (
    <motion.aside
      className="lg:w-64 bg-gray-50 rounded-lg p-6 border border-gray-200 h-fit lg:sticky lg:top-24"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-bold mb-6 text-gray-900 uppercase">Filters</h2>

      <div className="space-y-3">
        {workTypes.map((type) => (
          <motion.button
            key={type.value}
            onClick={() => setFilters({ workType: type.value })}
            className={`w-full p-4 rounded-lg text-left flex items-center gap-3 font-semibold transition-all ${
              filters.workType === type.value
                ? "bg-red-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <type.icon className="w-5 h-5" />
            {type.label}
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={() => setFilters({ workType: "all" })}
        className="w-full mt-6 py-3 bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-semibold text-gray-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Clear Filters
      </motion.button>
    </motion.aside>
  )
}
