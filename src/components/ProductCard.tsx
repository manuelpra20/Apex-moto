import { Heart, ShoppingBag } from "lucide-react";
import { buildProductMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { useFavorites } from "@/lib/favorites";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  badge?: string;
  description?: string;
  images?: string[]; // Galería de imágenes adicionales para el detalle
};

export function formatPrice(p: number): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(p);
}

export function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const priceStr = formatPrice(product.price);
  const href = buildWhatsAppUrl(buildProductMessage(product.name, priceStr));
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(product.id);

  return (
    <article
      onClick={() => onOpen(product)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative aspect-square overflow-hidden bg-muted/60">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <button
          aria-label={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          onClick={(e) => {
            e.stopPropagation();
            toggle(product.id);
          }}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground/70 backdrop-blur transition-all hover:scale-110 hover:text-primary"
        >
          <Heart
            className={`h-5 w-5 transition-colors ${fav ? "text-primary" : ""}`}
            fill={fav ? "currentColor" : "none"}
          />
        </button>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-base font-bold text-foreground">
          {product.name}
        </h3>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-black text-primary">{priceStr}</span>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ShoppingBag className="h-4 w-4" /> Comprar por WhatsApp
        </a>
      </div>
    </article>
  );
}
