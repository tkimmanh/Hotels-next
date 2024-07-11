import React from "react";

const PageTitle = ({ children }: { children: string }) => {
  return <h1 className="text-xl font-bold text-gray-500">{children}</h1>;
};

export default PageTitle;
