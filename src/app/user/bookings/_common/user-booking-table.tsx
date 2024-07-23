"use client";
import { BookingType } from "@/interfaces";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import React from "react";
import CancelBookingModal from "./cancel-booking-modal";

const UserBookingTable = ({ booking }: { booking: BookingType[] }) => {
  const [shouldShowCancelBookingModal, setShouldShowCancelBookingModal] =
    React.useState(false);
  const [selectedBooking, setSelectedBooking] =
    React.useState<BookingType | null>(null);

  const onCancelBooking = async (booking: BookingType) => {
    setSelectedBooking(booking);
    setShouldShowCancelBookingModal(true);
  };

  const columns = [
    {
      title: "Hotels",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: string, recode: BookingType) => {
        return recode.hotel.name;
      },
    },
    {
      title: "Room",
      dataIndex: "room",
      key: "room",
      render: (text: string, recode: BookingType) => {
        return recode.room.name;
      },
    },
    {
      title: "Room number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (text: string, recode: BookingType) => {
        return recode.room.roomNumber;
      },
    },
    {
      title: "Check In Date",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (text: string, recode: BookingType) => {
        return dayjs(recode.checkInDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Check Out Date",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (text: string, recode: BookingType) => {
        return dayjs(recode.checkOutDate).format("DD-MM-YYYY");
      },
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: string, recode: BookingType) => {
        return <span>{recode.totalAmount}$</span>;
      },
    },
    {
      title: "Booking Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string, recode: BookingType) => {
        return dayjs(recode.createdAt).format("DD-MM-YYYY");
      },
    },
    {
      title: "Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
      render: (text: string, recode: BookingType) => {
        return (
          <span
            className={`${
              recode.bookingStatus === "Booked"
                ? "text-green-500 bg-green-200"
                : "text-red-500 bg-red-200"
            } p-2 rounded`}
          >
            {recode.bookingStatus}
          </span>
        );
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text: string, recode: BookingType) => {
        return (
          <Button
            disabled={recode.bookingStatus === "Cancelled"}
            onClick={() => onCancelBooking(recode)}
            type="primary"
            className="border"
          >
            Cancel
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <Table dataSource={booking} columns={columns}></Table>
      {shouldShowCancelBookingModal && (
        <CancelBookingModal
          booking={selectedBooking as BookingType}
          setShouldShowCancelBookingModal={setShouldShowCancelBookingModal}
          shouldShowCancelBookingModal={shouldShowCancelBookingModal}
        ></CancelBookingModal>
      )}
    </div>
  );
};

export default UserBookingTable;
