import { Button, Card } from "@repo/ui";
import { CheckCircle, UserCircle } from "lucide-react";
import { useNavigate } from "react-router";
interface CompletionMessageProps {
  title: string;
  subtitle: string;
}

const CompletionSection = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-lg">
        <SuccessIcon />

        <CompletionMessage
          title="All Set!"
          subtitle="Your profile has been successfully created. You can make changes anytime from your profile settings."
        />

        <Button
          onClick={() => navigate("/profile")}
          className="group flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-green-600 text-white transition-all duration-200 hover:bg-green-700"
        >
          <UserCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
          View Profile
        </Button>
      </Card>
    </div>
  );
};

export default CompletionSection;

const SuccessIcon = () => (
  <div className="animate-fade-in mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
    <CheckCircle className="h-12 w-12 text-green-500" />
  </div>
);

const CompletionMessage = ({ title, subtitle }: CompletionMessageProps) => (
  <div className="mb-8 text-center">
    <h2 className="mb-2 text-2xl font-bold text-gray-800">{title}</h2>
    <p className="text-gray-600">{subtitle}</p>
  </div>
);
