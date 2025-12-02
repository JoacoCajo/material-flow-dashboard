import { RegistrationProgress } from "@/components/library/RegistrationProgress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Camera, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import libraryBg from "@/assets/library-background.jpg";

const RegisterStep2 = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
          onClick={() => navigate("/register/step1")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>

        <div className="w-full max-w-md">
          <RegistrationProgress currentStep={2} totalSteps={4} />

          <Card className="p-8 bg-card/95 backdrop-blur">
            <h2 className="text-2xl font-semibold text-center mb-8 text-foreground">
              Fotografía
            </h2>

            <div className="space-y-6">
              <div className="flex flex-col items-center">
                {imagePreview ? (
                  <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-border mb-4">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-48 h-48 rounded-full border-4 border-border mb-4 flex items-center justify-center bg-muted">
                    <div className="w-32 h-32 rounded-full border-2 border-dashed border-muted-foreground" />
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground mb-6">
                  Subir / Tomar foto
                </p>

                <div className="flex gap-4 w-full">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      capture="user"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <div className="flex items-center justify-center gap-2 p-4 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors">
                      <Camera className="h-5 w-5" />
                      <span className="text-sm font-medium">Tomar foto</span>
                    </div>
                  </label>

                  <label className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                    <div className="flex items-center justify-center gap-2 p-4 bg-muted hover:bg-muted/80 rounded-lg cursor-pointer transition-colors">
                      <Upload className="h-5 w-5" />
                      <span className="text-sm font-medium">Subir foto</span>
                    </div>
                  </label>
                </div>
              </div>

              <Button 
                onClick={() => navigate("/register/step3")} 
                className="w-full mt-6"
                disabled={!imagePreview}
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

export default RegisterStep2;
