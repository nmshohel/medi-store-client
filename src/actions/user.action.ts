"use server";
import { userServices } from "@/services/user.service";
import { revalidateTag } from "next/cache";

export const getSession = async () => {
  return await userServices.getSession()
};
export const getUsers = async () => {
  return await userServices.getUsers()
};

export const updateUser = async (userData:any,id: string) => {
  const res = await userServices.updateUser(userData,id);
  revalidateTag("getUsers","max")
  return res;
};
export const getSingleUser = async (id: string) => {
  const res = await userServices.getSingleUser(id);
  return res;
};