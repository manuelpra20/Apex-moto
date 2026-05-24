import { useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import {
  useSearchQuery,
  setSearchQuery,
  useCatalogPage,
  setCatalogPage,
  useCatalogFilter,
  setCatalogFilter,
} from "@/lib/search-store";

const PAGE_SIZE = 12;

export function Catalog() {
  const filter = useCatalogFilter();
  const page = useCatalogPage();
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

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  // Reset a la página 1 cuando cambian filtros o búsqueda
  useEffect(() => {
    setCatalogPage(1);
  }, [filter, query]);

  // Si la página actual queda fuera de rango (p.ej. al filtrar), corrige
  useEffect(() => {
    if (page > totalPages) setCatalogPage(totalPages);
  }, [page, totalPages]);

  const pagedItems = useMemo(
    () => items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [items, page],
  );

  function goToPage(p: number) {
    const next = Math.min(Math.max(1, p), totalPages);
    setCatalogPage(next);
    requestAnimationFrame(() => {
      const el = document.getElementById("catalogo");
      if (!el) return;
      const headerOffset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }

  // Construye [1, '…', 4, 5, 6, '…', 10] para no saturar
  const pageNumbers = useMemo<(number | "…")[]>(() => {
    const pages: (number | "…")[] = [];
    const add = (n: number | "…") => pages.push(n);
    const window = 1; // vecinos
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= page - window && i <= page + window)
      ) {
        add(i);
      } else if (pages[pages.length - 1] !== "…") {
        add("…");
      }
    }
    return pages;
  }, [page, totalPages]);

  return (
    <section
      id="catalogo"
      className="relative py-16 md:py-14"
      style={{ marginTop: "-50px" }}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-8">
          <span
            className="text-xs font-bold uppercase tracking-widest text-primary"
            style={{ color: "white", fontWeight: "900" }}
          >
            Nuestra selección
          </span>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
            Catálogo destacado
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Haz clic en cualquier producto para ver más fotos y detalles. Compra al instante por WhatsApp.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center gap-2">
          {CATEGORIES.map((f) => (
            <button
              key={f}
              onClick={() => setCatalogFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "border border-white/15 bg-white/5 text-white/80 hover:border-primary hover:text-primary"
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
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pagedItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {totalPages > 1 && (
              <nav
                aria-label="Paginación de productos"
                className="mt-10 flex flex-wrap items-center justify-center gap-2"
              >
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  aria-label="Página anterior"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15 disabled:hover:text-white/80"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {pageNumbers.map((n, i) =>
                  n === "…" ? (
                    <span
                      key={`dots-${i}`}
                      className="px-2 text-sm text-white/50"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => goToPage(n)}
                      aria-current={page === n ? "page" : undefined}
                      className={`h-10 min-w-10 rounded-md px-3 text-sm font-semibold transition-colors ${
                        page === n
                          ? "bg-primary text-primary-foreground"
                          : "border border-white/15 bg-white/5 text-white/80 hover:border-primary hover:text-primary"
                      }`}
                    >
                      {n}
                    </button>
                  ),
                )}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page === totalPages}
                  aria-label="Página siguiente"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/15 disabled:hover:text-white/80"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </nav>
            )}
          </>
        )}
      </div>
    </section>
  );
}
