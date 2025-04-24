"use client";

import { format, isValid } from "date-fns";
import {
  AlertCircle,
  Check,
  ChevronLeft,
  DollarSign,
  Eye,
  Loader,
  Search,
  ThumbsUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useApproveResearchSubmissionMutation,
  useGetAllTopicSubmissionsQuery,
  useGetResearchTopicDetailsQuery,
} from "@/redux/features/researchTopic/researchTopicApi";
import { TResearchTopic } from "@/types/research-topic.types";
import { TResearch } from "@/types/research.types";
import { TUserProfile } from "@/types/user.types";
import { extractHighlightOrAbstract } from "@/utility/utility";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Badge, Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Separator,
  Tabs, TabsList, TabsTrigger,
} from "@repo/ui";
import { toast } from "sonner";

// Helper function to safely format dates
export const formatDate = (dateString: Date, formatString: string) => {
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
// Helper function to get name
export const getName = (author: TUserProfile) => {
  let name = "Anonymous User";
  if (
    author.basicProfile &&
    author.basicProfile.first_name &&
    author.basicProfile.last_name
  ) {
    name = `${author.basicProfile.first_name} ${author.basicProfile.last_name}`;
  }
  return name;
};

export default function ResearchTopicInsightsPage() {
  const { id: topicId } = useParams();
  const navigate = useNavigate();

  // State
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<TResearch | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isPublishedDialogOpen, setIsPublishedDialogOpen] = useState(false);

  // Mutation
  const [mutation, { isLoading: isApproving }] =
    useApproveResearchSubmissionMutation();

  // Fetch topic details
  const {
    data,
    isFetching: isLoading,
    isError,
  } = useGetResearchTopicDetailsQuery(topicId);
  const {
    data: submissionData,
    isFetching: isSubmissionLoading,
    isError: isSubmissionError,
  } = useGetAllTopicSubmissionsQuery(topicId);

  const topic = data?.data as TResearchTopic;
  const submissions = (submissionData?.data as TResearch[]) || [];

  // Filter submissions based on search query and status filter
  const filteredSubmissions = submissions?.filter((submission) => {
    const matchesSearch = submission.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    // ||
    // submission.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter
      ? submission.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  // Handle submission approval
  const handleApproveSubmission = async () => {
    if (!selectedSubmission) {
      toast.info("Select one submission to approve");
      return;
    }
    const toastId = toast.loading("Processing your request!", {
      duration: 3000,
    });
    try {
      const response = await mutation(selectedSubmission.id).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0]?.message ||
          "Failed to process your request!",
        {
          id: toastId,
        }
      );
    }
  };

  if (isLoading || isSubmissionLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex h-56 w-full items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError || !topic || isSubmissionError) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex h-56 w-full flex-col items-center justify-center text-center">
          <AlertCircle className="mb-2 h-10 w-10 text-destructive" />
          <h3 className="text-lg font-semibold">Error Loading Topic</h3>
          <p className="text-sm text-muted-foreground">
            There was a problem loading this research topic. Please try again.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/admin/topics")}
            className="mt-4"
          >
            Back to Topics
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        className="mb-6 flex items-center border"
        onClick={() => navigate("/admin/topics")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        Back to Topics
      </Button>

      {/* Topic Details */}
      <Card className="mb-8">
        <CardHeader>
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
            <span className="text-xs text-muted-foreground">
              ID: {topic.id}
            </span>
          </div>
          <CardTitle className="mt-2 text-2xl">{topic.name}</CardTitle>
          <CardDescription>
            Posted on {formatDate(topic.postedDate, "MMMM d, yyyy")} • Due{" "}
            {formatDate(topic.duration, "MMMM d, yyyy 'at' h:mm a")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                Description
              </h3>
              <p>{topic.description}</p>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-6">
              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                  Budget
                </h3>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-primary" />
                  <span className="font-semibold">
                    ${topic.price.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                  Submissions
                </h3>
                <div className="flex items-center">
                  <span className="font-semibold">
                    {submissions.length} submissions
                  </span>
                  <span className="mx-2">•</span>
                  <span className="text-sm text-muted-foreground">
                    {submissions.filter((s) => s.status === "PUBLISHED").length}{" "}
                    published
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submissions Section */}
      <div className="mb-6">
        <h2 className="mb-4 text-2xl font-bold">Submissions</h2>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search submissions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs for different status views */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setStatusFilter(null)}>
              All ({submissions.length})
            </TabsTrigger>
            <TabsTrigger
              value="PENDING"
              onClick={() => setStatusFilter("PENDING")}
            >
              Pending (
              {submissions.filter((s) => s.status === "PENDING").length})
            </TabsTrigger>

            <TabsTrigger
              value="PUBLISHED"
              onClick={() => setStatusFilter("PUBLISHED")}
            >
              Published (
              {submissions.filter((s) => s.status === "PUBLISHED").length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Submissions List */}
        {filteredSubmissions.length === 0 ? (
          <div className="rounded-lg border bg-muted/10 py-12 text-center">
            <p className="text-muted-foreground">
              No submissions match your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="mb-1 flex items-center justify-between">
                    <Badge
                      variant={
                        submission.status === "PUBLISHED"
                          ? "success"
                          : "outline"
                      }
                    >
                      {submission.status.charAt(0).toUpperCase() +
                        submission.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(submission.createdAt, "MMM d, yyyy")}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-1">
                    {submission.title}
                  </CardTitle>
                  <CardDescription className="flex items-center">
                    <User className="mr-1 h-3 w-3" />
                    {getName(submission.author)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-muted-foreground transition-all duration-300 hover:text-foreground">
                    {extractHighlightOrAbstract(submission.content)}
                  </p>

                  {/* {submission.attachments.length > 0 && (
                    <div className="mt-3">
                      <p className="mb-1 text-xs text-muted-foreground">
                        Attachments:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {submission.attachments.map((attachment, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {attachment.name} ({attachment.size} MB)
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  )} */}
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedSubmission(submission);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>

                  {submission.status !== "PUBLISHED" && (
                    <Button
                      className="border"
                      size="sm"
                      variant={
                        submission.status === "PENDING"
                          ? "default"
                          : "secondary"
                      }
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setIsPublishedDialogOpen(true);
                      }}
                      disabled={topic.status === "CLOSED"}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* View Submission Dialog */}
      {selectedSubmission && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    selectedSubmission.status === "PUBLISHED"
                      ? "success"
                      : "outline"
                  }
                >
                  {selectedSubmission.status.charAt(0).toUpperCase() +
                    selectedSubmission.status.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  ID: {selectedSubmission.id}
                </span>
              </div>
              <DialogTitle className="mt-2 text-2xl">
                {selectedSubmission.title}
              </DialogTitle>
              <DialogDescription className="flex justify-between gap-2">
                <span>
                  Submitted by{" "}
                  <strong>{getName(selectedSubmission.author)}</strong>
                </span>
                <span>
                  {formatDate(
                    selectedSubmission.createdAt,
                    "MMMM d, yyyy 'at' h:mm a"
                  )}
                </span>
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Content
                </h3>
                <div
                  className="prose min-w-full"
                  dangerouslySetInnerHTML={{
                    __html: selectedSubmission.content,
                  }}
                />
              </div>

              {/* {selectedSubmission.attachments.length > 0 && (
                <div>
                  <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                    Attachments
                  </h3>
                  <div className="space-y-2">
                    {selectedSubmission.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center rounded-md border bg-muted/20 p-2"
                      >
                        <span className="flex-1">{attachment.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {attachment.size} MB
                        </span>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              <Separator />
            </div>

            <DialogFooter className="flex gap-2 sm:justify-between">
              <Button
                variant="outline"
                onClick={() => setIsViewDialogOpen(false)}
              >
                Close
              </Button>
              {selectedSubmission.status !== "PUBLISHED" && (
                <Button
                  onClick={() => setIsPublishedDialogOpen(true)}
                  className="flex items-center"
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Approve This Submission
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Approve Confirmation Dialog */}
      <AlertDialog
        open={isPublishedDialogOpen}
        onOpenChange={setIsPublishedDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Submission</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve this submission? This action will
              mark it as the selected solution for this research topic.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isApproving || topic.status === "CLOSED"}
              onClick={handleApproveSubmission}
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
