import { ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { buildProductMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export type Product = {
  id: string;
  slug?: string;
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

export function ProductCard({ product }: { product: Product }) {
  const priceStr = formatPrice(product.price);
  const href = buildWhatsAppUrl(buildProductMessage(product.name, priceStr));
  const slug = product.slug ?? product.id;

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <Link
        to="/producto/$slug"
        params={{ slug }}
        className="relative block aspect-square overflow-hidden bg-muted/60"
        aria-label={`Ver detalles de ${product.name}`}
      >
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={768}
          height={768}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category}
        </span>
        <Link
          to="/producto/$slug"
          params={{ slug }}
          className="mt-1 line-clamp-2 text-base font-bold text-foreground hover:text-primary"
        >
          {product.name}
        </Link>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-black text-primary">{priceStr}</span>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ShoppingBag className="h-4 w-4" /> Comprar por WhatsApp
        </a>
      </div>
    </article>
  );
}
