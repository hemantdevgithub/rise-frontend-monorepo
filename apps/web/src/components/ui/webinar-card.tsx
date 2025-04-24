import { TWebinar } from "@/types/webinar.types";
import moment from "moment";
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const WebinarCard = ({ item }: { item: TWebinar }) => {
  const { title, image, createdAt, slug } = item || {};
  return (
    <Link
      to={`/webinars/${slug}`}
      className="flex flex-col space-y-2 rounded-lg border bg-background p-2 duration-300 hover:-translate-y-3 dark:bg-secondary"
    >
      <img
        src={image?.secure_url}
        alt=""
        className="h-[150px] w-full rounded-t-sm object-cover"
      />
      <div className="flex h-full flex-col justify-between gap-3">
        <div className="flex items-center gap-2 px-1 font-roboto font-semibold">
          <IoBookOutline className="text-xl" />
          <h2>{title}</h2>
        </div>
        <div className="flex justify-between px-1">
          <p className="text-xs text-gray-500 dark:text-foreground">
            {moment(createdAt).format("DD MMMM yyyy")}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default WebinarCard;
