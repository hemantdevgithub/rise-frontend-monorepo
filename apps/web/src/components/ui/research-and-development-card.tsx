import moment from "moment";
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
interface item {
  id: string;
  title: string;
  thumbnail: {
    secure_url: string;
    public_url: string;
    public_id: string;
  };
  content: string;
  slug?: string;
  category: string;
  subCategory: string;
  authorId: string;
  createdAt: string;
}

const ResearchAndDevelopmentCard = ({ item }: { item: item }) => {
  const { title, thumbnail, category, slug, createdAt, id } = item || {};

  return (
    <Link
      key={id}
      state={{ id: id }}
      to={`/research-and-developments/${slug}`}
      className={`flex flex-col space-y-2 rounded-xl border bg-background p-4 font-poppins duration-300 hover:-translate-y-2 dark:bg-secondary`}
    >
      <img
        src={thumbnail?.public_url}
        alt=""
        className={`h-32 w-full rounded-t-md border object-cover`}
      />
      <div className="flex h-full flex-col justify-between gap-2">
        <div className="flex items-center gap-2 px-1 font-roboto font-semibold">
          <IoBookOutline className="text-xl" />
          <h2 className="truncate">{title}</h2>
        </div>
        <div className="flex items-center justify-between truncate px-1 text-xs text-gray-500 dark:text-foreground">
          <p>{moment(createdAt).format("DD MMM YY")}</p>
          <p className="text-xs first-letter:capitalize">{category}</p>
        </div>
      </div>
    </Link>
  );
};

export default ResearchAndDevelopmentCard;
