import { UserRole } from "@/constants/roles";
import { cn } from "@/lib/utils";
import { selectUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
const portfolioMenus = [
  {
    label: "Dashboard",
    href: "/portfolio/dashboard",
    role: [
      UserRole.LEARNER,
      UserRole.ADMIN,
      UserRole.IMPACT_ENTITY,
      UserRole.RESEARCHER,
      UserRole.IMPACT_INVESTOR,
      UserRole.BUSINESS,
      UserRole.SUPER_ADMIN,
    ],
  },
  // Learner
  { label: "Courses", href: "/portfolio/courses", role: [UserRole.LEARNER] },
  { label: "Quizzes", href: "/portfolio/quizzes", role: [UserRole.LEARNER] },
  { label: "Exams", href: "/portfolio/exams", role: [UserRole.LEARNER] },
  { label: "Certificates", href: "/portfolio/exams", role: [UserRole.LEARNER] },
  { label: "Research", href: "/portfolio/research", role: [UserRole.LEARNER] },
  { label: "Journals", href: "/portfolio/journals", role: [UserRole.LEARNER] },
  // Instructor
  {
    label: "My Courses",
    href: "/portfolio/my-courses",
    role: [UserRole.RESEARCHER],
  },
  // Editor
  {
    label: "Courses",
    href: "/portfolio/editor-courses",
    role: [UserRole.IMPACT_ENTITY],
  },
  // Admin & Super admin
  {
    label: "Pending Courses",
    href: "/portfolio/pending-courses",
    role: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  },
  {
    label: "Research Topics",
    href: "/portfolio/research-topics",
    role: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.RESEARCHER],
  },
];

const PortfolioLayout = () => {
  const user = useAppSelector(selectUser);
  return (
    <div className="space-y-5">
      <ul className="flex w-fit items-center gap-5 rounded-lg border p-2">
        {portfolioMenus
          .filter((x) => user && x.role.includes(user.role))
          .map((el, i) => (
            <li key={i}>
              <NavLink
                className={({ isActive }) =>
                  cn("rounded-md px-5 py-1 text-sm", isActive && "bg-secondary")
                }
                to={el.href}
              >
                {el.label}
              </NavLink>
            </li>
          ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default PortfolioLayout;
