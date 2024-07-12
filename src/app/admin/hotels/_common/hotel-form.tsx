"use client";
import { uploadImageToFirebase } from "@/helpers/image-upload";
import { HotelType, SuccessResponse } from "@/interfaces";
import { addHotels, updateHotel } from "@/servers/hotels";
import { Button, Form, Input, message, Upload } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HotelForm = ({
  type,
  initalValues,
}: {
  type: string;
  initalValues?: HotelType | null;
}) => {
  const [uploadFile, setUploadFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exitstingMedia, setExistingMedia] = useState(
    initalValues?.media || []
  );

  console.log("initalValues", initalValues?.media);

  const router = useRouter();
  const onSubmit = async (values: HotelType) => {
    try {
      setLoading(true);

      const newMedia = await uploadImageToFirebase(uploadFile);
      values.media = [...exitstingMedia, ...(newMedia as string[])];
      let response: SuccessResponse = null;

      if (type === "create") {
        response = await addHotels(values);
      }

      if (type === "update") {
        response = await updateHotel(initalValues?._id as string, values);
      }

      if (response?.status === 200) {
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
      initialValues={initalValues as HotelType}
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
      <div className="col-span-3 flex">
        <div className="flex gap-5">
          {exitstingMedia.map((media: string, index: number) => {
            return (
              <div className="flex flex-col border rounded p-3" key={index}>
                <Image src={media} width={100} height={100} alt={""} />
                <Button
                  onClick={() => {
                    setExistingMedia(
                      exitstingMedia.filter(
                        (item: string) => item !== media
                      ) as any
                    );
                  }}
                  type="dashed"
                  className="mt-5 text-red-400"
                >
                  Remove
                </Button>
              </div>
            );
          })}
        </div>

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
