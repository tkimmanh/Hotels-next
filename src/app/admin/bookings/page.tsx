import PageTitle from "@/components/page-title";
import React from "react";
import AdminBookingTable from "./_common/admin-booking-table";
import { BookingType } from "@/interfaces";
import { listBookings } from "@/servers/booking";

const AdminBookingPage = async () => {
  let booking: BookingType[] = [];
  const resoponse = await listBookings();

  if (resoponse?.status === 200) {
    booking = resoponse.data;
  }

  return (
    <div>
      <div className="my-5">
        <PageTitle>List Booking</PageTitle>
      </div>
      <AdminBookingTable booking={booking}></AdminBookingTable>
    </div>
  );
};

export default AdminBookingPage;
