import { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, CheckCircle2, XCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface User {
  name: string;
  rut: string;
  address: string;
  phone: string;
  photo: string;
  recentLoans: string[];
  penalties: string;
}

interface Book {
  title: string;
  author: string;
  year: number;
  genre: string;
  copies: number;
  coverImage: string;
}

const LoanRegistry = () => {
  const [rutInput, setRutInput] = useState("");
  const [isbnInput, setIsbnInput] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [bookData, setBookData] = useState<Book | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  // Mock data - Simula una conexión a DB
  const mockUsers: Record<string, User> = {
    "152015144": {
      name: "Viktor Tapia",
      rut: "152015144",
      address: "Las lilas 101",
      phone: "982403417",
      photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      recentLoans: ["Papelucho", "Skibidi toilet vs tralateros", "Sigma vs chad"],
      penalties: "NO PRESENTA",
    },
    "187654321": {
      name: "María González",
      rut: "187654321",
      address: "Av. Principal 456",
      phone: "956789012",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      recentLoans: ["Harry Potter", "1984", "El Principito"],
      penalties: "1 atraso pendiente",
    },
  };

  const mockBooks: Record<string, Book> = {
    "29140151561": {
      title: "Los juegos del hambre",
      author: "Suzanne Collins",
      year: 2008,
      genre: "Aventura",
      copies: 3,
      coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
    },
    "9788478884452": {
      title: "1984",
      author: "George Orwell",
      year: 1949,
      genre: "Distopía",
      copies: 5,
      coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
    },
    "9780439708180": {
      title: "Harry Potter y la Piedra Filosofal",
      author: "J.K. Rowling",
      year: 1997,
      genre: "Fantasía",
      copies: 7,
      coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400",
    },
  };

  const handleSearchRut = () => {
    const user = mockUsers[rutInput];
    if (user) {
      setUserData(user);
    } else {
      setUserData(null);
    }
  };

  const handleSearchIsbn = () => {
    const book = mockBooks[isbnInput];
    if (book) {
      setBookData(book);
    } else {
      setBookData(null);
    }
  };

  const handleSubmit = () => {
    if (bookData && bookData.copies >= 1) {
      setShowSuccessDialog(true);
    } else {
      setShowErrorDialog(true);
    }
  };

  const handleCloseSuccessDialog = () => {
    setShowSuccessDialog(false);
    setRutInput("");
    setIsbnInput("");
    setUserData(null);
    setBookData(null);
  };

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
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
              {/* RUT Input - Always visible */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Ingresa el rut del usuario
                </label>
                <div className="flex gap-2">
                  <Input
                    value={rutInput}
                    onChange={(e) => setRutInput(e.target.value)}
                    placeholder="Ej: 152015144 o 187654321"
                    className="flex-1 bg-amber-100 border-none"
                  />
                  <Button
                    onClick={handleSearchRut}
                    size="icon"
                    className="bg-amber-100 hover:bg-amber-200 text-foreground"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  RUTs de prueba: 152015144, 187654321
                </p>
              </div>

              {/* ISBN Input - Only visible after user is found */}
              {userData && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Ingresa el ISBN / Nombre del material
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={isbnInput}
                        onChange={(e) => setIsbnInput(e.target.value)}
                        placeholder="Ej: 29140151561"
                        className="flex-1 bg-amber-100 border-none"
                      />
                      <Button
                        onClick={handleSearchIsbn}
                        size="icon"
                        className="bg-amber-100 hover:bg-amber-200 text-foreground"
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ISBNs de prueba: 29140151561, 9788478884452, 9780439708180
                    </p>
                  </div>

                  {/* Submit Button - Only visible after user is found */}
                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={!bookData}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 disabled:opacity-50"
                    >
                      Enviar
                    </Button>
                  </div>

                  {/* Book Information - Appears after ISBN search */}
                  {bookData && (
                    <Card className="p-4 bg-sky-200 border-none">
                      <div className="flex gap-4">
                        <img
                          src={bookData.coverImage}
                          alt={bookData.title}
                          className="w-24 h-32 object-cover rounded"
                        />
                        <div className="flex-1 space-y-1">
                          <h3 className="font-bold text-foreground">
                            Nombre: {bookData.title}
                          </h3>
                          <p className="text-sm text-foreground">
                            Autor: {bookData.author}
                          </p>
                          <p className="text-sm text-foreground">
                            Año publicación: {bookData.year}
                          </p>
                          <p className="text-sm text-foreground">
                            Género: {bookData.genre}
                          </p>
                          <p className="text-sm text-foreground">
                            Existencias: {bookData.copies}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                </>
              )}
            </div>

            {/* Right Section - User Information - Only visible after user is found */}
            {userData && (
              <Card className="p-6 bg-sky-200 border-none h-fit">
                <div className="flex gap-4 mb-4">
                  <img
                    src={userData.photo}
                    alt={userData.name}
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
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-amber-200 rounded p-3 space-y-1">
                    <p className="font-semibold text-sm text-foreground">Nombre:</p>
                    <p className="text-sm text-foreground">{userData.name}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Rut:</p>
                    <p className="text-sm text-foreground">{userData.rut}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Dirección:</p>
                    <p className="text-sm text-foreground">{userData.address}</p>
                    <p className="font-semibold text-sm text-foreground mt-2">Teléfono:</p>
                    <p className="text-sm text-foreground">{userData.phone}</p>
                  </div>
                  <div className="bg-amber-200 rounded p-3">
                    <p className="font-semibold text-sm text-foreground">Faltas</p>
                    <p className="text-sm text-foreground mt-1">{userData.penalties}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </Card>
      </main>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md bg-card border-2 border-green-500">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-foreground">
              Préstamo Registrado
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <CheckCircle2 className="w-20 h-20 text-green-500" />
            <p className="text-center text-lg text-foreground">
              El préstamo ha sido registrado correctamente
            </p>
            <Button
              onClick={handleCloseSuccessDialog}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 mt-4"
            >
              Aceptar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-md bg-card border-2 border-red-500">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold text-foreground">
              Error en el Préstamo
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6 space-y-4">
            <XCircle className="w-20 h-20 text-red-500" />
            <p className="text-center text-lg text-foreground">
              No hay existencias disponibles de este material
            </p>
            <Button
              onClick={handleCloseErrorDialog}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 mt-4"
            >
              Aceptar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LoanRegistry;
