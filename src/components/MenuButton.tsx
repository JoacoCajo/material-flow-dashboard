import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MenuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const MenuButton = ({ children, onClick, className }: MenuButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "bg-menu-button hover:bg-menu-button/90 text-menu-foreground font-medium py-6 px-8 rounded-2xl shadow-sm transition-all hover:shadow-md",
        className
      )}
    >
      {children}
    </Button>
  );
};

export default MenuButton;
