import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Portal Turístico Lavalleja</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Descubrí la naturaleza, la cultura y la tradición del departamento de Lavalleja.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/explorar" className="text-muted-foreground hover:text-primary transition-base">
                  Explorar
                </Link>
              </li>
              <li>
                <Link to="/eventos" className="text-muted-foreground hover:text-primary transition-base">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary transition-base">
                  Publicá tu negocio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                info@lavalleja.tur.uy
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                +598 4444 1234
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Minas, Lavalleja
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Cámara de Turismo de Lavalleja. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
