"use client";

import { useForgetPasswordMutation } from "@/redux/features/auth/authApi";
import { selectToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Alert, AlertDescription, Button,
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
  Input
} from "@repo/ui";
import { ArrowLeft, LucideShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import * as z from "zod";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export default function ForgotPassword() {
  const [apiError, setApiError] = useState<string | null>(null);
  const token = useAppSelector(selectToken);
  const [forgetPassword, { isLoading, isSuccess }] =
    useForgetPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setApiError(null);
    try {
      await forgetPassword({ email: values.email }).unwrap();
    } catch (error: any) {
      setApiError(error.message);
    }
  }

  if (token) {
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
          <p className="mt-1 text-sm text-muted-foreground">Account Recovery</p>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Forgot Password</CardTitle>
            <CardDescription>
              Enter your email we will send you a password reset link!.
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          {...field}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || isSuccess}
                >
                  {isLoading && (
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading
                    ? "Sending..."
                    : isSuccess
                      ? "Email Sent"
                      : "Send Reset Link"}
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
                    If an account exists for <b>{form.getValues("email")}</b>,
                    we have sent password reset instructions to this email
                    address.
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
