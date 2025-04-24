"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid } from "date-fns";
import JoditEditor from "jodit-react";
import {
  AlertCircle,
  ChevronLeft,
  DollarSign,
  FileText,
  Info,
  Loader,
} from "lucide-react";
import { useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

import {
  useGetResearchTopicDetailsQuery,
  useSubmitResearchMutation,
} from "@/redux/features/researchTopic/researchTopicApi";
import {
  Alert, AlertDescription, AlertTitle, Badge, Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input, Separator
} from "@repo/ui";
import { toast } from "sonner";

// Define the form schema
const submissionSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  content: z
    .string()
    .min(50, { message: "Content must be at least 50 characters" }),
  attachments: z.array(z.instanceof(File)).optional(),
});

type SubmissionFormValues = z.infer<typeof submissionSchema>;

// Helper function to safely format dates
const formatDate = (dateString: string, formatString: string) => {
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

export default function ResearchSubmissionPage() {
  const { id: topicId } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const [mutation, { isLoading: isSubmitting }] = useSubmitResearchMutation();
  const { data, isLoading, isError } = useGetResearchTopicDetailsQuery(
    topicId || "",
    {
      skip: !topicId,
    }
  );

  const topic = data?.data;

  const form = useForm<SubmissionFormValues>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      title: "",
      content: "",
      attachments: [],
    },
  });

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

      const diffTime = Math.abs(deadline.getTime() - now.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      if (diffDays > 0) {
        return `${diffDays} day${diffDays !== 1 ? "s" : ""} and ${diffHours} hour${diffHours !== 1 ? "s" : ""} remaining`;
      } else {
        return `${diffHours} hour${diffHours !== 1 ? "s" : ""} remaining`;
      }
    } catch (error) {
      console.error("Error calculating time remaining:", error);
      return "Unable to calculate time remaining";
    }
  };

  const onSubmit = async (values: SubmissionFormValues) => {
    const toastId = toast.loading("Processing your request!", {
      duration: 3000,
    });
    try {
      const response = await mutation({ ...values, topicId }).unwrap();
      if (response.success) {
        toast.success(response.message, { id: toastId });
        navigate("/search/research-topics");
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error(
        error?.data?.errorSources[0]?.message ||
          "Failed to process your request!",
        {
          id: toastId,
        }
      );
    }
  };

  // Jodit editor configuration
  const config = useMemo(
    () => ({
      readonly: false,
      height: "200px",
      className: "dark:text-black",
    }),
    []
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="flex h-56 w-full items-center justify-center">
          <Loader className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (isError || !topic) {
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
            onClick={() => navigate("/research-topics")}
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
        onClick={() => navigate("/research-topics")}
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Topics
      </Button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Topic Details Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge
                  variant={topic.status === "OPEN" ? "default" : "secondary"}
                >
                  {topic.status}
                </Badge>
              </div>
              <CardTitle className="mt-2">{topic.name}</CardTitle>
              <CardDescription>
                Due {formatDate(topic.duration, "MMMM d, yyyy 'at' h:mm a")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                    Description
                  </h3>
                  <p className="h-fit truncate text-pretty text-sm">
                    {topic.description}
                  </p>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                    Budget
                  </h3>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-primary" />
                    <span className="font-semibold">
                      ${topic.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                    Time Remaining
                  </h3>
                  <div className="flex items-center">
                    <AlertCircle
                      className={`mr-2 h-4 w-4 ${
                        getTimeRemaining() === "Deadline passed"
                          ? "text-destructive"
                          : "text-amber-500"
                      }`}
                    />
                    <span
                      className={`font-medium ${
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
            </CardContent>
          </Card>

          {/* Submission Guidelines */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Info className="mr-2 h-5 w-5" />
                Submission Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  <span>
                    Your submission must be original and not published
                    elsewhere.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  <span>
                    Include all references and citations where applicable.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  <span>
                    Submissions must be in English and free of grammatical
                    errors.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  <span>
                    Use the rich text editor to format your submission
                    appropriately.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                  <span>You can attach supporting documents if needed.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Submission Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Research</CardTitle>
              <CardDescription>
                Complete the form below to submit your research for this topic.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Submission Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter a title for your submission"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A clear, concise title for your research submission.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-roboto text-sm font-semibold">
                          Content
                        </FormLabel>
                        <JoditEditor
                          ref={editor}
                          value={field.value}
                          config={config}
                          onBlur={(newContent: string) =>
                            field.onChange(newContent)
                          }
                        />
                        <FormDescription>
                          Write your detailed research submission using the rich
                          text editor.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="attachments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Attachments (Optional) Note: This feature not
                          available now!
                        </FormLabel>
                        <FormControl>
                          <div className="flex w-full items-center justify-center">
                            <label
                              htmlFor="file-upload"
                              className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
                            >
                              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <FileText className="mb-2 h-8 w-8 text-gray-500 dark:text-gray-400" />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                  <span className="font-semibold">
                                    Click to upload
                                  </span>{" "}
                                  or drag and drop
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  PDF, DOCX, XLSX, PPT (MAX. 10MB)
                                </p>
                              </div>
                              <input
                                id="file-upload"
                                type="file"
                                className="hidden"
                                multiple
                                disabled
                                onChange={(e) => {
                                  const files = e.target.files
                                    ? Array.from(e.target.files)
                                    : [];
                                  field.onChange(files);
                                }}
                                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Upload any supporting documents for your submission
                          (optional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      By submitting this form, you confirm that this is your
                      original work and you have the right to submit it.
                    </AlertDescription>
                  </Alert>

                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/research-topics")}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Research"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
