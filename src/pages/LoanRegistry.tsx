import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchInput, UserInfoCard, BookInfoCard, ResultDialog } from "@/components/library";
import { mockUsers, mockBooks } from "@/data/mockData";
import type { User, Book } from "@/types/library";

const LoanRegistry = () => {
  const [rutInput, setRutInput] = useState("");
  const [isbnInput, setIsbnInput] = useState("");
  const [userData, setUserData] = useState<User | null>(null);
  const [bookData, setBookData] = useState<Book | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleSearchRut = () => {
    const user = mockUsers[rutInput];
    setUserData(user || null);
  };

  const handleSearchIsbn = () => {
    const book = mockBooks[isbnInput];
    setBookData(book || null);
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
              <SearchInput
                label="Ingresa el rut del usuario"
                value={rutInput}
                onChange={setRutInput}
                onSearch={handleSearchRut}
                placeholder="Ej: 152015144 o 187654321"
                hint="RUTs de prueba: 152015144, 187654321"
              />

              {userData && (
                <>
                  <SearchInput
                    label="Ingresa el ISBN / Nombre del material"
                    value={isbnInput}
                    onChange={setIsbnInput}
                    onSearch={handleSearchIsbn}
                    placeholder="Ej: 29140151561"
                    hint="ISBNs de prueba: 29140151561, 9788478884452, 9780439708180"
                  />

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={handleSubmit}
                      disabled={!bookData}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 disabled:opacity-50"
                    >
                      Enviar
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

      <ResultDialog
        open={showErrorDialog}
        onOpenChange={setShowErrorDialog}
        type="error"
        title="Error en el Préstamo"
        message="No hay existencias disponibles de este material"
        onClose={handleCloseErrorDialog}
      />
    </div>
  );
};

export default LoanRegistry;
