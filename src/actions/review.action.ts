"use server";


import { reviewService } from "@/services/review.service";




export const createReview = async (data: any) => {
  const res = await reviewService.createReview(data);

  return res;
};

