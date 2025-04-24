import { TQuiz } from "@/types/quiz.type";
import { Button } from "@repo/ui";
import { useNavigate } from "react-router";

const QuizCard = ({ quiz }: { quiz: TQuiz }) => {
  const { title, description, id } = quiz || {};
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border bg-background p-4 text-foreground shadow-sm">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-xs">{description}</p>
      <Button
        onClick={() => navigate(`/quizzes/attempt/${id}`)}
        variant={"outline"}
        size={"sm"}
        className="w-full"
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default QuizCard;
