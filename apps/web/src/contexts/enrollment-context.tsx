import { UserRole } from "@/constants/roles";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetAllLearnerEnrollmentsQuery } from "@/redux/features/enrollment/enrollmentApi";
import { useAppSelector } from "@/redux/hooks";
import { TEnrollment } from "@/types/enrollment.types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export type TEnrollmentContext = {
  enrollments: TEnrollment[];
  isEnrolled: (courseId: string) => boolean;
};

const EnrollmentContext = createContext<TEnrollmentContext | undefined>(
  undefined
);

const EnrollmentContextProvider = ({ children }: { children: ReactNode }) => {
  const [enrollments, setEnrollments] = useState<TEnrollment[] | []>([]);

  const user = useAppSelector(selectUser);

  const { data, isFetching, isSuccess } = useGetAllLearnerEnrollmentsQuery(
    undefined,
    {
      skip: !user || user.role !== UserRole.LEARNER,
      pollingInterval: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (!isFetching && isSuccess) {
      setEnrollments(data?.data as TEnrollment[]);
    }
  }, [data, isFetching, isSuccess]);

  // check is course enrolled
  const isEnrolled = (courseId: string) => {
    return enrollments.some((el) => el.courseId === courseId);
  };

  return (
    <EnrollmentContext.Provider value={{ enrollments, isEnrolled }}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollmentContext = () => {
  const context = useContext(EnrollmentContext);
  if (context === undefined)
    throw new Error(
      "Enrollment context must be used within EnrollmentContextProvider"
    );
  return context;
};

export default EnrollmentContextProvider;
