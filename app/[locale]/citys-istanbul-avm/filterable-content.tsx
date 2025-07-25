"use client"

import { FilterForm } from "@/components/filter-form"
import { useState, useMemo } from "react"
import { Brand } from "@/types"
import { Img } from "@/components/utility/img"
import { AnimatePresence, motion } from "motion/react"

interface FilterableContentProps {
  brands: Brand[]
}

const getFloorDisplayName = (floor: string): string => {
  switch (floor) {
    case "first":
      return "Birinci Kat"
    case "ground":
      return "Zemin Kat"
    default:
      return "Zemin Kat"
  }
}

// Restaurant/dining subcategory mapping
const getRestaurantType = (subCategory: string | null): string => {
  if (!subCategory) return "other"

  const subcatLower = subCategory.toLowerCase()
  if (subcatLower.includes("restoran") || subcatLower.includes("restaurant")) return "restoran"
  if (subcatLower.includes("kafe") || subcatLower.includes("cafe") || subcatLower.includes("coffee")) return "kafe"
  if (subcatLower.includes("fast") || subcatLower.includes("hızlı")) return "fastfood"

  return "other"
}

export function FilterableContent({ brands }: FilterableContentProps) {
  const [filters, setFilters] = useState({
    category: "",
    restaurant: "",
    floor: "",
    search: "",
  })

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      // Category filter
      if (filters.category && brand.category !== filters.category) {
        return false
      }

      // Restaurant type filter (only applies to yemeIcme category)
      if (filters.restaurant && brand.category === "yemeIcme") {
        const brandRestaurantType = getRestaurantType(brand.subCategory)
        if (brandRestaurantType !== filters.restaurant) {
          return false
        }
      }

      // Floor filter - now using actual floor data from brands
      if (filters.floor && brand.floor !== filters.floor) {
        return false
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase()
        const brandName = brand.name.toLowerCase()
        if (!brandName.includes(searchTerm)) {
          return false
        }
      }

      return true
    })
  }, [brands, filters])

  const handleFilter = (filterData: { category?: string; restaurant?: string; floor?: string; search?: string }) => {
    console.log("Filtering with:", filterData)
    setFilters({
      category: filterData.category || "",
      restaurant: filterData.restaurant || "",
      floor: filterData.floor || "",
      search: filterData.search || "",
    })
  }

  return (
    <div className="section-container">
      {/* Filters and Search */}
      <FilterForm onFilter={handleFilter} />

      {/* Results count */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-gray-600 font-suisse-intl">{filteredBrands.length} sonuç bulundu</p>
      </motion.div>

      {/* Brand Grid */}
      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" layout="position">
        <AnimatePresence mode="popLayout">
          {filteredBrands.map((brand, index) => {
            const floorDisplay = getFloorDisplayName(brand.floor)

            return (
              <motion.div
                key={`${brand.name}-${brand.category}-${brand.floor}`}
                className="group cursor-pointer"
                layout="position"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  transition: { duration: 0.2 },
                }}
              >
                <motion.div
                  className="relative overflow-hidden bg-gray-100 h-64 mb-4 flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Img
                    src={brand.logo}
                    alt={brand.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback for broken images
                      e.currentTarget.src = "/img/placeholder-logo.png"
                    }}
                    fill
                  />
                </motion.div>
                <div className="text-center">
                  <h3 className="font-suisse-intl font-bold text-sm lg:text-base text-black mb-1 tracking-wide">
                    {brand.name}
                  </h3>
                  <p className="font-suisse-intl text-xs lg:text-sm text-gray-600">{floorDisplay}</p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>

      {/* No results message */}
      <AnimatePresence>
        {filteredBrands.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-gray-500 font-suisse-intl text-lg">Arama kriterlerinize uygun sonuç bulunamadı.</p>
            <p className="text-gray-400 font-suisse-intl text-sm mt-2">
              Lütfen filtrelerinizi değiştirip tekrar deneyin.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
