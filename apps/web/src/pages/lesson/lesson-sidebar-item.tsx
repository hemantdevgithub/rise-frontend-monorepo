import { cn } from "@/lib/utils";
import { useGetProgressByChapterIdQuery } from "@/redux/features/userProgress/userProgressApi";
import { TChapter } from "@/types/lesson.type";
import { Button } from "@repo/ui";
import { BookOpen, Check, Circle } from "lucide-react";
import { FC } from "react";
import { IoPlayOutline } from "react-icons/io5";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

type TLessonSidebarItem = {
  chapter: TChapter;
};
const LessonSidebarItem: FC<TLessonSidebarItem> = ({ chapter }) => {
  const { lessonSlug, chapterSlug } = useParams();

  const isActive = chapterSlug === chapter?.slug;
  const { data: progressData } = useGetProgressByChapterIdQuery(chapter.id, {
    skip: !chapter.id,
  });
  const alreadyCompleted = !!progressData?.data;
  return (
    <Link to={`/lessons/${lessonSlug}/${chapter.slug}`} key={chapter.id}>
      <Button
        variant={isActive ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start rounded-none text-left font-normal",
          isActive
            ? "bg-secondary"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        <BookOpen className={cn("mr-2 h-4 w-4", isActive && "text-primary")} />
        <span className="max-w-[200px] truncate">{chapter.chapterTitle}</span>

        {isActive && <Circle className="ml-auto" />}

        {!isActive && alreadyCompleted && <Check className="ml-auto" />}
        {!isActive && !alreadyCompleted && (
          <IoPlayOutline size={15} className="ml-auto" />
        )}
      </Button>
    </Link>
  );
};

export default LessonSidebarItem;
