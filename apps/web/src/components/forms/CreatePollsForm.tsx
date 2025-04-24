import { useCreatePollMutation } from "@/redux/features/poll/pollApi";
import { pollValidationSchema } from "@/schemas/pollValidationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
const CreatePollsForm = () => {
  const [createPoll, { isLoading }] = useCreatePollMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof pollValidationSchema>>({
    resolver: zodResolver(pollValidationSchema),
  });
  const onSubmit = async (data: z.infer<typeof pollValidationSchema>) => {
    try {
      const response: any = await createPoll(data);
      if (response?.data?.success) {
        toast.success("Poll Created Successfully");
        form.reset();
        navigate("/search");
      }
    } catch (error) {
      toast.error("Something went wrong while creating poll");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mx-auto space-y-5 px-5"
      >
        {/* <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="focus:ring-blue-500">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Poll</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Add Poll Content" />
              </FormControl>
              <p className="mt-2 font-roboto text-sm font-semibold text-red-600">
                For polls options will be "Yes", "No" and "May be". They will be
                auto populated during polls.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-tommyBlue px-10 font-roboto"
          >
            Create Poll
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreatePollsForm;
