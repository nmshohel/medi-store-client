"use server";

import { medicineService } from "@/services/medicine.service";



export const getMedicine = async () => {
  return await medicineService.getMedicines()
};