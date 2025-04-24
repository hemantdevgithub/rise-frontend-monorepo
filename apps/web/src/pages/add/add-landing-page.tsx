import HeadingText from "@/components/Shared/HeadingText";
import { UserRole } from "@/constants/roles";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";

const addMenus = [
  {
    label: "Add Lesson",
    href: "/add/add-lesson",
    role: [
      UserRole.IMPACT_ENTITY,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
      UserRole.RESEARCHER,
    ],
  },

  {
    href: "/add/add-chapter",
    label: "Add Chapter",
    role: [
      UserRole.IMPACT_ENTITY,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
      UserRole.RESEARCHER,
    ],
  },
  {
    label: "Add Quizzes",
    href: "/add/add-quiz",
    role: [
      UserRole.IMPACT_ENTITY,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
      UserRole.RESEARCHER,
    ],
  },
  {
    href: "/add/add-question",
    label: "Add Question",
    role: [
      UserRole.IMPACT_ENTITY,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
      UserRole.RESEARCHER,
    ],
  },
  {
    href: "/add/add-exam",
    label: "Add Exam",
    role: [
      UserRole.IMPACT_ENTITY,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
      UserRole.RESEARCHER,
    ],
  },
  {
    label: "Add Journal",
    href: "/add/add-journal",
    role: [
      UserRole.IMPACT_ENTITY,
      UserRole.LEARNER,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
    ],
  },
  {
    label: "Add Research Topic",
    href: "/add/add-research-topic",
    role: [UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
  {
    label: "Add Research",
    href: "/add/add-research",
    role: [
      UserRole.IMPACT_ENTITY,
      UserRole.ADMIN,
      UserRole.SUPER_ADMIN,
      UserRole.LEARNER,
    ],
  },

  {
    href: "/add/add-poll",
    label: "Add Poll",
    role: [UserRole.IMPACT_ENTITY, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },

  {
    href: "/add/add-webcast",
    label: "Add Webcast",
    role: [UserRole.IMPACT_ENTITY, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },

  {
    href: "/add/add-podcast",
    label: "Add Podcast",
    role: [UserRole.IMPACT_ENTITY, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },

  {
    href: "/add/add-webinar",
    label: "Add Webinar",
    role: [UserRole.IMPACT_ENTITY, UserRole.ADMIN, UserRole.SUPER_ADMIN],
  },
];

const AddLandingPage = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-auto flex w-2/3 flex-wrap justify-center gap-5">
        {addMenus
          .filter((el) => user && el.role.includes(user.role))
          .map((el, i) => (
            <Link key={i} to={el.href}>
              <div className="flex h-24 w-56 cursor-pointer flex-col items-center justify-center truncate rounded-3xl border-2 bg-background bg-gradient-to-br from-black via-white/10 to-black p-7 duration-500 hover:-translate-y-2 dark:bg-secondary">
                <HeadingText>{el.label}</HeadingText>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AddLandingPage;
