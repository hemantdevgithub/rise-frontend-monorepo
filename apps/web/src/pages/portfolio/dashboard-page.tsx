import { AdminDashboard } from "@/components/dashboard/admin-dashboard";
import { EditorDashboard } from "@/components/dashboard/editor-dashboard";
import { InstructorDashboard } from "@/components/dashboard/instructor-dashboard";
import { LearnerDashboard } from "@/components/dashboard/learner-dashboard";
import { UserRole } from "@/constants/roles";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ReactNode } from "react";

const DashboardPage = () => {
  const user = useAppSelector(selectUser);

  let content: ReactNode;

  switch (user!.role) {
    case UserRole.LEARNER:
      content = <LearnerDashboard />;
      break;
    case UserRole.IMPACT_ENTITY:
      content = <EditorDashboard />;
      break;

    case UserRole.RESEARCHER:
      content = <InstructorDashboard />;
      break;
    case UserRole.ADMIN:
      content = <AdminDashboard />;
      break;
    default:
      break;
  }

  return <div>{content}</div>;
};

export default DashboardPage;
