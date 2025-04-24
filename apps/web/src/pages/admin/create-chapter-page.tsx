"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import JoditEditor from "jodit-react";
import { useMemo, useRef } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import SkeletonCard from "@/components/Shared/SkeletonCard";
import { useCreateChapterMutation } from "@/redux/features/chapter/chapterApi";
import { useGetLessonsQuery } from "@/redux/features/lesson/lessonApi";
import { createChapterValidationSchema } from "@/schemas/lessonValidationSchema";
import { TLessonWithChapter } from "@/types/lesson.type";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageUploader,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { useNavigate } from "react-router";

type TChapterFormType = z.infer<typeof createChapterValidationSchema>;

const CreateChapterPage = () => {
  const form: UseFormReturn<TChapterFormType> = useForm<TChapterFormType>({
    resolver: zodResolver(createChapterValidationSchema),
    defaultValues: {},
  });
  const editorRef = useRef<any>(null);
  const navigate = useNavigate();

  const { data: lessonData, isFetching } = useGetLessonsQuery(undefined);
  const [createChapter, { isLoading }] = useCreateChapterMutation();
  const lessons = lessonData?.data as TLessonWithChapter[];

  const config = useMemo(
    () => ({
      readonly: false,
      height: "200px",
    }),
    []
  );

  const resetForm = () => {
    form.reset({
      lessonId: "",
      chapterTitle: "",
      content: "",
    });
    if (editorRef.current) {
      editorRef.current.value = "";
    }
  };

  const onSubmit = async (data: TChapterFormType) => {
    const toastId = toast.loading("Adding chapter to that lesson");
    try {
      const formData = new FormData();

      Object.entries(data)?.forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response: any = await createChapter(formData).unwrap();
      if (response.success) {
        toast.success("Chapter added successfully", { id: toastId });
        resetForm();
        navigate("/search");
      }
    } catch (error) {
      toast.error("Unable to add chapter", { id: toastId });
    }
  };

  if (isFetching) {
    return <SkeletonCard />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="lessonId"
          render={({ field }) => (
            <FormItem className=" ">
              <FormLabel>Select Lesson</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="bg-background">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Lessons" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {lessons?.map((lesson: TLessonWithChapter) => (
                    <SelectItem
                      className="capitalize"
                      key={lesson.id}
                      value={lesson.id}
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
          name="chapterTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                Chapter Title
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
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload chapter image (Optional)</FormLabel>
              <ImageUploader onFileChange={(file) => field.onChange(file)} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                Content
              </FormLabel>
              <JoditEditor
                ref={editorRef}
                value={field.value}
                config={config}
                onBlur={(newContent: string) => field.onChange(newContent)}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-5">
          <Button
            type="submit"
            disabled={isLoading}
            className="px-10 font-roboto"
          >
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateChapterPage;
