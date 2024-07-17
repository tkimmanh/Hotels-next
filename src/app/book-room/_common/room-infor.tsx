import { HotelType, RoomsType } from "@/interfaces";
import Image from "next/image";
import React from "react";

type RoomInforProps = {
  room: RoomsType | null;
};

const RoomInfor = ({ room }: RoomInforProps) => {
  const renderRoomProperty = (lable: string, value: string) => {
    return (
      <div className="flex flex-col text-gray-600">
        <span className="text-xs">{lable}:</span>
        <span className="text-sm font-semibold capitalize">{value}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="flex flex-wrap gap-7">
        {room &&
          room?.media.map((item: string, index: number) => {
            return (
              <Image
                src={item}
                width={200}
                height={170}
                key={index}
                alt="media"
                className="rounded-lg"
              />
            );
          })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-10">
        {renderRoomProperty("Room name", room?.name || "")}
        {renderRoomProperty("Room type", room?.type || "")}
        {renderRoomProperty("Room number", room?.roomNumber || "")}
        {renderRoomProperty("Room Per Day", room?.rentPerDay.toString() || "")}
        {renderRoomProperty("Room Bed Room", room?.bedrooms.toString() || "")}
        {renderRoomProperty("Email", (room?.hotel as HotelType).email || "")}
        {renderRoomProperty("Phone", (room?.hotel as HotelType).phone || "")}
        {renderRoomProperty("Owner", (room?.hotel as HotelType).name || "")}
      </div>
      <div className="mt-6">
        <h1 className="text-xl mb-4 font-semibold text-gray-600">Amenities</h1>
        <div className=" flex flex-wrap gap-5">
          {room?.amenities.split(" ").map((item: string, index: number) => {
            return (
              <div className="" key={index}>
                <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-xs capitalize">
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoomInfor;
