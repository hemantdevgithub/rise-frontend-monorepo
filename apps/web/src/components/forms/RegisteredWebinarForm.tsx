import { selectUser } from "@/redux/features/auth/authSlice";
import {
    useCheckUserWebinarRegistrationQuery,
    useRegisterInWebinarMutation,
} from "@/redux/features/webinar/webinarApi";
import { useAppSelector } from "@/redux/hooks";
import { registerWebinarValidationSchema } from "@/schemas/webinarValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormField, FormItem, FormLabel, Input } from "@repo/ui";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const RegisteredWebinarForm = ({ webinarId }: { webinarId: string }) => {
  const user = useAppSelector(selectUser);
  const [registerWebinar, { isLoading }] = useRegisterInWebinarMutation();
  const form = useForm<z.infer<typeof registerWebinarValidationSchema>>({
    resolver: zodResolver(registerWebinarValidationSchema),
  });

  const onSubmit = async (
    data: z.infer<typeof registerWebinarValidationSchema>
  ) => {
    if (!user) {
      return toast.error("Please Register First");
    }
    try {
      const response = await registerWebinar({
        ...data,
        webinarId,
        userId: user.userId,
      }).unwrap();
      if (response.success) {
        toast.success(response.message);
      }
    } catch (error) {
      toast.error("Something went wrong try again later");
    }
  };

  // Conditionally call useCheckUserWebinarRegistrationQuery only if needed
  const { data: webinarRegisterData } = useCheckUserWebinarRegistrationQuery(
    webinarId,
    { skip: !webinarId && !!user }
  );
  const isALreadyRegistered = !!webinarRegisterData?.data;
  console.log(isALreadyRegistered);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className="rounded-t-md bg-[#D61233] py-2 text-center font-roboto text-xl text-white">
          Register For Webinar
        </h3>
        <div className="w-full space-y-3 bg-[#EFEFEF] px-4 py-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1">
                  <FormLabel className="font-semibold">First Name*</FormLabel>
                  <Input
                    {...field}
                    className="border bg-white"
                    placeholder="First Name"
                  />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1">
                  <FormLabel className="font-semibold">Last Name*</FormLabel>
                  <Input
                    {...field}
                    className="border bg-white"
                    placeholder="Last Name"
                  />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            defaultValue={user?.email}
            render={({ field }) => (
              <FormItem>
                <div className="space-y-1">
                  <FormLabel className="font-semibold">
                    Email Address*
                  </FormLabel>
                  <Input
                    {...field}
                    className="border bg-white"
                    placeholder="Email Address"
                  />
                </div>
              </FormItem>
            )}
          />

          <p className="font-poppins text-xs text-text">
            We are committed to your privacy. Articulate uses the information
            you give us to contact you about our relevant content, products and
            services. You can unsubscribe from these communications at any time.
            For more information, see our Privacy Policy.
          </p>
          <Button
            disabled={isLoading || isALreadyRegistered}
            type="submit"
            className="w-full bg-tommyBlue"
          >
            {isALreadyRegistered
              ? "Already Registered"
              : " Sign Up and Register"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RegisteredWebinarForm;
