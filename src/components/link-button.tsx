import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  children: string;
  path: string;
}

const LinkButton = ({ children, path }: LinkButtonProps) => {
  return (
    <>
      <Link
        className="font-bold text-gray-500 text-sm border  p-2 rounded hover:bg-gray-500 hover:text-white hover:transition-all"
        href={path}
      >
        {children}
      </Link>
    </>
  );
};

export default LinkButton;
