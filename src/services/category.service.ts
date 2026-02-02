
import "server-only";
import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL=env.AUTH_URL
export const categoryServices={

  getCategories: async function () {
    try {
      const res = await fetch("http://localhost:5000/api/categoris", {
        cache: "no-store", // IMPORTANT for Next.js
      })

      const data = await res.json()

      console.log("----------------service-----------",data)

   

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