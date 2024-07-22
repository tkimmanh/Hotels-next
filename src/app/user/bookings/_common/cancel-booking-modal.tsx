import { BookingType } from "@/interfaces";
import { cancelBooking } from "@/servers/booking";
import { message, Modal } from "antd";
import dayjs from "dayjs";
import React from "react";

const CancelBookingModal = ({
  booking,
  setShouldShowCancelBookingModal,
  shouldShowCancelBookingModal,
}: {
  booking: BookingType;
  setShouldShowCancelBookingModal: (value: boolean) => void;
  shouldShowCancelBookingModal: boolean;
}) => {
  const [loading, setLoading] = React.useState(false);
  const onCancel = async () => {
    try {
      setLoading(true);
      const response = await cancelBooking({
        bookingId: booking._id,
        paymentId: booking.paymentId,
      });
      if (response.success) {
        message.success(response.message);
        setShouldShowCancelBookingModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Failed to cancel booking");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Modal
      title={
        <span className="text-red-500 text-lg font-semibold">
          Cancel Booking
        </span>
      }
      open={shouldShowCancelBookingModal}
      onCancel={() => setShouldShowCancelBookingModal(false)}
      centered
      okText="Yes Cancel"
      onOk={onCancel}
      okButtonProps={{
        loading,
      }}
    >
      <span className="text-gray-500 text-sm">
        Are your sure you want to cancel booking for {booking.room.name}?
      </span>
      <div className="flex justify-between mt-2">
        <span>Check In</span>
        <span>{dayjs(booking.checkInDate).format("YYYY-MM-DD")}</span>
      </div>
      <div className="flex justify-between mt-2">
        <span>Check Out</span>
        <span>{dayjs(booking.checkOutDate).format("YYYY-MM-DD")}</span>
      </div>
    </Modal>
  );
};

export default CancelBookingModal;
