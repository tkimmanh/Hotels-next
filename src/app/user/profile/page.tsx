import PageTitle from "@/components/page-title";
import Booking from "@/models/Booking.model";
import { getCurrentUser } from "@/servers/users";
import dayjs from "dayjs";
import React from "react";

const ProfilePage = async () => {
  const response = await getCurrentUser();
  const user = JSON.parse(JSON.stringify(response.data));
  const bookingCount = await Booking.countDocuments({ user: user._id });

  const renderRoomProperty = (lable: string, value: string) => {
    return (
      <div className="flex flex-col text-gray-600">
        <span className="text-xs mb-1">{lable}:</span>
        <span className="text-sm font-semibold capitalize">{value}</span>
      </div>
    );
  };

  return (
    <div>
      <div className="mt-5">
        <PageTitle>Profile</PageTitle>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {renderRoomProperty("Name", user?.name || "")}
        {renderRoomProperty("Email", user?.email || "")}
        {renderRoomProperty("Role", user?.isAdmin ? "Admin" : "User")}
        {renderRoomProperty(
          "Joined At",
          dayjs(user?.createdAt).format("DD/MM/YYYY")
        )}
        {renderRoomProperty("Total Booking", bookingCount.toString())}
      </div>
    </div>
  );
};

export default ProfilePage;
