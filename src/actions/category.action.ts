"use server";

import { categoryServices } from "@/services/category.service";





export const getCategoriess = async () => {
  return await categoryServices.getCategories()
};
export const deleteCategory = async (id: string) => {
  const res = await categoryServices.deleteCategory(id);
  return res;
};
export const getSingleCategory = async (id: string) => {
  const res = await categoryServices.getSingleCategory(id);
  return res;
};

export const updateCategory = async (categoryData:any,id: string) => {
  const res = await categoryServices.updateCategory(categoryData,id);
  return res;
};
export const addCategory = async (categoryData:any) => {
  const res = await categoryServices.addCategory(categoryData);
  return res;
};