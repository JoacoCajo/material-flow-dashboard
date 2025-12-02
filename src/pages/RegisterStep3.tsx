import { RegistrationProgress } from "@/components/library/RegistrationProgress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import libraryBg from "@/assets/library-background.jpg";

const RegisterStep3 = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: `url(${libraryBg})` }}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
      
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
        <Button
          variant="outline"
          className="absolute top-6 left-6 bg-card/90 backdrop-blur"
          onClick={() => navigate("/register/step2")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>

        <div className="w-full max-w-md">
          <RegistrationProgress currentStep={3} totalSteps={4} />

          <Card className="p-8 bg-card/95 backdrop-blur">
            <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
              Huella Digital
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col items-center">
                <div className="w-64 h-64 rounded-lg border-4 border-border mb-4 flex items-center justify-center bg-card">
                  <Fingerprint className="w-32 h-32 text-foreground" strokeWidth={1.5} />
                </div>
                
                <p className="text-sm text-muted-foreground mb-6 text-center">
                  Ponga su huello
                </p>
              </div>

              <Button 
                onClick={() => navigate("/register/step4")} 
                className="w-full"
              >
                Siguiente
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep3;
