import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import { getHotels } from "@/servers/hotels";
import React from "react";
import HotelsTable from "./_common/hotel-table";
import { HotelType } from "@/interfaces";

const HotelsPageAdmin = async () => {
  let hotels: HotelType[] = [];

  const response = await getHotels();

  if (response.status === 200) {
    hotels = response.data;
  }

  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <PageTitle>Hotels</PageTitle>
        <LinkButton path="/admin/hotels/create">Add new hotels</LinkButton>
      </div>
      <HotelsTable hotels={hotels}></HotelsTable>
    </div>
  );
};

export default HotelsPageAdmin;
