import {
  selectCurrentRole,
  selectToken,
} from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";

type ProtectedRouteProps = {
  children: ReactNode;
  roles?: string[];
  userRoles?: string[];
};
const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, roles }) => {
  const token = useAppSelector(selectToken);
  const currentRole = useAppSelector(selectCurrentRole);
  if (!token) {
    return <Navigate to={"/login"} />;
  }
  if (!roles?.length) {
    return children;
  }
  if (roles.length) {
    const isHasAccess = roles.includes(currentRole ? currentRole : "");
    if (!isHasAccess) {
      toast.error(`You Don't have access to ${roles.join(",")}`);
      return <Navigate to={"/login"} />;
    } else {
      return children;
    }
  }
};

/* 
  roles: ["CUSTOMER"]
  userRoles: ["CUSTOMER", "USER", "CANDIDATE"]
  currentRole: CANDIDATE
*/
export default ProtectedRoute;
