"use client";
import { UserType } from "@/interfaces";
import { updateUserRole } from "@/servers/users";
import { message, Table } from "antd";
import dayjs from "dayjs";
import React from "react";

const UserTableUser = ({ user }: { user: UserType[] }) => {
  const [loading, setLoading] = React.useState(false);
  const roleOnChange = async (userId: string, isAdmin: boolean) => {
    try {
      setLoading(true);
      await updateUserRole(userId, isAdmin);
      message.success("User role updated");
    } catch (error) {
      message.error("Failed to update user role");
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "User ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Role",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (isAdmin: boolean, user: UserType) => {
        return (
          <select
            className="px-2 py-1 rounded border"
            onChange={(e) => roleOnChange(user._id, e.target.value === "admin")}
          >
            <option value="admin" selected={isAdmin}>
              Admin
            </option>
            <option value="user" selected={!isAdmin}>
              User
            </option>
          </select>
        );
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value: string) => dayjs(value).format("DD/MM/YYYY"),
    },
  ];
  return (
    <div>
      <Table dataSource={user} columns={columns} loading={loading} />;
    </div>
  );
};

export default UserTableUser;
