import QuizCard from "@/components/Quizzes/QuizCard";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useGetAllQuizQuery } from "@/redux/features/quiz/quizApi";
import { TQuiz } from "@/types/quiz.type";
import { Empty } from "@repo/ui";

const QuizzesPage = () => {
  const { data, isFetching, isError } = useGetAllQuizQuery(undefined);

  const quizzes = data?.data as TQuiz[] | [];

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
        ) : quizzes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quizzes.map((quiz) => (
              <QuizCard quiz={quiz} key={quiz.id} />
            ))}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
};

export default QuizzesPage;
