import { AuthLayout } from "@/layout/auth-layout";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { registerValidationSchema } from "@/schemas/authValidationSchema";
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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const role = "TIERPRENEUR";

  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);
  const form = useForm<z.infer<typeof registerValidationSchema>>({
    resolver: zodResolver(registerValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerValidationSchema>) {
    const toastId = toast.loading("Creating account.", { duration: 2000 });
    try {
      const response = await register({ ...values, role }).unwrap();
      if (response.success) {
        toast.success("User Registered Successfully! Please Login Now", {
          id: toastId,
        });
        navigate(`/verify-email?email=${form.getValues("email")}`);
        form.reset();
      }
    } catch (error: any) {
      toast.error(
        error.status === 409
          ? "Already have an account by this email."
          : "Failed to register.",
        { id: toastId }
      );
    }
  }
  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout
      title="Join RISE"
      subtitle="Start your learning journey today and unlock your full potential"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    className="h-11"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="h-11"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="mt-6 h-11 w-full">
            Create Account
          </Button>

          <div className="flex items-center justify-center pt-2">
            <Link to={"/login"} className="h-auto text-sm hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
