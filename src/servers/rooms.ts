"use server";
import { connectMongoDB } from "@/config/connect";
import Rooms from "@/models/Rooms.model";
import Hotels from "@/models/Hotels.model";

connectMongoDB();

export async function createRoom(payload: any) {
  try {
    await Rooms.create(payload);
    return {
      message: "Room created successfully",
      status: 200,
    };
  } catch (error: any) {
    return {
      error: error.message,
      message: "Room created failed",
      status: 500,
    };
  }
}

export async function getRooms() {
  try {
    if (Hotels) {
      const result = await Rooms.find()
        .populate("hotel")
        .sort({ createdAt: -1 });
      return {
        message: "Get rooms successfully",
        status: 200,
        data: JSON.parse(JSON.stringify(result)),
      };
    }
  } catch (error) {
    console.log("error", error);

    return {
      message: "Get rooms failed",
      status: 500,
    };
  }
}

export async function getRoomById(id: string) {
  try {
    if (Hotels) {
      const result = await Rooms.findById({ _id: id }).populate("hotel");
      return {
        message: "Get room by id successfully",
        status: 200,
        data: JSON.parse(JSON.stringify(result)),
      };
    }
  } catch (error) {
    console.log("error", error);

    return {
      message: "Get room by id failed",
      status: 500,
    };
  }
}

export async function updateRoom(id: string, payload: any) {
  try {
    await Rooms.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return {
      message: "Room updated successfully",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Room updated failed",
      status: 500,
    };
  }
}

export async function deleteRoom(id: string) {
  try {
    await Rooms.findByIdAndDelete({ _id: id });
    return {
      message: "Room deleted successfully",
      status: 200,
    };
  } catch (error) {
    return {
      message: "Room deleted failed",
      status: 500,
    };
  }
}
