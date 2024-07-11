"use server";

import { connectMongoDB } from "@/config/connect";
import { HotelType } from "@/interfaces";
import Hotels from "@/models/Hotels.model";

connectMongoDB();

export const addHotels = async (payload: HotelType) => {
  try {
    await Hotels.create(payload);
    return {
      status: 201,
      message: "Hotel created successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
