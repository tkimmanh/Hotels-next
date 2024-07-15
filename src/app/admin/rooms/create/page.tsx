import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import { HotelType } from "@/interfaces";
import { getHotels } from "@/servers/hotels";
import React from "react";
import RoomForm from "../_common/rooms-form";

const CreateRoomsPage = async () => {
  let hotels: HotelType[] = [];
  const response = await getHotels();
  if (response?.status === 200) {
    hotels = response.data;
  }
  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <PageTitle>List Rooms</PageTitle>
        <LinkButton path="/admin">Add new rooms</LinkButton>
      </div>
      <RoomForm type="create" hotels={hotels}></RoomForm>
    </div>
  );
};

export default CreateRoomsPage;
