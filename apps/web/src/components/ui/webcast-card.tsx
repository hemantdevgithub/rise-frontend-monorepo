import { TWebcast } from "@/types/webcast.types";
import moment from "moment";
import { Link } from "react-router-dom";

const WebcastCard = ({ item }: { item: TWebcast }) => {
  const { title, slug, createdAt, image, id } = item || {};
  return (
    <Link
      key={id}
      state={{ id: id }}
      to={`/webcasts/${slug}`}
      className={`flex flex-col space-y-2 rounded-xl border bg-background p-4 font-poppins duration-300 hover:-translate-y-2 dark:bg-secondary`}
    >
      <img
        src={image?.url}
        alt=""
        className={`h-40 w-full rounded-t-md object-cover`}
      />
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-2 px-1 font-roboto font-semibold">
          <h2>{title}</h2>
        </div>
        <div className="flex justify-between px-1 text-sm text-gray-500 dark:text-foreground">
          <p>{moment(createdAt).format("DD MMMM yyyy")}</p>
        </div>
      </div>
    </Link>
  );
};

export default WebcastCard;
