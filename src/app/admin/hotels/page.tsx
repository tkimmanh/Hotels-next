import LinkButton from "@/components/link-button";
import PageTitle from "@/components/page-title";
import React from "react";

const HotelsPageAdmin = () => {
  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <PageTitle>Hotels</PageTitle>
        <LinkButton path="/admin/hotels/create">Add new hotels</LinkButton>
      </div>
    </div>
  );
};

export default HotelsPageAdmin;
