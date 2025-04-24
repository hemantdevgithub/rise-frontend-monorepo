import { Paperclip } from "lucide-react";
import { FC } from "react";
type TFileDocumentProps = {
  fileUrl: string;
  fileName: string;
};
const FileDocument: FC<TFileDocumentProps> = ({ fileName, fileUrl }) => {
  const urlArray = fileUrl.split(".");
  const fileExtension = urlArray[urlArray.length - 1];
  return (
    <a href={fileUrl} target="_blank" className="flex items-center gap-2">
      <Paperclip size={14} className="mt-2" />
      <span className="text-[#0000EE]">{`${fileName}.${fileExtension}`}</span>
    </a>
  );
};

export default FileDocument;
