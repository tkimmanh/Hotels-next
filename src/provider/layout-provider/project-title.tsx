import Link from "next/link";
import React from "react";

export const ProjectTitle = () => {
  return (
    <div className="lg:p-5 p-3  lg:text-2xl md:text-xl text-lg font-bold">
      <Link href={"/"}>Hotel NextJS</Link>
    </div>
  );
};
