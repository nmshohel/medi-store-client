import "server-only";
import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL=env.AUTH_URL
export const userServices={

    getSession: async function(){
        try{
              const cookieStore=await cookies()
            const res=await fetch(`${AUTH_URL}/get-session`,{
                headers:{
                Cookie:cookieStore.toString()
                },
                cache:"no-store"
            })

            const session=await res.json()
            if(session===null){
                return {data:null, error:{message:"Session is missing"}}
            }

            return {
                data:session,error:null
            }

        }
        catch(err){
            console.error(err)
            return {
                data:null,error:{message:"something went wrong"}
            }

        }
    },
    mySession:async function(){
        try{
              const cookieStore=await cookies()
                const res = await fetch(`${env.AUTH_URL}/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
                });

                const data = await res.json();

                if (!data.session) {
                    return { data: null, error: "No session" };
                }

                 return { data: data.session, error: null }; 

        }
        catch(err){
            console.error(err)
            return {
                data:null,error:{message:"something went wrong"}
            }

        }
    },
    getUsers: async function () {
        try {
            const res = await fetch("http://localhost:5000/api/users",{
                next:{
                    tags:["getUsers"]
                }
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
            console.error("User Service network error:", err);
            return {
            data: null,
            error: { message: "Network error or server is unreachable" },
            };
        }
        },
updateUser: async (userData: any,id:string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
     

      if (data.error) {
        return {
          data: null,
          error: { message: "Error: User not Updated." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
    getSingleUser: async (userId: string) => {
    try {
      const cookieStore = await cookies();
     
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
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
          error: { message: "Error: User not Fetched." },
        };
      }

      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },


}