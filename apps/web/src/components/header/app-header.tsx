import { useIsMobile } from "@repo/ui";
import {
    selectLessonState,
    setIsLessonLayout,
    setIsLessonSidebarOpen,
} from "@/redux/features/lesson/lessonSlice";
import {
    selectResearchAndDevelopmentState,
    setIsResearchAndDevelopmentPath,
    setIsResearchAndDevelopmentSidebarOpen,
} from "@/redux/features/researchAndDevelopment/researchAndDevelopmentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button } from "@repo/ui";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import AppBreadcrumbs from "../ui/app-breadcrumbs";
import ThemeToggle from "../ui/theme-toggle";

const AppHeader = () => {
  const params = useParams();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { isLessonLayout, isLessonSidebarOpen } =
    useAppSelector(selectLessonState);
  const { isResearchAndDevelopmentPath, isSidebarOpen } = useSelector(
    selectResearchAndDevelopmentState
  );

  useEffect(() => {
    if (Object.keys(params).includes("lessonSlug")) {
      dispatch(setIsLessonLayout(true));
      dispatch(setIsLessonSidebarOpen(!isMobile));
    } else {
      dispatch(setIsLessonLayout(false));
      dispatch(setIsLessonSidebarOpen(false));
    }

    if (pathname === "/research-and-developments") {
      dispatch(setIsResearchAndDevelopmentPath(true));
      dispatch(setIsResearchAndDevelopmentSidebarOpen(!isMobile));
    } else {
      dispatch(setIsResearchAndDevelopmentPath(false));
      dispatch(setIsResearchAndDevelopmentSidebarOpen(false));
    }
  }, [params, isMobile]);

  const toggleSidebar = () => {
    if (isLessonLayout) {
      dispatch(setIsLessonSidebarOpen(!isLessonSidebarOpen));
    } else if (isResearchAndDevelopmentPath) {
      dispatch(setIsResearchAndDevelopmentSidebarOpen(!isSidebarOpen));
    }
  };
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-5 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2">
        {/* <SidebarTrigger className="-ml-1" /> */}
        {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
        <AppBreadcrumbs />
      </div>
      {(isLessonLayout || isResearchAndDevelopmentPath) && (
        <Button
          variant="ghost"
          className="ml-auto"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      <ThemeToggle />
    </header>
  );
};

export default AppHeader;
