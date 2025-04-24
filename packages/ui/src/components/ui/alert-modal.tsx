import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog";

import { FC } from "react";

type AlertModalProps = {
  title: string;
  description: string;
  isOpen: boolean;
  onOpen: () => void;
};
export const AlertModal: FC<AlertModalProps> = ({ description, isOpen, title, onOpen }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Ok</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
