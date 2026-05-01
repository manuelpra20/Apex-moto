import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Check, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { formatPrice, type Product } from "@/components/ProductCard";
import { buildProductMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { getProductBySlug, PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/producto/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) {
      return { meta: [{ title: "Producto no encontrado — Apex Moto" }] };
    }
    const priceStr = formatPrice(p.price);
    const desc = p.description ?? `${p.name} disponible en Apex Moto. Compra por WhatsApp.`;
    return {
      meta: [
        { title: `${p.name} — ${priceStr} | Apex Moto` },
        { name: "description", content: desc },
        { property: "og:title", content: `${p.name} — Apex Moto` },
        { property: "og:description", content: desc },
        { property: "og:image", content: p.image },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: p.image },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-4xl font-black">Producto no encontrado</h1>
        <p className="mt-3 text-muted-foreground">
          El producto que buscas no existe o fue removido.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-destructive">{error.message}</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  },
});

function ProductPage() {
  const { product } = Route.useLoaderData() as { product: Product };
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

  const priceStr = formatPrice(product.price);
  const href = buildWhatsAppUrl(buildProductMessage(product.name, priceStr));
  const images =
    product.images && product.images.length > 0 ? product.images : [product.image];

  // Productos relacionados (misma categoría)
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>

        <article className="grid gap-8 rounded-2xl border border-border bg-card p-4 md:grid-cols-2 md:p-8">
          {/* Galería */}
          <div className="relative">
            <Carousel setApi={setApi} className="w-full">
              <CarouselContent>
                {images.map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="aspect-square overflow-hidden rounded-xl bg-muted/60">
                      <img
                        src={img}
                        alt={`${product.name} - foto ${i + 1}`}
                        width={768}
                        height={768}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {images.length > 1 && (
                <>
                  <CarouselPrevious className="left-3" />
                  <CarouselNext className="right-3" />
                </>
              )}
            </Carousel>

            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {product.badge}
              </span>
            )}

            {images.length > 1 && (
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => api?.scrollTo(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    className={`h-16 w-16 overflow-hidden rounded-md border-2 transition-all ${
                      current === i
                        ? "border-primary"
                        : "border-border hover:border-primary/60"
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {product.category}
            </span>
            <h1 className="mt-2 text-3xl font-black leading-tight md:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl font-black text-primary md:text-5xl">
                {priceStr}
              </span>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {product.description ??
                "Producto original con garantía. Stock disponible para entrega inmediata. Coordinamos envío a todo el país por WhatsApp."}
            </p>

            <ul className="mt-6 space-y-2 text-sm">
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
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ShoppingBag className="h-5 w-5" /> Comprar por WhatsApp
            </a>
          </div>
        </article>

        {/* Relacionados */}
        {related.length > 0 && (
          <section className="mt-14">
            <h2 className="mb-6 text-2xl font-black">También te puede interesar</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/producto/$slug"
                  params={{ slug: p.slug! }}
                  className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary"
                >
                  <div className="aspect-square overflow-hidden bg-muted/60">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="line-clamp-2 text-sm font-bold">{p.name}</h3>
                    <p className="mt-1 text-base font-black text-primary">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
