"use server";

import { connectMongoDB } from "@/config/connect";
import Booking from "@/models/Booking.model";
import Hotels from "@/models/Hotels.model";
import Rooms from "@/models/Rooms.model";
import { getCurrentUser } from "./users";
import { revalidatePath } from "next/cache";
import Users from "@/models/Users.model";
import dayjs from "dayjs";

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

export const listBookings = async () => {
  try {
    if (Rooms && Hotels && Users) {
      const booking = await Booking.find()
        .populate("room")
        .populate("hotel")
        .populate("user")
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

export const getAvaliableRooms = async ({
  reqCheckInDate,
  reqCheckOutDate,
  type,
}: {
  reqCheckInDate: string;
  reqCheckOutDate: string;
  type: string;
}) => {
  try {
    if (Hotels) {
      if (!reqCheckInDate || !reqCheckOutDate) {
        const room = await Rooms.find({
          ...(type && { roomType: type }),
        }).populate("hotel");
        return {
          status: 200,
          data: JSON.parse(JSON.stringify(room)),
        };
      }
    }

    const bookedSlots = await Booking.find({
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
        {
          $and: [
            { checkInDate: { $lte: reqCheckInDate } },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    });

    const bookedRoomIds = bookedSlots.map((booking) => booking.room);

    if (Hotels) {
      const rooms = await Rooms.find({
        _id: { $nin: bookedRoomIds },
        ...(type && { roomType: type }),
      }).populate("hotel");
      return {
        status: 200,
        data: JSON.parse(JSON.stringify(rooms)),
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};

export const reportBooking = async ({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) => {
  try {
    if (Hotels && Rooms && Booking) {
      const query: any = { bookingStatus: "Booked" };

      if (startDate && endDate) {
        query.createdAt = {
          $gte: dayjs(startDate).startOf("day").toDate(),
          $lte: dayjs(endDate).endOf("day").toDate(),
        };
      }

      const bookingReport = await Booking.find(query)
        .populate("room")
        .populate("user")
        .populate("hotel");

      return {
        status: 200,
        data: JSON.parse(JSON.stringify(bookingReport)),
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      message: error.message,
    };
  }
};
