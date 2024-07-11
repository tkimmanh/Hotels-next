"use client";
import { uploadImageToFirebase } from "@/helpers/image-upload";
import { HotelType, SuccessResponse } from "@/interfaces";
import { addHotels } from "@/servers/hotels";
import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const HotelForm = ({ type }: { type: string }) => {
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (values: HotelType) => {
    try {
      setLoading(true);
      values.media = await uploadImageToFirebase(uploadFile);
      let response: SuccessResponse = null;
      if (type === "create") {
        response = await addHotels(values);
      }
      if (response?.status === 201) {
        message.success(response.message);
        router.push("/admin/hotels");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
      onFinish={onSubmit}
      layout="vertical"
      className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 "
    >
      <Form.Item
        label="Hotel name"
        className="col-span-3 "
        name="name"
        rules={[
          {
            required: true,
            message: "Hotel name is required",
          },
        ]}
      >
        <Input placeholder="Hotel name"></Input>
      </Form.Item>

      <Form.Item
        label="Owner name"
        className="col-span-3 lg:col-span-1"
        name="owner"
        rules={[
          {
            required: true,
            message: "Owner name is required",
          },
        ]}
      >
        <Input placeholder="Owner name"></Input>
      </Form.Item>

      <Form.Item
        label="Email adress"
        className="col-span-3  lg:col-span-1"
        name="email"
        rules={[
          {
            required: true,
            message: "Email adress is required",
          },
        ]}
      >
        <Input placeholder="Email adress"></Input>
      </Form.Item>

      <Form.Item
        label="Phone number"
        className="col-span-3 lg:col-span-1"
        name="phone"
        rules={[
          {
            required: true,
            message: "Your phone number is required",
          },
        ]}
      >
        <Input type="number" placeholder="Your phone number"></Input>
      </Form.Item>

      <Form.Item
        label="Address"
        className="col-span-3"
        name="address"
        rules={[
          {
            required: true,
            message: "Address is required",
          },
        ]}
      >
        <Input.TextArea placeholder="Address"></Input.TextArea>
      </Form.Item>
      <div className="col-span-3">
        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setUploadFile([...uploadFile, file] as any);
            return false;
          }}
          multiple
        >
          <span className="text-sm text-black p-2">Upload media</span>
        </Upload>
      </div>

      <div className="flex gap-x-4">
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="ml-2"
        >
          Submit
        </Button>
        <Button disabled={loading}>Cancel</Button>
      </div>
    </Form>
  );
};

export default HotelForm;
