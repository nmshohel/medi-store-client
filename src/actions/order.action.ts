"use server";

import { medicineService } from "@/services/medicine.service";
import { orderService } from "@/services/order.service";
import { Medicine } from "@/types";



export const getOrders = async () => {
  return await orderService.getOrders()
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
export const updateOrder = async (orderData:any,id: string) => {
  const res = await orderService.updateOrder(orderData,id);
  return res;
};