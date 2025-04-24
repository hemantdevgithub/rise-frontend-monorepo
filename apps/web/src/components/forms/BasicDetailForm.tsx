import { useCreateBasicProfileMutation } from "@/redux/features/basicProfile/basicProfileApi";
import { createBasicProfileValidation } from "@/schemas/basicProfileValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  PhoneInput,
} from "@repo/ui";
import { Loader2, Phone, UserRound } from "lucide-react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type BasicProfileFormValue = z.infer<typeof createBasicProfileValidation>;

const BasicDetailForm = () => {
  const [createBasicProfile, { isLoading }] = useCreateBasicProfileMutation();
  const form: UseFormReturn<BasicProfileFormValue> = useForm<
    z.infer<typeof createBasicProfileValidation>
  >({
    resolver: zodResolver(createBasicProfileValidation),
  });

  const onSubmit = async (
    data: z.infer<typeof createBasicProfileValidation>
  ) => {
    const toastId = toast.loading("Uploading Your Details", {
      duration: 2000,
    });
    try {
      const response = await createBasicProfile(data).unwrap();
      if (response.success) {
        toast.success("Basic Details Uploaded Successfully", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong while uploading details!", {
        id: toastId,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <UserRound className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Personal Details</h2>
          <p className="mt-2 text-gray-500">Please fill in your information</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        className="h-11 rounded-lg border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Smith"
                        className="h-11 rounded-lg border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>Phone Number</span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <PhoneInput
                      className="h-11 rounded-lg border-gray-200 bg-gray-50 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="Enter your phone number"
                      {...field}
                      international
                      defaultCountry="IN"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="h-11 w-full rounded-lg bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Details"
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default BasicDetailForm;
