import { env } from "@/env";


const API_URL = env.API_URL;


export const medicineService = {
  getMedicines: async function () {
    try {
      const res = await fetch("http://localhost:5000/api/medicines", {
        cache: "no-store", // IMPORTANT for Next.js
      })

      if (!res.ok) {
        throw new Error("Failed to fetch medicines")
      }

      const data = await res.json()
   

      return { data, error: null }
    } catch (err) {
      console.error("medicineService error:", err)
      return {
        data: null,
        error: { message: "Something went wrong" },
      }
    }
  },
}
