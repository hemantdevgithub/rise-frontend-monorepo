import QuizRulesCard from "@/components/Quizzes/quiz-rules-card";
import QuizSubmissionCard from "@/components/Quizzes/QuizSubmissionCard";
import QuizTestCard from "@/components/Quizzes/QuizTestCard";
import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useGetSingleQuizWithQuestionQuery } from "@/redux/features/quiz/quizApi";
import {
  closeQuiz,
  selectIsCompleted,
  selectIsStarted,
} from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TQuizWithQuestions } from "@/types/quiz.type";
import { convertSecondsMin } from "@/utility/convertSecToMin";
import { useEffect } from "react";
import { useParams } from "react-router";

const QuizAttemptPage = () => {
  const { quizId } = useParams();
  const dispatch = useAppDispatch();
  const isQuizStarted = useAppSelector(selectIsStarted);
  const isQuizCompleted = useAppSelector(selectIsCompleted);

  const { data: quizData, isFetching } =
    useGetSingleQuizWithQuestionQuery(quizId);
  const quiz = (quizData?.data as TQuizWithQuestions) || [];

  useEffect(() => {
    return () => {
      dispatch(closeQuiz());
    };
  }, [dispatch]);

  if (isFetching) {
    return <SkeletonCard />;
  }

  const questions = quiz.quizQuestions || [];
  const totalTime = questions.reduce((acc, curr) => acc + curr.timer, 0) || 0;
  const totalTimeInMin = convertSecondsMin(totalTime);

  return (
    <div className="flex min-h-[calc(100vh-130px)] items-center justify-center font-poppins">
      <div className="w-[60%] rounded-xl border bg-background p-5 dark:bg-secondary">
        {!isQuizCompleted && !isQuizStarted ? (
          <QuizRulesCard
            timer={totalTimeInMin}
            title={quiz.title}
            questions={questions}
            description={quiz.description}
          />
        ) : isQuizStarted ? (
          <QuizTestCard />
        ) : (
          isQuizCompleted && <QuizSubmissionCard quizId={quiz.id} />
        )}
      </div>
    </div>
  );
};

export default QuizAttemptPage;
