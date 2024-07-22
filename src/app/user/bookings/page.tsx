import { BookingType } from "@/interfaces";
import { getBookingsUser } from "@/servers/booking";
import React from "react";
import UserBookingTable from "./_common/user-booking-table";
import PageTitle from "@/components/page-title";

const BookingPage = async () => {
  let data: BookingType[] = [];
  const response = await getBookingsUser();
  if (response?.status === 200) {
    data = response.data;
  }

  return (
    <div>
      <div className="my-5">
        <PageTitle>My booking</PageTitle>
      </div>
      <UserBookingTable booking={data}></UserBookingTable>
    </div>
  );
};

export default BookingPage;
