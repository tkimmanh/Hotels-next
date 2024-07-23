"use client";
import { Button } from "antd";
import { FilterX, Search } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

function ReportsFilters({
  searchParams,
}: {
  searchParams: {
    startDate: string;
    endDate: string;
  };
}) {
  const [startDate, setStartDate] = React.useState(
    searchParams.startDate || ""
  );

  const [endDate, setEndDate] = React.useState(searchParams.endDate || "");

  const router = useRouter();

  const onGetData = () => {
    const newSearchParamsObject = { ...searchParams, startDate, endDate };
    const newSearchParams = new URLSearchParams(
      newSearchParamsObject
    ).toString();
    router.push(`/admin/reports?${newSearchParams}`);
  };
  const onClear = () => {
    setStartDate("");
    setEndDate("");
    router.push("/admin/reports");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-7 items-end mt-10">
      <div className="flex flex-col gap-1">
        <span className="text-gray-500 mb-2">Start Date</span>
        <input
          type="date"
          placeholder="Check In"
          className="h-10 px-10 w-full border-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 mb-2">End Date</span>
        <input
          type="date"
          placeholder="Check Out"
          className="h-10 px-10 w-full border-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="flex gap-5">
        <Button icon={<FilterX size={20} />} onClick={onClear}>
          Clear
        </Button>
        <Button
          type="primary"
          icon={<Search size={20} />}
          onClick={onGetData}
          disabled={!startDate || !endDate}
        >
          Get Data
        </Button>
      </div>
    </div>
  );
}

export default ReportsFilters;
