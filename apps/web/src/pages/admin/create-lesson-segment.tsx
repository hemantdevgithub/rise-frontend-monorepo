import { SegmentTypes } from "@/constants/global.constant";
import { useCreateLessonSegmentMutation } from "@/redux/features/lesson/lessonApi";
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
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@repo/ui";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

export const formSchema = z.object({
  title: z.string(),
  type: z.enum(Object.values(SegmentTypes) as [string]),
});

type TFormType = z.infer<typeof formSchema>;
const CreateLessonSegment = () => {
  const form = useForm<TFormType>({
    resolver: zodResolver(formSchema),
  });
  const navigate = useNavigate();
  const [create, { isLoading }] = useCreateLessonSegmentMutation();
  const onSubmit = async (data: TFormType) => {
    try {
      const response = await create(data).unwrap();
      if (response.success) {
        toast.success("Segment added successfully!");
        navigate("/search");
        form.reset();
      }
    } catch (error) {
      toast.error("An error occurred!");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form className="space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Select Segment Type for Specific User</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-white">
                      <SelectValue placeholder="Select segment type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* <SelectItem value={UserRole.TIERPRENEUR}>
                      Tierpreneurs Trainings
                    </SelectItem>
                    <SelectItem value={UserRole.STARTUP}>
                      Startups & MSME Trainings
                    </SelectItem>
                    <SelectItem value={UserRole.IMPACT}>
                      Impact Trainings
                    </SelectItem>
                    <SelectItem value={UserRole.SUPPLY_CHAIN}>
                      Supply Chain Trainings
                    </SelectItem> */}
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
                  The title of new segment
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
          <div className="flex justify-end">
            <Button disabled={isLoading} type="submit">
              Save changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateLessonSegment;
