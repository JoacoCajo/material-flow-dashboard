import { LibraryHeader } from "@/components/library/LibraryHeader";
import { SearchBar } from "@/components/library/SearchBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface OverdueLoan {
  id: number;
  userName: string;
  rut: string;
  book: string;
  dueDate: string;
  daysOverdue: number;
  status: string;
}

const mockLoans: OverdueLoan[] = [
  {
    id: 1,
    userName: "Usuario 1",
    rut: "11.222.533-4",
    book: "Los juegos del Hambre",
    dueDate: "22-8-2025",
    daysOverdue: 10,
    status: "Pendiente",
  },
  {
    id: 2,
    userName: "Usuario 2",
    rut: "11.222.535-4",
    book: "Los juegos del Hambre",
    dueDate: "20-8-2025",
    daysOverdue: 12,
    status: "Pendiente",
  },
  {
    id: 3,
    userName: "Usuario 3",
    rut: "11.225.535-4",
    book: "Los juegos del Hambre",
    dueDate: "22-7-2025",
    daysOverdue: 40,
    status: "Pendiente",
  },
  {
    id: 4,
    userName: "Usuario 4",
    rut: "11.222.733-4",
    book: "Los juegos del Hambre",
    dueDate: "12-8-2025",
    daysOverdue: 20,
    status: "Pendiente",
  },
  {
    id: 5,
    userName: "Usuario 5",
    rut: "81.222.533-4",
    book: "Los juegos del Hambre",
    dueDate: "21-8-2025",
    daysOverdue: 11,
    status: "Pendiente",
  },
  {
    id: 6,
    userName: "Usuario 6",
    rut: "12.222.533-4",
    book: "Los juegos del Hambre",
    dueDate: "22-8-2024",
    daysOverdue: 375,
    status: "Pendiente",
  },
  {
    id: 7,
    userName: "Usuario 7",
    rut: "11.222.233-4",
    book: "Los juegos del Hambre",
    dueDate: "11-8-2025",
    daysOverdue: 21,
    status: "Pendiente",
  },
  {
    id: 8,
    userName: "Usuario 8",
    rut: "13.342.533-4",
    book: "Los juegos del Hambre",
    dueDate: "22-8-2025",
    daysOverdue: 10,
    status: "Pendiente",
  },
];

const OverdueLoansPage = () => {
  const [loans] = useState<OverdueLoan[]>(mockLoans);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LibraryHeader />
      
      <main className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <SearchBar 
            placeholder="Nombre de usuario o RUT"
            onSearch={(value) => console.log("Searching:", value)}
          />
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Usuario
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    RUT
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Libro
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Fecha de Devolución
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Días de Atraso
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr
                    key={loan.id}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-foreground">
                      {loan.userName}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {loan.rut}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {loan.book}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {loan.dueDate}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {loan.daysOverdue}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-3 py-1 bg-status-pending text-status-pending-foreground rounded-full text-xs font-medium">
                        {loan.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/loan-history/${loan.id}`)}
                      >
                        Gestionar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default OverdueLoansPage;
