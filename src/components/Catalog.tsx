import { useMemo, useState } from "react";
import { ProductCard, type Product } from "./ProductCard";
import { ProductDetailDialog } from "./ProductDetailDialog";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import { useSearchQuery, setSearchQuery } from "@/lib/search-store";

export function Catalog() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const query = useSearchQuery();

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (filter !== "Todos" && p.category !== filter) return false;
      if (q.length > 0) {
        const haystack = `${p.name} ${p.category} ${p.description ?? ""}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filter, query]);

  const handleOpen = (p: Product) => {
    setSelected(p);
    setOpen(true);
  };

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
            Haz clic en cualquier producto para ver más fotos y detalles. Compra al instante por WhatsApp.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((f) => (
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

        {query.trim() && (
          <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2 text-sm">
            <span className="text-muted-foreground">
              Mostrando resultados para{" "}
              <span className="font-semibold text-foreground">"{query}"</span> ·{" "}
              {items.length} {items.length === 1 ? "artículo" : "artículos"}
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="font-semibold text-primary hover:underline"
            >
              Limpiar
            </button>
          </div>
        )}

        {items.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/50 p-12 text-center">
            <p className="text-lg font-semibold">No encontramos artículos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Intenta con otra búsqueda o cambia los filtros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={handleOpen} />
            ))}
          </div>
        )}
      </div>

      <ProductDetailDialog
        product={selected}
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  );
}
