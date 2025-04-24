import { useChangeLessonStatusMutation } from "@/redux/features/lesson/lessonApi";
import { TLesson, TLessonStatus } from "@/types/lesson.type";
import { getLessonStatusLabel } from "@/utility/utility";
import { Button } from "@repo/ui";
import { Ellipsis } from "lucide-react";
import { GoCheckCircleFill } from "react-icons/go";
import { MdOutlineEditNote } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui";

const EditorLessonCard = ({ lesson }: { lesson: TLesson }) => {
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

  const isPendingOrResubmitted = status === "PENDING_EDITOR_REVIEW" || status === "RESUBMITTED";

  return (
    <div className="bg-secondary grid grid-cols-12 items-center gap-5 rounded-md border p-2">
      <img src={image?.url} alt="Lesson thumbnail" className="col-span-3 h-24 w-full rounded-sm object-cover" />

      <div className="col-span-2 flex flex-col justify-center gap-2">
        <h2 className="w-80 truncate text-base font-semibold">{title}</h2>
        <h5 className="w-20 truncate text-xs">By Alex John</h5>
      </div>

      <div className="col-span-7 flex items-center justify-evenly gap-5">
        <div className="truncate rounded-md border px-2 py-0.5 text-xs capitalize shadow-sm">
          <span>{getLessonStatusLabel(status)}</span>
        </div>
        <Link to={`/lessons/${slug}`}>
          <Button variant="outline">View</Button>
        </Link>

        {status !== "READY_FOR_FINAL_APPROVAL" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 space-y-2">
              <DropdownMenuLabel>Review Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {isPendingOrResubmitted && (
                <Button
                  variant="success"
                  onClick={() => handleChangeStatus("IN_REVIEW_EDITOR")}
                  disabled={isLoading}
                  className="w-full justify-between"
                >
                  Mark as reviewing
                  <GoCheckCircleFill className="text-green-600" size={18} />
                </Button>
              )}

              {/* Request Revisions */}
              {status === "IN_REVIEW_EDITOR" && (
                <>
                  <Button
                    variant="destructive"
                    onClick={() => handleChangeStatus("REVISIONS_REQUIRED_EDITOR")}
                    disabled={isLoading}
                    className="w-full justify-between"
                  >
                    Request Revisions
                    <MdOutlineEditNote className="text-yellow-500" size={18} />
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleChangeStatus("READY_FOR_FINAL_APPROVAL")}
                    disabled={isLoading}
                    className="w-full justify-between"
                  >
                    Forward for final approval
                    <MdOutlineEditNote className="text-yellow-500" size={18} />
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default EditorLessonCard;
