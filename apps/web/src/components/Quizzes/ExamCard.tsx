import { TExam } from "@/types/exam.type";
import { Button } from "@repo/ui";

const ExamCard = ({ exam }: { exam: TExam }) => {
  const { title, description } = exam || {};
  return (
    <div className="flex flex-col justify-between gap-2 rounded-xl border bg-white p-4 shadow-sm">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-xs text-text">{description}</p>
      <Button
        // onClick={() => navigate(`/exam/attempt/${id}`)}
        variant={"outline"}
        size={"sm"}
        className="w-full"
      >
        Start Quiz
      </Button>
    </div>
  );
};

export default ExamCard;
