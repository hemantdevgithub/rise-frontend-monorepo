import { useCreateQAndAudioMutation } from "@/redux/features/qAndAAudio/qAndAAudio";
import { createQAndAValidationSchema } from "@/schemas/createQAndAValidationSchema";
import { TResponse } from "@/types/global.type";
import { TQAndA } from "@/types/qAndA.types";
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

const CreateQAndAudioPage = () => {
  const navigate = useNavigate();

  // api hooks
  const [createQAndA, { isLoading }] = useCreateQAndAudioMutation();

  const form = useForm<z.infer<typeof createQAndAValidationSchema>>({
    resolver: zodResolver(createQAndAValidationSchema),
  });

  const onSubmit = async (
    data: z.infer<typeof createQAndAValidationSchema>
  ) => {
    const toastId = toast.loading("Uploading Q And A Audio!", {
      duration: 2000,
    });
    const formData = new FormData();
    Object.entries(data).map(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response: TResponse<TQAndA> = await createQAndA(formData).unwrap();

      if (response.success) {
        toast.success(response.message || "Created Successfully.", {
          id: toastId,
        });
        navigate("/search");
      }
    } catch (error) {
      toast.error("Failed to create.", { id: toastId });
    }
  };
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto w-full space-y-4 px-5"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* title */}
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
                  Q And A Audio File
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
          <Button disabled={isLoading} type="submit">
            Create Q And A Audio
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateQAndAudioPage;
