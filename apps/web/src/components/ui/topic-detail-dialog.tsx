import { useGetResearchTopicDetailsQuery } from "@/redux/features/researchTopic/researchTopicApi";
import { TResearchTopic } from "@/types/research-topic.types";
import {
  Badge, Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, Separator
} from "@repo/ui";
import {
  differenceInDays,
  differenceInHours,
  format,
  formatDistanceToNow,
  isValid,
} from "date-fns";
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  Clock,
  DollarSign,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";

interface TopicDetailsDialogProps {
  topicId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TopicDetailsDialog({
  topicId,
  isOpen,
  onClose,
}: TopicDetailsDialogProps) {
  const { data, isFetching, isError } = useGetResearchTopicDetailsQuery(
    topicId,
    {
      skip: !isOpen, // Only fetch when dialog is open
    }
  );

  const topic = data?.data as TResearchTopic;

  // Helper function to safely format dates
  const formatDate = (dateString: Date, formatString: string) => {
    try {
      const date = new Date(dateString);
      if (!isValid(date)) {
        return "Invalid date";
      }
      return format(date, formatString);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  // Helper function to safely get relative time
  const getRelativeTime = (dateString: Date) => {
    try {
      const date = new Date(dateString);
      if (!isValid(date)) {
        return "Unknown time";
      }
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      console.error("Error calculating relative time:", error);
      return "Unknown time";
    }
  };

  // Calculate time remaining
  const getTimeRemaining = () => {
    if (!topic) return null;

    try {
      const now = new Date();
      const deadline = new Date(topic.duration);

      if (!isValid(deadline)) {
        return "Invalid deadline";
      }

      if (now > deadline) {
        return "Deadline passed";
      }

      const daysRemaining = differenceInDays(deadline, now);
      const hoursRemaining = differenceInHours(deadline, now) % 24;

      if (daysRemaining > 0) {
        return `${daysRemaining} day${daysRemaining !== 1 ? "s" : ""} and ${hoursRemaining} hour${hoursRemaining !== 1 ? "s" : ""}`;
      } else {
        return `${hoursRemaining} hour${hoursRemaining !== 1 ? "s" : ""}`;
      }
    } catch (error) {
      console.error("Error calculating time remaining:", error);
      return "Unable to calculate time remaining";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        {isFetching ? (
          <div className="flex h-56 w-full items-center justify-center">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : isError ? (
          <div className="flex h-56 w-full flex-col items-center justify-center text-center">
            <AlertCircle className="mb-2 h-10 w-10 text-destructive" />
            <h3 className="text-lg font-semibold">Error Loading Topic</h3>
            <p className="text-sm text-muted-foreground">
              There was a problem loading this research topic. Please try again.
            </p>
            <Button variant="outline" onClick={onClose} className="mt-4">
              Close
            </Button>
          </div>
        ) : topic ? (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    topic.status === "OPEN"
                      ? "default"
                      : topic.status === "CLOSED"
                        ? "success"
                        : "secondary"
                  }
                >
                  {topic.status}
                </Badge>
              </div>
              <DialogTitle className="text-2xl">{topic.name}</DialogTitle>
              <DialogDescription>
                Posted {getRelativeTime(topic.postedDate)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-5 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Description
                </h3>
                <p className="text-sm">{topic.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                      Budget
                    </h3>
                    <div className="flex items-center">
                      <DollarSign className="mr-2 h-5 w-5 text-primary" />
                      <span className="text-xl font-semibold">
                        {topic.price}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                      Posted On
                    </h3>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>
                        {formatDate(
                          topic.postedDate as any,
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                      Deadline
                    </h3>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>{formatDate(topic.duration, "MMMM d, yyyy")}</span>
                    </div>
                    <div className="mt-1 flex items-center">
                      <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>{formatDate(topic.duration, "h:mm a")}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                      Time Remaining
                    </h3>
                    <div className="flex items-center">
                      <AlertCircle
                        className={`mr-2 h-5 w-5 ${
                          getTimeRemaining() === "Deadline passed"
                            ? "text-destructive"
                            : "text-amber-500"
                        }`}
                      />
                      <span
                        className={`truncate ${
                          getTimeRemaining() === "Deadline passed"
                            ? "text-destructive"
                            : "text-amber-500"
                        }`}
                      >
                        {getTimeRemaining()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {topic.publishedResearch && (
                <div>
                  <Link to={`/search/research/${topic.publishedResearch.slug}`}>
                    <Button variant={"link"} className="h-0 p-0">
                      <ArrowUpRight />
                      View Published Research
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            <DialogFooter className="flex gap-2 sm:justify-between">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Link to={`/research-topics/${topic.id}/submit`}>
                <Button>Submit</Button>
              </Link>
            </DialogFooter>
          </>
        ) : (
          <div className="flex h-56 w-full items-center justify-center">
            <p className="text-muted-foreground">No topic data available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
