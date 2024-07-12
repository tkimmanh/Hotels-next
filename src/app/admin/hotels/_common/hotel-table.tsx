"use client";
import { HotelType } from "@/interfaces";
import { deleteHotel } from "@/servers/hotels";
import { message, Table } from "antd";
import dayjs from "dayjs";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

function HotelsTable({ hotels }: { hotels?: HotelType[] }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);

      const response = await deleteHotel(id);

      if (response.status === 200) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: HotelType) =>
        dayjs(record?.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: HotelType) => (
        <div className="flex gap-5 items-center">
          <Trash2
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => {
              handleDelete(record?._id as string);
            }}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() => router.push(`/admin/hotels/update/${record?._id}`)}
          />
          <PlusSquare size={18} className="cursor-pointer text-green-700" />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table loading={loading} dataSource={hotels} columns={columns} />
    </div>
  );
}

export default HotelsTable;
