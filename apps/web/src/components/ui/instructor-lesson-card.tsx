import { useChangeLessonStatusMutation } from "@/redux/features/lesson/lessonApi";
import { TLesson, TLessonStatus } from "@/types/lesson.type";
import { getLessonStatusLabel } from "@/utility/utility";
import {
  Badge, Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@repo/ui";
import { Ellipsis } from "lucide-react";
import { FaPenAlt, FaStar } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const InstructorLessonCard = ({ lesson }: { lesson: TLesson }) => {
  const { slug, title, description, image, status } = lesson;
  const [mutation, { isLoading }] = useChangeLessonStatusMutation();

  const handleChangeStatus = async (status: TLessonStatus) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const response = await mutation({ lessonId: lesson.id, status }).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
      } else {
        toast.error("Failed to process your request.", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  const canSubmitForReview = status === "DRAFT" || status === "RESUBMITTED";
  const canResubmit = status === "REVISIONS_REQUIRED_EDITOR";
  const canEdit = status === "DRAFT" || status === "REVISIONS_REQUIRED_EDITOR";

  return (
    <div className="grid grid-cols-12 items-center gap-8 rounded-md border bg-secondary p-2">
      <img
        src={image?.url}
        alt="Lesson thumbnail"
        className="col-span-2 h-24 w-full rounded-sm object-cover"
      />
      <div className="col-span-3 flex flex-col justify-center gap-2">
        <h2 className="w-80 truncate text-xl font-semibold">{title}</h2>
        {description && (
          <p className="w-72 truncate text-xs text-secondary-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="col-span-5 flex items-center justify-between gap-5 capitalize">
        <Badge>{getLessonStatusLabel(status)}</Badge>
        <div className="flex items-center gap-2 text-sm">
          <span>Total Enrollment:</span>
          <span>0</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>0.0</span>
          <FaStar color="yellow" />
          <span>(0)</span>
        </div>
      </div>
      <div className="col-span-2 flex justify-center gap-5">
        <Link to={`/lessons/${slug}`}>
          <Button variant="outline">View</Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44 space-y-2">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Edit Button */}
            <Button
              variant="outline"
              disabled={!canEdit}
              className="w-full justify-between"
            >
              Edit
              <FaPenAlt color="yellow" size={16} />
            </Button>

            {/* Submit for Review */}
            {canSubmitForReview && (
              <Button
                variant="success"
                onClick={() => handleChangeStatus("PENDING_EDITOR_REVIEW")}
                disabled={isLoading}
                className="w-full justify-between"
              >
                Submit for Review
                <GoCheckCircleFill color="green" size={18} />
              </Button>
            )}

            {/* Resubmit Button */}
            {canResubmit && (
              <Button
                variant="success"
                onClick={() => handleChangeStatus("RESUBMITTED")}
                disabled={isLoading}
                className="w-full justify-between"
              >
                Resubmit
                <GoCheckCircleFill color="orange" size={18} />
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default InstructorLessonCard;
