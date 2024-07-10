import { UserType } from "@/interfaces";
import { useAuth } from "@clerk/nextjs";
import { Drawer } from "antd";
import {
  BedIcon,
  GitGraph,
  Home,
  Hotel,
  List,
  LogOut,
  User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarProps {
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserType | null;
}

export const Sidebar = ({ isShow, setIsShow, userData }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const { signOut } = useAuth();

  const handleLoguOut = async () => {
    await signOut();
    setIsShow(false);
    router.push("/sign-in");
  };

  const size = 20;

  const userItem = [
    {
      name: "Home",
      icon: <Home size={size}></Home>,
      onclick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Booking",
      icon: <List size={size}></List>,
      onclick: () => router.push("/user/booking"),
      isActive: pathname === "/user/booking",
    },
    {
      name: "Profile",
      icon: <User size={size}></User>,
      onclick: () => router.push("/user/profile"),
      isActive: pathname === "/user/profile",
    },
  ];

  const adminItem = [
    {
      name: "Home",
      icon: <Home size={size}></Home>,
      onclick: () => router.push("/"),
      isActive: pathname === "/",
    },
    {
      name: "Booking",
      icon: <List size={size}></List>,
      onclick: () => router.push("/admin/booking"),
      isActive: pathname === "/admin/booking",
    },
    {
      name: "Hotels",
      icon: <Hotel size={size}></Hotel>,
      onclick: () => router.push("/admin/hotels"),
      isActive: pathname === "/admin/hotels",
    },
    {
      name: "Rooms",
      icon: <BedIcon size={size}></BedIcon>,
      onclick: () => router.push("/admin/rooms"),
      isActive: pathname === "/admin/rooms",
    },
    {
      name: "Reports",
      icon: <GitGraph size={size}></GitGraph>,
      onclick: () => router.push("/admin/reports"),
      isActive: pathname === "/admin/reports",
    },
  ];

  const menuItemToShow = userData?.isAdmin ? adminItem : userItem;
  return (
    <Drawer open={isShow} onClose={() => setIsShow(false)} closable>
      <div className="flex flex-col gap-y-5">
        {menuItemToShow.map((item, index) => {
          return (
            <button
              className={`flex gap-x-4 items-center p-3 rounded-md w-full ${
                item.isActive ? "bg-gray-600 text-white" : ""
              }`}
              key={index}
              onClick={() => item.onclick()}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          );
        })}
        <div className="border-t-2 text-center ">
          <button
            className="text-lg flex items-center gap-x-2 justify-center font-bold text-gray-600 mt-5 w-full"
            onClick={handleLoguOut}
          >
            <LogOut></LogOut>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
};
