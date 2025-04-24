import SkeletonCard from "@/components/Shared/SkeletonCard";
import ResearchAndDevelopmentCard from "@/components/ui/research-and-development-card";
import { cn } from "@/lib/utils";
import { selectResearchAndDevelopmentsFilters } from "@/redux/features/filters/filters.slice";
import { useGetResearchAndDevelopmentsQuery } from "@/redux/features/researchAndDevelopment/researchAndDevelopmentApi";
import {
  selectResearchAndDevelopmentState,
  setIsResearchAndDevelopmentSidebarOpen,
} from "@/redux/features/researchAndDevelopment/researchAndDevelopmentSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Empty, useIsMobile } from "@repo/ui";
import queryString from "query-string";
import ResearchAndDevelopmentSidebar from "./research-and-development-sidebar";

const ResearchAndDevelopmentPage = () => {
  const { isSidebarOpen } = useAppSelector(selectResearchAndDevelopmentState);
  const dispatch = useAppDispatch();
  const { category } = useAppSelector(selectResearchAndDevelopmentsFilters);
  const query = queryString.stringify({ category });
  const { data, isLoading, isError } =
    useGetResearchAndDevelopmentsQuery(query);
  const isMobile = useIsMobile();
  return (
    <div>
      <div className={cn("flex w-full gap-5 overflow-hidden rounded-lg")}>
        {/* Main content */}
        <section
          className={cn(
            "min-h-[calc(100vh-115px)] overflow-hidden rounded-xl transition-all duration-300 ease-in-out",
            isSidebarOpen ? "w-[75%]" : "w-full"
          )}
        >
          <div className="flex gap-5">
            <div className="w-full">
              {isError ? (
                <div className="flex h-[400px] items-center justify-center rounded-md bg-gray-200 font-roboto text-2xl font-semibold">
                  Something Went Wrong Please Come Back Later
                </div>
              ) : (
                <div>
                  {isLoading ? (
                    <div className="px-5">
                      <SkeletonCard />
                    </div>
                  ) : (
                    <>
                      {data?.data && data?.data.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
                          {data?.data?.map((item: any) => (
                            <ResearchAndDevelopmentCard
                              key={item.id}
                              item={item}
                            />
                          ))}
                        </div>
                      ) : (
                        <Empty />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Backdrop for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() =>
              dispatch(setIsResearchAndDevelopmentSidebarOpen(false))
            }
          />
        )}

        {/* Floating Sidebar for mobile, regular sidebar for desktop */}
        <div
          className={cn(
            "h-full bg-background transition-transform duration-300 ease-in-out dark:bg-secondary",
            isMobile
              ? "fixed right-0 top-0 z-50 h-full w-3/4 max-w-sm transform"
              : "lg:w-[25%]",
            isSidebarOpen
              ? "translate-x-0"
              : "translate-x-full lg:w-0 lg:translate-x-0"
          )}
        >
          {isSidebarOpen && <ResearchAndDevelopmentSidebar />}
        </div>
      </div>
    </div>
  );
};

export default ResearchAndDevelopmentPage;
