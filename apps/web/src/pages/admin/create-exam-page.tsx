import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { useCreateExamMutation } from "@/redux/features/exam/examApi";
import { useGetLessonWithoutExamQuery } from "@/redux/features/lesson/lessonApi";
import { createExamValidationSchema } from "@/schemas/quizValidation";
import { TLessonWithChapter } from "@/types/lesson.type";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from "@repo/ui";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type TExamForm = z.infer<typeof createExamValidationSchema>;

export function CreateExamPage() {
  const [open, setOpen] = useState(false);
  const form: UseFormReturn<TExamForm> = useForm<TExamForm>({
    resolver: zodResolver(createExamValidationSchema),
    defaultValues: {},
  });
  const navigate = useNavigate();

  const { data: lessonData } = useGetLessonWithoutExamQuery(undefined);
  const lessons = lessonData?.data as TLessonWithChapter[];
  // Mutations
  const [createExam, { isLoading }] = useCreateExamMutation();

  const onSubmit = async (data: TExamForm) => {
    const toastId = toast.loading("Creating exam...", { duration: 2000 });
    try {
      const response: any = await createExam(data).unwrap();
      if (response.success) {
        toast.success("Exam created successfully", { id: toastId });
        form.reset({});
        navigate(
          `/admin/dashboard/create-questions?examId=${response.data.id}&type=exam`
        );
      }
    } catch (error) {
      toast.error("Unable to create exam", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="lessonId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Select Lesson in which you wanted to add exam (You can add only
                one exam to a lesson)
              </FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "flex w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? lessons.find((lesson) => lesson.id === field.value)
                            ?.title
                        : "Select Lesson"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search for lesson..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No Lesson found.</CommandEmpty>
                      <CommandGroup>
                        {lessons?.map((lesson) => (
                          <CommandItem
                            value={lesson.title}
                            key={lesson.id}
                            onSelect={() => {
                              form.setValue("lessonId", lesson.id);
                              setOpen(false);
                            }}
                          >
                            {lesson.title}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                The title of Exam
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
                Short Description of this exam
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

        <div className="flex justify-end">
          <Button disabled={isLoading} type="submit">
            Create Exam
          </Button>
        </div>
      </form>
    </Form>
  );
}
