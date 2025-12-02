import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Clock, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-center gap-3 mb-12">
          <BookOpen className="h-12 w-12 text-primary" />
          <h1 className="text-4xl font-bold text-foreground">
            Sistema de Biblioteca
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card 
            className="p-8 hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate("/users")}
          >
            <Users className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Gestión de Usuarios
            </h2>
            <p className="text-muted-foreground mb-4">
              Consulta y administra el estado de los usuarios registrados
            </p>
            <Button className="w-full">
              Ir a Usuarios
            </Button>
          </Card>

          <Card 
            className="p-8 hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate("/overdue-loans")}
          >
            <Clock className="h-12 w-12 text-destructive mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Préstamos Atrasados
            </h2>
            <p className="text-muted-foreground mb-4">
              Gestiona los préstamos vencidos y envía recordatorios
            </p>
            <Button className="w-full" variant="outline">
              Ver Préstamos
            </Button>
          </Card>

          <Card 
            className="p-8 hover:shadow-lg transition-shadow cursor-pointer group md:col-span-2"
            onClick={() => navigate("/register/step1")}
          >
            <UserPlus className="h-12 w-12 text-progress-fill mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-semibold mb-2 text-foreground">
              Registro de Nuevos Usuarios
            </h2>
            <p className="text-muted-foreground mb-4">
              Inicia el proceso de registro con datos personales, fotografía y huella digital
            </p>
            <Button className="w-full bg-progress-fill hover:bg-progress-fill/90">
              Comenzar Registro
            </Button>
          </Card>
        </div>

        <div className="mt-12 text-center text-muted-foreground">
          <p>Biblioteca de Estación Central - Sistema de Gestión</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
