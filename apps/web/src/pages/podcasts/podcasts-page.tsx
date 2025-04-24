import SkeletonCard from "@/components/Shared/SkeletonCard";
import QAndAAudioCard from "@/components/ui/q-and-a-audio-card";
import { useGetAllPodcastQuery } from "@/redux/features/podcast/podcast-api";
import { TPodcast } from "@/types/podcast.type";
import { Empty } from "@repo/ui";

const PodcastsPage = () => {
  const {
    data: podcasts,
    isLoading,
    isError,
  } = useGetAllPodcastQuery(undefined);

  return (
    <div className="space-y-5">
      <div>
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
                {podcasts && podcasts.data.length > 0 ? (
                  <div className="flex flex-col gap-5">
                    {podcasts?.data?.map((podcast: TPodcast) => (
                      <QAndAAudioCard item={podcast} />
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

export default PodcastsPage;
