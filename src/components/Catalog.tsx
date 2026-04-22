import { useMemo, useState } from "react";
import { ProductCard, type Product } from "./ProductCard";

const PRODUCTS: Product[] = [
  { id: "1", name: "Casco Integral AGV K1 Negro Mate", category: "Cascos", price: 189, emoji: "🪖", badge: "Nuevo" },
  { id: "2", name: "Aceite Motul 5100 10W40 Semi-Sintético", category: "Aceites", price: 18, emoji: "🛢️" },
  { id: "3", name: "Guantes Cuero Pro Racing", category: "Indumentaria", price: 45, emoji: "🧤" },
  { id: "4", name: "Llanta Pirelli Diablo Rosso 180/55", category: "Llantas", price: 220, emoji: "🛞", badge: "Oferta" },
  { id: "5", name: "Cadena DID 520 X-Ring 120 eslabones", category: "Repuestos", price: 95, emoji: "⛓️" },
  { id: "6", name: "Espejos Retrovisores Universal CNC", category: "Accesorios", price: 35, emoji: "🪞" },
  { id: "7", name: "Casco Modular LS2 Valiant II", category: "Cascos", price: 245, emoji: "🪖" },
  { id: "8", name: "Kit de Frenos Brembo Delantero", category: "Repuestos", price: 130, emoji: "🛠️", badge: "Top" },
  { id: "9", name: "Chaqueta Cordura Impermeable", category: "Indumentaria", price: 165, emoji: "🧥" },
  { id: "10", name: "Bujías NGK Iridium (Pack 2)", category: "Repuestos", price: 22, emoji: "⚡" },
  { id: "11", name: "Soporte Celular Manubrio Aluminio", category: "Accesorios", price: 28, emoji: "📱" },
  { id: "12", name: "Casco Cross MT Falcon Naranja", category: "Cascos", price: 175, emoji: "🪖", badge: "Nuevo" },
];

const FILTERS = ["Todos", "Cascos", "Repuestos", "Accesorios", "Aceites", "Llantas", "Indumentaria"];

export function Catalog() {
  const [filter, setFilter] = useState("Todos");

  const items = useMemo(
    () => (filter === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="catalogo" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            Nuestra selección
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">
            Catálogo destacado
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Productos originales con garantía. Haz clic en "Comprar" y te
            atendemos al instante por WhatsApp.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-card text-foreground/70 hover:border-primary hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
