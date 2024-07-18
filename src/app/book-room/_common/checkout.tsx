"use client";
import { RoomsType } from "@/interfaces";
import { checkRoomAvailability } from "@/servers/booking";
import { Button, Form, Input, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

const CheckOut = ({ room }: { room: RoomsType }) => {
  const [checkIn, setCheckIn] = React.useState("");
  const [checkOut, setCheckOut] = React.useState("");
  const [isAvailable, setIsAvailable] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

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
  const onBookRoom = async () => {};
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
          <Button
            loading={loading}
            onClick={onBookRoom}
            type="primary"
            className="w-full"
          >
            Book your room
          </Button>
        )}
      </Form>
    </div>
  );
};

export default CheckOut;
