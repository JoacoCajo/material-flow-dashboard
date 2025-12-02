import { cn } from "@/lib/utils";

interface RegistrationProgressProps {
  currentStep: number;
  totalSteps: number;
}

export const RegistrationProgress = ({ 
  currentStep, 
  totalSteps 
}: RegistrationProgressProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="h-2 bg-progress-bg rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full bg-progress-fill transition-all duration-500 ease-out",
            currentStep === totalSteps && "animate-pulse"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center text-sm text-muted-foreground mt-2">
        Paso {currentStep} de {totalSteps}
      </p>
    </div>
  );
};
