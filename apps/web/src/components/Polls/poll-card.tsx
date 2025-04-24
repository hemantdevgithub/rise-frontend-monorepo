import { onClose, selectIsOpen } from "@/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { TPoll } from "@/types/poll.type";
import {
  Button, Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Modal
} from "@repo/ui";
import { useState } from "react";
import PollModalContent from "./poll-modal-content";
import PollStatisticsContent from "./poll-statistics-content";

const PollCard = ({
  item,
  isAnswered,
}: {
  item: TPoll;
  isAnswered: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border bg-background p-3 shadow-md dark:bg-secondary">
        <img src="/Icons/yes.png" className="size-[30px]" alt="" />
        <h3 className="text-center font-roboto text-sm font-semibold">
          {item.question}
        </h3>
        <Button
          // disabled={isAnswered}
          onClick={() => setOpen((prev) => !prev)}
          className="w-full px-5"
          size={"sm"}
          variant={isAnswered ? "success" : "outline"}
        >
          {isAnswered ? "Show Statistics" : "Add Your Opinion"}
        </Button>
      </div>
      <Modal
        className="min-w-[600px] bg-gray-100"
        isOpen={isOpen}
        onClose={() => dispatch(onClose())}
        title={
          isAnswered ? `Statistics Of ${item.question}` : "Share your opinion"
        }
      >
        {isAnswered ? (
          <PollStatisticsContent pollId={item.id} />
        ) : (
          <PollModalContent poll={item} />
        )}
      </Modal>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              {isAnswered
                ? `Statistics Of ${item.question}`
                : "Share your opinion"}
            </DialogTitle>
          </DialogHeader>
          {isAnswered ? (
            <PollStatisticsContent pollId={item.id} />
          ) : (
            <PollModalContent poll={item} />
          )}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PollCard;
