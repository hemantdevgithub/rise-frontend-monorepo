import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@repo/ui";
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  LineChart,
  Star,
  Users,
} from "lucide-react";

// Dummy data for instructor dashboard
const courses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    students: 245,
    rating: 4.8,
    status: "published",
    averageProgress: 68,
  },
  {
    id: 2,
    title: "Node.js for Beginners",
    students: 189,
    rating: 4.6,
    status: "published",
    averageProgress: 72,
  },
  {
    id: 3,
    title: "Full Stack Development",
    students: 0,
    rating: 0,
    status: "pending_review",
    averageProgress: 0,
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    students: 0,
    rating: 0,
    status: "draft",
    averageProgress: 0,
  },
];

export function InstructorDashboard() {
  const totalStudents = courses.reduce(
    (acc, course) => acc + course.students,
    0
  );
  const publishedCourses = courses.filter(
    (course) => course.status === "published"
  ).length;
  const pendingCourses = courses.filter(
    (course) => course.status === "pending_review"
  ).length;
  const draftCourses = courses.filter(
    (course) => course.status === "draft"
  ).length;

  const averageRating =
    courses
      .filter((course) => course.rating > 0)
      .reduce((acc, course) => acc + course.rating, 0) / publishedCourses || 0;

  const averageStudentProgress =
    courses
      .filter((course) => course.averageProgress > 0)
      .reduce((acc, course) => acc + course.averageProgress, 0) /
      publishedCourses || 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Instructor Dashboard
        </h2>
        <p className="text-muted-foreground">
          Manage your courses and track student progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              {publishedCourses} published, {pendingCourses} pending,{" "}
              {draftCourses} draft
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              Across all published courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.round(averageRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Student Progress
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(averageStudentProgress)}%
            </div>
            <Progress value={averageStudentProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
          <CardDescription>Manage and monitor all your courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
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
                    <div className="flex items-center text-sm text-muted-foreground">
                      {course.status === "published" ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
                          Published
                        </>
                      ) : course.status === "pending_review" ? (
                        <>
                          <Clock className="mr-1 h-3 w-3 text-amber-500" />
                          Pending Review
                        </>
                      ) : (
                        <>
                          <AlertCircle className="mr-1 h-3 w-3 text-slate-500" />
                          Draft
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {course.status === "published" && (
                    <>
                      <div className="flex flex-col items-end">
                        <div className="font-medium">{course.students}</div>
                        <div className="text-xs text-muted-foreground">
                          Students
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center font-medium">
                          {course.rating.toFixed(1)}
                          <Star className="ml-1 h-3 w-3 fill-primary text-primary" />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Rating
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="font-medium">
                          {course.averageProgress}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Avg. Progress
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
