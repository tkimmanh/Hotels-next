import React from "react";
import HotelForm from "../_common/hotel-form";
import PageTitle from "@/components/page-title";
import LinkButton from "@/components/link-button";

const AddHotelPage = () => {
  return (
    <div className="px-2">
      <div className="flex justify-between mt-5 items-center">
        <PageTitle>Hotels</PageTitle>
        <LinkButton path="/admin/hotels">Back to Hotels</LinkButton>
      </div>
      <div className="mt-4">
        <HotelForm type="create"></HotelForm>
      </div>
    </div>
  );
};

export default AddHotelPage;
