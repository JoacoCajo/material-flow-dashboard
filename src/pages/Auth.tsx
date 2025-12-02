import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, ArrowLeft, Camera, Upload, Fingerprint, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { login } from "@/lib/auth";

type AuthView = "login" | "register";
type RegisterStep = 1 | 2 | 3 | 4;

interface RegisterData {
  nombreCompleto: string;
  rut: string;
  email: string;
  direccion: string;
  password: string;
  confirmPassword: string;
  photo: string | null;
}

const Auth = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<AuthView>("login");
  const [registerStep, setRegisterStep] = useState<RegisterStep>(1);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [registerData, setRegisterData] = useState<RegisterData>({
    nombreCompleto: "",
    rut: "",
    email: "",
    direccion: "",
    password: "",
    confirmPassword: "",
    photo: null,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginPassword.trim()) {
      toast.error("Por favor completa todos los campos");
      return;
    }
    
    setIsLoading(true);
    try {
      await login(loginEmail, loginPassword);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterNext = () => {
    if (registerStep === 1) {
      if (!registerData.nombreCompleto || !registerData.rut || !registerData.email || !registerData.password) {
        toast.error("Por favor completa todos los campos obligatorios");
        return;
      }
      if (registerData.password !== registerData.confirmPassword) {
        toast.error("Las contraseñas no coinciden");
        return;
      }
      setRegisterStep(2);
    } else if (registerStep === 2) {
      setRegisterStep(3);
    } else if (registerStep === 3) {
      setRegisterStep(4);
      // Simulate validation
      setTimeout(() => {
        toast.success("Registro completado exitosamente");
        setView("login");
        setRegisterStep(1);
        setRegisterData({
          nombreCompleto: "",
          rut: "",
          email: "",
          direccion: "",
          password: "",
          confirmPassword: "",
          photo: null,
        });
      }, 3000);
    }
  };

  const handleBack = () => {
    if (registerStep > 1) {
      setRegisterStep((prev) => (prev - 1) as RegisterStep);
    } else {
      setView("login");
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRegisterData({ ...registerData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const progressValue = view === "register" ? (registerStep / 4) * 100 : 0;

  // Login View
  if (view === "login") {
    return (
      <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070')] bg-cover bg-center">
        <div className="min-h-screen bg-black/30 flex flex-col items-center justify-center p-6">
          {/* Logo */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
          </div>

          {/* Title Banner */}
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-12 py-3 mb-8 shadow-lg">
            <h1 className="text-2xl md:text-3xl font-serif text-primary tracking-wide">
              Biblioteca de Estación Central
            </h1>
          </div>

          {/* Login Card */}
          <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-xl">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Ingresar Email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-background"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-background"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                Iniciar Sesión
              </Button>

              <button
                type="button"
                className="text-sm text-primary hover:underline w-full text-left"
                onClick={() => toast.info("Funcionalidad próximamente")}
              >
                ¿Olvidaste tu contraseña?
              </button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setView("register")}
              >
                Registrarse
              </Button>
            </form>
          </Card>
        </div>
      </div>
    );
  }

  // Register View
  return (
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2090')] bg-cover bg-center">
      <div className="min-h-screen bg-black/40 flex flex-col items-center justify-center p-6">
        {/* Back Button */}
        <Button
          variant="outline"
          className="absolute top-6 left-6 bg-white/90 hover:bg-white"
          onClick={handleBack}
          disabled={registerStep === 4}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Atrás
        </Button>

        {/* Progress */}
        <div className="w-full max-w-md mb-4">
          <Progress value={progressValue} className="h-2 bg-white/30" />
          <p className="text-center text-white/90 text-sm mt-2">
            Paso {registerStep} de 4
          </p>
        </div>

        {/* Step 1: User Data */}
        {registerStep === 1 && (
          <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-xl">
            <h2 className="text-xl font-bold text-center text-foreground mb-6">
              Registro de Usuario
            </h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nombre Completo:</Label>
                <Input
                  placeholder="Value"
                  value={registerData.nombreCompleto}
                  onChange={(e) => setRegisterData({ ...registerData, nombreCompleto: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>RUT:</Label>
                <Input
                  placeholder="Value"
                  value={registerData.rut}
                  onChange={(e) => setRegisterData({ ...registerData, rut: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Correo Electrónico:</Label>
                <Input
                  type="email"
                  placeholder="Value"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Dirección:</Label>
                <Input
                  placeholder="Value"
                  value={registerData.direccion}
                  onChange={(e) => setRegisterData({ ...registerData, direccion: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Contraseña:</Label>
                <Input
                  type="password"
                  placeholder="Value"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Confirmar Contraseña:</Label>
                <Input
                  type="password"
                  placeholder="Value"
                  value={registerData.confirmPassword}
                  onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                />
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                onClick={handleRegisterNext}
              >
                Siguiente
              </Button>
            </div>
          </Card>
        )}

        {/* Step 2: Photo */}
        {registerStep === 2 && (
          <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-xl">
            <h2 className="text-xl font-bold text-center text-foreground mb-6">
              Fotografía
            </h2>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-32 h-32 rounded-full bg-muted border-4 border-border overflow-hidden flex items-center justify-center">
                {registerData.photo ? (
                  <img src={registerData.photo} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="w-12 h-12 text-muted-foreground" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">Subir / Tomar foto</p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => toast.info("Cámara no disponible en navegador")}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Tomar foto
                </Button>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Subir foto
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleRegisterNext}
              >
                Siguiente
              </Button>
            </div>
          </Card>
        )}

        {/* Step 3: Fingerprint */}
        {registerStep === 3 && (
          <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-xl">
            <h2 className="text-xl font-bold text-center text-foreground mb-6">
              Huella Digital
            </h2>
            <div className="flex flex-col items-center space-y-6">
              <div className="w-40 h-40 border-2 border-border rounded-lg flex items-center justify-center bg-background">
                <Fingerprint className="w-20 h-20 text-muted-foreground" strokeWidth={1} />
              </div>
              <p className="text-sm text-muted-foreground">Ponga su huella</p>
              <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={handleRegisterNext}
              >
                Siguiente
              </Button>
            </div>
          </Card>
        )}

        {/* Step 4: Validating */}
        {registerStep === 4 && (
          <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm shadow-xl">
            <h2 className="text-xl font-bold text-center text-foreground mb-6">
              Validando Datos
            </h2>
            <div className="flex flex-col items-center space-y-6">
              <Loader2 className="w-16 h-16 text-primary animate-spin" />
              <p className="text-sm text-muted-foreground text-center">
                Por favor espere mientras validamos y cargamos<br />su información...
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Auth;
