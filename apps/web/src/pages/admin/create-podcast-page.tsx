import { useCreatePodcastMutation } from "@/redux/features/podcast/podcast-api";
import { createPodcastValidationSchema } from "@/schemas/podcastValidation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const CreatePodcastPage = () => {
  // api hooks
  const [createPodcast] = useCreatePodcastMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof createPodcastValidationSchema>>({
    resolver: zodResolver(createPodcastValidationSchema),
  });

  const onSubmit = async (
    data: z.infer<typeof createPodcastValidationSchema>
  ) => {
    const toastId = toast.loading("Creating podcast!", { duration: 2000 });
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await createPodcast(formData).unwrap();

      if (response.success) {
        toast.success("Podcast created successfully.", { id: toastId });
        navigate("/search");
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full space-y-4 px-5"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* category */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="font-roboto text-sm font-semibold">
                  Title
                </FormLabel>
                <Input
                  placeholder="Enter title"
                  className="h-[40px]"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-roboto text-sm font-semibold">
                  Podcast File
                </FormLabel>
                <Input
                  type="file"
                  accept="audio/*"
                  placeholder="Enter title"
                  className="h-[40px]"
                  onChange={(e) => {
                    if (e.target.files?.length) {
                      field.onChange(e.target.files[0]);
                    }
                  }}
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
                  Description
                </FormLabel>
                <Input
                  placeholder="Enter description"
                  className="h-[40px]"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />{" "}
        </div>
        <div className="flex justify-end">
          <Button type="submit">Create Podcast</Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePodcastPage;
