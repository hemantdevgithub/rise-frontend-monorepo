import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Progress,
} from "@repo/ui";
import {
  BookOpen,
  BadgeIcon as Certificate,
  Clock,
  GraduationCap,
  LineChart,
  Trophy,
} from "lucide-react";

// Dummy data for learner dashboard
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Web Development",
    progress: 75,
    instructor: "John Smith",
    lastAccessed: "2 days ago",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    progress: 45,
    instructor: "Emily Johnson",
    lastAccessed: "Yesterday",
  },
  {
    id: 3,
    title: "UX/UI Design Fundamentals",
    progress: 90,
    instructor: "Michael Brown",
    lastAccessed: "Today",
  },
  {
    id: 4,
    title: "Data Science Essentials",
    progress: 20,
    instructor: "Sarah Wilson",
    lastAccessed: "3 days ago",
  },
];

const certificates = [
  {
    id: 1,
    title: "Python Programming",
    issueDate: "March 15, 2023",
  },
  {
    id: 2,
    title: "Digital Marketing",
    issueDate: "January 10, 2023",
  },
];

export function LearnerDashboard() {
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(
    (course) => course.progress === 100
  ).length;
  const averageProgress = Math.round(
    enrolledCourses.reduce((acc, course) => acc + course.progress, 0) /
      totalCourses
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Learner Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Continue your learning journey.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Enrollments
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
            <p className="text-xs text-muted-foreground">
              {completedCourses} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Progress
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <Progress value={averageProgress} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Learning Streak
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Certificates Earned
            </CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{certificates.length}</div>
            <p className="text-xs text-muted-foreground">
              View all certificates
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Learning</CardTitle>
            <CardDescription>Continue where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enrolledCourses.slice(0, 3).map((course) => (
                <div key={course.id} className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {course.title}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {course.lastAccessed}
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Certificates</CardTitle>
            <CardDescription>Achievements you've earned</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {certificates.map((certificate) => (
                <div key={certificate.id} className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <Certificate className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {certificate.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Issued on {certificate.issueDate}
                    </p>
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
