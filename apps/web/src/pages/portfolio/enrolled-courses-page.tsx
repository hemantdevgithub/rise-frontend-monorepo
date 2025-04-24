import LessonCard from "@/components/ui/lesson-card";
import { useGetAllEnrolledLessonsQuery } from "@/redux/features/lesson/lessonApi";
import { TLesson } from "@/types/lesson.type";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

const EnrolledCoursesPage = () => {
  const { data, isFetching, isError } =
    useGetAllEnrolledLessonsQuery(undefined);

  let content: ReactNode;

  const lessons = (data?.data as TLesson[]) || [];

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
  } else if (!lessons.length) {
    content = (
      <div className="flex h-56 w-full items-center justify-center">
        <p>No courses enrolled yet.</p>
      </div>
    );
  } else {
    content = (
      <div className={"grid grid-cols-4 gap-5"}>
        {lessons.map((el) => (
          <LessonCard key={el.id} {...el} />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">
        Total Enrolled courses({lessons.length})
      </h1>
      {content}
    </div>
  );
};

export default EnrolledCoursesPage;
