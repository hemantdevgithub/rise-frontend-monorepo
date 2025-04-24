import formatDateFromNow from "@/utility/formateDateFromNow";
import { FC } from "react";

interface TCommentCardProps {
  userInfo: { first_name: string; last_name: string };
  comment: {
    id: string;
    comment: string;
    contentId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
}
const CommentCard: FC<TCommentCardProps> = ({ userInfo, comment }) => {
  return (
    <div className="space-y-2 rounded-xl bg-background p-3 dark:bg-secondary">
      <div className="flex items-center gap-2">
        <img
          src={
            "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1"
          }
          className="size-8 rounded-full"
          alt=""
        />
        {/* <div className="size-10 rounded-full bg-tommyBlue"></div> */}
        <div>
          <p className="font-roboto text-sm text-tommyBlue">
            {userInfo?.first_name}
          </p>
          <p className="text-xs text-text">
            {formatDateFromNow(comment.createdAt)}
          </p>
        </div>
      </div>
      <p className="font-poppins text-sm text-text">{comment.comment}</p>
    </div>
  );
};

export default CommentCard;
