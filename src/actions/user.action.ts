"use server";
import { userServices } from "@/services/user.service";

export const getSession = async () => {
  return await userServices.getSession()
};