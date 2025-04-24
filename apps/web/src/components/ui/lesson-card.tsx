import { UserRole } from "@/constants/roles";
import { useEnrollmentContext } from "@/contexts/enrollment-context";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useEnrollInCourseMutation } from "@/redux/features/enrollment/enrollmentApi";
import { useAppSelector } from "@/redux/hooks";
import { TLesson } from "@/types/lesson.type";
import { Button } from "@repo/ui";
import { ArrowUpRight } from "lucide-react";
import { useMemo } from "react";
import { FaStar } from "react-icons/fa";
import { GoCheckCircle } from "react-icons/go";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// type TLessonProgress = {
//   lessonId: string;
//   progressPercentage: string;
// };

const LessonCard = (item: TLesson) => {
  const { title, image, slug, id } = item || {};
  const user = useAppSelector(selectUser);
  const { isEnrolled } = useEnrollmentContext();
  const isAlreadyEnrolled = useMemo(() => isEnrolled(id), [id, isEnrolled]);

  const [mutation, { isLoading }] = useEnrollInCourseMutation();
  // const { data } = useGetUserSingleLessonProgressQuery(id);
  // const progress = (data?.data as TLessonProgress) || {};
  const handleEnroll = async () => {
    if (user?.role !== UserRole.LEARNER) {
      toast.info("Only learner can enroll in course!");
      return;
    }
    const toastId = toast.success("Processing your request!", {
      duration: 3000,
    });
    try {
      const response = await mutation({ courseId: id }).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
      }
    } catch (error: any) {
      if (error.status === 409) {
        toast.error(error.data.message, { id: toastId });
      } else {
        toast.error("Failed to enroll this course!", { id: toastId });
      }
    }
  };
  return (
    <div className={`bg-secondary font-poppins space-y-3 rounded-md border p-2 drop-shadow duration-300`}>
      <Link to={`/lessons/${slug}`} className="block space-y-2.5">
        <img src={image?.url} alt="" className={`h-32 w-full rounded-sm object-cover`} />

        <h2 className="font-rubik truncate text-lg font-semibold leading-none">{title}</h2>
      </Link>
      {/* <div>
        <Progress
          value={progress ? Number(progress.progressPercentage) : 0}
          className="h-[3px]"
        />
      </div> */}
      <div className="flex items-center justify-between">
        <span className="w-28 truncate text-xs">
          By{" "}
          <strong>
            <i>Alex John</i>
          </strong>
        </span>
        <span className="inline-flex items-center gap-1 text-xs">
          4.8
          <FaStar color="yellow" /> (2.3K)
        </span>
      </div>
      {user!.role === UserRole.LEARNER &&
        (isAlreadyEnrolled ? (
          <Link to={`/lessons/${slug}`} className="block space-y-2.5">
            <Button disabled={isLoading} className="w-full" variant={"success"}>
              View
              <ArrowUpRight />
            </Button>
          </Link>
        ) : (
          <Button
            onClick={handleEnroll}
            disabled={isLoading || isAlreadyEnrolled}
            className="w-full"
            variant={"success"}
          >
            Enroll Now
            <GoCheckCircle />
          </Button>
        ))}
    </div>
  );
};
export default LessonCard;
