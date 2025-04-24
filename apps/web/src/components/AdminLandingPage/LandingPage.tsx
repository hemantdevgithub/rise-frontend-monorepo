import HeadingText from "@/components/Shared/HeadingText";
import { Link } from "react-router-dom";

const AdminLandingPage = () => {
  const items = [
    {
      path: "/admin/dashboard/create-research-and-developments",
      label: "Create R & D",
    },

    {
      path: "/admin/dashboard/create-segment",
      label: "Create Segment",
    },
    {
      path: "/admin/dashboard/create-lesson",
      label: "Create Lesson",
    },
    {
      path: "/admin/dashboard/create-chapter",
      label: "Create Chapter",
    },

    {
      path: "/admin/dashboard/create-quiz",
      label: "Create Quizzes",
    },
    {
      path: "/admin/dashboard/create-exam",
      label: "Create Exam",
    },
    {
      path: "/admin/dashboard/create-questions",
      label: "Create Questions",
    },

    {
      path: "/admin/dashboard/create-journal",
      label: "Create Journal",
    },

    {
      path: "/admin/dashboard/create-poll",
      label: "Crete Poll",
    },

    {
      path: "/admin/dashboard/create-webcast",
      label: "Create Webcast",
    },

    {
      path: "/admin/dashboard/create-podcast",
      label: "Create Podcast",
    },

    {
      path: "/admin/dashboard/create-webinar",
      label: "Create Webinar",
    },

    {
      path: "/admin/dashboard/create-q-and-a-audio",
      label: "Create Q&A",
    },
  ];

  return (
    <div className="flex w-full items-center justify-center py-20">
      <div className="mx-auto grid w-[70%] grid-cols-3 gap-5">
        {items.map((item) => (
          <Link to={item.path}>
            <div className="flex cursor-pointer flex-col justify-between rounded-3xl border-2 bg-background p-7 duration-500 hover:bg-gray-50 dark:bg-secondary">
              <HeadingText>{item.label}</HeadingText>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminLandingPage;
