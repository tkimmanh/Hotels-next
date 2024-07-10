import { Button } from "antd";
import Link from "next/link";
import React from "react";

interface LinkButtonProps {
  title: string;
  path: string;
}

const LinkButton = ({ title, path }: LinkButtonProps) => {
  return (
    <Button>
      <Link href={path}>{title}</Link>
    </Button>
  );
};

export default LinkButton;
