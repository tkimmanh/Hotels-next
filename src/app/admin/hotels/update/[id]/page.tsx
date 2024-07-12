import PageTitle from "@/components/page-title";
import React from "react";
import HotelForm from "../../_common/hotel-form";
import { getHotelById } from "@/servers/hotels";
import { HotelType } from "@/interfaces";

type UpdateHotelPageProps = {
  params: {
    id: string;
  };
};
const UpdateHotelPage = async ({ params }: UpdateHotelPageProps) => {
  const { id } = params;

  let hotel: HotelType | null = null;

  const response = await getHotelById(id);

  if (response?.status === 200) {
    hotel = response.data;
  }

  return (
    <div>
      <div className="mt-5">
        <PageTitle>Update Hotels</PageTitle>
        <HotelForm type="update" initalValues={hotel}></HotelForm>
      </div>
    </div>
  );
};

export default UpdateHotelPage;
