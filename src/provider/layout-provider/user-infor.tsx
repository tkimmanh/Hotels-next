"use client";
import { UserType } from "@/interfaces";
import { User } from "lucide-react";
import React from "react";
import { Sidebar } from "./sidebar";

export const UserInfor = ({
  loginUserData,
}: {
  loginUserData: UserType | null;
}) => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  return (
    <div className="flex items-center gap-x-2 text-gray-600">
      <span className="capitalize lg:inline hidden">{loginUserData?.name}</span>
      <button
        className="p-2 bg-gray-300 rounded-full text-white"
        onClick={() => setIsShow(!isShow)}
      >
        <User></User>
      </button>
      {isShow && (
        <Sidebar
          userData={loginUserData}
          isShow={isShow}
          setIsShow={setIsShow}
        />
      )}
    </div>
  );
};
