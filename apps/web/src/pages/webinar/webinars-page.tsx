import SkeletonCard from "@/components/Shared/SkeletonCard";
import WebinarCard from "@/components/ui/webinar-card";
import { useGetAllWebinarsQuery } from "@/redux/features/webinar/webinarApi";
import { TWebinar } from "@/types/webinar.types";
import { Empty } from "@repo/ui";

const WebinarsPage = () => {
  const {
    data: webinars,
    isLoading,
    isError,
  } = useGetAllWebinarsQuery(undefined);

  return (
    <div>
      <div>
        {isError ? (
          <div className="m-5 flex h-[400px] items-center justify-center rounded-md bg-gray-200 font-roboto text-2xl font-semibold">
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
                {webinars && webinars.data.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {webinars?.data?.map((webinar: TWebinar) => {
                      return <WebinarCard key={webinar.id} item={webinar} />;
                    })}
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
  );
};

export default WebinarsPage;
