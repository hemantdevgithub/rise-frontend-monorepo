import RegisteredWebinarForm from "@/components/forms/RegisteredWebinarForm";
import LikeShare from "@/components/LikeShare/LikeShare";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useGetSingleWebinarBySlugQuery } from "@/redux/features/webinar/webinarApi";
import { TWebinar } from "@/types/webinar.types";
import moment from "moment";
import { useParams } from "react-router";

const WebinarDetailPage = () => {
  const { slug } = useParams();
  const { data, isFetching, isError } = useGetSingleWebinarBySlugQuery(slug, {
    skip: !slug,
  });
  if (isFetching) {
    return <SkeletonCard />;
  }

  const webinar = (data?.data as TWebinar) || {};

  return (
    <div className="font-poppins">
      <div className="flex gap-5">
        <div className="space-y-5 lg:w-[70%]">
          {isError ? (
            <div>Something went wrong</div>
          ) : (
            <div className="space-y-3">
              <img
                className="h-[250px] w-full rounded-t-sm border object-cover"
                src={webinar?.image?.url}
                alt=""
              />
              <LikeShare />
              <div className="flex items-center justify-between">
                <p className="w-full text-right text-xs text-text">
                  Posted At: {moment(webinar?.createdAt).format("DD MMM YYYY")}
                </p>
              </div>
              <h1 className="font-roboto text-3xl font-semibold text-tommyBlue">
                {webinar?.title}
              </h1>
              <div dangerouslySetInnerHTML={{ __html: webinar?.content }} />
            </div>
          )}
        </div>
        <div className="space-y-4 lg:w-[30%]">
          <RegisteredWebinarForm webinarId={webinar?.id} />
        </div>
      </div>
    </div>
  );
};

export default WebinarDetailPage;
