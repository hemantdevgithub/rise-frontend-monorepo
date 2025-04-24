import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { useGetChaptersByLessonIdQuery } from "@/redux/features/chapter/chapterApi";
import { useGetLessonsQuery } from "@/redux/features/lesson/lessonApi";
import { useCreateQuizMutation } from "@/redux/features/quiz/quizApi";
import { createQuizValidationSchema } from "@/schemas/quizValidation";
import { TChapter, TLessonWithChapter } from "@/types/lesson.type";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, Textarea
} from "@repo/ui";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type TQuizForm = z.infer<typeof createQuizValidationSchema>;

const quizTypes = ["lesson", "unified"];
const quizRedo = ["yes", "no"];
const quizHasCert = ["yes", "no"];

export function CreateQuizPage() {
  const form: UseFormReturn<TQuizForm> = useForm<TQuizForm>({
    resolver: zodResolver(createQuizValidationSchema),
    defaultValues: {},
  });
  const navigate = useNavigate();
  const quizType = form.watch("type") || "";
  const lessonId = form.watch("lessonId") || "";

  // Conditionally trigger lesson and chapter data fetching only if quizType is "lesson"
  const { data: lessonData } = useGetLessonsQuery(undefined, {
    skip: quizType !== "lesson",
  });
  const { data: chapterData } = useGetChaptersByLessonIdQuery(lessonId, {
    skip: !lessonId || quizType !== "lesson",
  });

  const lessons = useMemo(
    () => lessonData?.data as TLessonWithChapter[],
    [lessonData]
  );
  const chapters = useMemo(
    () => (chapterData?.data as TChapter[]) || [],
    [chapterData]
  );

  // Mutations
  const [addQuiz, { isLoading }] = useCreateQuizMutation();

  const onSubmit = async (data: TQuizForm) => {
    const { hasCertificate, redoOption, ...rest } = data;
    const newData = {
      ...rest,
      hasCertificate: hasCertificate === "yes",
      redoOption: redoOption === "yes",
    };

    const toastId = toast.loading("Creating quiz...", { duration: 2000 });
    try {
      const response: any = await addQuiz(newData).unwrap();
      if (response.success) {
        toast.success("Quiz created successfully", { id: toastId });
        form.reset({});
        navigate(
          `/admin/dashboard/create-questions?quizId=${response.data.id}&type=quiz`
        );
      }
    } catch (error) {
      toast.error("Unable to create quiz", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>For what you want to upload quiz</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select quiz type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {quizTypes.map((t, i) => (
                    <SelectItem key={i} value={t} className="capitalize">
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Show lesson and chapter fields only if quizType is "lesson" */}
        {quizType === "lesson" && (
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="lessonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Lesson</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lesson" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {lessons?.map((lesson) => (
                        <SelectItem
                          key={lesson.id}
                          value={lesson.id}
                          className="capitalize"
                        >
                          {lesson.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chapterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Chapter</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Chapter" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {chapters?.map((chapter) => (
                        <SelectItem
                          key={chapter.id}
                          value={chapter.id}
                          className="capitalize"
                        >
                          {chapter.chapterTitle}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                The title of quiz
              </FormLabel>
              <Input
                placeholder="Enter Title"
                className="h-[40px]"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                Short Description of this quiz
              </FormLabel>
              <Textarea
                {...field}
                className="h-[100px]"
                placeholder="Write here..."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="redoOption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz redo option</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select redo option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {quizRedo.map((t, i) => (
                      <SelectItem key={i} value={t} className="capitalize">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hasCertificate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quiz will have certificate?</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select certificate option" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {quizHasCert.map((t, i) => (
                      <SelectItem key={i} value={t} className="capitalize">
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">
            Create Quiz
          </Button>
        </div>
      </form>
    </Form>
  );
}
