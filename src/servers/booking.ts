"use server";

import { connectMongoDB } from "@/config/connect";
import Booking from "@/models/Booking.model";

connectMongoDB();

//kiểm tra phòng có sẵn không
export const checkRoomAvailability = async ({
  roomId,
  reqCheckInDate,
  reqCheckOutDate,
}: {
  roomId: string;
  reqCheckInDate: string;
  reqCheckOutDate: string;
}) => {
  try {
    const bookedSlots = await Booking.findOne({
      room: roomId,
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
      ],
    });
    if (bookedSlots) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error) {}
};
