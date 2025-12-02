import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "success" | "error";
  title: string;
  message: string;
  onClose: () => void;
}

const ResultDialog = ({
  open,
  onOpenChange,
  type,
  title,
  message,
  onClose,
}: ResultDialogProps) => {
  const isSuccess = type === "success";
  const borderColor = isSuccess ? "border-green-500" : "border-red-500";
  const Icon = isSuccess ? CheckCircle2 : XCircle;
  const iconColor = isSuccess ? "text-green-500" : "text-red-500";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md bg-card border-2 ${borderColor}`}>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-foreground">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <Icon className={`w-20 h-20 ${iconColor}`} />
          <p className="text-center text-lg text-foreground">
            {message}
          </p>
          <Button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 mt-4"
          >
            Aceptar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialog;
