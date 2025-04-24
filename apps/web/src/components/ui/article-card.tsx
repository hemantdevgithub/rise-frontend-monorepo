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

const ArticleCard = ({ item }: { item: item }) => {
  const { title, thumbnail, category, slug, createdAt, id } = item || {};

  return (
    <Link
      key={id}
      state={{ id: id }}
      to={`/journals/${slug}`}
      className={`flex flex-col space-y-2 rounded-md border bg-background p-4 font-poppins duration-100 hover:scale-105 dark:bg-secondary`}
    >
      <img
        src={thumbnail?.public_url}
        alt=""
        className={`h-[170px] w-full rounded-t-sm object-cover`}
      />
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center gap-2 px-1 font-roboto font-semibold">
          <IoBookOutline className="text-xl" />
          <h2>{title}</h2>
        </div>
        <div className="flex justify-between px-1 text-sm text-gray-500 dark:text-foreground">
          <p>{moment(createdAt).format("DD MMMM yyyy")}</p>
          <p className="first-letter:capitalize">{category}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
