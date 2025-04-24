import { cn } from "@/lib/utils";
import { FC } from "react";

const LessonSidebarItemSkeleton: FC = () => {
  return (
    <div className="w-full animate-pulse">
      <div
        className={cn(
          "flex h-10 w-full items-center justify-start rounded-none px-4 text-left font-normal"
        )}
      >
        <div className="mr-2 h-4 w-4 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="h-4 w-1/2 rounded bg-gray-300 dark:bg-gray-600" />
        <div className="ml-auto h-4 w-4 rounded-full bg-gray-300 dark:bg-gray-600" />
      </div>
    </div>
  );
};

export default LessonSidebarItemSkeleton;
