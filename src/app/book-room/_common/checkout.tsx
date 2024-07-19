"use client";
import { HotelType, RoomsType } from "@/interfaces";
import { checkRoomAvailability } from "@/servers/booking";
import { getStripeClientSceret } from "@/servers/payment";
import { Button, Form, Input, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModal from "./payment-modal";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckOut = ({ room }: { room: RoomsType }) => {
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [isAvailable, setIsAvailable] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [totalDays, setTotalDays] = React.useState<number>(0);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [clientSecret, setClientSecret] = React.useState<string>("");
  const [showPaymentModal, setShowPaymentModal] =
    React.useState<boolean>(false);

  // kiểm tra giá phòng , và thời gian đặt
  const checkAvailability = async () => {
    try {
      setLoading(true);
      const response = await checkRoomAvailability({
        roomId: room._id as string,
        reqCheckInDate: checkIn as string,
        reqCheckOutDate: checkOut as string,
      });
      if (response?.success) {
        setIsAvailable(true);
        message.success("Room is available");
        const totalDayTemp = dayjs(checkOut).diff(dayjs(checkIn), "day");
        setTotalDays(totalDayTemp);
        setTotalAmount(totalDayTemp * room.rentPerDay);
      } else {
        setIsAvailable(false);
        message.error("Room is not available");
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onBookRoom = async () => {
    try {
      setLoading(true);
      const response = await getStripeClientSceret({
        price: totalAmount,
      });
      if (response?.success) {
        setClientSecret(response.clientSecret);
        setShowPaymentModal(true);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      console.log("error", error);

      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setIsAvailable(false);
  }, [checkIn, checkOut]);
  return (
    <div className="flex flex-col gap-5 p-5 border border-gray-300 rounded-md ">
      <Form layout="vertical" className="flex flex-col gap-5 text-gray-600">
        <Form.Item label="Check In">
          <Input
            type="date"
            onChange={(e) => setCheckIn(e.target.value)}
            value={checkIn}
            min={dayjs().format("YYYY-MM-DD")}
          ></Input>
        </Form.Item>
        <Form.Item label="Check Out">
          <Input
            type="date"
            onChange={(e) => setCheckOut(e.target.value)}
            value={checkOut}
            min={dayjs(checkIn).add(1, "day").format("YYYY-MM-DD")}
          ></Input>
        </Form.Item>

        <Button
          disabled={!checkIn || !checkOut || isAvailable}
          loading={loading}
          onClick={checkAvailability}
          type="primary"
          className="w-full"
        >
          Check Availability
        </Button>

        {isAvailable && (
          <>
            <>
              <div className="flex justify-between">
                <span className="text-base font-bold">Total day : </span>
                <span className="text-sm">{totalDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-base font-bold">Total Amount : </span>
                <span className="text-sm">${totalAmount}</span>
              </div>
            </>

            <Button
              loading={loading}
              onClick={onBookRoom}
              type="primary"
              className="w-full"
            >
              Book your room
            </Button>
          </>
        )}
      </Form>
      {clientSecret && showPaymentModal && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <PaymentModal
            room={room}
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
            checkInDate={checkIn}
            checkOutDate={checkOut}
            totalAmount={totalAmount}
            totalDays={totalDays}
          ></PaymentModal>
        </Elements>
      )}
    </div>
  );
};

export default CheckOut;
