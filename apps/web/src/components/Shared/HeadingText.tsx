import { cn } from "@/lib/utils";
import React from "react";

interface HeadingTextProps {
  children: string;
  className?: string;
}

const HeadingText: React.FC<HeadingTextProps> = ({ className, children }) => {
  return (
    <h1
      className={cn(
        "font-roboto text-xl font-semibold text-tommyBlue dark:text-white",
        className
      )}
    >
      {children}
    </h1>
  );
};

export default HeadingText;
