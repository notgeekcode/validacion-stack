import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Check, MapPin, Calendar, FileText, BarChart3 } from "lucide-react";

const Demo = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const demoSteps = [
    {
      id: 0,
      title: "Bienvenido al recorrido guiado",
      description: "Te mostraremos cómo funciona el portal de turismo de Lavalleja",
      icon: MapPin,
      action: "Comenzar",
      nextStep: 1,
    },
    {
      id: 1,
      title: "Explorar lugares y eventos",
      description: "Los visitantes pueden buscar alojamiento, gastronomía y actividades con filtros por zona, categoría y precio",
      icon: MapPin,
      action: "Ir a explorar",
      route: "/explorar",
      nextStep: 2,
    },
    {
      id: 2,
      title: "Comerciante publica su negocio",
      description: "Los comerciantes pueden crear fichas de sus emprendimientos y eventos asociados",
      icon: FileText,
      action: "Ir al panel comerciante",
      route: "/panel-comerciante",
      nextStep: 3,
    },
    {
      id: 3,
      title: "Curador revisa contenido",
      description: "El equipo de curación aprueba o rechaza las publicaciones para mantener la calidad",
      icon: Check,
      action: "Ir a curación",
      route: "/panel-curador",
      nextStep: 4,
    },
    {
      id: 4,
      title: "Contenido publicado",
      description: "Una vez aprobado, el contenido aparece en el portal público para los visitantes",
      icon: Check,
      action: "Ver publicados",
      route: "/explorar",
      nextStep: 5,
    },
    {
      id: 5,
      title: "Dashboard analítico",
      description: "La Cámara de Turismo visualiza métricas e insights sobre el uso del portal",
      icon: BarChart3,
      action: "Ver dashboard",
      route: "/dashboard",
      nextStep: 6,
    },
    {
      id: 6,
      title: "¡Recorrido completado!",
      description: "Ahora conocés todo el flujo del portal turístico de Lavalleja",
      icon: Check,
      action: "Volver al inicio",
      route: "/",
      nextStep: 0,
    },
  ];

  const currentStepData = demoSteps[currentStep];
  const StepIcon = currentStepData.icon;

  const handleAction = () => {
    if (currentStepData.route) {
      navigate(currentStepData.route);
    } else {
      setCurrentStep(currentStepData.nextStep);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Demo Guiada</h1>
          <p className="text-muted-foreground">
            Recorrido interactivo por las funcionalidades del portal
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium">Paso {currentStep + 1} de {demoSteps.length}</span>
            <Badge variant="secondary">
              {Math.round(((currentStep + 1) / demoSteps.length) * 100)}% completado
            </Badge>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-soft">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <StepIcon className="h-10 w-10 text-primary" />
              </div>
              
              <h2 className="text-3xl font-bold mb-4">{currentStepData.title}</h2>
              <p className="text-muted-foreground text-lg mb-8">
                {currentStepData.description}
              </p>

              <Button 
                onClick={handleAction}
                size="lg"
                className="gap-2"
              >
                {currentStepData.action}
                <ArrowRight className="h-5 w-5" />
              </Button>

              {currentStep > 0 && currentStep < demoSteps.length - 1 && (
                <Button 
                  variant="ghost"
                  onClick={() => navigate("/")}
                  className="mt-4"
                >
                  Salir de la demo
                </Button>
              )}
            </div>
          </Card>

          {/* Steps Navigation */}
          <div className="mt-8 flex gap-2 justify-center flex-wrap">
            {demoSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep 
                    ? "w-8 bg-primary" 
                    : index < currentStep 
                    ? "w-2 bg-primary/50" 
                    : "w-2 bg-muted"
                }`}
                aria-label={`Ir al paso ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;
