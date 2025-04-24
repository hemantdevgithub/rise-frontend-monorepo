import { FaPlus, FaSearch, FaShare, FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { IconType } from "react-icons/lib";

type SidebarItem = {
  title: string;
  url: string;
  icon?: IconType;
  isActive?: boolean;
  items?: SidebarItem[];
};

export const sidebarItems: SidebarItem[] = [
  { title: "Portfolio", url: "/portfolio", icon: FaUser },
  { title: "Add", url: "/add", icon: FaPlus },
  { title: "Search", url: "/search", icon: FaSearch },
  { title: "Refer", url: "/refer", icon: FaShare },
  { title: "Settings", url: "/profile", icon: FaGear },
];
// export const sidebarItems: SidebarItem[] = [
//   {
//     title: "Social Mission",
//     url: "/social-mission",
//     icon: FaRegFileAlt,
//   },
//   {
//     title: "Course Pathways",
//     url: "/course-pathways",
//     icon: FaRegFileAlt,
//   },
//   {
//     title: "Lessons",
//     url: "/lessons",
//     icon: FaRegFileAlt,
//   },
//   {
//     title: "Research and Journals",
//     url: "/research-and-developments",
//     icon: FaBookOpen,
//   },
//   {
//     title: "Exams",
//     url: "/exams",
//     icon: AiOutlineFileText,
//   },
//   {
//     title: "Quizzes",
//     url: "/quizzes",
//     icon: FaChalkboardTeacher,
//   },
//   {
//     title: "Polls",
//     url: "/polls",
//     icon: FaChartBar,
//   },
//   // {
//   //   title: "Insights",
//   //   url: "/insights",
//   //   icon: FaRegLightbulb,
//   // },
//   {
//     title: "Podcasts",
//     url: "/podcasts",
//     icon: FaPodcast,
//   },
//   {
//     title: "Webcasts",
//     url: "/webcasts",
//     icon: FaVideo,
//   },
//   {
//     title: "Journals",
//     url: "/journals",
//     icon: FaRegNewspaper,
//   },
//   {
//     title: "Q & A Audio",
//     url: "q-and-a-audios",
//     icon: FaMicrophone,
//   },
//   {
//     title: "Webinars",
//     url: "/webinars",
//     icon: FaBroadcastTower,
//   },
//   // {
//   //   title: "VIP Networking",
//   //   url: "/vip-networking",
//   //   icon: FaUsers,
//   // },
// ];
