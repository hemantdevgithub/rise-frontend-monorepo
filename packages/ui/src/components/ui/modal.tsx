import { cn } from "@ui/lib/utils";
import React, { CSSProperties } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog";

interface ModalProps {
  title?: React.ReactNode;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  style?: CSSProperties;
}

export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  isOpen,
  onClose,
  children,
  className,
  headerClassName,
  style,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <div style={style}>
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent className={cn("p-0", className)}>
          <DialogHeader className={cn("bg-tommyRed sticky top-0 min-h-12 rounded-t-md p-2", headerClassName)}>
            {title && <DialogTitle className="my-auto ms-4 capitalize text-white">{title}</DialogTitle>}
            {description && <DialogDescription className="text-accent sticky">{description}</DialogDescription>}
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
