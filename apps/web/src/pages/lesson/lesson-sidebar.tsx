import { ScrollArea } from "@repo/ui";
import { cn } from "@/lib/utils";
import {
    selectLessonState,
    setIsLessonSidebarOpen,
} from "@/redux/features/lesson/lessonSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TChapter } from "@/types/lesson.type";
import { Button } from "@repo/ui";
import { BookOpen, ChevronRight } from "lucide-react";
import { FC } from "react";
import LessonSidebarItem from "./lesson-sidebar-item";
import LessonSidebarItemSkeleton from "./lesson-sidebar-item-skeleton";
type TLessonSidebarProps = {
  chapters: TChapter[];
  isLoading: boolean;
};
const LessonSidebar: FC<TLessonSidebarProps> = ({ chapters, isLoading }) => {
  const { isLessonSidebarOpen } = useAppSelector(selectLessonState);
  const dispatch = useAppDispatch();
  return (
    <aside
      className={cn(
        // " right-0 top-0 z-30 h-screen w-80 border-l bg-background ",
        "sticky top-0 h-fit overflow-hidden rounded-xl border transition-all duration-300 ease-in-out dark:bg-secondary",
        isLessonSidebarOpen ? "w-full" : "w-0 border-none"
      )}
    >
      <div className="flex flex-col divide-y">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="flex items-center font-semibold">
            <BookOpen size={15} className="mr-2" />
            Chapters
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(setIsLessonSidebarOpen(false))}
            aria-label="Close sidebar"
            className="aspect-square p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {/* <Separator className="mb-6" /> */}
        <ScrollArea>
          <nav className="divide-y *:block">
            {isLoading
              ? Array.from({ length: 10 }).map((_, i) => (
                  <LessonSidebarItemSkeleton key={i} />
                ))
              : chapters.map((chapter) => (
                  <LessonSidebarItem chapter={chapter} key={chapter?.id} />
                ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default LessonSidebar;
