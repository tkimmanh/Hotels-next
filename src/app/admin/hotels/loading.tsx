import Spinner from "@/components/spinner";
import React from "react";

const LoadingHotelsAdmin = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Spinner></Spinner>
    </div>
  );
};

export default LoadingHotelsAdmin;
