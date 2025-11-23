import { useState } from "react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

interface LoanRecord {
  isbn: string;
  bookTitle: string;
  bookAuthor: string;
  bookYear: number;
  bookGenre: string;
  bookCover: string;
  userName: string;
  userRut: string;
  userAddress: string;
  userPhone: string;
  userPhoto: string;
  userRecentLoans: string[];
  userPenalties: string;
  loanDate: string;
  dueDate: string;
  isOverdue: boolean;
}

const ReturnEntry = () => {
  const [isbnInput, setIsbnInput] = useState("");
  const [loanData, setLoanData] = useState<LoanRecord | null>(null);

  // Mock data - Simula préstamos activos
  const mockActiveLoans: Record<string, LoanRecord> = {
    "29140151561": {
      isbn: "29140151561",
      bookTitle: "Los Juegos del hambre",
      bookAuthor: "Suzanne Collinsh",
      bookYear: 2008,
      bookGenre: "Aventura",
      bookCover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
      userName: "Viktor Tapia",
      userRut: "152015144",
      userAddress: "Las lilas 101",
      userPhone: "982403417",
      userPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      userRecentLoans: ["Papelucho", "Skibidi toilet vs tralateros", "Sigma vs chad"],
      userPenalties: "NO PRESENTA",
      loanDate: "03/09/25",
      dueDate: "03/09/2026",
      isOverdue: true,
    },
    "9788478884452": {
      isbn: "9788478884452",
      bookTitle: "1984",
      bookAuthor: "George Orwell",
      bookYear: 1949,
      bookGenre: "Distopía",
      bookCover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
      userName: "María González",
      userRut: "187654321",
      userAddress: "Av. Principal 456",
      userPhone: "956789012",
      userPhoto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      userRecentLoans: ["Harry Potter", "1984", "El Principito"],
      userPenalties: "1 atraso pendiente",
      loanDate: "10/11/2024",
      dueDate: "25/11/2024",
      isOverdue: false,
    },
  };

  const handleSearchIsbn = () => {
    const loan = mockActiveLoans[isbnInput];
    if (loan) {
      setLoanData(loan);
    } else {
      setLoanData(null);
    }
  };

  const handleSubmit = () => {
    console.log("Devolución registrada");
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
              {/* ISBN Input - Always visible */}
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
                  ISBNs de prueba: 29140151561, 9788478884452
                </p>
              </div>

              {/* Book Details and Submit Button - Appears after ISBN search */}
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

                  {/* Penalty Warning - Only if overdue */}
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

            {/* Right Section - User Information - Only visible after ISBN is found */}
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
    </div>
  );
};

export default ReturnEntry;
