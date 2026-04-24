import { Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import logo from "@/assets/apex-logo.png";
import { PRODUCTS } from "@/lib/products";
import { setSearchQuery, scrollToCatalog } from "@/lib/search-store";
import { formatPrice } from "@/components/ProductCard";

const NAV = [
  { label: "Inicio", href: "#inicio" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Categorías", href: "#categorias" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Cerrar dropdown al click fuera
  useEffect(() => {
    if (!searchOpen) return;
    function onClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [searchOpen]);

  // Foco al abrir
  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = term.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter((p) => {
      const haystack = `${p.name} ${p.category} ${p.description ?? ""}`.toLowerCase();
      return haystack.includes(q);
    }).slice(0, 6);
  }, [term]);

  function applySearch(value: string) {
    setSearchQuery(value);
    setSearchOpen(false);
    setTerm("");
    scrollToCatalog();
  }

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
          {/* Buscador desktop */}
          <div ref={searchRef} className="relative hidden md:block">
            {searchOpen ? (
              <div className="flex items-center">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") applySearch(term);
                      if (e.key === "Escape") setSearchOpen(false);
                    }}
                    placeholder="Buscar artículos..."
                    className="h-9 w-64 rounded-md border border-border bg-background pl-8 pr-2 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
                <button
                  aria-label="Cerrar buscador"
                  onClick={() => {
                    setSearchOpen(false);
                    setTerm("");
                  }}
                  className="ml-1 flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-muted hover:text-primary"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Dropdown de resultados */}
                {term.trim() && (
                  <div className="absolute right-10 top-11 z-50 w-80 overflow-hidden rounded-lg border border-border bg-card shadow-xl">
                    {results.length === 0 ? (
                      <div className="p-4 text-center text-sm text-muted-foreground">
                        Sin resultados para "{term}"
                      </div>
                    ) : (
                      <ul className="max-h-96 overflow-y-auto">
                        {results.map((p) => (
                          <li key={p.id}>
                            <button
                              onClick={() => applySearch(p.name)}
                              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-muted"
                            >
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-12 w-12 flex-shrink-0 rounded-md object-cover"
                              />
                              <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold">{p.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {p.category} · {formatPrice(p.price)}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                        <li className="border-t border-border">
                          <button
                            onClick={() => applySearch(term)}
                            className="w-full px-3 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-primary hover:bg-muted"
                          >
                            Ver todos los resultados
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <button
                aria-label="Buscar"
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-muted hover:text-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
          </div>

          <button
            aria-label="Menú"
            onClick={() => setOpen(!open)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 hover:bg-muted md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="flex flex-col gap-2 p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applySearch(term);
                    setOpen(false);
                  }
                }}
                placeholder="Buscar artículos..."
                className="h-10 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-primary"
              />
            </div>
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
