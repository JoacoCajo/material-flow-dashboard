import { LibraryHeader } from "@/components/library/LibraryHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

interface HistoryEntry {
  id: number;
  date: string;
  action: string;
}

const mockHistory: HistoryEntry[] = [
  { id: 1, date: "20/08/2023", action: "Se envió recordatorio a [Usuario_X]" },
  { id: 2, date: "20/08/2023", action: "Se envió recordatorio a [Usuario_X]" },
  { id: 3, date: "20/08/2023", action: "Se envió recordatorio a [Usuario_X]" },
  { id: 4, date: "20/08/2023", action: "Se envió recordatorio a [Usuario_X]" },
];

const LoanHistoryPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background">
      <LibraryHeader />
      
      <main className="container mx-auto px-6 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/overdue-loans")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver
        </Button>

        <Card className="max-w-3xl mx-auto">
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">
              Historial de gestiones de [Usuario_X]
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-3 mb-6">
              {mockHistory.map((entry) => (
                <div
                  key={entry.id}
                  className="p-4 bg-muted/30 rounded-lg border border-border"
                >
                  <p className="text-sm text-foreground">
                    {entry.date} - {entry.action}
                  </p>
                </div>
              ))}
            </div>

            <Button className="w-full bg-progress-fill hover:bg-progress-fill/90">
              Enviar un nuevo recordatorio
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default LoanHistoryPage;
