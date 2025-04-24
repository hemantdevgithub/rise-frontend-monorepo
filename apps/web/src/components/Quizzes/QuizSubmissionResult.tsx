import { cn } from "@/lib/utils";
import { TQuizAttempt } from "@/types/quiz.type";
import { Button } from "@repo/ui";
import { ClassValue } from "clsx";
import { CheckCircle } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
type TQuizSubmissionResultProps = {
  result: TQuizAttempt;
};
const QuizSubmissionResult: FC<TQuizSubmissionResultProps> = ({ result }) => {
  const achievedMarkPercentage = (result.score / result.totalScore) * 100;
  const resultColor: ClassValue =
    achievedMarkPercentage > 80
      ? "green-500"
      : achievedMarkPercentage > 60
        ? "blue-500"
        : achievedMarkPercentage > 40
          ? "orange-500"
          : achievedMarkPercentage > 20
            ? "red-500"
            : achievedMarkPercentage > 0
              ? "red-700"
              : "black";

  return (
    <div>
      {/* result overview */}
      <div className="relative flex justify-center p-4">
        {/* check icon */}
        <div className="absolute top-2 rounded-full bg-background px-[3px]">
          <CheckCircle size={20} className={`text-${resultColor}`} />
        </div>
        <div
          className={cn(
            "h-[200px] w-[200px] rounded-full border-[5px] p-3",
            `border-${resultColor}`
          )}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full bg-muted-foreground">
            <h1 className={`text-${resultColor} text-3xl`}>
              {result?.score}/{result?.totalScore}
            </h1>
          </div>
        </div>
      </div>

      {/* text */}
      <div className="space-y-2 text-center">
        <h3
          className={cn(
            "text-3xl font-semibold",
            `text-${resultColor} dark:text-white`
          )}
        >
          {achievedMarkPercentage > 80
            ? "Excellent"
            : achievedMarkPercentage > 60
              ? "Good"
              : achievedMarkPercentage > 40
                ? "Average"
                : achievedMarkPercentage > 20
                  ? "Poor"
                  : achievedMarkPercentage > 0
                    ? "Very Poor"
                    : "Fail"}
        </h3>
        <p>You have completed the Quiz and achieve {result?.score} Marks!</p>
        <Link to={"/lessons"} className="block">
          <Button variant={"outline"} size={"sm"}>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizSubmissionResult;
