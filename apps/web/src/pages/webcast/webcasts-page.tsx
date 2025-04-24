import SkeletonCard from "@/components/Shared/SkeletonCard";
import WebcastCard from "@/components/ui/webcast-card";
import { useGetAllWebcastsQuery } from "@/redux/features/webcast/webcastApi";
import { TWebcast } from "@/types/webcast.types";
import { Empty } from "@repo/ui";
import { toast } from "sonner";

const WebcastPage = () => {
  const {
    data: webcasts,
    isLoading,
    isError,
  } = useGetAllWebcastsQuery(undefined);
  if (isError) {
    toast.error("Something went wrong");
  }

  return (
    <div className="space-y-5">
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
                {webcasts && webcasts.data.length > 0 ? (
                  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {webcasts?.data?.map((webcast: TWebcast) => (
                      <WebcastCard item={webcast} key={webcast.id} />
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
  );
};

export default WebcastPage;
