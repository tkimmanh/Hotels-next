import { RoomsType } from "@/interfaces";
import { getRoomById } from "@/servers/rooms";
import React from "react";
import RoomInfor from "../_common/room-infor";
import { BookUser } from "lucide-react";
import CheckOut from "../_common/checkout";

type BookingRoomsProps = {
  params: {
    id: string;
  };
};

const BookingRooms = async ({ params }: BookingRoomsProps) => {
  const { id } = params;
  let room: RoomsType | null = null;

  const response = await getRoomById(id);

  if (response?.status === 200) {
    room = response.data;
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-y-4 mb-4">
        <h1 className="font-bold text-gray-600 text-2xl">
          {room?.name} - {room?.hotel.name}
        </h1>
        <span className="text-sm text-gray-600 flex items-center gap-x-2">
          <BookUser />
          {room?.hotel.address}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="col-span-2">
          <RoomInfor room={room}></RoomInfor>
        </div>
        <div className="col-span-1">
          <CheckOut room={room as RoomsType}></CheckOut>
        </div>
      </div>
    </div>
  );
};

export default BookingRooms;
