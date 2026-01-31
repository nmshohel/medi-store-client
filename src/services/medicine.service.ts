import { env } from "@/env";
import { userServices } from "./user.service";


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
  //   createMedicine: async function (medicineData) {
  //   try {

  //         const session=await userServices.getSession();
  //         if(!session)
  //         {
  //             throw new Error("User Session Not Found")
  //         }
  //         const sellerId=session?.data?.user?.id

  //       const res = await fetch(`${API_URL}/medicines`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Cookie: cookieStore.toString(),
  //           },
  //           body: JSON.stringify(medicineData),
  //         });

  //         if (!res.ok) {
  //           return { success: false, message: "Failed to create medicine" };
  //         }

  // return { success: true };
  //   } catch (err) {
  //     console.error("medicineService error:", err)
  //     return {
  //       data: null,
  //       error: { message: "Something went wrong" },
  //     }
  //   }
  // },
}
