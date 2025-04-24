"use client";

import { Alert, AlertDescription, AlertTitle } from "@repo/ui";
import { useGetAllExamsQuery } from "@/redux/features/exam/examApi";
import {
  useAddQuestionToQuizMutation,
  useGetAllQuizQuery,
} from "@/redux/features/quiz/quizApi";
import { createQuestionValidationSchema } from "@/schemas/quizValidation";
import { TExam } from "@/types/exam.type";
import { TQuiz } from "@/types/quiz.type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input, RadioGroup, RadioGroupItem, Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@repo/ui";
import { Info, X } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

type TCreateQuestionForm = z.infer<typeof createQuestionValidationSchema>;

const CreateQuestionPage = () => {
  const { search } = useLocation();
  const useQuery = () => {
    return new URLSearchParams(search);
  };
  const quizId = useQuery().get("quizId");
  const examId = useQuery().get("examId");
  const type = useQuery().get("type");
  const navigate = useNavigate();
  const form: UseFormReturn<TCreateQuestionForm> = useForm<TCreateQuestionForm>(
    {
      resolver: zodResolver(createQuestionValidationSchema),
      defaultValues: {
        quizId: quizId || "",
        timer: undefined,
        options: [],
        type: type === "exam" ? "exam" : type === "quiz" ? "quiz" : undefined,
        examId: examId || "",
      },
    }
  );

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });
  const options = form.watch("options");

  // queries
  const { data: quizData } = useGetAllQuizQuery(undefined, {
    skip: form.watch("type") !== "quiz",
  });
  const { data: examData } = useGetAllExamsQuery(undefined, {
    skip: form.watch("type") !== "exam",
  });
  const quizzes = (quizData?.data as TQuiz[]) || [];
  const exams = (examData?.data as TExam[]) || [];
  // mutations
  const [addQuestion, { isLoading }] = useAddQuestionToQuizMutation();

  const resetForm = () => {
    form.reset({
      quizId: quizId || "",
      question: "",
      timer: 0,
      options: [],
    });
  };

  const onSubmit = async (data: TCreateQuestionForm) => {
    const toastId = toast.loading("Add question to quiz", { duration: 2000 });

    const { options, ...rest } = data;
    const newData = {
      ...rest,
      options: options.map((x) => x.value),
    };
    try {
      const response = await addQuestion(newData).unwrap();
      if (response.success) {
        toast.success("Question added successfully", { id: toastId });
        resetForm();
        navigate("/search");
      }
    } catch (error) {
      toast.error("Unable to add questions", { id: toastId });
    }
  };

  useEffect(() => {
    if (quizId) {
      form.setValue("quizId", quizId);
    }
  }, [quizId, form]);
  console.log(form.watch("type"));
  return (
    <div className="flex h-full w-full items-center justify-center font-poppins">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto w-[70%] space-y-5 rounded-xl border bg-background p-4 dark:bg-secondary"
        >
          <h3 className="text-xl font-semibold">Add Question</h3>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Select where you want to add question</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-3"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="exam" />
                      </FormControl>
                      <FormLabel className="font-normal">In an exam</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="quiz" />
                      </FormControl>
                      <FormLabel className="font-normal">In a quiz</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("type") === "exam" ? (
            <FormField
              control={form.control}
              name="examId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Select exam in which you want to add questions
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Exam" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {exams.map((quiz, i) => (
                        <SelectItem
                          key={i}
                          value={quiz.id}
                          className="capitalize"
                        >
                          {quiz.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : form.watch("type") === "quiz" ? (
            <FormField
              control={form.control}
              name="quizId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>
                    Select quiz in which you want to add questions
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Quiz" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {quizzes.map((quiz, i) => (
                        <SelectItem
                          key={i}
                          value={quiz.id}
                          className="capitalize"
                        >
                          {quiz.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-roboto text-sm font-semibold">
                    Question
                  </FormLabel>
                  <Input
                    placeholder="Enter Question"
                    className="h-[40px]"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="timer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-roboto text-sm font-semibold">
                    Timer
                  </FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter Time"
                    className="h-[40px]"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="rounded-xl border p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Create Options</h3>
                {options.length < 2 && (
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Create Options</AlertTitle>
                    <AlertDescription>
                      Please add at least two option{" "}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <Button
                type="button"
                onClick={() => append({ value: `Option ${fields.length + 1}` })}
                className="text-primary-foreground"
              >
                Add Option
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="mb-2 flex items-center space-x-2"
                >
                  <FormField
                    control={form.control}
                    name={`options.${index}.value`}
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder={`Option ${index + 1}`}
                            className=""
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => remove(index)}
                    disabled={fields.length <= 2}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          {options.length > 0 && (
            <FormField
              control={form.control}
              name="correctOption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correct Option</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select correct option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map(
                        (option, index) =>
                          option.value && (
                            <SelectItem key={index} value={option.value}>
                              {option.value}
                            </SelectItem>
                          )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-primary-foreground"
          >
            Create Question
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateQuestionPage;
