import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchInput, ResultDialog } from "@/components/library";
import type { LoanRecord } from "@/types/library";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

const ReturnEntry = () => {
  const [isbnInput, setIsbnInput] = useState("");
  const [loanData, setLoanData] = useState<LoanRecord | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const mapResponseToLoan = (resp: any): LoanRecord => {
    const prestamo = resp.prestamo ?? {};
    const usuario = resp.usuario ?? {};
    const doc = resp.documento ?? {};

    const fechaPrestamo = prestamo.fecha_prestamo ? new Date(prestamo.fecha_prestamo) : new Date();
    const fechaDevolucion = prestamo.fecha_devolucion_estimada
      ? new Date(prestamo.fecha_devolucion_estimada)
      : null;

    const isOverdue =
      resp.vencido ||
      (fechaDevolucion ? fechaDevolucion.getTime() < Date.now() : false) ||
      prestamo.estado === "vencido";

    return {
      isbn: doc.edicion ?? "",
      bookTitle: doc.titulo ?? "Título no disponible",
      bookAuthor: doc.autor ?? "Autor desconocido",
      bookYear: doc.anio ?? new Date().getFullYear(),
      bookGenre: doc.categoria ?? "Sin categoría",
      bookCover: "https://placehold.co/128x180?text=Libro",
      copies: 1,
      userName: `${usuario.nombres ?? ""} ${usuario.apellidos ?? ""}`.trim() || "Usuario",
      userRut: usuario.rut ?? "",
      userAddress: usuario.email ?? "Email no disponible",
      userPhone: usuario.rol ? `Rol: ${usuario.rol}` : "Teléfono no disponible",
      userPhoto: "https://placehold.co/96x96?text=User",
      userRecentLoans: [],
      userPenalties: usuario.sancionado ? "Usuario sancionado" : "Sin sanciones",
      loanDate: fechaPrestamo.toLocaleDateString(),
      dueDate: fechaDevolucion ? fechaDevolucion.toLocaleDateString() : "No definida",
      isOverdue,
    };
  };

  const handleSearchIsbn = async () => {
    if (!isbnInput.trim()) {
      toast.error("Ingresa un ISBN para continuar");
      return;
    }

    setLoadingSearch(true);
    setLoanData(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/prestamos/buscar-por-isbn/${encodeURIComponent(isbnInput.trim())}`
      );

      if (!response.ok) {
        toast.error("No se encontró un préstamo para ese ISBN");
        return;
      }

      const data = await response.json();
      setLoanData(mapResponseToLoan(data));
      toast.success("Préstamo encontrado");
    } catch (error) {
      console.error("Error al buscar préstamo por ISBN", error);
      toast.error("No se pudo buscar el préstamo. Intenta nuevamente.");
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleSubmit = () => {
    setShowSuccessDialog(true);
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    setIsbnInput("");
    setLoanData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="max-w-7xl mx-auto p-8 bg-card">
          <h1 className="text-3xl font-bold text-center text-foreground mb-8">
            Ingreso de devoluciones
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section - Input and Book Details */}
            <div className="space-y-6">
              <SearchInput
                label="Ingresa el ISBN / Nombre del material"
                value={isbnInput}
                onChange={setIsbnInput}
                onSearch={handleSearchIsbn}
                placeholder="Ej: 29140151561"
                hint="Busca por ISBN exacto"
                disabled={loadingSearch}
              />

              {loanData && (
                <>
                  <div className="flex justify-center">
                    <Button
                      onClick={handleSubmit}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                    >
                      Enviar
                    </Button>
                  </div>

                  <Card className="p-6 bg-amber-200 border-none">
                    <div className="flex gap-4 mb-4">
                      <img
                        src={loanData.bookCover}
                        alt={loanData.bookTitle}
                        className="w-24 h-32 object-cover rounded"
                      />
                      <div className="flex-1 space-y-1">
                        <h3 className="font-bold text-foreground text-lg mb-2">
                          Detalles
                        </h3>
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">Nombre:</span> {loanData.bookTitle}
                        </p>
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">ISBN:</span> {loanData.isbn}
                        </p>
                        <p className="text-sm text-foreground">
                          <span className="font-semibold">Autor:</span> {loanData.bookAuthor}
                        </p>
                      </div>
                    </div>
                  </Card>

                  {loanData.isOverdue && (
                    <Card className="p-4 bg-red-200 border-none">
                      <div className="text-center space-y-2">
                        <h3 className="font-bold text-foreground text-lg">
                          APLICA MULTA
                        </h3>
                        <p className="text-sm font-medium text-foreground">
                          RAZÓN: MATERIAL NO DEVUELTO A TIEMPO
                        </p>
                        <p className="text-xs text-foreground font-semibold">
                          DETALLES
                        </p>
                        <p className="text-xs text-foreground">
                          FECHA LÍMITE {loanData.loanDate} / FECHA ENTREGA {loanData.dueDate}
                        </p>
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>

            {/* Right Section - User Information */}
            {loanData && (
              <Card className="p-6 bg-sky-200 border-none h-fit">
                <div className="flex gap-4 mb-4">
                  <img
                    src={loanData.userPhoto}
                    alt={loanData.userName}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 bg-amber-200 rounded p-3 space-y-1">
                    <h4 className="font-semibold text-foreground text-sm">
                      Últimos prestamos
                    </h4>
                    {loanData.userRecentLoans.map((loan, index) => (
                      <p key={index} className="text-xs text-foreground">
                        • {loan}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-200 rounded p-3 space-y-1">
                    <p className="font-semibold text-sm text-foreground">Nombre:</p>
                    <p className="text-sm text-foreground">{loanData.userName}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Rut:</p>
                    <p className="text-sm text-foreground">{loanData.userRut}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Dirección:</p>
                    <p className="text-sm text-foreground">{loanData.userAddress}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Teléfono:</p>
                    <p className="text-sm text-foreground">{loanData.userPhone}</p>
                  </div>
                  <div className="bg-amber-200 rounded p-3">
                    <p className="font-semibold text-sm text-foreground">Faltas</p>
                    <p className="text-sm text-foreground mt-1">{loanData.userPenalties}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </main>

      <ResultDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        type="success"
        title="Devolución Exitosa"
        message="El material ha sido devuelto correctamente"
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default ReturnEntry;
