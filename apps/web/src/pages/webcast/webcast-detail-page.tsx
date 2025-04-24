import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useGetAWebcastQuery } from "@/redux/features/webcast/webcastApi";
import { TWebcast } from "@/types/webcast.types";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
const WebcastDetailPage = () => {
  const { slug } = useParams();
  const { data, isFetching, isError } = useGetAWebcastQuery(slug!, {});
  const webcast = (data?.data as TWebcast) || {};
  return (
    <div>
      {isError ? (
        <div className="flex h-[400px] items-center justify-center rounded-md font-roboto text-2xl font-semibold">
          Something Went Wrong Please Come Back Later.
        </div>
      ) : (
        <div className="w-[70%]">
          {isFetching ? (
            <div className="px-5">
              <SkeletonCard />
            </div>
          ) : (
            <div className="space-y-5">
              <ReactPlayer
                width={"100%"}
                height={"400px"}
                url={webcast?.videoUrl}
              />
              <div dangerouslySetInnerHTML={{ __html: webcast?.description }} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WebcastDetailPage;
