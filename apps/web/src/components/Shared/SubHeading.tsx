import { cn } from "@/lib/utils";
import React from "react";

interface SubHeadingProps {
  children: string;
  className?: string;
}

const SubHeading: React.FC<SubHeadingProps> = ({ children, className }) => {
  return <p className={cn("font-poppins", className)}>{children}</p>;
};

export default SubHeading;
