import App from "@/App";
import AdminLandingPage from "@/components/AdminLandingPage/LandingPage";
import { UserRole } from "@/constants/roles";
import AdminLayout from "@/layout/admin-layout";
import PortfolioLayout from "@/layout/portfolio-layout";
import ProtectedRoute from "@/layout/protected-route";
import AddLandingPage from "@/pages/add/add-landing-page";
import CreateResearchTopicPage from "@/pages/add/create-research-topic-page";
import CreateArticlePage from "@/pages/admin/create-article-page";
import CreateChapterPage from "@/pages/admin/create-chapter-page";
import { CreateExamPage } from "@/pages/admin/create-exam-page";
import CreateLessonPage from "@/pages/admin/create-lesson-page";
import CreateLessonSegment from "@/pages/admin/create-lesson-segment";
import CreatePodcastPage from "@/pages/admin/create-podcast-page";
import CreatePollPage from "@/pages/admin/create-poll-page";
import CreateQAndAudioPage from "@/pages/admin/create-q-and-a-audio-page";
import CreateQuestionPage from "@/pages/admin/create-question-page";
import { CreateQuizPage } from "@/pages/admin/create-quiz-page";
import CreateResearchAndDevelopmentPage from "@/pages/admin/create-research-and-development-page";
import CreateWebcastPage from "@/pages/admin/create-webcast-page";
import CreateWebinarPage from "@/pages/admin/create-webinar-page";
import ArticleDetailPage from "@/pages/article/article-detail-page";
import ArticlePage from "@/pages/article/articles-page";
import ForgotPassword from "@/pages/auth/forget-password";
import { LoginPage } from "@/pages/auth/login-page";
import ResetPassword from "@/pages/auth/reset-password";
import { SignUpPage } from "@/pages/auth/sign-up-page";
import VerifyEmailPage from "@/pages/auth/verify-email-page";
import VerifyPage from "@/pages/auth/verify-page";
import CertificatePage from "@/pages/certificate-page";
import ExamAttemptPage from "@/pages/exams/exam-attempt-page";
import ChapterDetailPage from "@/pages/lesson/chapter-detail-page";
import LessonDetailLayout from "@/pages/lesson/lesson-detail-layout";
import LessonLandingPage from "@/pages/lesson/lesson-landing-page";
import LessonsPage from "@/pages/lesson/lessons-page";
import OnboardingPage from "@/pages/onboarding-page";
import PodcastsPage from "@/pages/podcasts/podcasts-page";
import PollsPage from "@/pages/polls/polls-page";
import DashboardPage from "@/pages/portfolio/dashboard-page";
import EditorCoursesPage from "@/pages/portfolio/editor-courses-page";
import EnrolledCoursesPage from "@/pages/portfolio/enrolled-courses-page";
import MyCoursesPage from "@/pages/portfolio/my-courses-page";
import PendingCoursesPage from "@/pages/portfolio/pending-courses-page";
import ResearchTopicsPage from "@/pages/portfolio/research-topics-page";
import ProfilePage from "@/pages/profile/profile-page";
import QAndAAudiosPage from "@/pages/q-and-a-audio/q-and-a-audios-page";
import QuizAttemptPage from "@/pages/quizzes/quiz-attempt-page";
import QuizzesPage from "@/pages/quizzes/quizzes-page";
import ResearchAndDevelopmentDetailPage from "@/pages/research-and-development/research-and-development-detail-page";
import ResearchAndDevelopmentPage from "@/pages/research-and-development/research-and-development-page";
import ResearchSubmitPage from "@/pages/research-submit-page";
import ResearchTopicInsights from "@/pages/research-topic-insights-page";
import ResearchDetailPage from "@/pages/search/research-detail-page";
import ResearchListingPage from "@/pages/search/research-listing-page";
import SearchLandingPage from "@/pages/search/search-landing-page";
import SocialMissionPage from "@/pages/social-mission/social-mission-page";
import TrainingSelectionPage from "@/pages/training-selection-page";
import WebcastDetailPage from "@/pages/webcast/webcast-detail-page";
import WebcastPage from "@/pages/webcast/webcasts-page";
import WebinarDetailPage from "@/pages/webinar/webinar-detail-page";
import WebinarsPage from "@/pages/webinar/webinars-page";
import { Button } from "@repo/ui";
import { createBrowserRouter, Link, Navigate, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <div className="flex h-screen w-full items-center justify-center">
        <Link to={"/"}>
          <Button>Go To Home</Button>
        </Link>
      </div>
    ),
    children: [
      // Portfolio layout
      {
        path: "portfolio",
        element: <PortfolioLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={"/portfolio/dashboard"} replace />,
          },
          {
            path: "dashboard",
            element: (
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            ),
          },
          { path: "enrolled-courses", element: <EnrolledCoursesPage /> },
          { path: "research-topics", element: <ResearchTopicsPage /> },
          {
            path: "my-courses",
            element: (
              <ProtectedRoute roles={[UserRole.RESEARCHER]}>
                <MyCoursesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "editor-courses",
            element: (
              <ProtectedRoute roles={[UserRole.IMPACT_ENTITY]}>
                <EditorCoursesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "pending-courses",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
                <PendingCoursesPage />
              </ProtectedRoute>
            ),
          },
          { path: "quizzes", element: <QuizzesPage /> },
          {
            path: "courses",
            element: (
              <ProtectedRoute>
                <LessonsPage />
              </ProtectedRoute>
            ),
          },
          { path: "exams", element: <QuizzesPage /> },
          { path: "research", element: <ResearchAndDevelopmentDetailPage /> },
          { path: "certificates", element: <div>Certificates page</div> },
          { path: "network", element: <div>Network page</div> },
          { path: "activities", element: <div>Activities page</div> },
        ],
      },
      // Add Layout
      {
        path: "add",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <AddLandingPage /> },
          {
            path: "add-lesson",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                  UserRole.RESEARCHER,
                ]}
              >
                <CreateLessonPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-chapter",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                  UserRole.RESEARCHER,
                ]}
              >
                <CreateChapterPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-quiz",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                  UserRole.RESEARCHER,
                ]}
              >
                <CreateQuizPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-question",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                  UserRole.RESEARCHER,
                ]}
              >
                <CreateQuestionPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-exam",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                  UserRole.RESEARCHER,
                ]}
              >
                <CreateExamPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-journal",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                  UserRole.RESEARCHER,
                ]}
              >
                <CreateArticlePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-research",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                  UserRole.RESEARCHER,
                ]}
              >
                <CreateResearchAndDevelopmentPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-poll",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                ]}
              >
                <CreatePollPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-podcast",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                ]}
              >
                <CreatePodcastPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-webcast",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                ]}
              >
                <CreateWebcastPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-webinar",
            element: (
              <ProtectedRoute
                roles={[
                  UserRole.IMPACT_ENTITY,
                  UserRole.ADMIN,
                  UserRole.SUPER_ADMIN,
                ]}
              >
                <CreateWebinarPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "add-research-topic",
            element: (
              <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
                <CreateResearchTopicPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      // Search layout
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <SearchLandingPage /> },
          { path: "lessons", element: <LessonsPage /> },
          {
            path: "research",
            element: (
              <ProtectedRoute>
                <ResearchListingPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "research/:slug",
            element: (
              <ProtectedRoute>
                <ResearchDetailPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "quizzes",
            element: (
              <ProtectedRoute>
                <QuizzesPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "exams",
            element: (
              <ProtectedRoute>
                <ExamAttemptPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "exams/attempt/:examId",
            element: (
              <ProtectedRoute>
                <ExamAttemptPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "quizzes/attempt/:quizId",
            element: (
              <ProtectedRoute>
                <QuizAttemptPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "polls",
            element: (
              <ProtectedRoute>
                <PollsPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "podcasts",
            element: (
              <ProtectedRoute>
                <PodcastsPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "webcasts",
            element: (
              <ProtectedRoute>
                <WebcastPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "webcasts/:slug",
            element: (
              <ProtectedRoute>
                <WebcastDetailPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "journals",
            element: (
              <ProtectedRoute>
                <ArticlePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "journals/:slug",
            element: (
              <ProtectedRoute>
                <ArticleDetailPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "q-and-a-audios",
            element: (
              <ProtectedRoute>
                <QAndAAudiosPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "webinars",
            element: (
              <ProtectedRoute>
                <WebinarsPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "webinars/:slug",
            element: (
              <ProtectedRoute>
                <WebinarDetailPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "research-topics",
            element: (
              <ProtectedRoute>
                <ResearchTopicsPage />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        index: true,
        element: <Navigate to={"/portfolio/dashboard"} />,
      },
      // Submit research
      {
        path: "research-topics/:id/submit",
        element: (
          <ProtectedRoute roles={[UserRole.RESEARCHER]}>
            <ResearchSubmitPage />
          </ProtectedRoute>
        ),
      },
      // View research topics insights
      {
        path: "research-topics/:id/insights",
        element: (
          <ProtectedRoute roles={[UserRole.ADMIN, UserRole.SUPER_ADMIN]}>
            <ResearchTopicInsights />
          </ProtectedRoute>
        ),
      },
      {
        path: "training-selection",
        element: <TrainingSelectionPage />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute roles={[UserRole.SUPER_ADMIN, UserRole.ADMIN]}>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <AdminLandingPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <AdminLandingPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-research-and-developments",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateResearchAndDevelopmentPage />,
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-segment",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateLessonSegment />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-lesson",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateLessonPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-chapter",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateChapterPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-quiz",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateQuizPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-questions",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateQuestionPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-exam",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateExamPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-poll",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreatePollPage />
              </ProtectedRoute>
            ),
          },

          {
            path: "dashboard/create-podcast",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreatePodcastPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-webcast",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateWebcastPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-journal",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateArticlePage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-webinar",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateWebinarPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "dashboard/create-q-and-a-audio",
            element: (
              <ProtectedRoute roles={[UserRole.SUPER_ADMIN]}>
                <CreateQAndAudioPage />,
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "research-and-developments",
        element: (
          <ProtectedRoute>
            <ResearchAndDevelopmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "research-and-developments/:slug",
        element: (
          <ProtectedRoute>
            <ResearchAndDevelopmentDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "lessons",
        element: (
          <ProtectedRoute>
            <LessonsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "lessons/:lessonSlug",
        element: (
          <ProtectedRoute>
            <LessonDetailLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <LessonLandingPage />
              </ProtectedRoute>
            ),
          },
          {
            path: ":chapterSlug",
            element: (
              <ProtectedRoute>
                <ChapterDetailPage />
              </ProtectedRoute>
            ),
          },
        ],
      },

      {
        path: "quizzes",
        element: (
          <ProtectedRoute>
            <QuizzesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "exams",
        element: (
          <ProtectedRoute>
            <ExamAttemptPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "exams/attempt/:examId",
        element: (
          <ProtectedRoute>
            <ExamAttemptPage />
          </ProtectedRoute>
        ),
      },
      { path: "insights", element: <p>Hello worlds</p> },
      {
        path: "quizzes/attempt/:quizId",
        element: (
          <ProtectedRoute>
            <QuizAttemptPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "polls",
        element: (
          <ProtectedRoute>
            <PollsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "podcasts",
        element: (
          <ProtectedRoute>
            <PodcastsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "webcasts",
        element: (
          <ProtectedRoute>
            <WebcastPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "webcasts/:slug",
        element: (
          <ProtectedRoute>
            <WebcastDetailPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "journals",
        element: (
          <ProtectedRoute>
            <ArticlePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "journals/:slug",
        element: (
          <ProtectedRoute>
            <ArticleDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "q-and-a-audios",
        element: (
          <ProtectedRoute>
            <QAndAAudiosPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "webinars",
        element: (
          <ProtectedRoute>
            <WebinarsPage />
          </ProtectedRoute>
        ),
      },

      {
        path: "webinars/:slug",
        element: (
          <ProtectedRoute>
            <WebinarDetailPage />
          </ProtectedRoute>
        ),
      },

    ],
  },
  {
    path: "/social-mission",
    element: <SocialMissionPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },

  {
    path: "register",
    element: <SignUpPage />,
  },

  {
    path: "/verify-email",
    element: <VerifyEmailPage />,
  },
  {
    path: "/verify",
    element: <VerifyPage />,
  },
  {
    path: "onboarding",
    element: (
      <ProtectedRoute>
        <OnboardingPage />,
      </ProtectedRoute>
    ),
  },
  {
    path: "certificates/:certificateId",
    element: (
      <ProtectedRoute>
        <CertificatePage />
      </ProtectedRoute>
    ),
  },
]);

export default router;
