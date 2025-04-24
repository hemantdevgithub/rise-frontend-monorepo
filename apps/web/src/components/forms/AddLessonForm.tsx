/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAddLessonMutation } from "@/redux/features/lesson/lessonApi";
import { addCreatedLessonId } from "@/redux/features/lesson/lessonSlice";
import { onClose, selectModalPayload } from "@/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addLessonValidationSchema } from "@/schemas/lessonValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormField, FormItem, FormLabel, FormMessage, Input } from "@repo/ui";
import JoditEditor from "jodit-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import ImageContainer from "../Shared/ImageContainer";

const AddLessonForm = () => {
  const selectedModal = useAppSelector(selectModalPayload);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [addLesson, { isLoading }] = useAddLessonMutation();
  const form = useForm<z.infer<typeof addLessonValidationSchema>>({
    resolver: zodResolver(addLessonValidationSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });
  const config = useMemo(
    () => ({
      readonly: false,
      height: "200px",
    }),
    []
  );

  const onLessonFormSubmit = async (
    data: z.infer<typeof addLessonValidationSchema>
  ) => {
    const toastId = toast.loading("Creating.", { duration: 2000 });
    if (!thumbnailFile) {
      return toast.error("Please provide a thumbnail file");
    }

    try {
      const formData = new FormData();

      // Append thumbnail file
      formData.append("thumbnail", thumbnailFile);

      // Append other form fields dynamically
      Object.entries(data)?.forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response: any = await addLesson(formData).unwrap();
      if (response?.success) {
        toast.success("Lesson added successfully", { id: toastId });

        if (selectedModal === "lesson") {
          dispatch(addCreatedLessonId(response?.data?.data?.id));
          dispatch(onClose());
        }
        form.reset();
        navigate("/lessons");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onLessonFormSubmit)}
        className="mx-auto w-full space-y-4 px-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                Title
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

        <div className="space-y-2">
          <p className="font-roboto text-sm font-semibold">Upload Thumbnail</p>
          <ImageContainer setThumbnail={setThumbnailFile} />
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-roboto font-semibold">
                  Category
                </FormLabel>
                <Select {...field} onValueChange={(e) => field.onChange(e)}>
                  <SelectTrigger className="focus:ring-0 capitalize">
                    <SelectValue placeholder="Choose Category" />
                  </SelectTrigger>
                  <SelectContent className="focus:ring-0">
                    <SelectGroup>
                      {Categories.map((category) => (
                        <SelectItem
                          className="capitalize"
                          key={category}
                          value={category}
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* Date Just For Design Purpose */}
          <FormItem>
            <FormLabel className="font-roboto text-sm font-semibold">
              Created on (Automatically take on Published date)
            </FormLabel>
            <Input
              value={new Date().toDateString()}
              placeholder="Enter Title"
              className="bg-white"
            />
            <FormMessage />
          </FormItem>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                Content
              </FormLabel>
              <JoditEditor
                value={field.value || ""}
                config={config}
                onBlur={(content: string) => field.onChange(content)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-5">
          <Button disabled={isLoading} className="px-10 font-roboto">
            Publish
          </Button>
          <Button className="bg-white px-10 font-roboto text-text ring-2 ring-gray-300 hover:bg-gray-100">
            Save Draft
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddLessonForm;
