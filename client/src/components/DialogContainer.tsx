import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

interface DialogContainerProps {
  triggerButton: React.ReactNode;
  children: React.ReactNode;
  title: string;
}

export default function DialogContainer({
  triggerButton,
  children,
  title,
}: DialogContainerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className='mt-5'>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
