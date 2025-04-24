/* eslint-disable @typescript-eslint/no-explicit-any */
import CreateSegmentModalForm from "@/components/forms/create-segment-modal-form";
import {
  useAddLessonMutation,
  useGetAllLessonSegmentsQuery,
} from "@/redux/features/lesson/lessonApi";
import { addLessonValidationSchema } from "@/schemas/lessonValidationSchema";
import { TLabelValuePair } from "@/types";
import { TLessonSegment } from "@/types/lesson.type";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Textarea,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const CreateLessonPage = () => {
  const navigate = useNavigate();
  const [addLesson, { isLoading }] = useAddLessonMutation();
  const form = useForm<z.infer<typeof addLessonValidationSchema>>({
    resolver: zodResolver(addLessonValidationSchema),
    defaultValues: {},
  });
  const { data: segmentData, isFetching } =
    useGetAllLessonSegmentsQuery(undefined);

  const segments: TLabelValuePair[] =
    segmentData?.data?.map((item: TLessonSegment) => ({
      label: item?.title,
      value: item?.id,
    })) || [];

  const onLessonFormSubmit = async (
    data: z.infer<typeof addLessonValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });

    try {
      const formData = new FormData();
      // Append other form fields dynamically
      Object.entries(data)?.forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response: any = await addLesson(formData).unwrap();
      if (response?.success) {
        toast.success("Lesson added successfully", { id: toastId });
        form.reset();
        navigate(`/admin/dashboard/create-chapter`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLessonFormSubmit)}
        className="mx-auto w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="segmentId"
          render={({ field }) => (
            <FormItem className="relative flex-1">
              <FormLabel>Select Segment of Type</FormLabel>
              <Select
                disabled={isFetching}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <div className="flex h-9 items-center gap-2">
                    <SelectTrigger>
                      <SelectValue placeholder="Select Segment" />
                    </SelectTrigger>
                    <CreateSegmentModalForm />
                  </div>
                </FormControl>
                <SelectContent>
                  {segments.length > 0 ? (
                    segments?.map((item) => (
                      <SelectItem key={item?.value} value={item?.value}>
                        {item?.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="py-1 text-center text-sm">
                      No Segment Found
                    </div>
                  )}
                </SelectContent>
              </Select>
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
                The title of new lesson
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
              <FormLabel>Upload lesson thumbnail</FormLabel>
              <ImageUploader onFileChange={(file) => field.onChange(file)} />
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
                Short Description of this lesson (Optional)
              </FormLabel>
              <Textarea
                {...field}
                className="h-[150px]"
                placeholder="Write here..."
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-5">
          <Button disabled={isLoading} className="px-10 font-roboto">
            Create
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateLessonPage;
