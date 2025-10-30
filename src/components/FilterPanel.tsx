import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { zones, placeCategories } from "@/lib/mockData";
import { FilterOptions } from "@/lib/types";

interface FilterPanelProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  showPriceFilter?: boolean;
}

export const FilterPanel = ({ 
  filters, 
  onFilterChange,
  showPriceFilter = true 
}: FilterPanelProps) => {
  
  const handleZoneToggle = (zone: string) => {
    const currentZones = filters.zone || [];
    const newZones = currentZones.includes(zone)
      ? currentZones.filter(z => z !== zone)
      : [...currentZones, zone];
    onFilterChange({ ...filters, zone: newZones });
  };

  const handleCategoryToggle = (category: string) => {
    const currentCategories = filters.category || [];
    const newCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category];
    onFilterChange({ ...filters, category: newCategories });
  };

  const handlePriceToggle = (price: string) => {
    const currentPrices = filters.priceRange || [];
    const newPrices = currentPrices.includes(price)
      ? currentPrices.filter(p => p !== price)
      : [...currentPrices, price];
    onFilterChange({ ...filters, priceRange: newPrices });
  };

  const handleRatingChange = (value: number[]) => {
    onFilterChange({ ...filters, rating: value[0] });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filtros</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Limpiar
        </Button>
      </div>

      {/* Zone Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Zona</h4>
        <div className="space-y-2">
          {zones.map((zone) => (
            <div key={zone} className="flex items-center space-x-2">
              <Checkbox
                id={`zone-${zone}`}
                checked={filters.zone?.includes(zone)}
                onCheckedChange={() => handleZoneToggle(zone)}
              />
              <Label
                htmlFor={`zone-${zone}`}
                className="text-sm font-normal cursor-pointer"
              >
                {zone}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Categoría</h4>
        <div className="space-y-2">
          {Object.keys(placeCategories).map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={filters.category?.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal cursor-pointer capitalize"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      {showPriceFilter && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Rango de precio</h4>
          <div className="space-y-2">
            {["$", "$$", "$$$"].map((price) => (
              <div key={price} className="flex items-center space-x-2">
                <Checkbox
                  id={`price-${price}`}
                  checked={filters.priceRange?.includes(price)}
                  onCheckedChange={() => handlePriceToggle(price)}
                />
                <Label
                  htmlFor={`price-${price}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {price}
                </Label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Rating Filter */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">
          Calificación mínima: {filters.rating ? filters.rating.toFixed(1) : "0.0"}
        </h4>
        <Slider
          value={[filters.rating || 0]}
          onValueChange={handleRatingChange}
          max={5}
          step={0.5}
          className="w-full"
        />
      </div>
    </Card>
  );
};
