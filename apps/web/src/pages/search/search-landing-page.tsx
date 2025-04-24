import HeadingText from "@/components/Shared/HeadingText";
import { Link } from "react-router-dom";

const searchMenus = [
  { label: "Lessons / Courses", href: "/search/lessons" },
  { label: "Quizzes", href: "/search/quizzes" },
  // { label: "Exams", href: "/search/exams" },
  { label: "Research Topics", href: "/search/research-topics" },
  { label: "Research", href: "/search/research" },
  { label: "Journals", href: "/search/journals" },
  { label: "Polls", href: "/search/polls" },
  { label: "Podcasts", href: "/search/podcasts" },
  { label: "Webcasts", href: "/search/webcasts" },
  { label: "Webinars", href: "/search/webinars" },
];
const SearchLandingPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mx-auto flex w-2/3 flex-wrap justify-center gap-5">
        {searchMenus.map((el, i) => (
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

export default SearchLandingPage;
