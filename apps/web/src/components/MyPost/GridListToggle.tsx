import { cn } from "@/lib/utils";
import {
  onViewToggle,
  selectIsList,
} from "@/redux/features/myPost/myPost.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { FaList } from "react-icons/fa";
import { IoGrid } from "react-icons/io5";

const GridListToggle = () => {
  const dispatch = useAppDispatch();
  const isList = useAppSelector(selectIsList);

  const buttons = [
    {
      id: 1,
      label: "Grid",
      icon: IoGrid,
    },
    {
      id: 2,
      label: "List",
      icon: FaList,
    },
  ];
  return (
    <div className="relative inline-flex rounded-full border-2 border-gray-200 bg-gray-200 text-sm leading-none">
      <div
        className={cn(
          "absolute right-0 top-0 h-full w-[50%] rounded-full bg-tommyBlue transition-all duration-300",
          !isList && "right-[73px]"
        )}
      ></div>
      {buttons.map((button, i) => (
        <button
          onClick={() => dispatch(onViewToggle())}
          className={cn(
            "z-10 inline-flex items-center space-x-1 rounded-l-full px-4 py-2 text-gray-700 transition-all duration-300",
            isList && i === 1 && "text-tommyYellow",
            !isList && i === 0 && "text-tommyYellow"
          )}
        >
          <button.icon />

          <span>{button.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GridListToggle;
