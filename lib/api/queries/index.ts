import { BrandsResponse } from "@/types"

export async function getBrandsData(): Promise<BrandsResponse> {
  "use server"

  try {
    const response = await fetch("https://citys-istanbul.com/services/brands.php", {
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Return the expected BrandsResponse structure
    return {
      items: data.items || [],
      categories: data.categories || {},
      subCategories: data.subCategories || {},
    }
  } catch (error) {
    console.error("Error fetching brands data:", error)
    // Return a fallback structure that matches BrandsResponse
    return {
      items: [],
      categories: {},
      subCategories: {},
    }
  }
}
