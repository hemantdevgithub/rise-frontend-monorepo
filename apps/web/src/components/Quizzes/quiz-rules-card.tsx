import { startQuiz } from "@/redux/features/quiz/quizSlice";
import { useAppDispatch } from "@/redux/hooks";
import { TQuizQuestion } from "@/types/quiz.type";
import { Button } from "@repo/ui";
import {
    Award,
    Check,
    HelpCircle,
    RotateCcw,
    Target,
    Timer,
} from "lucide-react";
import { FC } from "react";

type TQuizRulesCardProps = {
  timer: string;
  title: string;
  questions: TQuizQuestion[];
  description: string;
};

const rules = [
  {
    Icon: Timer,
    heading: "Time per question",
    subHeading:
      "A timer will be displayed on the top right. Every Question can have different time. ",
  },
  {
    Icon: Target,
    heading: "Point Calculation",
    subHeading:
      "5 points per correct answer. No negative marking for wrong answers.",
  },
  {
    Icon: HelpCircle,
    heading: "Question Types",
    subHeading:
      "Multiple choice, true/false, and short answer questions will be included.",
  },
  {
    Icon: Award,
    heading: "Passing Criteria",
    subHeading: "You need to score at least 70% to pass the quiz.",
  },
  {
    Icon: RotateCcw,
    heading: "Review Options",
    subHeading: "You can review your answers before final submission.",
  },
];

const QuizRulesCard: FC<TQuizRulesCardProps> = ({
  timer,
  title,
  questions,
  description,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xl font-semibold">{title}</h4>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-muted-foreground">
          <Timer className="h-4 w-4" />
          <span className="text-sm font-medium">{timer}</span>
        </div>
      </div>

      {/* rules */}

      <div className="grid grid-cols-2 gap-3">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="group flex items-start gap-4 rounded-lg border bg-muted/50 p-4 transition-colors"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <rule.Icon className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <p className="font-medium leading-none">{rule.heading}</p>
              <p className="text-sm text-muted-foreground">{rule.subHeading}</p>
            </div>
          </div>
        ))}
      </div>
      <Button
        className="w-full"
        variant={"default"}
        disabled={questions.length === 0}
        onClick={() => dispatch(startQuiz(questions))}
      >
        <Check className="mr-2 h-4 w-4" />
        Got it!
      </Button>
    </div>
  );
};

export default QuizRulesCard;
