import { useChangeLessonStatusMutation } from "@/redux/features/lesson/lessonApi";
import { TLesson, TLessonStatus } from "@/types/lesson.type";
import { getLessonStatusLabel } from "@/utility/utility";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdOutlineEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@repo/ui";

const AdminLessonCard = ({ lesson }: { lesson: TLesson }) => {
  const { slug, title, image, status } = lesson;
  const [changeStatus, { isLoading }] = useChangeLessonStatusMutation();

  const handleChangeStatus = async (newStatus: TLessonStatus) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await changeStatus({
        lessonId: lesson.id,
        status: newStatus,
      }).unwrap();
      if (res.success) {
        toast.success(res.message, { id: toastId });
      } else {
        toast.error("Failed to update status.", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  const isReadyForFinalCall = status === "IN_FINAL_REVIEW";

  return (
    <div className="space-y-2 rounded-md border bg-secondary p-2">
      <Link to={`/lessons/${slug}`} className="block w-full space-y-3">
        <img src={image?.url} alt={title} className="h-36 w-full rounded-sm" />
        <h4 className="font-rubik text-lg font-semibold leading-none">
          {title}
        </h4>
      </Link>
      <div className="flex items-center justify-between">
        <span className="w-28 truncate text-xs">
          By{" "}
          <strong>
            <i>Alex John</i>
          </strong>
        </span>
        <span className="truncate rounded-md bg-background px-2 py-0.5 text-xs">
          {getLessonStatusLabel(status)}
        </span>
      </div>
      {isReadyForFinalCall ? (
        <div className="flex items-center gap-3 *:w-full">
          <Button
            variant="destructive"
            onClick={() => handleChangeStatus("REJECTED")}
            disabled={isLoading}
          >
            Reject
            <FaXmark color="white" size={18} />
          </Button>
          <Button
            variant="success"
            onClick={() => handleChangeStatus("PUBLISHED")}
            disabled={isLoading}
          >
            Approve
            <MdOutlineEditNote className="text-yellow-500" size={18} />
          </Button>
        </div>
      ) : (
        <Button
          variant="success"
          onClick={() => handleChangeStatus("IN_FINAL_REVIEW")}
          disabled={isLoading}
          className="w-full"
        >
          Mark as reviewing
          <FaCheck className="text-yellow-500" size={18} />
        </Button>
      )}
    </div>
  );
};

export default AdminLessonCard;
