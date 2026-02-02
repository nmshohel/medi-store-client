"use server";

import { medicineService } from "@/services/medicine.service";



export const getMedicine = async () => {
  return await medicineService.getMedicines()
};
export const createMedicine = async (data: any) => {
  const res = await medicineService.createMedicine(data);
  // updateTag("blogPosts");
  return res;
};

export const deleteMedicine = async (id: string) => {
  const res = await medicineService.deleteMedicine(id);
  return res;
};