import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Calendar, AlertCircle } from "lucide-react";
import { useAuthUser } from "@/hooks/useAuthUser";
import { getToken } from "@/lib/auth";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

interface Loan {
  id: number;
  libro_id: number;
  libro_titulo: string;
  libro_autor: string;
  libro_portada?: string;
  fecha_prestamo: string;
  fecha_devolucion_esperada: string;
  fecha_devolucion_real?: string;
  estado: string;
}

const MyLoans = () => {
  const navigate = useNavigate();
  const { data: user, isLoading: userLoading } = useAuthUser();
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoans = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE_URL}/prestamos/mis-prestamos`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error("No se pudieron cargar los préstamos");
        }

        const data = await res.json();
        setLoans(data?.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar préstamos");
      } finally {
        setLoading(false);
      }
    };

    if (!userLoading) {
      fetchLoans();
    }
  }, [userLoading]);

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Mis Préstamos</h1>
        </div>

        {loading || userLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <Card className="p-6 text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-destructive mb-4" />
            <p className="text-muted-foreground">{error}</p>
          </Card>
        ) : loans.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">
              No tienes préstamos activos
            </h2>
            <p className="text-muted-foreground">
              Cuando solicites un libro, aparecerá aquí.
            </p>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loans.map((loan) => (
              <Card key={loan.id} className="p-4 flex gap-4">
                <div className="w-20 h-28 bg-muted rounded flex items-center justify-center flex-shrink-0">
                  {loan.libro_portada ? (
                    <img
                      src={loan.libro_portada}
                      alt={loan.libro_titulo}
                      className="w-full h-full object-cover rounded"
                    />
                  ) : (
                    <BookOpen className="h-8 w-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {loan.libro_titulo}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {loan.libro_autor}
                  </p>
                  <div className="mt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>Prestado: {new Date(loan.fecha_prestamo).toLocaleDateString()}</span>
                    </div>
                    <div className={`flex items-center gap-1 ${
                      !loan.fecha_devolucion_real && isOverdue(loan.fecha_devolucion_esperada)
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }`}>
                      <Calendar className="h-3 w-3" />
                      <span>
                        Devolución: {new Date(loan.fecha_devolucion_esperada).toLocaleDateString()}
                        {!loan.fecha_devolucion_real && isOverdue(loan.fecha_devolucion_esperada) && " (Vencido)"}
                      </span>
                    </div>
                  </div>
                  <span className={`inline-block mt-2 px-2 py-0.5 text-xs rounded-full ${
                    loan.estado === "devuelto"
                      ? "bg-green-100 text-green-700"
                      : loan.estado === "activo"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {loan.estado}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyLoans;
