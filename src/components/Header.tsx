import { BookOpen, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Sesión cerrada correctamente");
    navigate("/auth");
  };

  return (
    <header className="bg-header-bg shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/gestion-material" className="flex items-center gap-3 group">
        <BookOpen
          className="w-10 h-10 text-primary group-hover:scale-105 transition-transform"
          strokeWidth={1.5}
        />
        <h1 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          Biblioteca de Estación Central
        </h1>
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <span className="text-sm text-foreground">Admin</span>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">A</span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-card z-50">
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Header;
