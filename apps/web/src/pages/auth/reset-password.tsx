"use client";

import { Alert, AlertDescription } from "@repo/ui";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
} from "@repo/ui";
import { ArrowLeft, Eye, EyeOff, LucideShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import * as z from "zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ResetPassword() {
  const [resetPassword] = useResetPasswordMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setApiError(null);
    setIsSuccess(false);

    try {
      await resetPassword({
        id: userId!,
        newPassword: values.password,
        token: token!,
      }).unwrap();

      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!token) {
    return <Navigate to={"/"} />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <LucideShieldCheck className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            RISE
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Password Reset</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Reset Password</CardTitle>
            <CardDescription>
              Create a new secure password for your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter your new password"
                            {...field}
                            type={showPassword ? "text" : "password"}
                            className="bg-background pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showPassword ? "Hide password" : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Confirm your new password"
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            className="bg-background pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground"
                            onClick={() =>
                              setShowConfirmPassword((prev) => !prev)
                            }
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                            <span className="sr-only">
                              {showConfirmPassword
                                ? "Hide password"
                                : "Show password"}
                            </span>
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-2 space-y-1.5 text-xs text-muted-foreground">
                  <p>Password must contain:</p>
                  <ul className="grid list-disc grid-cols-2 gap-1 pl-4">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter</li>
                    <li>One lowercase letter</li>
                    <li>One number</li>
                    <li>One special character</li>
                  </ul>
                </div>
                <Button
                  type="submit"
                  className="mt-6 w-full"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            </Form>
          </CardContent>
          {(apiError || isSuccess) && (
            <CardFooter className="flex flex-col space-y-2">
              {apiError && (
                <Alert variant="destructive">
                  <AlertDescription>{apiError}</AlertDescription>
                </Alert>
              )}
              {isSuccess && (
                <Alert
                  variant="default"
                  className="border-green-500 bg-green-50 dark:bg-green-950/30"
                >
                  <AlertDescription className="text-center">
                    Your password has been successfully reset. You will be
                    redirected to the login page.
                  </AlertDescription>
                </Alert>
              )}
            </CardFooter>
          )}
          <CardFooter className="flex justify-center pb-6 pt-2">
            <Button variant="ghost" size="sm" asChild>
              <Link
                to="/login"
                className="flex items-center text-sm text-muted-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Need help?{" "}
            <a href="#" className="font-medium text-primary hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
