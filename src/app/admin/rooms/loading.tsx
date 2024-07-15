import Spinner from "@/components/spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <Spinner fullHeight={true}></Spinner>
    </div>
  );
};

export default Loading;
