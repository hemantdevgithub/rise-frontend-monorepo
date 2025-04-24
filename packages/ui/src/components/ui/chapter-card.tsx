import { TChapter } from "@/types/lesson.type";
import { IoBookOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "./button";

const ChapterCard = ({ item, lessonSlug }: { item: TChapter; lessonSlug: string }) => {
  const { chapterTitle, image, slug, id } = item || {};

  console.log(item);

  return (
    <Link
      key={id}
      state={{ id: id }}
      to={`/lessons/${lessonSlug}/${slug}`}
      className={`font-poppins flex flex-col space-y-2 rounded-md border border-b-4 bg-white p-4 duration-100`}
    >
      <img src={image?.url} alt="" className={`h-[100px] w-full rounded-t-sm object-cover`} />
      <hr />
      <div className="flex h-full flex-col justify-between gap-2">
        <div className="font-roboto flex items-center gap-2 px-1 font-semibold">
          <IoBookOutline className="text-xl" />
          <h2>{chapterTitle}</h2>
        </div>
        <Button size={"sm"} className="w-full" variant={"outline"}>
          Read More
        </Button>
      </div>
    </Link>
  );
};
export default ChapterCard;
