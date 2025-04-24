import { Progress } from "@repo/ui";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import {
  BookOpen,
  CheckCircle,
  DollarSign,
  LineChart,
  Users,
} from "lucide-react";

// Dummy data for admin dashboard
const platformStats = {
  totalStudents: 2450,
  totalCourses: 87,
  totalInstructors: 42,
  totalRevenue: 125750,
  courseCompletionRate: 68,
  pendingApprovals: 8,
  newUsersThisMonth: 320,
  activeUsers: 1876,
};

const recentCourses = [
  {
    id: 1,
    title: "Full Stack Development",
    instructor: "David Lee",
    status: "pending_approval",
    students: 0,
    submittedDate: "April 15, 2023",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    instructor: "Rachel Green",
    status: "pending_approval",
    students: 0,
    submittedDate: "April 18, 2023",
  },
  {
    id: 3,
    title: "Cloud Computing Essentials",
    instructor: "Jennifer Wilson",
    status: "approved",
    students: 78,
    submittedDate: "April 10, 2023",
  },
  {
    id: 4,
    title: "Cybersecurity Fundamentals",
    instructor: "Robert Johnson",
    status: "approved",
    students: 45,
    submittedDate: "April 8, 2023",
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Platform overview and management.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalStudents.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {platformStats.newUsersThisMonth} new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalCourses}
            </div>
            <p className="text-xs text-muted-foreground">
              {platformStats.pendingApprovals} pending approval
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Instructors
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.totalInstructors}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                platformStats.totalCourses / platformStats.totalInstructors
              )}{" "}
              courses per instructor
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${platformStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime platform revenue
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>Monthly student and course growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[200px] items-end justify-between gap-2">
              {[40, 30, 45, 25, 60, 75, 65, 45, 80, 90, 100, 85].map(
                (height, i) => (
                  <div key={i} className="relative w-full">
                    <div
                      className="absolute bottom-0 w-full rounded-sm bg-primary"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                )
              )}
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <div>Apr</div>
              <div>May</div>
              <div>Jun</div>
              <div>Jul</div>
              <div>Aug</div>
              <div>Sep</div>
              <div>Oct</div>
              <div>Nov</div>
              <div>Dec</div>
              <div>Jan</div>
              <div>Feb</div>
              <div>Mar</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Course Completion
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.courseCompletionRate}%
            </div>
            <Progress
              value={platformStats.courseCompletionRate}
              className="mt-2"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              Average completion rate across all courses
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platformStats.activeUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (platformStats.activeUsers / platformStats.totalStudents) * 100
              )}
              % of total users
            </p>
            <Progress
              value={
                (platformStats.activeUsers / platformStats.totalStudents) * 100
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Course Submissions</CardTitle>
          <CardDescription>Review and approve new courses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentCourses.map((course) => (
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
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end text-sm">
                    {course.status === "pending_approval" ? (
                      <span className="inline-flex items-center rounded-full border border-transparent bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Pending Approval
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full border border-transparent bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        Approved
                      </span>
                    )}
                    <div className="mt-1 text-xs text-muted-foreground">
                      {course.submittedDate}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
