"use server";

import { connectMongoDB } from "@/config/connect";
import Hotels from "@/models/Hotels.model";
import { HotelType } from "@/interfaces";
import { getCurrentUser } from "./users";
import Booking from "@/models/Booking.model";
import { revalidatePath } from "next/cache";

connectMongoDB();

export const addHotels = async (payload: HotelType) => {
  try {
    await Hotels.create(payload);
    return {
      status: 200,
      message: "Hotel created successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const getHotels = async () => {
  try {
    const hotels = await Hotels.find();
    return {
      status: 200,
      data: JSON.parse(JSON.stringify(hotels)),
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
export const getHotelById = async (id: string) => {
  try {
    const hotel = await Hotels.findById(id);
    return {
      status: 200,
      data: JSON.parse(JSON.stringify(hotel)),
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const updateHotel = async (id: string, payload: HotelType) => {
  try {
    await Hotels.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return {
      status: 200,
      message: "Hotel updated successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const deleteHotel = async (id: string) => {
  try {
    await Hotels.findByIdAndDelete({ _id: id });
    return {
      status: 200,
      message: "Hotel deleted successfully",
    };
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
export const bookRoom = async (payload: any) => {
  try {
    const userResponse = await getCurrentUser();
    payload.user = userResponse.data._id;
    await Booking.create(payload);
    revalidatePath("/user/bookings");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
