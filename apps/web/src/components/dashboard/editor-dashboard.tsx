import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@repo/ui";
import {
  BarChart,
  BookOpen,
  CheckCircle,
  Clock,
  FileCheck,
  FileText,
} from "lucide-react";

// Dummy data for editor dashboard
const pendingReviews = [
  {
    id: 1,
    title: "Full Stack Development",
    instructor: "David Lee",
    submittedDate: "April 15, 2023",
    lessons: 24,
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    instructor: "Rachel Green",
    submittedDate: "April 18, 2023",
    lessons: 18,
  },
  {
    id: 3,
    title: "Blockchain Development",
    instructor: "Thomas Anderson",
    submittedDate: "April 20, 2023",
    lessons: 15,
  },
];

const recentlyReviewed = [
  {
    id: 1,
    title: "Cloud Computing Essentials",
    instructor: "Jennifer Wilson",
    reviewDate: "April 10, 2023",
    status: "approved",
    lessons: 20,
  },
  {
    id: 2,
    title: "Cybersecurity Fundamentals",
    instructor: "Robert Johnson",
    reviewDate: "April 8, 2023",
    status: "needs_revision",
    lessons: 16,
  },
  {
    id: 3,
    title: "DevOps for Beginners",
    instructor: "Lisa Thompson",
    reviewDate: "April 5, 2023",
    status: "approved",
    lessons: 22,
  },
];

export function EditorDashboard() {
  const totalPendingReviews = pendingReviews.length;
  const totalPendingLessons = pendingReviews.reduce(
    (acc, course) => acc + course.lessons,
    0
  );

  const totalReviewedCourses = recentlyReviewed.length;
  const totalReviewedLessons = recentlyReviewed.reduce(
    (acc, course) => acc + course.lessons,
    0
  );

  const approvedCourses = recentlyReviewed.filter(
    (course) => course.status === "approved"
  ).length;
  const revisionCourses = recentlyReviewed.filter(
    (course) => course.status === "needs_revision"
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Editor Dashboard</h2>
        <p className="text-muted-foreground">
          Review and manage course submissions.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPendingReviews}</div>
            <p className="text-xs text-muted-foreground">
              {totalPendingLessons} lessons to review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reviewed This Month
            </CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviewedCourses}</div>
            <p className="text-xs text-muted-foreground">
              {totalReviewedLessons} lessons reviewed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((approvedCourses / totalReviewedCourses) * 100)}%
            </div>
            <Progress
              value={(approvedCourses / totalReviewedCourses) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Review Efficiency
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.6</div>
            <p className="text-xs text-muted-foreground">
              Avg. lessons reviewed per day
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
            <CardDescription>Courses waiting for your review</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReviews.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-muted-foreground">
                        By {course.instructor}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-sm">
                    <div className="font-medium">{course.lessons} lessons</div>
                    <div className="text-xs text-muted-foreground">
                      Submitted {course.submittedDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recently Reviewed</CardTitle>
            <CardDescription>Your recent course reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentlyReviewed.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center">
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <div className="flex items-center text-sm">
                        {course.status === "approved" ? (
                          <span className="text-green-500">Approved</span>
                        ) : (
                          <span className="text-amber-500">Needs Revision</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end text-sm">
                    <div className="font-medium">{course.lessons} lessons</div>
                    <div className="text-xs text-muted-foreground">
                      Reviewed {course.reviewDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
