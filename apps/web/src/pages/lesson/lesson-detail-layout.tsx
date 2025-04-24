import { useIsMobile } from "@repo/ui";
import { cn } from "@/lib/utils";
import { useGetChaptersForALessonQuery } from "@/redux/features/chapter/chapterApi";
import {
  selectLessonState,
  setIsLessonSidebarOpen,
} from "@/redux/features/lesson/lessonSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TChapter } from "@/types/lesson.type";
import { Outlet, useParams } from "react-router";
import LessonSidebar from "./lesson-sidebar";

const LessonDetailLayout = () => {
  const { lessonSlug } = useParams();
  const dispatch = useAppDispatch();
  const { data, isFetching } = useGetChaptersForALessonQuery(lessonSlug);
  const { isLessonSidebarOpen } = useAppSelector(selectLessonState);

  const chapters = (data?.data as TChapter[]) || [];

  const isMobile = useIsMobile();

  return (
    <div className="relative">
      <div className={cn("flex w-full gap-5 overflow-hidden rounded-lg")}>
        {/* Main content */}
        <section
          className={cn(
            "w-full overflow-hidden rounded-xl border transition-all duration-300 ease-in-out",
            !isMobile && isLessonSidebarOpen && "lg:w-[75%]"
          )}
        >
          <Outlet />
        </section>

        {/* Backdrop for mobile */}
        {isMobile && isLessonSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => dispatch(setIsLessonSidebarOpen(false))}
          />
        )}

        {/* Floating Sidebar for mobile, regular sidebar for desktop */}
        <div
          className={cn(
            "h-full transition-transform duration-300 ease-in-out",
            isMobile
              ? "fixed right-0 top-0 z-50 h-full w-3/4 max-w-sm transform"
              : "lg:w-[25%]",
            isLessonSidebarOpen
              ? "translate-x-0"
              : "translate-x-full lg:w-0 lg:translate-x-0"
          )}
        >
          {isLessonSidebarOpen && (
            <LessonSidebar isLoading={isFetching} chapters={chapters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetailLayout;
