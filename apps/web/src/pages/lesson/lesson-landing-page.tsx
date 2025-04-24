import { UserRole } from "@/constants/roles";
import { useEnrollmentContext } from "@/contexts/enrollment-context";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useGetLessonDetailsQuery } from "@/redux/features/lesson/lessonApi";
import { useAppSelector } from "@/redux/hooks";
import { TLesson } from "@/types/lesson.type";
import { Alert, AlertDescription, AlertTitle, Badge } from "@repo/ui";
import { AlertCircle, Loader } from "lucide-react";
import moment from "moment";
import { ReactNode, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const LessonLandingPage = () => {
  const { lessonSlug } = useParams();
  const { data, isFetching, isError } = useGetLessonDetailsQuery(lessonSlug!, {
    skip: !lessonSlug,
  });
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { isEnrolled, enrollments } = useEnrollmentContext();
  const lesson = data?.data as TLesson;

  let content: ReactNode;

  if (isFetching) {
    content = (
      <div className="w-full items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  } else if (!lesson || isError) {
    content = <div>Unfortunately Lesson not found!</div>;
  } else {
    content = (
      <div className="divide-y bg-background font-poppins *:px-5 *:py-3 dark:bg-secondary">
        <div className="flex items-center justify-between border-b bg-background px-6 py-4 font-semibold backdrop-blur dark:bg-secondary">
          <Badge variant="outline">
            {moment(lesson?.createdAt).format("DD MMM YYYY")}
          </Badge>
        </div>
        <div className="space-y-5">
          <img
            src={lesson!.image!.secure_url}
            className="h-[350px] w-full rounded-md object-cover"
            alt={lesson?.title}
          />

          <h1 className="font-rubik text-4xl font-semibold">{lesson?.title}</h1>
          {lesson.description && <p>{lesson?.description}</p>}
        </div>
        <Alert className="b g-background rounded-none border dark:bg-secondary">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Navigation Tip</AlertTitle>
          <AlertDescription>
            Check the right sidebar outline to view all chapters in this course.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  useEffect(() => {
    if (user!.role === UserRole.LEARNER && lesson) {
      if (enrollments.length > 0 && !isEnrolled(lesson.id)) {
        toast.info("Enroll the course before accessing!");
        navigate("/search/lessons");
      }
    }
  }, [lesson, enrollments, user]);
  return content;
};

export default LessonLandingPage;
