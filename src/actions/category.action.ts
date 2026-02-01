"use server";

import { categoryServices } from "@/services/category.service";





export const getCategoriess = async () => {
  return await categoryServices.getCategories()
};
