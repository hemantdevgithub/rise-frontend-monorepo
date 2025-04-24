import {
  goNextQuiz,
  selectAnsweredQuestions,
  selectQuizNumber,
  selectQuizQuestions,
} from "@/redux/features/quiz/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Progress } from "@repo/ui";
import { useMemo, useState } from "react";
import QuizTimer from "./QuizTimer";

const QuizTestCard = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const questions = useAppSelector(selectQuizQuestions);
  const selectedAnswers = useAppSelector(selectAnsweredQuestions);
  const quizNumber = useAppSelector(selectQuizNumber);
  const dispatch = useAppDispatch();
  const currentQuiz = questions[quizNumber - 1];

  const progress = useMemo(
    () => (quizNumber / questions.length) * 100,
    [quizNumber, questions.length]
  );

  const answeredQuizzes = useMemo(() => {
    return [
      ...selectedAnswers,
      { questionId: currentQuiz?.id, answer: selectedOption },
    ];
  }, [questions, currentQuiz?.id, selectedOption]);

  return (
    <div className="space-y-4">
      {/* progress */}
      <Progress value={progress} />

      {/* quiz */}
      <div className="flex justify-end">
        <QuizTimer
          answeredQuizzes={answeredQuizzes}
          currentQuiz={currentQuiz}
        />
      </div>
      <div className="flex items-center justify-between">
        <p>{currentQuiz.question}</p>
      </div>

      {/* answer */}
      <div className="flex flex-col space-y-3">
        {currentQuiz.options.map((option) => (
          <Button
            key={option}
            variant={selectedOption === option ? "default" : "outline"}
            onClick={() => setSelectedOption(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      <div className="flex justify-end">
        <Button
          onClick={() => {
            dispatch(goNextQuiz(answeredQuizzes));
            setSelectedOption("");
          }}
          disabled={!selectedOption}
          variant={"outline"}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuizTestCard;
