import EnrollmentContextProvider from "@/contexts/enrollment-context";
import { ReactNode } from "react";

const ContextProviders = ({ children }: { children: ReactNode }) => {
  return <EnrollmentContextProvider>{children}</EnrollmentContextProvider>;
};

export default ContextProviders;
