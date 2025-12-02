import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchInput, UserInfoCard, BookInfoCard, ResultDialog } from "@/components/library";
import type { User, Book } from "@/types/library";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8009/api/v1";

const LoanRegistry = () => {
  const [rutInput, setRutInput] = useState("");
  const [isbnInput, setIsbnInput] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [bookData, setBookData] = useState<Book | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loadingRut, setLoadingRut] = useState(false);
  const [loadingIsbn, setLoadingIsbn] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const mapUserResponseToCard = (data: any): User => ({
    name: `${data.nombres ?? ""} ${data.apellidos ?? ""}`.trim() || data.email || "Usuario",
    rut: data.rut ?? rutInput,
    address: data.email ?? "Sin email registrado",
    phone: data.rol ? `Rol: ${data.rol}` : "Teléfono no disponible",
    photo: data.foto_url || "https://placehold.co/96x96?text=User",
    recentLoans: [],
    penalties: data.sancionado ? "Usuario sancionado" : "Sin sanciones",
  });

  const mapDocumentoToBookCard = (data: any): Book => ({
    title: data.titulo ?? "Título no disponible",
    author: data.autor ?? "Autor desconocido",
    year: data.anio ?? new Date(data.created_at || Date.now()).getFullYear(),
    genre: data.categoria || data.tipo || "Sin categoría",
    copies: 1,
    coverImage: "https://placehold.co/128x180?text=Libro",
    isbn: data.edicion,
  });

  const handleSearchRut = async () => {
    if (!rutInput.trim()) {
      toast.error("Ingresa un RUT para continuar");
      return;
    }

    setLoadingRut(true);
    setBookData(null);
    setIsbnInput("");

    try {
      const response = await fetch(
        `${API_BASE_URL}/usuarios/buscar-por-rut/${encodeURIComponent(rutInput.trim())}`
      );

      if (!response.ok) {
        setUserData(null);
        toast.error("No se encontró un usuario con ese RUT");
        return;
      }

      const data = await response.json();
      setUserData(mapUserResponseToCard(data));
      toast.success("Usuario encontrado");
    } catch (error) {
      console.error("Error al buscar usuario por RUT", error);
      toast.error("No se pudo buscar el usuario. Intenta nuevamente.");
    } finally {
      setLoadingRut(false);
    }
  };

  const handleSearchIsbn = async () => {
    if (!isbnInput.trim()) {
      toast.error("Ingresa un ISBN para continuar");
      return;
    }

    setLoadingIsbn(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/documentos/buscar-por-isbn/${encodeURIComponent(isbnInput.trim())}`
      );

      if (!response.ok) {
        setBookData(null);
        toast.error("No se encontró un material con ese ISBN");
        return;
      }

      const data = await response.json();
      setBookData(mapDocumentoToBookCard(data));
      toast.success("Material encontrado");
    } catch (error) {
      console.error("Error al buscar material por ISBN", error);
      toast.error("No se pudo buscar el material. Intenta nuevamente.");
    } finally {
      setLoadingIsbn(false);
    }
  };

  const handleSubmit = async () => {
    if (!userData || !bookData) {
      toast.error("Busca primero el usuario y el material");
      return;
    }

    setLoadingSubmit(true);
    try {
      const response = await fetch(`${API_BASE_URL}/prestamos/registrar-desde-rut-isbn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rut: rutInput.trim(),
          isbn: isbnInput.trim(),
          tipo_prestamo: "domicilio",
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.detail || "No se pudo registrar el préstamo");
      }

      setShowSuccessDialog(true);
      toast.success("Préstamo registrado");
    } catch (error) {
      console.error("Error al registrar préstamo", error);
      const msg = error instanceof Error ? error.message : "Error al registrar el préstamo";
      toast.error(msg);
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setRutInput("");
    setIsbnInput("");
    setUserData(null);
    setBookData(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <Card className="max-w-7xl mx-auto p-8 bg-card">
          <h1 className="text-3xl font-bold text-center text-foreground mb-8">
            Registro de Préstamos
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Section - Input Form */}
            <div className="space-y-6">
              <SearchInput
                label="Ingresa el rut del usuario"
                value={rutInput}
                onChange={setRutInput}
                onSearch={handleSearchRut}
                placeholder="Ej: 152015144 o 187654321"
                disabled={loadingRut}
                hint="Ingresa el RUT completo sin guión"
              />

              {userData && (
                <>
                  <SearchInput
                    label="Ingresa el ISBN / Nombre del material"
                    value={isbnInput}
                    onChange={setIsbnInput}
                    onSearch={handleSearchIsbn}
                    placeholder="Ej: 29140151561"
                    disabled={loadingIsbn}
                    hint="Busca por ISBN exacto"
                  />

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={!bookData || loadingSubmit}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 disabled:opacity-50"
                    >
                      {loadingSubmit ? "Registrando..." : "Enviar"}
                    </Button>
                  </div>

                  {bookData && <BookInfoCard book={bookData} />}
                </>
              )}
            </div>

            {/* Right Section - User Information */}
            {userData && <UserInfoCard user={userData} />}
          </div>
        </Card>
      </main>

      <ResultDialog
        open={showSuccessDialog}
        onOpenChange={setShowSuccessDialog}
        type="success"
        title="Préstamo Registrado"
        message="El préstamo ha sido registrado correctamente"
        onClose={handleCloseSuccessDialog}
      />

    </div>
  );
};

export default LoanRegistry;
