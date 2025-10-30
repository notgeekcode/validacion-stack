import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="¿Qué querés hacer hoy?"
            className="pl-12 pr-4 py-6 text-base bg-background shadow-medium border-border/50 focus:border-primary transition-base"
          />
        </div>
        <Button size="lg" className="px-8">
          Buscar
        </Button>
      </div>
    </div>
  );
};
