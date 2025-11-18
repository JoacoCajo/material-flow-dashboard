import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import PendingRequestCard from "@/components/PendingRequestCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const PendingRequests = () => {
  const navigate = useNavigate();

  const allRequests = [
    { id: 1, title: "Los juegos del hambre", duration: "hace 10 minutos" },
    { id: 2, title: "Papeluco 2", duration: "hace 12 minutos" },
    { id: 3, title: "Papeluco 3", duration: "hace 20 minutos" },
    { id: 4, title: "Papeluco 4", duration: "hace 150 minutos" },
    { id: 5, title: "Signo vs Chad", duration: "hace 150 minutos" },
    { id: 6, title: "El principito", duration: "hace 180 minutos" },
    { id: 7, title: "1984", duration: "hace 200 minutos" },
    { id: 8, title: "Cien años de soledad", duration: "hace 220 minutos" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-full hover:bg-primary/10"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h2 className="text-3xl font-bold text-foreground">Solicitudes Pendientes</h2>
          </div>
          
          <div className="bg-summary-bg rounded-3xl p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              {allRequests.map((request) => (
                <PendingRequestCard
                  key={request.id}
                  title={request.title}
                  duration={request.duration}
                />
              ))}
            </div>
            
            {allRequests.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No hay solicitudes pendientes
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PendingRequests;
