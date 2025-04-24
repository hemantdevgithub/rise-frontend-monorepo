import SkeletonCard from "@/components/Shared/SkeletonCard";
import QAndAAudioCard from "@/components/ui/q-and-a-audio-card";
import { useGetAllQAndAudioQuery } from "@/redux/features/qAndAAudio/qAndAAudio";
import { TQAndA } from "@/types/qAndA.types";
import { Empty } from "@repo/ui";
import { toast } from "sonner";

const QAndAAudiosPage: React.FC = () => {
  const {
    data: qAndAAudiosData,
    isLoading,
    isError,
  } = useGetAllQAndAudioQuery(undefined);
  if (isError) {
    toast.error("Something went wrong");
  }

  return (
    <div>
      <div className="space-y-5">
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
                {qAndAAudiosData && qAndAAudiosData.data.length > 0 ? (
                  <div className="flex flex-col gap-5 pb-10">
                    {qAndAAudiosData?.data?.map((item: TQAndA) => (
                      <QAndAAudioCard item={item} />
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

export default QAndAAudiosPage;
