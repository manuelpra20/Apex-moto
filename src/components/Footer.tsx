

import { Instagram, MapPin, Phone, Mail } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import logo from "@/assets/logo2.png";

export function Footer() {

  const estilos = {
    maxWidth: '600px',
    width: '130px',
    marginLeft: '70px'
};
  return (
    <footer id="contacto" className="bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md text-primary-foreground font-black">
              <img
                  src={logo}
                  style={estilos}
                  alt="Logo Apex Moto"
                         
              />
            </div>
            {/* <span className="text-xl font-black">
              APEX MOTO<span className="text-primary">.</span>
            </span> */}
          </div>
          <p className="mt-4 text-sm text-white/60">
            Tu tienda de confianza para todo lo que tu moto necesita. Calidad,
            originalidad y servicio.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider">Tienda</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><a href="#catalogo" className="hover:text-primary">Catálogo</a></li>
            <li><a href="#categorias" className="hover:text-primary">Categorías</a></li>
            <li><a href="#catalogo" className="hover:text-primary">Ofertas</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider">Contacto</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <a
                href={buildWhatsAppUrl("Hola Apex Moto 👋")}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary"
              >
                +58 412-4970042
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>alejandrostudios20@gmail.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Valencia, Venezuela</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider">Síguenos</h4>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.instagram.com/apexmotorcyclevzla?igsh=d2RjNWVlZXhlenFh"
              target="_blank"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 transition-colors hover:bg-primary"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-white/50 md:px-6">
          © {new Date().getFullYear()} Apex Moto. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
