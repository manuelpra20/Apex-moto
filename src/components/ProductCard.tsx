import { ShoppingBag } from "lucide-react";
import { buildProductMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  emoji: string;
  badge?: string;
};

function formatPrice(p: number): string {
  return new Intl.NumberFormat("es-VE", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(p);
}

export function ProductCard({ product }: { product: Product }) {
  const priceStr = formatPrice(product.price);
  const href = buildWhatsAppUrl(buildProductMessage(product.name, priceStr));

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative flex aspect-square items-center justify-center bg-muted/60 text-7xl">
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <span className="transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>
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
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <ShoppingBag className="h-4 w-4" /> Comprar por WhatsApp
        </a>
      </div>
    </article>
  );
}
