import InstructorLessonCard from "@/components/ui/instructor-lesson-card";
import { useGetAllInstructorLessonsQuery } from "@/redux/features/lesson/lessonApi";
import { TLesson } from "@/types/lesson.type";
import { Button } from "@repo/ui";
import { Loader } from "lucide-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

const MyCoursesPage = () => {
  const { data, isFetching, isError } =
    useGetAllInstructorLessonsQuery(undefined);

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
        <p>No courses uploaded yet.</p>
      </div>
    );
  } else {
    content = (
      <div className={"space-y-5"}>
        {lessons.map((el) => (
          <InstructorLessonCard lesson={el} key={el.id} />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          Total courses({lessons.length})
        </h1>
        <Link to={"/add/add-lesson"}>
          <Button>Add new course</Button>
        </Link>
      </div>
      {content}
    </div>
  );
};

export default MyCoursesPage;
