import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, FileText, FileWarning } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    total_libros: 0,
    usuarios_registrados: 0,
    prestamos_activos: 0,
    prestamos_atrasados: 0,
  });
  const [loadingStats, setLoadingStats] = useState(false);

  const handleAddEditMaterial = () => {
    navigate("/gestion-material");
  };

  const handleLoanRegistry = () => {
    navigate("/registro-prestamo");
  };

  const handleReturnEntry = () => {
    navigate("/ingreso-devolucion");
  };

  const cards = [
    {
      label: "Total de Libros",
      value: stats.total_libros,
      icon: <BookOpen className="w-6 h-6 text-sky-600" />,
      bg: "bg-sky-50",
    },
    {
      label: "Usuarios Registrados",
      value: stats.usuarios_registrados,
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      bg: "bg-emerald-50",
    },
    {
      label: "Préstamos Activos",
      value: stats.prestamos_activos,
      icon: <FileText className="w-6 h-6 text-blue-700" />,
      bg: "bg-blue-50",
    },
    {
      label: "Préstamos Atrasados",
      value: stats.prestamos_atrasados,
      icon: <FileWarning className="w-6 h-6 text-red-600" />,
      bg: "bg-red-50",
    },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);
      try {
        const res = await fetch(`${API_BASE_URL}/dashboard/stats`);
        if (!res.ok) {
          throw new Error("No se pudieron obtener las estadísticas");
        }
        const data = await res.json();
        setStats({
          total_libros: data.total_libros ?? 0,
          usuarios_registrados: data.usuarios_registrados ?? 0,
          prestamos_activos: data.prestamos_activos ?? 0,
          prestamos_atrasados: data.prestamos_atrasados ?? 0,
        });
      } catch (error) {
        console.error("Error al cargar estadísticas", error);
        toast.error("No se pudieron cargar las estadísticas del dashboard");
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">¡Hola Admin!</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Menu Section */}
            <div className="space-y-6">
              <Button
                variant="ghost"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 px-8 rounded-2xl w-full shadow-sm"
                disabled
              >
                Menú
              </Button>
              
              <div className="space-y-4 flex flex-col items-center">
                <MenuButton onClick={handleAddEditMaterial}>
                  Añadir / editar material
                </MenuButton>
                
                <MenuButton onClick={handleLoanRegistry}>
                  Registro de préstamo
                </MenuButton>
                
                <MenuButton onClick={handleReturnEntry}>
                  Ingreso devolución
                </MenuButton>
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-6">
              <Button
                variant="ghost"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 px-8 rounded-2xl w-full shadow-sm"
                disabled
              >
                Resumen
              </Button>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cards.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4 p-5">
                      <div className={`${item.bg} rounded-xl p-3 flex items-center justify-center`}>
                        {item.icon}
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-foreground">
                          {loadingStats ? "..." : item.value}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
