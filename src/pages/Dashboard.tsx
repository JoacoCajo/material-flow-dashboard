import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import MenuButton from "@/components/MenuButton";
import PendingRequestCard from "@/components/PendingRequestCard";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleAddEditMaterial = () => {
    toast.info("Función: Añadir/Editar Material");
  };

  const handleLoanRegistry = () => {
    toast.info("Función: Registro de Préstamo");
  };

  const handleReturnEntry = () => {
    toast.info("Función: Ingreso Devolución");
  };

  const handleViewPendingRequests = () => {
    navigate("/solicitudes-pendientes");
  };

  const pendingRequests = [
    { id: 1, title: "Los juegos del hambre", duration: "hace 10 minutos" },
    { id: 2, title: "Papeluco 2", duration: "hace 12 minutos" },
    { id: 3, title: "Papeluco 3", duration: "hace 20 minutos" },
    { id: 4, title: "Papeluco 4", duration: "hace 150 minutos" },
    { id: 5, title: "Signo vs Chad", duration: "hace 150 minutos" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">¡Hola Admin!</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Menu Section */}
            <div className="space-y-6">
              <Button
                variant="ghost"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 px-8 rounded-2xl w-full shadow-sm"
                disabled
              >
                Menú
              </Button>
              
              <div className="space-y-4 flex flex-col items-center">
                <MenuButton onClick={handleAddEditMaterial}>
                  Añadir / editar material
                </MenuButton>
                
                <MenuButton onClick={handleLoanRegistry}>
                  Registro de préstamo
                </MenuButton>
                
                <MenuButton onClick={handleReturnEntry}>
                  Ingreso devolución
                </MenuButton>
              </div>
            </div>

            {/* Summary Section */}
            <div className="space-y-6">
              <Button
                variant="ghost"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-6 px-8 rounded-2xl w-full shadow-sm"
                disabled
              >
                Resumen
              </Button>
              
              <div 
                className="bg-summary-bg rounded-3xl p-6 space-y-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={handleViewPendingRequests}
              >
                <h3 className="text-lg font-semibold text-foreground text-center mb-4">
                  Solicitudes pendientes
                </h3>
                
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <PendingRequestCard
                      key={request.id}
                      title={request.title}
                      duration={request.duration}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
