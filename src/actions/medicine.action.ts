"use server";

import { medicineService } from "@/services/medicine.service";
import { Medicine } from "@/types";



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
export const getSingleMedicine = async (id: string) => {
  const res = await medicineService.getSingleMedicine(id);
  return res;
};
export const updateMedicine = async (medicineData:Partial<Medicine>,id: string) => {
  const res = await medicineService.updateMedicine(medicineData,id);
  return res;
};