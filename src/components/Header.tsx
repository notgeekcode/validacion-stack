import { Link } from "react-router-dom";
import { Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
  const { isAuthenticated, userProfile, logout } = useAuth();
  
  const hasRole = (role: string) => {
    return userProfile?.roles.includes(role as any) ?? false;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-soft">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-lg gradient-hero flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">L</span>
          </div>
          <span className="hidden sm:inline-block font-semibold text-lg">
            Portal Lavalleja
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/explorar" className="text-sm font-medium hover:text-primary transition-base">
            Explorar
          </Link>
          <Link to="/eventos" className="text-sm font-medium hover:text-primary transition-base">
            Eventos
          </Link>
          {!isAuthenticated ? (
            <Link to="/ingresar">
              <Button variant="default" size="sm">
                Ingresar
              </Button>
            </Link>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  {userProfile?.name || "Mi Cuenta"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover">
                {hasRole('merchant') && (
                  <DropdownMenuItem asChild>
                    <Link to="/panel/comerciante">Panel Comerciante</Link>
                  </DropdownMenuItem>
                )}
                {hasRole('curator') && (
                  <DropdownMenuItem asChild>
                    <Link to="/panel/curador">Panel Curador</Link>
                  </DropdownMenuItem>
                )}
                {hasRole('analyst') && (
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  className="gap-2 text-destructive"
                  onClick={() => logout()}
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-popover">
              <DropdownMenuItem asChild>
                <Link to="/explorar">Explorar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/eventos">Eventos</Link>
              </DropdownMenuItem>
              {!isAuthenticated && (
                <DropdownMenuItem asChild>
                  <Link to="/ingresar">Ingresar</Link>
                </DropdownMenuItem>
              )}
              {isAuthenticated && (
                <DropdownMenuItem 
                  className="text-destructive"
                  onClick={() => logout()}
                >
                  Cerrar Sesión
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};
