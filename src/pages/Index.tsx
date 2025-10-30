import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { CategoryCard } from "@/components/CategoryCard";
import { EventCard } from "@/components/EventCard";
import { mockEvents } from "@/lib/mockData";
import heroImage from "@/assets/hero-lavalleja.jpg";
import iconAccommodation from "@/assets/icon-accommodation.png";
import iconGastronomy from "@/assets/icon-gastronomy.png";
import iconActivities from "@/assets/icon-activities.png";
import iconEvents from "@/assets/icon-events.png";

const Index = () => {
  const categories = [
    { title: "Alojamientos", icon: iconAccommodation, link: "/explorar?categoria=alojamiento" },
    { title: "Gastronomía", icon: iconGastronomy, link: "/explorar?categoria=gastronomia" },
    { title: "Actividades", icon: iconActivities, link: "/explorar?categoria=actividades" },
    { title: "Eventos", icon: iconEvents, link: "/eventos" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Turismo Lavalleja - Descubrí el corazón de Uruguay</title>
        <meta name="description" content="Portal oficial de turismo de Lavalleja. Encontrá alojamiento, gastronomía, eventos y actividades en Minas, Villa Serrana y más." />
        <meta property="og:title" content="Turismo Lavalleja" />
        <meta property="og:description" content="Descubrí alojamientos, gastronomía y eventos en Lavalleja, Uruguay" />
      </Helmet>
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'var(--gradient-overlay)' }}
        />
        <div className="relative z-10 container mx-auto px-4 text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white drop-shadow-lg">
            Descubrí Lavalleja
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-2xl mx-auto drop-shadow">
            Naturaleza, sierras y tradición en el corazón de Uruguay
          </p>
          <div className="pt-4">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          ¿Qué estás buscando?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              icon={category.icon}
              link={category.link}
            />
          ))}
        </div>
      </section>

      {/* Today's Events Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Eventos del día
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Descubrí qué está pasando hoy en Lavalleja
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
