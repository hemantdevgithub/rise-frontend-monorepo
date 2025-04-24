import { Categories } from "@/constants/global.constant";
import { useCreateWebinarMutation } from "@/redux/features/webinar/webinarApi";
import { createWebinarValidationSchema } from "@/schemas/webinarValidation";
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
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import ImageContainer from "../Shared/ImageContainer";

const CreateWebinarForm = () => {
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [createWebinar, { isLoading }] = useCreateWebinarMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createWebinarValidationSchema>>({
    resolver: zodResolver(createWebinarValidationSchema),
  });
  const options = [
    { id: 1, label: "Life Skills", value: "life-skills" },
    { id: 2, label: "Entrepreneurship", value: "entrepreneurship" },
    { id: 3, label: "Leadership", value: "leadership" },
  ];
  const config = useMemo(
    () => ({
      readonly: false,
      height: "200px",
    }),
    []
  );

  const onSubmit = async (
    data: z.infer<typeof createWebinarValidationSchema>
  ) => {
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
      const response: any = await createWebinar(formData).unwrap();
      if (response?.success) {
        toast.success("Webinar Created successfully");

        form.reset();
        navigate("/portfolio/offices/root-office/webinars");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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

          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-roboto text-sm font-semibold">
                  Sub Category
                </FormLabel>
                <Select {...field} onValueChange={(e) => field.onChange(e)}>
                  <SelectTrigger className="focus:ring-0">
                    <SelectValue placeholder="Choose Sub Category" />
                  </SelectTrigger>
                  <SelectContent className="focus:ring-0">
                    <SelectGroup>
                      {options.map((item) => (
                        <SelectItem key={item.id} value={item.value}>
                          {item.label}
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
        <div className="space-y-2">
          <p className="font-roboto text-sm font-semibold">
            Upload Thumbnail Image
          </p>
          <ImageContainer setThumbnail={setThumbnailFile} />
        </div>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-roboto text-sm font-semibold">
                Description
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
        {/* <div
          className={`bg-[#F1F1F1] p-5 rounded-md ${fields.length > 0 && "space-y-5"}`}
        >
          <div className="flex justify-between items-center">
            <p className="text-sm font-roboto font-semibold">Contents:</p>
            <Button
              type="button"
              variant={"outline"}
              className="text-xs"
              onClick={() => append({ title: "", description: "", image: "" })}
            >
              Add Content
            </Button>
          </div>
          <div className="space-y-3">
            {fields.length > 0 ? (
              fields.map((content, index) => (
                <FormItem key={content.id} className="">
                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      placeholder="Enter Content Title"
                      className="bg-white h-[40px] col-span-2"
                      {...form.register(`contents.${index}.title`)}
                    />
                    <Input
                      className="bg-background h-[40px]"
                      id="image"
                      type="file"
                      {...form.register(`contents.${index}.image`)}
                    />
                  </div>
                  <Textarea
                    {...form.register(`contents.${index}.description`)}
                    className="bg-white focus:ring-1 h-[100px] focus:ring-blue-400"
                    placeholder="Enter Content Description"
                  />

                  <div className="flex justify-end">
                    <Button
                      variant={"destructive"}
                      type="button"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </FormItem>
              ))
            ) : (
              <h3 className="text-center ">No Contents Added</h3>
            )}
          </div>
        </div> */}
        <div className="flex justify-end gap-5">
          <Button disabled={isLoading} className="px-10 font-roboto">
            Publish
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateWebinarForm;
