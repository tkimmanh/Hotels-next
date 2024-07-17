"use client";
import { Button, Form, Input } from "antd";
import React from "react";

const CheckOut = () => {
  const [checkIn, setCheckIn] = React.useState<Date | null>(null);
  const [checkOut, setCheckOut] = React.useState<Date | null>(null);
  return (
    <div className="flex flex-col gap-5 p-5 border border-gray-300 rounded-md ">
      <Form layout="vertical" className="flex flex-col gap-5 text-gray-600">
        <Form.Item label="Check In">
          <Input type="date"></Input>
        </Form.Item>
        <Form.Item label="Check Out">
          <Input type="date"></Input>
        </Form.Item>
        <Button type="primary" className="w-full">
          Check Availability
        </Button>
      </Form>
    </div>
  );
};

export default CheckOut;
