import PageTitle from "@/components/page-title";
import { getRoomById } from "@/servers/rooms";
import React from "react";
import RoomForm from "../../_common/rooms-form";
import { getHotels } from "@/servers/hotels";
import { HotelType, RoomsType } from "@/interfaces";
import { message } from "antd";

interface UpdateRoomPageProps {
  params: {
    id: string;
  };
}

const UpdateRoomPage = async ({ params }: UpdateRoomPageProps) => {
  const { id } = params;

  let room: RoomsType | null = null;
  let hotels: HotelType[] = [];

  await Promise.all([getRoomById(id as string), getHotels()])
    .then((response: any) => {
      if (response[0].status === 200) {
        room = response[0].data;
      }
      if (response[1].status === 200) {
        hotels = response[1].data;
      }
    })
    .catch((error: any) => {
      message.error(error.message);
    });

  return (
    <div>
      <PageTitle>Update Room</PageTitle>
      <RoomForm initalValues={room} type="update" hotels={hotels}></RoomForm>
    </div>
  );
};

export default UpdateRoomPage;
