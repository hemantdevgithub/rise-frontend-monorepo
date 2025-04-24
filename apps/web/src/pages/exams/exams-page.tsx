import ExamCard from "@/components/Quizzes/ExamCard";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useGetAllExamsQuery } from "@/redux/features/exam/examApi";
import { TExam } from "@/types/exam.type";
import { Empty } from "@repo/ui";

const ExamsPage = () => {
  const { data, isFetching, isError } = useGetAllExamsQuery(undefined);

  const exams = data?.data as TExam[] | [];

  if (isFetching) {
    return <SkeletonCard />;
  }

  return (
    <div className="flex gap-5 space-y-5">
      <div className="w-full">
        {isError ? (
          <div className="m-5 flex h-[400px] items-center justify-center rounded-md font-roboto text-2xl font-semibold">
            Something Went Wrong Please Come Back Later
          </div>
        ) : exams.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {exams.map((quiz) => (
              <ExamCard exam={quiz} key={quiz.id} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default ExamsPage;
