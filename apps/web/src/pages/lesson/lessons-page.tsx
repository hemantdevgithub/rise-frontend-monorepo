import LessonCard from "@/components/ui/lesson-card";
import { useGetAllLessonsBySegmentQuery } from "@/redux/features/lesson/lessonApi";
import { TLesson, TLessonSegment } from "@/types/lesson.type";
import { Button } from "@repo/ui";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const LessonsPage = () => {
  const {
    data: lessonsData,
    isFetching,
    isError,
  } = useGetAllLessonsBySegmentQuery(undefined);

  const lessonsSegments = (lessonsData?.data?.filter(
    (item: TLessonSegment) => item?.lessons?.length
  ) || []) as TLessonSegment[];
  let content: ReactNode;

  if (isFetching) {
    content = (
      <div className="flex h-56 w-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="flex h-56 w-full items-center justify-center">
        <p className="text-sm text-red-300">Failed to retrieve courses.</p>
      </div>
    );
  } else if (!lessonsSegments.length) {
    content = (
      <div className="flex h-56 w-full items-center justify-center">
        <p>No courses uploaded yet.</p>
      </div>
    );
  } else {
    content = (
      <div className="space-y-10">
        {lessonsSegments?.map((item) => (
          <div className="space-y-3">
            <h3 className="font-poppins text-xl font-semibold">
              {item?.title}
            </h3>
            <div
              className={`grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
            >
              {item?.lessons?.map((lesson: TLesson) => (
                <LessonCard key={lesson.id} {...lesson} />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-10">
      <div className="flex justify-end">
        <Link to={`/portfolio/enrolled-courses`}>
          <Button>My Enrolled Courses</Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default LessonsPage;
