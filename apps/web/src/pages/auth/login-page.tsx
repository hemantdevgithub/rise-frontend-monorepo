import { AuthLayout } from "@/layout/auth-layout";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { logIn, selectToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginValidationSchema } from "@/schemas/authValidationSchema";
import { TUser } from "@/types/global.type";
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
import { jwtDecode } from "jwt-decode";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const token = useAppSelector(selectToken);
  if (token) {
    return <Navigate to="/" />;
  }

  const form = useForm<z.infer<typeof loginValidationSchema>>({
    resolver: zodResolver(loginValidationSchema),
    defaultValues: {
      email: "",
      password: import.meta.env.VITE_LOGIN_PASSWORD || "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginValidationSchema>) {
    const toastId = toast.loading("Logging in.", { duration: 2000 });
    try {
      const response = await login(values).unwrap();
      const token = response?.data?.accessToken;
      if (token) {
        const user = jwtDecode(token) as TUser;
        dispatch(logIn({ token, user }));
        toast.success("Logged in successfully.", { id: toastId });
        navigate("/");
        form.reset();
      }
    } catch (error: any) {
      toast.error(
        error?.status === 401 || 403
          ? "Email or password is incorrect."
          : "Failed to login.",
        { id: toastId }
      );
    }
  }

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Continue your learning journey with RISE"
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
                      placeholder="Enter your password"
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
            Sign In
          </Button>

          <div className="flex items-center justify-between pt-2">
            <Link to={"/forget-password"}>
              <Button variant="link" className="px-0 text-sm">
                Forgot password?
              </Button>
            </Link>
            <Link to={"/register"} className="text-sm hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
