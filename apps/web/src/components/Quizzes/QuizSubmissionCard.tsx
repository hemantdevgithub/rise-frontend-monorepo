import { selectAnsweredQuestions } from "@/redux/features/quiz/quizSlice";
import { useSubmitQuizAttemptMutation } from "@/redux/features/quizAttempt/quizAttemptApi";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "@repo/ui";
import { ReactNode } from "react";
import { toast } from "sonner";
import PreviewQuizSubmission from "./PreviewQuizSubmission";
import QuizSubmissionResult from "./QuizSubmissionResult";

const QuizSubmissionCard = ({ quizId }: { quizId: string }) => {
  const answeredQuestions = useAppSelector(selectAnsweredQuestions);
  const [submitAnswers, { data, isLoading }] = useSubmitQuizAttemptMutation();

  const onSubmit = async () => {
    const toastId = toast.loading("Submitting quiz answers", {
      duration: 3000,
    });

    try {
      const response = await submitAnswers({
        quizId: quizId,
        answers: answeredQuestions,
      }).unwrap();
      if (response.success) {
        toast.success("Quiz answer submitted", { id: toastId });
      }
    } catch (error) {
      toast.error("Unable to submit quiz answer", { id: toastId });
    }
  };

  let content: ReactNode;
  if (isLoading) content = <p>Loading...</p>;
  if (!isLoading && !data) content = <PreviewQuizSubmission />;
  if (!isLoading && data) content = <QuizSubmissionResult result={data.data} />;

  return (
    <div className="max-h-[500px] space-y-4 overflow-y-scroll p-3 pt-0">
      {content}
      <div className="flex justify-end">
        {!data && (
          <Button disabled={isLoading} onClick={onSubmit} variant={"outline"}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default QuizSubmissionCard;
