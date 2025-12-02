import { useState } from "react";
import { BookOpen, LogOut, Shield, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuthUser } from "@/hooks/useAuthUser";
import { clearToken } from "@/lib/auth";

const Header = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName =
    user?.nombres || user?.apellidos
      ? `${user?.nombres ?? ""} ${user?.apellidos ?? ""}`.trim()
      : "Usuario";
  const isAdmin = user?.rol === "admin";

  const handleLogout = () => {
    clearToken();
    setMenuOpen(false);
    toast.success("Sesión cerrada");
    navigate("/auth");
  };

  const handleUserClick = () => {
    if (!user) {
      navigate("/auth");
    }
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
      
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <button
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleUserClick}
            onMouseEnter={() => user && setMenuOpen(true)}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <div className="text-sm text-foreground text-right">
              <p className="font-medium leading-none">
                {isLoading ? "Cargando..." : displayName}
              </p>
              <p className="text-xs text-muted-foreground">
                {isLoading ? "" : user?.rol ? user.rol.toUpperCase() : "INVITADO"}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-primary-foreground" />
              ) : (
                <span className="text-sm font-medium text-primary-foreground">
                  {displayName.charAt(0) || "U"}
                </span>
              )}
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-card z-50"
          onMouseEnter={() => setMenuOpen(true)}
          onMouseLeave={() => setMenuOpen(false)}
        >
          <DropdownMenuLabel className="space-y-1">
            <div className="text-sm font-semibold">{displayName}</div>
            <div className="text-xs text-muted-foreground">{user?.email || "Sin sesión"}</div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isAdmin && (
            <DropdownMenuItem onClick={() => navigate("/")}>
              <Shield className="mr-2 h-4 w-4" />
              Opciones de administrador
            </DropdownMenuItem>
          )}
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
