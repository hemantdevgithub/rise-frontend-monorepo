import { selectUser } from "@/redux/features/auth/authSlice";
import { useAddCommentMutation } from "@/redux/features/comment/commentApi";
import { useAppSelector } from "@/redux/hooks";
import { commentValidationSchema } from "@/schemas/commentValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormField, FormItem, Input } from "@repo/ui";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AddCommentsForm = ({ contentId }: { contentId?: string }) => {
  const user = useAppSelector(selectUser);
  const [addComment, { isLoading }] = useAddCommentMutation();
  const form = useForm<z.infer<typeof commentValidationSchema>>({
    resolver: zodResolver(commentValidationSchema),
    defaultValues: {
      comment: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof commentValidationSchema>) => {
    if (!user) {
      return toast.error("Please Login First");
    }
    if (!contentId) {
      return toast.error("Something is wrong");
    }
    try {
      const response: any = await addComment({ ...data, contentId });

      if (response.data.success) {
        toast.success("Comment added successfully");
        form.reset();
      }
    } catch (error) {
      toast.error("Something went wrong while adding comment");
      form.reset();
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <Input
                placeholder="Enter Your Comment"
                className="h-[40px]"
                {...field}
              />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button disabled={isLoading} className="px-10">
            Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddCommentsForm;
