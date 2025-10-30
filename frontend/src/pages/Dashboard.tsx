import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, MapPin, Calendar } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { label: "Visitantes del mes", value: "12,458", icon: Users, trend: "+12%" },
    { label: "Lugares publicados", value: "342", icon: MapPin, trend: "+8%" },
    { label: "Eventos activos", value: "24", icon: Calendar, trend: "+15%" },
    { label: "Tasa de conversión", value: "3.2%", icon: TrendingUp, trend: "+0.5%" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard Analítico</h1>
          <p className="text-muted-foreground">
            Métricas e insights del portal turístico
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="p-6 shadow-soft">
              <div className="flex items-start justify-between mb-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">{stat.trend}</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Visitas por categoría</h3>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de barras</p>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Tendencia de visitas</h3>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Gráfico de líneas</p>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Predicción de demanda</h3>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Modelo predictivo (IA)</p>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <h3 className="text-lg font-semibold mb-4">Lugares más visitados</h3>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Top 10 ranking</p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
