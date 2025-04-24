import { Categories } from "@/constants/global.constant";
import { useAddResearchAndDevelopmentMutation } from "@/redux/features/researchAndDevelopment/researchAndDevelopmentApi";
import { addLessonValidationSchema } from "@/schemas/lessonValidationSchema";
import { addResearchAndDevelopmentValidationSchema } from "@/schemas/researchAndDevelopmentValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button, Form, FormField, FormItem, FormLabel, FormMessage, Input, Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@repo/ui";
import JoditEditor from "jodit-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import ImageContainer from "../Shared/ImageContainer";

const AddResearchAndDevelopmentForm = () => {
  const navigate = useNavigate();
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [addResearchAndDevelopment, { isLoading }] =
    useAddResearchAndDevelopmentMutation();
  const form = useForm<
    z.infer<typeof addResearchAndDevelopmentValidationSchema>
  >({
    resolver: zodResolver(addLessonValidationSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
    },
  });
  const config = useMemo(
    () => ({
      readonly: false,
      height: "200px",
    }),
    []
  );

  const onResearchAndDevelopmentFormSubmit = async (
    data: z.infer<typeof addResearchAndDevelopmentValidationSchema>
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
      const response: any = await addResearchAndDevelopment(formData).unwrap();
      if (response?.success) {
        toast.success("Research And Development added successfully", {
          id: toastId,
        });

        form.reset();
        navigate(
          "rise/homeresearch-and-developments/research-and-developments"
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onResearchAndDevelopmentFormSubmit)}
        className="mx-auto w-full space-y-4 px-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                RND Title
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
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-roboto text-sm font-semibold">
                  Category
                </FormLabel>
                <Select {...field} onValueChange={(e) => field.onChange(e)}>
                  <SelectTrigger className="capitalize focus:ring-0">
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
          />

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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                Content
              </FormLabel>
              <JoditEditor
                value={field.value}
                config={config}
                onBlur={(content: string) => field.onChange(content)}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-5">
          <Button
            disabled={isLoading}
            className="bg-tommyBlue px-10 font-roboto"
          >
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

export default AddResearchAndDevelopmentForm;
