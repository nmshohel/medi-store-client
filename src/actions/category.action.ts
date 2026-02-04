"use server";

import { categoryServices } from "@/services/category.service";
import { revalidateTag } from "next/cache";





export const getCategoriess = async () => {
  return await categoryServices.getCategories()
};
export const deleteCategory = async (id: string) => {
  const res = await categoryServices.deleteCategory(id);
  revalidateTag("getCategories","max")
  return res;
};
export const getSingleCategory = async (id: string) => {
  const res = await categoryServices.getSingleCategory(id);
  revalidateTag("getCategories","max")
  return res;
};

export const updateCategory = async (categoryData:any,id: string) => {
  const res = await categoryServices.updateCategory(categoryData,id);
  revalidateTag("getCategories","max")
  return res;
};
export const addCategory = async (categoryData:any) => {
  const res = await categoryServices.addCategory(categoryData);
  revalidateTag("getCategories","max")
  return res;
};