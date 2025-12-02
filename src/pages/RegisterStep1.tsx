import { RegistrationProgress } from "@/components/library/RegistrationProgress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import libraryBg from "@/assets/library-background.jpg";

const RegisterStep1 = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    rut: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/register/step2");
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
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Atrás
        </Button>

        <div className="w-full max-w-md">
          <RegistrationProgress currentStep={1} totalSteps={4} />

          <Card className="p-8 bg-card/95 backdrop-blur">
            <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
              Registro de Usuario
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Nombre Completo:</Label>
                <Input
                  id="fullName"
                  placeholder="Value"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="rut">RUT:</Label>
                <Input
                  id="rut"
                  placeholder="Value"
                  value={formData.rut}
                  onChange={(e) =>
                    setFormData({ ...formData, rut: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Correo Electrónico:</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Value"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Dirección:</Label>
                <Input
                  id="address"
                  placeholder="Value"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Contraseña:</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Value"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirmar Contraseña:</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Value"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>

              <Button type="submit" className="w-full mt-6">
                Siguiente
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterStep1;
