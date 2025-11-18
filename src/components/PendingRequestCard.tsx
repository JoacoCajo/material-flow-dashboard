import { cn } from "@/lib/utils";

interface PendingRequestCardProps {
  title: string;
  duration: string;
  className?: string;
}

const PendingRequestCard = ({ title, duration, className }: PendingRequestCardProps) => {
  return (
    <div
      className={cn(
        "bg-request-item rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <p className="text-sm font-medium text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{duration}</p>
    </div>
  );
};

export default PendingRequestCard;
