"use server";

import { connectMongoDB } from "@/config/connect";
import Booking from "@/models/Booking.model";
import Hotels from "@/models/Hotels.model";
import Rooms from "@/models/Rooms.model";
import { getCurrentUser } from "./users";
import { revalidatePath } from "next/cache";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SCERET_KEY);

connectMongoDB();

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
      bookingStatus: "Booked",
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

export const getBookingsUser = async () => {
  try {
    const userResponse: any = await getCurrentUser();
    if (Rooms && Hotels) {
      const booking = await Booking.find({
        user: userResponse.data._id,
      })
        .populate("room")
        .populate("hotel")
        .sort({ createdAt: -1 });
      return {
        status: 200,
        data: JSON.parse(JSON.stringify(booking)),
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const cancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    //update status
    await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus: "Cancelled" },
      { new: true }
    );

    //refund payment
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
    });
    if (refund.status !== "succeeded") {
      return {
        success: true,
        message: "Booking cancelled but refund failed",
      };
    }
    revalidatePath("/user/bookings");
    return {
      success: true,
      message: "Booking cancelled and refund success",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
