"use server";
import { userServices } from "@/services/user.service";

export const getSession = async () => {
  return await userServices.getSession()
};
export const getUsers = async () => {
  return await userServices.getUsers()
};

export const updateUser = async (userData:any,id: string) => {
  const res = await userServices.updateUser(userData,id);
  return res;
};