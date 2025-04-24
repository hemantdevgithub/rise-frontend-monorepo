import { Categories } from "@/constants/global.constant";
import { useCreateArticleMutation } from "@/redux/features/articles/articleApi";
import { createArticleValidationSchema } from "@/schemas/articleValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  ImageUploader,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@repo/ui";
import JoditEditor from "jodit-react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

const CreateArticlePage = () => {
  const navigate = useNavigate();
  const [createArticle, { isLoading }] = useCreateArticleMutation();
  const form = useForm<z.infer<typeof createArticleValidationSchema>>({
    resolver: zodResolver(createArticleValidationSchema),
    defaultValues: {
      title: "",
      content: "",
      category: "",
      subCategory: "",
    },
  });
  const config = useMemo(
    () => ({
      readonly: false,
      height: "200px",
    }),
    []
  );

  const onSubmit = async (
    data: z.infer<typeof createArticleValidationSchema>
  ) => {
    const toastId = toast.loading("Adding journal.", {
      duration: 3000,
    });

    try {
      const formData = new FormData();
      // Append other form fields dynamically
      Object.entries(data)?.forEach(([key, value]) => {
        formData.append(key, value);
      });
      const response: any = await createArticle(formData).unwrap();
      if (response?.success) {
        toast.success("Journal added successfully", {
          id: toastId,
        });

        form.reset();
        navigate("/search");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", {
        id: toastId,
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <ImageUploader onFileChange={(file) => field.onChange(file)} />
              <FormMessage />
            </FormItem>
          )}
        />
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

export default CreateArticlePage;
