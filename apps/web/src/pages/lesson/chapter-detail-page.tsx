import QuizCard from "@/components/Quizzes/QuizCard";
import ChapterDetailCard from "@/components/Shared/ChapterDetailCard";
import { useGetChapterDetailBySlugQuery } from "@/redux/features/chapter/chapterApi";
import { useGetQuizzesByChapterIdQuery } from "@/redux/features/quiz/quizApi";
import { TChapter } from "@/types/lesson.type";
import { TQuiz } from "@/types/quiz.type";
import { TiDocumentText } from "react-icons/ti";

import { Button } from "@repo/ui";
import React from "react";
import { FaAmericanSignLanguageInterpreting } from "react-icons/fa";
import { IoVideocam } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { LessonProgressBar } from "./lesson-progress-bar";

const ChapterDetailPage: React.FC = () => {
  const { chapterSlug } = useParams();

  const { data: chapterData, isFetching } = useGetChapterDetailBySlugQuery(
    chapterSlug,
    { skip: !chapterSlug }
  );
  const chapter = chapterData?.data as TChapter;

  const { data: quizData, isError: isQuizError } =
    useGetQuizzesByChapterIdQuery(chapter?.id, {
      skip: isFetching || !chapter?.id,
    });

  const quizzes = (quizData?.data as TQuiz[]) || [];
  return (
    <div className="divide-y font-poppins *:px-5 *:py-3 dark:bg-secondary">
      <div>
        <LessonProgressBar lessonId={chapter?.lessonId} />
      </div>
      <div className="flex gap-5 px-5 py-3">
        <Button size={"sm"} variant={"outline"} className="flex gap-1">
          <TiDocumentText size={18} />
          <span>Text</span>
        </Button>
        <Button size={"sm"} variant={"outline"} className="flex gap-1">
          <IoVideocam size={18} />
          <span>Video</span>
        </Button>
        <Button size={"sm"} variant={"outline"} className="flex gap-1">
          <FaAmericanSignLanguageInterpreting size={18} />
          <span>Sign</span>
        </Button>
      </div>
      <div className="px-5">
        <ChapterDetailCard data={chapter} />
      </div>
      {/* <ScrollArea className="h-[calc(100vh-4rem)] p-6 pb-16">
      </ScrollArea> */}
      {!isQuizError && quizzes.length > 0 && (
        <div className="mt-5 space-y-5 px-5">
          <h4 className="font-semibold">Quizzes For {chapter?.chapterTitle}</h4>
          <div className="grid gap-5 lg:grid-cols-3">
            {quizzes.map((quiz, i) => (
              <QuizCard key={i} quiz={quiz} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterDetailPage;
