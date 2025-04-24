import {
    useGetProgressByChapterIdQuery,
    useUpdateProgressMutation,
} from "@/redux/features/userProgress/userProgressApi";
import { TChapter } from "@/types/lesson.type";
import { Button } from "@repo/ui";
import { toast } from "sonner";
import LikeShare from "../LikeShare/LikeShare";

const ChapterDetailCard = ({ data }: { data: TChapter }) => {
  const { chapterTitle, content, id, lessonId } = data || {};
  const [updateProgress, { isLoading }] = useUpdateProgressMutation();
  const { data: progressData } = useGetProgressByChapterIdQuery(id, {
    skip: !id,
  });
  const alreadyCompleted = !!progressData?.data;
  const handleMarkAsComplete = async () => {
    try {
      const response = await updateProgress({
        chapterId: id,
        lessonId,
      }).unwrap();
      if (response.success) {
        toast.success("Chapter marked as read!");
      }
    } catch (error) {
      toast.success("Unable to process your request!");
    }
  };
  return (
    <div className="space-y-3">
      {/* <img
        // className="h-[250px] w-full rounded-t-sm border object-cover"
        src={image?.url}
        alt={chapterTitle}
        className="w-full rounded-md"
      /> */}
      <div className="flex items-center justify-between">
        {/* <p className="text-sm font-semibold text-text">
          Posted At: {moment(createdAt).format("DD MMM YYYY")}
        </p> */}
        <Button
          disabled={isLoading || alreadyCompleted}
          onClick={handleMarkAsComplete}
          variant={"success"}
          size={"sm"}
        >
          Mark As Complete
        </Button>
        <LikeShare />
      </div>
      <h1 className="font-roboto text-3xl font-semibold text-foreground">
        {chapterTitle}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose min-w-full"
      />
    </div>
  );
};

export default ChapterDetailCard;
