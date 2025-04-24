import { goNextQuiz } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TQuizQuestion } from "@/types/quiz.type";
import { FC, useEffect, useState } from "react";
type TQuizTimerProps = {
  currentQuiz: TQuizQuestion;
  answeredQuizzes: {
    questionId: string;
    answer: string;
  }[];
};
const QuizTimer: FC<TQuizTimerProps> = ({ currentQuiz, answeredQuizzes }) => {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const timerId = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timer, dispatch, answeredQuizzes]);

  useEffect(() => {
    setTimer(currentQuiz.timer);
  }, [currentQuiz]);

  useEffect(() => {
    if (timer === 0) {
      dispatch(goNextQuiz(answeredQuizzes));
    }
  }, [timer]);

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-full border-[5px] border-tommyYellow text-lg font-bold"
      style={{ borderWidth: "60%" }}
    >
      {timer}
    </div>
  );
};

export default QuizTimer;
