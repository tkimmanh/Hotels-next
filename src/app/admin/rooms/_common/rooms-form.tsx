"use client";
import { uploadImageToFirebase } from "@/helpers/image-upload";
import { HotelType, RoomsType, SuccessResponse } from "@/interfaces";
import { Button, Form, Input, message, Select, Upload } from "antd";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createRoom, updateRoom } from "@/servers/rooms";

const RoomForm = ({
  type,
  initalValues,
  hotels,
}: {
  type: string;
  initalValues?: RoomsType | null;
  hotels: HotelType[];
}) => {
  const [uploadFile, setUploadFile] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [exitstingMedia, setExistingMedia] = useState(
    initalValues?.media || []
  );

  const router = useRouter();
  const onSubmit = async (values: HotelType) => {
    try {
      setLoading(true);

      const newMedia = await uploadImageToFirebase(uploadFile);

      values.media = [...exitstingMedia, ...(newMedia as string[])];

      let response: SuccessResponse = null;

      if (type === "create") {
        response = await createRoom(values);
      }

      if (type === "update") {
        response = await updateRoom(initalValues?._id as string, values);
      }

      if (response?.status === 200) {
        message.success(response.message);
        router.push("/admin/rooms");
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
      initialValues={initalValues as RoomsType}
      className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 "
    >
      <Form.Item
        label="Hotel"
        name="hotel"
        className="col-span-1"
        rules={[
          {
            required: true,
            message: "Hotel is required",
          },
        ]}
      >
        <Select>
          <Select.Option>-Select hotel-</Select.Option>
          {hotels.map((hotel: HotelType, index: number) => {
            return (
              <Select.Option key={index} value={hotel._id}>
                {hotel.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        label="Rooms name"
        className="col-span-1 "
        name="name"
        rules={[
          {
            required: true,
            message: "Rooms name is required",
          },
        ]}
      >
        <Input placeholder="Room name"></Input>
      </Form.Item>

      <Form.Item
        label="Room number"
        className="col-span-3 lg:col-span-1"
        name="roomNumber"
        rules={[
          {
            required: true,
            message: "Room number name is required",
          },
        ]}
      >
        <Input placeholder="Room number name"></Input>
      </Form.Item>

      <Form.Item
        label="Types"
        name="type"
        rules={[
          {
            required: true,
            message: "Hotel is required",
          },
        ]}
      >
        <Select>
          <Select.Option>-Select Type-</Select.Option>
          <Select.Option key="delux" value="delux">
            Delux
          </Select.Option>
          <Select.Option key="premium" value="premium">
            Premium
          </Select.Option>
          <Select.Option key="standard" value="standard">
            Standard
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Bedrooms"
        className="col-span-3 lg:col-span-1"
        name="bedrooms"
        rules={[
          {
            required: true,
            message: "Bedrooms is required",
          },
        ]}
      >
        <Input placeholder="Bedrooms"></Input>
      </Form.Item>

      <Form.Item
        label="Per Day"
        className="col-span-3 lg:col-span-1"
        name="rentPerDay"
        rules={[
          {
            required: true,
            message: "rentPerDay is required",
          },
        ]}
      >
        <Input placeholder="Rent Per Day"></Input>
      </Form.Item>

      <Form.Item
        label="Amenities"
        className="col-span-3"
        name="amenities"
        rules={[
          {
            required: true,
            message: "Amenities is required",
          },
        ]}
      >
        <Input.TextArea placeholder="Amenities"></Input.TextArea>
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
            setUploadFile((prev: any) => [...prev, file]);
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

export default RoomForm;
