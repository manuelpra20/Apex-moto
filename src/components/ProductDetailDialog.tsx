import { useEffect, useState } from "react";
import { ShoppingBag, Check, Truck, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { formatPrice, type Product } from "./ProductCard";
import { buildProductMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!product) return null;

  const priceStr = formatPrice(product.price);
  const href = buildWhatsAppUrl(buildProductMessage(product.name, priceStr));
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.emoji, product.emoji, product.emoji];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          {/* Slider */}
          <div className="relative bg-muted/60">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="flex aspect-square items-center justify-center text-[10rem] md:text-[12rem]">
                      <span>{img}</span>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3" />
              <CarouselNext className="right-3" />
            </Carousel>

            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {product.badge}
              </span>
            )}

            {/* Thumbnails */}
            <div className="flex justify-center gap-2 border-t border-border bg-card/40 p-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Ver foto ${i + 1}`}
                  className={`flex h-14 w-14 items-center justify-center rounded-md border-2 text-2xl transition-all ${
                    current === i
                      ? "border-primary bg-background"
                      : "border-border bg-muted/40 hover:border-primary/60"
                  }`}
                >
                  {img}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col p-6 md:p-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {product.category}
            </span>
            <DialogTitle className="mt-2 text-2xl font-black leading-tight md:text-3xl">
              {product.name}
            </DialogTitle>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-primary">{priceStr}</span>
            </div>

            <DialogDescription className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description ??
                "Producto original con garantía. Stock disponible para entrega inmediata. Coordinamos envío a todo el país por WhatsApp."}
            </DialogDescription>

            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2 text-foreground/80">
                <Check className="h-4 w-4 text-primary" /> Garantía de fábrica
              </li>
              <li className="flex items-center gap-2 text-foreground/80">
                <Truck className="h-4 w-4 text-primary" /> Envío a toda Venezuela
              </li>
              <li className="flex items-center gap-2 text-foreground/80">
                <ShieldCheck className="h-4 w-4 text-primary" /> Compra segura por WhatsApp
              </li>
            </ul>

            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingBag className="h-4 w-4" /> Comprar por WhatsApp
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
