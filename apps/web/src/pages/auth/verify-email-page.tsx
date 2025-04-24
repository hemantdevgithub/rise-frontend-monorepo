import { useResentVerificationEmailMutation } from "@/redux/features/auth/authApi";
import {
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@repo/ui";
import { Mail } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get("email");

  if (!email) {
    navigate("/");
  }

  const [resendVerificationEmail] = useResentVerificationEmailMutation();

  const handleResentVerificationLink = async () => {
    const toastId = toast.loading("Sending verification link.", {
      duration: 3000,
    });
    try {
      const response = await resendVerificationEmail({ email }).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
      }
    } catch (error) {
      toast.error("User Registration Failed!", { id: toastId });
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl">
            Check Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Mail className="h-12 w-12 text-blue-500" />
          <p className="text-center text-gray-600">
            We've sent a verification link to your email address. Please check
            your inbox and click the link to verify your account.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button onClick={handleResentVerificationLink} className="w-full">
            Resend Verification Email
          </Button>
          <Link
            to="/"
            className="text-center text-sm text-gray-600 hover:underline"
          >
            Return to Home Page
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
