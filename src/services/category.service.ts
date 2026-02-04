
import "server-only";
import { env } from "@/env";
import { cookies } from "next/headers";
import { userServices } from "./user.service";

const AUTH_URL=env.AUTH_URL
export const categoryServices={

  getCategories: async function () {
    try {
      const res = await fetch("http://localhost:5000/api/categoris", {
        next:{
          tags:["getCategories"]
        }
      })

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
  updateCategory: async (categoryData: any,id:string) => {

    try {
      const cookieStore = await cookies();

     console.log("data",JSON.stringify(categoryData))
     console.log("id",id)
     
      const res = await fetch(`http://localhost:5000/api/categoris/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(categoryData),
      });

      const data = await res.json();
     

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Category not Updated." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
    deleteCategory: async (categoryId: string) => {
    try {
      const cookieStore = await cookies();
     
      const res = await fetch(`http://localhost:5000/api/categoris/${categoryId}`, {
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
          error: { message: "Error: Category not Deleted." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getSingleCategory: async (categoryId: string) => {
    try {
      const cookieStore = await cookies();
     
      const res = await fetch(`http://localhost:5000/api/categoris/${categoryId}`, {
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
          error: { message: "Error: Category not Fetched." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  addCategory: async (categoryData: any) => {
      try {
        const cookieStore = await cookies();
        const res = await fetch("http://localhost:5000/api/categoris", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify(categoryData),
          
        });
        const data = await res.json();
        if (data.error) {
          return {
            data: null,
            error: { message: "Error: Category not created." },
          };
        }
  
        return { data: data, error: null };
      } catch (err) {
        return { data: null, error: { message: "Something Went Wrong" } };
      }
    },
}