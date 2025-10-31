import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import PlaceCard from "@/components/PlaceCard";
import { FilterPanel } from "@/components/FilterPanel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, MapIcon, Grid3x3 } from "lucide-react";
import { usePlaces } from "@/hooks/usePlaces";
import { FilterOptions } from "@/lib/types";

const PLACEHOLDER = "https://via.placeholder.com/1200x800?text=Lavalleja";

const Explore = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [showMap, setShowMap] = useState(false);

  const { data: places, isLoading, error } = usePlaces({ ...filters, searchQuery });

  const handleSearch = () => {
    setFilters({ ...filters, searchQuery });
  };

  // Helper para resolver imagen principal sin romper TS
  const firstImage = (arr?: string[]) => (arr && arr.length > 0 ? arr[0] : PLACEHOLDER);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explorar</h1>
          <p className="text-muted-foreground">
            Descubrí lugares, servicios y experiencias en Lavalleja
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 bg-card border rounded-lg p-6 shadow-soft">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nombre, descripción o zona..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch}>Buscar</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </div>

          {/* Results & Map */}
          <div className="lg:col-span-3 space-y-6">
            {/* Toggle View & Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Cargando..." : `${places?.length || 0} resultados`}
              </p>
              <div className="flex gap-2">
                <Button
                  variant={showMap ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMap(true)}
                  className="gap-2"
                >
                  <MapIcon className="h-4 w-4" />
                  Mapa
                </Button>
                <Button
                  variant={!showMap ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMap(false)}
                  className="gap-2"
                >
                  <Grid3x3 className="h-4 w-4" />
                  Cuadrícula
                </Button>
              </div>
            </div>

            {/* Map Placeholder */}
            {showMap && (
              <div className="mb-6 bg-muted rounded-lg h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Mapa próximamente</p>
              </div>
            )}

            {/* Results Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Error al cargar los lugares</p>
              </div>
            ) : places && places.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {places.map((place) => (
                  <PlaceCard
                    key={place.id}
                    title={place.name}
                    imageUrl={firstImage(place.images)}
                    subtitle={place.zone || place.address || ""}
                    badge={place.category || ""}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No se encontraron resultados</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Explore;
