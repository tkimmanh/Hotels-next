import { RoomsType } from "@/interfaces";
import { getAvaliableRooms } from "@/servers/booking";

import { Bath, BookUser, Timer, Trees } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RoomsData = async ({
  searchParams,
}: {
  searchParams: {
    checkIn: string;
    checkOut: string;
    type: string;
  };
}) => {
  let rooms: RoomsType[] = [];

  const response = await getAvaliableRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
  });

  if (response?.status === 200) {
    rooms = response.data;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
      {rooms?.map((room: RoomsType) => {
        return (
          <div className="max-w-[422px] w-full " key={room._id}>
            <div className="rooms-container">
              <Image
                src={
                  room.media[0] ||
                  "https://plus.unsplash.com/premium_photo-1677343210638-5d3ce6ddbf85?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                quality={100}
                className="object-cover w-full h-64 rounded-lg shadow "
                alt="image"
                width={422}
                height={256}
              ></Image>
            </div>

            <Link
              href={`book-room/${room._id}`}
              className="flex flex-col gap-y-2 mt-2"
            >
              <h1 className="font-bold underline flex items-center gap-x-2">
                <Bath />
                {room.name}
              </h1>
              <div className="flex gap-x-2 items-center">
                <Trees />
                <p>{room?.hotel?.name}</p>
              </div>
              <div className="flex gap-2 items-center">
                <BookUser />
                <p className="text-sm">{room.hotel.address}</p>
              </div>
              <div className="w-full h-[2px] bg-gray-600"></div>
              <div>
                <span className="flex items-center gap-x-2">
                  <Timer />{" "}
                  <p>
                    <strong>{room.rentPerDay}</strong> / day
                  </p>
                </span>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default RoomsData;
