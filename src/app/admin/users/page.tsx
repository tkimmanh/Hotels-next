import PageTitle from "@/components/page-title";
import { UserType } from "@/interfaces";
import { listUser } from "@/servers/users";
import React from "react";
import UserTableUser from "./_common/user-table-list";

const UserPages = async () => {
  let users: UserType[] = [];
  const response = await listUser();
  if (response?.status === 200) {
    users = response.data;
  }
  return (
    <div>
      <div className="my-5">
        <PageTitle>List User</PageTitle>
      </div>
      <UserTableUser user={users}></UserTableUser>
    </div>
  );
};

export default UserPages;
