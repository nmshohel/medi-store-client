
import { env } from "@/env";
import { userServices } from "./user.service";
import { cookies } from "next/headers";
import { Medicine } from "@/types";


const API_URL = env.API_URL;


export const orderService = {
getOrders: async function () {
  try {
    const cookieStore = await cookies();
    const res = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });
    

    // 1. Check if the HTTP status is 200-299
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({})); // Try to get server error msg
      return { 
        data: null, 
        error: { message: errorData.message || `Error: ${res.status}` } 
      };
    }

    const data = await res.json();
    return { data, error: null };

  } catch (err) {
    // This catches network failures or JSON parsing errors
    console.error("Order Service network error:", err);
    return {
      data: null,
      error: { message: "Network error or server is unreachable" },
    };
  }
},
getMyOrders: async function () {
  try {
    const session=await userServices.getSession()
    const id=session?.data?.user?.id
    console.log(id)
    const res = await fetch(`http://localhost:5000/api/orders/my-order/${id}`);
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({})); // Try to get server error msg
      return { 
        data: null, 
        error: { message: errorData.message || `Error: ${res.status}` } 
      };
    }

    const data = await res.json();
    return { data, error: null };

  } catch (err) {
    // This catches network failures or JSON parsing errors
    console.error("Order Service network error:", err);
    return {
      data: null,
      error: { message: "Network error or server is unreachable" },
    };
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
  updateOrder: async (orderData: any,id:string) => {
    try {
      const cookieStore = await cookies();

     
     
      const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
     

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Order not Updated." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  createOrder: async (orderData: any) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
 
    
      if (data.error) {
        return {
          data: null,
          error: { message: "Error: Order failed." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
}
