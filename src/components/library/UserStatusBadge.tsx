import { cn } from "@/lib/utils";

type UserStatus = "Activo" | "Sancionado" | "Inactivo";

interface UserStatusBadgeProps {
  status: UserStatus;
}

export const UserStatusBadge = ({ status }: UserStatusBadgeProps) => {
  const variants = {
    Activo: "bg-status-active text-status-active-foreground",
    Sancionado: "bg-status-sanctioned text-status-sanctioned-foreground",
    Inactivo: "bg-status-inactive text-status-inactive-foreground",
  };

  return (
    <span
      className={cn(
        "px-4 py-1 rounded-full text-sm font-medium",
        variants[status]
      )}
    >
      {status}
    </span>
  );
};
