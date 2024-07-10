/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React from "react";
import { Header } from "./header";
import { getCurrentUser } from "@/servers/users";
import { message } from "antd";
import { UserType } from "@/interfaces";
import { usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [loginUserData, setloginUserData] = React.useState<UserType | null>(
    null
  );
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const pathname = usePathname();
  const isAuthRoute =
    pathname.includes("/sign-in") || pathname.includes("/sign-up");

  const getUserData = async () => {
    try {
      setIsLoading(true);
      const response = await getCurrentUser();
      if (response?.success) {
        setloginUserData(response.data);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!loginUserData && !isAuthRoute) {
      getUserData();
    }
  }, []);

  if (isLoading) {
    return <Spinner fullHeight={true}></Spinner>;
  }

  return (
    <div>
      {!isAuthRoute && <Header loginUserData={loginUserData}></Header>}
      <div className="lg:px-20">{children}</div>
    </div>
  );
};
