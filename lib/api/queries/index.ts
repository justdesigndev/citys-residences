import { Brand } from "@/types"

export async function getBrandsData(): Promise<Brand[]> {
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
    return data.brands || []
  } catch (error) {
    console.error("Error fetching brands data:", error)
    throw error
  }
}
