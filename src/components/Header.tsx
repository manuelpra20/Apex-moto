import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/apex-logo.png";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Categorías", href: "#categorias" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Logo Apex Moto"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-black tracking-tight">
            APEX MOTO<span className="text-primary">.</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            aria-label="Buscar"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-primary md:flex"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            aria-label="Carrito"
            className="hidden h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-primary md:flex"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          <button
            aria-label="Menú"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col p-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
