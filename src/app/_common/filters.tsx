"use client";
import { Button } from "antd";
import { Filter, FilterX } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Filters = ({
  searchParams,
}: {
  searchParams: {
    checkIn: string;
    checkOut: string;
    type: string;
  };
}) => {
  const [checkIn, setCheckIn] = React.useState(searchParams.checkIn || "");
  const [checkOut, setCheckOut] = React.useState(searchParams.checkOut || "");
  const [type, setType] = React.useState(searchParams.type || "");
  const route = useRouter();

  const onSearch = () => {
    const newSearchParamsObject = { ...searchParams, checkIn, checkOut, type };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    route.push(`/?${newSearchParams}`);
  };
  const onClear = () => {
    setCheckIn("");
    setCheckOut("");
    setType("");
    route.push("/");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7">
      <div className="flex flex-col mt-5">
        <span className="text-gray-500 mb-2">Check In Date</span>
        <input
          type="date"
          placeholder="Check In"
          className="h-10 px-10 w-full border-2 rounded"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-5">
        <span className="text-gray-500 mb-2">Check Out Date</span>
        <input
          type="date"
          placeholder="Check Out"
          className="h-10 px-10 w-full border-2 rounded"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>
      <div className="flex flex-col mt-5">
        <span className="text-gray-500 mb-2">Type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-10 px-10 w-full border-2 rounded"
          name=""
          id=""
        >
          <option value="">All</option>
          <option value="delux">Delux</option>
          <option value="premium">Premium</option>
          <option value="standard">Standard</option>
        </select>
      </div>
      <div className="flex gap-x-5 mt-9 items-center">
        <Button onClick={onClear} icon={<FilterX size={20} />}>
          Clear
        </Button>
        <Button onClick={onSearch} icon={<Filter size={20} />} type="primary">
          Search
        </Button>
      </div>
    </div>
  );
};

export default Filters;
