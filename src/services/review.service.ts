
import { env } from "@/env";
import { userServices } from "./user.service";
import { cookies } from "next/headers";



const API_URL = env.API_URL;


export const reviewService = {

createReview: async (reviewData: any) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
     

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Review not created." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

}
