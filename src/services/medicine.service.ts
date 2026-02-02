
import { env } from "@/env";
import { userServices } from "./user.service";
import { cookies } from "next/headers";


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
createMedicine: async (medicineData: any) => {
    try {
      const cookieStore = await cookies();
      const session=await userServices.getSession()
      const sellerId=session?.data?.user?.id
      medicineData.sellerId=sellerId
      console.log(JSON.stringify(medicineData))
     
      const res = await fetch("http://localhost:5000/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();
       console.log("***********************",data)

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Medicine not created." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  deleteMedicine: async (medicineId: string) => {
    try {
      const cookieStore = await cookies();
     
      const res = await fetch(`http://localhost:5000/api/medicines/${medicineId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Medicine not Deleted." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
}
