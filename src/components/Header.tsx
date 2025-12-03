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
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";
const Header = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useAuthUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName =
    user?.nombres || user?.apellidos
      ? `${user?.nombres ?? ""} ${user?.apellidos ?? ""}`.trim()
      : user?.email?.split("@")[0] || "Invitado";
  const isAdmin = user?.rol === "admin";
  const isLogged = Boolean(user);

  const { data: loans, isFetching: loadingLoans, isError: loansError } = useQuery({
    queryKey: ["user-loans", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const res = await fetch(
        `${API_BASE_URL}/prestamos/usuarios/${user.id}/historial`
      );
      if (!res.ok) throw new Error("No se pudieron cargar los préstamos");
      return res.json();
    },
    enabled: Boolean(user?.id && menuOpen),
  });

  const handleLogout = () => {
    clearToken();
    setMenuOpen(false);
    toast.success("Sesión cerrada");
    navigate("/");
  };

  return (
    <header className="bg-header-bg shadow-sm px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 group">
        <BookOpen
          className="w-10 h-10 text-primary group-hover:scale-105 transition-transform"
          strokeWidth={1.5}
        />
        <h1 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          Biblioteca de Estación Central
        </h1>
      </Link>
      
      {isLogged ? (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
              onMouseEnter={() => setMenuOpen(true)}
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
              <DropdownMenuItem onClick={() => navigate("/admin")}>
                <Shield className="mr-2 h-4 w-4" />
                Opciones de administrador
              </DropdownMenuItem>
            )}
            {!isAdmin && (
              <div className="px-3 py-2 text-xs space-y-1">
                <div className="text-muted-foreground font-semibold">Mis préstamos</div>
                {loadingLoans && <div className="text-foreground">Cargando...</div>}
                {loansError && <div className="text-destructive">No se pudieron cargar los préstamos</div>}
                {!loadingLoans && !loansError && (() => {
                  const list = Array.isArray(loans) ? loans : [];
                  const activos = list.filter((p: any) => {
                    const estado = p.estado && p.estado.value ? p.estado.value : p.estado;
                    return estado === "activo" || estado === "ACTIVO";
                  });
                  if (activos.length === 0) {
                    return <div className="text-muted-foreground">Sin préstamos activos</div>;
                  }
                  return (
                    <div className="space-y-1">
                      <div className="text-foreground font-semibold">
                        Activos: {activos.length}
                      </div>
                      {activos.slice(0, 3).map((p: any) => {
                        const fechaDev = p.fecha_devolucion_estimada
                          ? String(p.fecha_devolucion_estimada).slice(0, 10)
                          : "sin fecha";
                        return (
                          <div key={p.id || `${p.fecha_prestamo}-${fechaDev}`} className="text-foreground">
                            • #{p.id ?? "?"} (dev: {fechaDev})
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>
            )}
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="ghost" onClick={() => navigate("/auth")}>
          Iniciar sesión
        </Button>
      )}
    </header>
  );
};

export default Header;
