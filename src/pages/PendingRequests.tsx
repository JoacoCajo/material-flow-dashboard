import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import PendingRequestCard from "@/components/PendingRequestCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { mockPendingRequests } from "@/data/mockData";

const PendingRequests = () => {
  const navigate = useNavigate();

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
              {mockPendingRequests.map((request) => (
                <PendingRequestCard
                  key={request.id}
                  title={request.title}
                  duration={request.duration}
                />
              ))}
            </div>
            
            {mockPendingRequests.length === 0 && (
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
