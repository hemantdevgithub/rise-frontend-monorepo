import { FC } from "react";

type TQuizDescriptionProps = {
  timer: number;
  title: string;
};
const QuizDescription: FC<TQuizDescriptionProps> = ({ timer, title }) => {
  return (
    <p className="text-sm text-[#343A40]">
      This {title} quiz estimates your level in just {timer} minutes, including
      reading skills (English grammar and vocabulary) and listening skills.
    </p>
  );
};

export default QuizDescription;
