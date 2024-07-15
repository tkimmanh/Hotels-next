"use client";
import { HotelType, RoomsType } from "@/interfaces";
import { deleteRoom } from "@/servers/rooms";
import { message, Table, TableColumnsType } from "antd";
import dayjs from "dayjs";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import { AnyObject } from "mongoose";
import { useRouter } from "next/navigation";
import React from "react";

function RoomsTable({ rooms }: { rooms: RoomsType[] }) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);

      const response = await deleteRoom(id);

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
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: any, record: RoomsType) =>
        (record as RoomsType)?.hotel?.name,
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Rent Per Day",
      dataIndex: "rentPerDay",
      key: "rentPerDay",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: any, record: RoomsType) =>
        dayjs((record as RoomsType)?.createdAt).format("MMM DD, YYYY hh:mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: RoomsType) => (
        <div className="flex gap-5 items-center">
          <Trash2
            size={18}
            className="cursor-pointer text-red-700"
            onClick={() => {
              handleDelete((record as RoomsType)?._id as string);
            }}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-700"
            onClick={() =>
              router.push(`/admin/rooms/update/${(record as RoomsType)?._id}`)
            }
          />
          <PlusSquare size={18} className="cursor-pointer text-green-700" />
        </div>
      ),
    },
  ];
  return (
    <div>
      <Table
        loading={loading}
        dataSource={rooms as readonly AnyObject[]}
        columns={columns as any}
      />
    </div>
  );
}

export default RoomsTable;
