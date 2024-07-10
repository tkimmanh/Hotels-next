import { ProjectTitle } from "./project-title";
import { UserInfor } from "./user-infor";
import React from "react";
import { UserType } from "@/interfaces";
import Link from "next/link";
import { LogIn } from "lucide-react";

export const Header = ({
  loginUserData,
}: {
  loginUserData: UserType | null;
}) => {
  if (!loginUserData) {
    return (
      <div className="mx-7">
        <div className="flex justify-between items-center ">
          <ProjectTitle></ProjectTitle>
          <Link className="font-semibold" href={"/sign-in"}>
            <LogIn></LogIn>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-7">
      <div className="flex justify-between items-center border-b-2">
        <ProjectTitle></ProjectTitle>
        <UserInfor loginUserData={loginUserData}></UserInfor>
      </div>
    </div>
  );
};
