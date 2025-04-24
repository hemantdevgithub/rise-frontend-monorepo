import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";
import { Navigate } from "react-router";

const OnboardingCheckingWrapper = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(selectUser);
  if (!user) {
    return children;
  }
  if (!user.role) {
    return <Navigate to={"/onboarding"} replace />;
  }
  return children;
};

export default OnboardingCheckingWrapper;
