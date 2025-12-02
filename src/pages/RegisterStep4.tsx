import { RegistrationProgress } from "@/components/library/RegistrationProgress";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import libraryBg from "@/assets/library-background.jpg";

const RegisterStep4 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate data validation and upload
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${libraryBg})` }}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <RegistrationProgress currentStep={4} totalSteps={4} />

          <Card className="p-12 bg-card/95 backdrop-blur">
            <div className="flex flex-col items-center space-y-6">
              <h2 className="text-2xl font-semibold text-center text-foreground">
                Validando Datos
              </h2>
              
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              
              <p className="text-center text-muted-foreground">
                Por favor espere mientras validamos y cargamos su información...
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep4;
