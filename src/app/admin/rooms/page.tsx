import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import { RoomsType } from "@/interfaces";
import React from "react";
import { getRooms } from "@/servers/rooms";
import RoomsTable from "./_common/rooms-table";

const RoomsPageAdmin = async () => {
  let rooms: RoomsType[] = [];
  const response = await getRooms();
  if (response?.status === 200) {
    rooms = response.data;
  }

  return (
    <div className="mt-5">
      <div className="flex justify-between ">
        <PageTitle>List Rooms</PageTitle>
        <LinkButton path="/admin/rooms/create">Add new Rooms</LinkButton>
      </div>
      <RoomsTable rooms={rooms} />
    </div>
  );
};

export default RoomsPageAdmin;
