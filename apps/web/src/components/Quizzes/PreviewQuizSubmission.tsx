import {
    selectAnsweredQuestions,
    selectQuizQuestions,
} from "@/redux/features/quiz/quizSlice";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@repo/ui";

const PreviewQuizSubmission = () => {
  const answeredQuestions = useAppSelector(selectAnsweredQuestions);
  const questions = useAppSelector(selectQuizQuestions);
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Review Before Final Submission</h3>
      <div className="divide-y *:py-2">
        {questions.map((quiz, i) => (
          <div>
            {/* quiz */}
            <p>
              {" "}
              {i + 1}. {quiz.question}
            </p>

            {/* answer */}
            <div className="mt-3 flex flex-col space-y-3">
              {quiz.options.map((option, i) => (
                <Button
                  key={i}
                  disabled={true}
                  variant={
                    answeredQuestions.some(
                      (x) => quiz.id === x.questionId && x.answer === option
                    )
                      ? "default"
                      : "outline"
                  }
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewQuizSubmission;
