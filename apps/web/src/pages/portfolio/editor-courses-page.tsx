import EditorLessonCard from "@/components/ui/editor-lesson-card";
import { useGetAllLessonsForEditorQuery } from "@/redux/features/lesson/lessonApi";
import { TLesson } from "@/types/lesson.type";
import { Loader } from "lucide-react";
import { ReactNode } from "react";

const EditorCoursesPage = () => {
  const { data, isError, isFetching } =
    useGetAllLessonsForEditorQuery(undefined);

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
      <div className={"grid grid-cols-2 gap-5"}>
        {lessons.map((el) => (
          <EditorLessonCard lesson={el} key={el.id} />
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <h1 className="text-xl font-semibold">Total courses({lessons.length})</h1>
      {content}
    </div>
  );
};

export default EditorCoursesPage;
