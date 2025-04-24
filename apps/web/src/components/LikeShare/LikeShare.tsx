import { onClose, selectIsOpen } from "@/redux/features/modal/modalSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Button, Modal } from "@repo/ui";
import { Copy } from "lucide-react";
import { FC, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RiThumbUpLine } from "react-icons/ri";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { toast } from "sonner";

interface LikeShareProps {}
const LikeShare: FC<LikeShareProps> = () => {
  const [selectedStar, setSelectedStar] = useState<number>(0);
  const isOpen = useAppSelector(selectIsOpen);
  const dispatch = useAppDispatch();
  const url = window.location.href;

  return (
    <>
      <div className="flex items-center justify-end rounded-md py-2">
        <div className="group relative hidden">
          <div className="top-0 flex h-full items-center gap-2">
            <RiThumbUpLine
              // onClick={() => dispatch(onOpen(""))}
              className="cursor-pointer text-xl text-tommyBlue"
            />
            <h4 className="font-roboto text-lg font-semibold text-tommyBlue">
              100
            </h4>
          </div>
          <Modal
            isOpen={isOpen}
            onClose={() => dispatch(onClose())}
            title={"Share your rating"}
            headerClassName="text-white flex item-center justify-center"
          >
            <div className="flex h-full items-center justify-center pb-4 text-5xl *:cursor-pointer">
              {[...Array(5)].map((_, index) => (
                <FaStar
                  onClick={() => {
                    setSelectedStar(index + 1);
                    dispatch(onClose());
                  }}
                  onMouseOver={() => setSelectedStar(index + 1)}
                  onMouseOut={() => setSelectedStar(0)}
                  className={`${index + 1 <= selectedStar ? "text-tommyYellow" : ""}`}
                />
              ))}
            </div>
          </Modal>
        </div>
        <div className="relative flex items-center space-x-2">
          <FacebookShareButton url={url}>
            <FacebookIcon size={30} />
          </FacebookShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={30} />
          </WhatsappShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={30} />
          </TwitterShareButton>
          <TelegramShareButton url={url}>
            <TelegramIcon size={30} />
          </TelegramShareButton>
          <Button
            onClick={() => {
              window.navigator.clipboard.writeText(url);
              toast.success("Copied to clipboard.", { duration: 2000 });
            }}
            size={"icon"}
            variant={"outline"}
          >
            <Copy size={16} />
          </Button>
        </div>
      </div>
    </>
  );
};

export default LikeShare;
