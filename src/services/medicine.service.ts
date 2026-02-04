
import { env } from "@/env";
import { userServices } from "./user.service";
import { cookies } from "next/headers";
import { Medicine } from "@/types";


const API_URL = env.API_URL;


export const medicineService = {
  getMedicines: async function () {
    try {
      const res = await fetch("http://localhost:5000/api/medicines", {
        next:{
          tags:["getMedicine"]
        }
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
    
     
      const res = await fetch("http://localhost:5000/api/medicines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();
     

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
    getSingleMedicine: async (medicineId: string) => {
    try {
      const cookieStore = await cookies();
     
      const res = await fetch(`http://localhost:5000/api/medicines/${medicineId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      const data = await res.json();
      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Medicine not Fetched." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  updateMedicine: async (medicineData: Partial<Medicine>,id:string) => {
    try {
      const cookieStore = await cookies();

     
      const res = await fetch(`http://localhost:5000/api/medicines/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });

      const data = await res.json();
     

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Medicine not Updated." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
}
