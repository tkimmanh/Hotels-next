import React from "react";
import AdminBookingsTable from "@/app/admin/bookings/_common/admin-booking-table";
import { BookingType } from "@/interfaces";
import { reportBooking } from "@/servers/booking";

const ReportsData = async ({
  searchParams,
}: {
  searchParams: {
    startDate: string;
    endDate: string;
  };
}) => {
  let bookings: BookingType[] = [];

  const response = await reportBooking({
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  });

  if (response?.status === 200) {
    bookings = response.data;
  }
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (acc: number, booking: any) => acc + booking.totalAmount,
    0
  );

  return (
    <div>
      <div className="md:flex-row flex-col flex gap-10">
        <div className="flex items-center justify-center w-full gap-14 py-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold text-gray-600">Total Bookings</h1>
            <h1
              className="text-5xl font-bold text-center"
              style={{ color: "#40679E" }}
            >
              {totalBookings}
            </h1>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-xl font-bold text-gray-600">Total Revenue</h1>
            <h1
              className="text-5xl font-bold text-center"
              style={{ color: "#944E63" }}
            >
              ${totalRevenue}
            </h1>
          </div>
        </div>
      </div>

      <AdminBookingsTable booking={bookings as BookingType[]} />
    </div>
  );
};

export default ReportsData;
