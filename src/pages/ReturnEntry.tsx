import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchInput, ResultDialog } from "@/components/library";
import type { LoanRecord, User } from "@/types/library";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

const ReturnEntry = () => {
  const [rutInput, setRutInput] = useState("");
  const [isbnInput, setIsbnInput] = useState("");
  const [loanData, setLoanData] = useState<LoanRecord | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingIsbn, setLoadingIsbn] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

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
      copies: doc.existencias ?? 0,
      userName: `${usuario.nombres ?? ""} ${usuario.apellidos ?? ""}`.trim() || "Usuario",
      userRut: usuario.rut ?? "",
      userAddress: usuario.email ?? "Email no disponible",
      userPhone: usuario.rol ? `Rol: ${usuario.rol}` : "",
      userPhoto: "https://placehold.co/96x96?text=User",
      userRecentLoans: [],
      userPenalties: usuario.sancionado ? "Usuario sancionado" : "Sin sanciones",
      loanDate: fechaPrestamo.toLocaleDateString(),
      dueDate: fechaDevolucion ? fechaDevolucion.toLocaleDateString() : "No definida",
      isOverdue,
    };
  };

  const mapUserResponseToCard = (data: any): User => ({
    name: `${data.nombres ?? ""} ${data.apellidos ?? ""}`.trim() || data.email || "Usuario",
    rut: data.rut ?? rutInput,
    address: data.email ?? "Sin email registrado",
    phone: data.rol ? `Rol: ${data.rol}` : "",
    photo: data.foto_url || "https://placehold.co/96x96?text=User",
    recentLoans: [],
    penalties: data.sancionado ? "Usuario sancionado" : "Sin sanciones",
  });

  const handleSearchRut = async () => {
    if (!rutInput.trim()) {
      toast.error("Ingresa un RUT para continuar");
      return;
    }
    setLoadingUser(true);
    try {
      const res = await fetch(
        `${API_BASE_URL}/usuarios/buscar-por-rut/${encodeURIComponent(rutInput.trim())}`
      );
      if (!res.ok) {
        setUserData(null);
        throw new Error("No se encontró un usuario con ese RUT");
      }
      const data = await res.json();
      setUserData(mapUserResponseToCard(data));
      toast.success("Usuario encontrado");
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Error al buscar usuario";
      toast.error(msg);
    } finally {
      setLoadingUser(false);
    }
  };

  const handleSearchIsbn = async () => {
    if (!isbnInput.trim()) {
      toast.error("Ingresa un ISBN para continuar");
      return;
    }

    setLoadingIsbn(true);
    setLoanData(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/documentos/buscar-por-isbn/${encodeURIComponent(isbnInput.trim())}`
      );

      if (!response.ok) {
        toast.error("No se encontró un material con ese ISBN");
        return;
      }

      const data = await response.json();
      setLoanData({
        isbn: data.edicion ?? "",
        bookTitle: data.titulo ?? "Título no disponible",
        bookAuthor: data.autor ?? "Autor desconocido",
        bookYear: data.anio ?? new Date().getFullYear(),
        bookGenre: data.categoria ?? "Sin categoría",
        bookCover: "https://placehold.co/128x180?text=Libro",
        copies: data.existencias ?? 0,
        userName: userData?.name ?? "",
        userRut: userData?.rut ?? "",
        userAddress: userData?.address ?? "",
        userPhone: userData?.phone ?? "",
        userPhoto: userData?.photo ?? "https://placehold.co/96x96?text=User",
        userRecentLoans: userData?.recentLoans ?? [],
        userPenalties: userData?.penalties ?? "",
        loanDate: "",
        dueDate: "",
        isOverdue: false,
      });
      toast.success("Material encontrado");
    } catch (error) {
      console.error("Error al buscar material por ISBN", error);
      toast.error("No se pudo buscar el material. Intenta nuevamente.");
    } finally {
      setLoadingIsbn(false);
    }
  };

  const handleSubmit = async () => {
    if (!rutInput.trim() || !isbnInput.trim()) {
      toast.error("Ingresa RUT e ISBN");
      return;
    }
    setLoadingSubmit(true);
    try {
      const res = await fetch(`${API_BASE_URL}/prestamos/devolver-por-rut-isbn`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rut: rutInput.trim(), isbn: isbnInput.trim() }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.detail || "No se pudo registrar la devolución");
      }

      const data = await res.json();
      const mapped = mapResponseToLoan(data);
      setLoanData(mapped);
      setUserData((prev) =>
        prev
          ? { ...prev, recentLoans: [mapped.bookTitle, ...(prev.recentLoans || [])].slice(0, 3) }
          : prev
      );
      setShowSuccessDialog(true);
      toast.success("Devolución registrada");
    } catch (error) {
      console.error(error);
      const msg = error instanceof Error ? error.message : "Error al registrar la devolución";
      toast.error(msg);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    setIsbnInput("");
    setRutInput("");
    setLoanData(null);
    setUserData(null);
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
                label="Ingresa el rut del usuario"
                value={rutInput}
                onChange={setRutInput}
                onSearch={handleSearchRut}
                placeholder="Ej: 152015144 o 187654321"
                hint="RUT sin guión"
                disabled={loadingUser}
              />

              {userData && (
                <>
                  <SearchInput
                    label="Ingresa el ISBN / Nombre del material"
                    value={isbnInput}
                    onChange={setIsbnInput}
                    onSearch={handleSearchIsbn}
                    placeholder="Ej: 29140151561"
                    hint="Busca por ISBN exacto"
                    disabled={loadingIsbn}
                  />

                  <div className="flex justify-center">
                    <Button
                      onClick={handleSubmit}
                      disabled={loadingSubmit || !isbnInput}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 disabled:opacity-50"
                    >
                      {loadingSubmit ? "Procesando..." : "Enviar"}
                    </Button>
                  </div>
                </>
              )}

              {loanData && (
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
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">Existencias:</span> {loanData.copies}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Right Section - User Information */}
            {loanData && userData && (
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
                    {userData.recentLoans.map((loan, index) => (
                      <p key={index} className="text-xs text-foreground">
                        • {loan}
                      </p>
                    ))}
                    {userData.recentLoans.length === 0 && (
                      <p className="text-xs text-muted-foreground">Sin registros</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-200 rounded p-3 space-y-1">
                    <p className="font-semibold text-sm text-foreground">Nombre:</p>
                    <p className="text-sm text-foreground">{loanData.userName}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Rut:</p>
                    <p className="text-sm text-foreground">{loanData.userRut}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Correo:</p>
                    <p className="text-sm text-foreground">{loanData.userAddress}</p>
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
