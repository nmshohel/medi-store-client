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
                const res = await fetch(`${AUTH_URL}/get-session`, {
                cache: "no-store",
                credentials: "include",
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
}