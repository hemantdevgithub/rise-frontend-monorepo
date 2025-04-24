import { TQAndA } from "@/types/qAndA.types";
import moment from "moment";
import { FaMicrophoneAlt } from "react-icons/fa";

const QAndAAudioCard = ({ item }: { item: TQAndA }) => {
  const { title, createdAt, file } = item || {};
  return (
    <div className="flex items-center justify-between rounded-md border bg-background px-5 py-3 shadow-md dark:bg-secondary">
      <div className="flex items-center gap-10">
        <FaMicrophoneAlt className="text-4xl text-red-700 dark:text-foreground" />
        <div>
          <h3 className="font-roboto text-base text-red-700 dark:text-foreground">
            {title}
          </h3>
          <p className="text-xs">{moment(createdAt).format("DD MMMM yyyy")}</p>
        </div>
      </div>
      <audio controls>
        <source src={file.url} />
      </audio>
    </div>
  );
};

export default QAndAAudioCard;
