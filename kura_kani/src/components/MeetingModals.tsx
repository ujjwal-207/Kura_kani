import { ReactNode } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  instantMeeting?: boolean;
  image?: string;
  buttonClassName?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText,

  image,

  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-[#FFFDEC] rk px-6 py-9 text-black ">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <img src={image} alt="checked" width={72} height={72} />
            </div>
          )}
          <DialogTitle></DialogTitle>
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>

          {children}
          <Button
            className={" focus-visible:ring-0 focus-visible:ring-offset-0"}
            onClick={handleClick}
          >
            {buttonIcon && (
              <img src={buttonIcon} alt="button icon" width={13} height={13} />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
