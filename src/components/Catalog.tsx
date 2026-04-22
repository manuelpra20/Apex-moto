import { useMemo, useState } from "react";
import { ProductCard, type Product } from "./ProductCard";
import { ProductDetailDialog } from "./ProductDetailDialog";

const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Casco Integral AGV K1 Negro Mate",
    category: "Cascos",
    price: 189,
    emoji: "🪖",
    badge: "Nuevo",
    description:
      "Casco integral deportivo con calota de policarbonato HIR-TH, ventilación dinámica y visera anti-rayaduras. Homologación ECE 22.05.",
    images: ["🪖", "🏍️", "🛡️", "✨"],
  },
  {
    id: "2",
    name: "Aceite Motul 5100 10W40 Semi-Sintético",
    category: "Aceites",
    price: 18,
    emoji: "🛢️",
    description:
      "Aceite semi-sintético tecnología Ester con aditivos especiales para motores 4T. Ideal para uso urbano y carretera.",
    images: ["🛢️", "🧴", "⚙️"],
  },
  {
    id: "3",
    name: "Guantes Cuero Pro Racing",
    category: "Indumentaria",
    price: 45,
    emoji: "🧤",
    description:
      "Guantes de cuero genuino con protecciones de carbono en nudillos y refuerzo en palma. Cierre con velcro ajustable.",
    images: ["🧤", "✋", "🏁"],
  },
  {
    id: "4",
    name: "Llanta Pirelli Diablo Rosso 180/55",
    category: "Llantas",
    price: 220,
    emoji: "🛞",
    badge: "Oferta",
    description:
      "Neumático deportivo de alto agarre en seco y mojado. Compuesto bi-mezcla para mayor duración. Medida 180/55 ZR17.",
    images: ["🛞", "🏍️", "🔥"],
  },
  {
    id: "5",
    name: "Cadena DID 520 X-Ring 120 eslabones",
    category: "Repuestos",
    price: 95,
    emoji: "⛓️",
    description:
      "Cadena de transmisión con sellos X-Ring de larga duración. 120 eslabones, paso 520. Incluye candado de unión.",
    images: ["⛓️", "🔗", "⚙️"],
  },
  {
    id: "6",
    name: "Espejos Retrovisores Universal CNC",
    category: "Accesorios",
    price: 35,
    emoji: "🪞",
    description:
      "Par de espejos CNC en aluminio mecanizado. Rosca universal M10. Diseño aerodinámico con ajuste 360°.",
    images: ["🪞", "🔩", "✨"],
  },
  {
    id: "7",
    name: "Casco Modular LS2 Valiant II",
    category: "Cascos",
    price: 245,
    emoji: "🪖",
    description:
      "Casco modular con sistema 180° flip-back. Doble visera con pantalla solar interna. Forros desmontables y lavables.",
    images: ["🪖", "🛡️", "🌞", "🏍️"],
  },
  {
    id: "8",
    name: "Kit de Frenos Brembo Delantero",
    category: "Repuestos",
    price: 130,
    emoji: "🛠️",
    badge: "Top",
    description:
      "Kit completo de pastillas y discos Brembo para freno delantero. Mayor mordida y resistencia a alta temperatura.",
    images: ["🛠️", "🔴", "⚙️"],
  },
  {
    id: "9",
    name: "Chaqueta Cordura Impermeable",
    category: "Indumentaria",
    price: 165,
    emoji: "🧥",
    description:
      "Chaqueta de Cordura 600D con membrana impermeable, protecciones CE en hombros, codos y espalda. Forro térmico extraíble.",
    images: ["🧥", "🌧️", "🛡️"],
  },
  {
    id: "10",
    name: "Bujías NGK Iridium (Pack 2)",
    category: "Repuestos",
    price: 22,
    emoji: "⚡",
    description:
      "Pack de 2 bujías NGK con electrodo central de iridio. Mejor encendido, menor consumo y mayor vida útil.",
    images: ["⚡", "🔌", "✨"],
  },
  {
    id: "11",
    name: "Soporte Celular Manubrio Aluminio",
    category: "Accesorios",
    price: 28,
    emoji: "📱",
    description:
      "Soporte universal de aluminio con sistema anti-vibración. Compatible con celulares de 4.7\" a 7\". Rotación 360°.",
    images: ["📱", "🔧", "🏍️"],
  },
  {
    id: "12",
    name: "Casco Cross MT Falcon Naranja",
    category: "Cascos",
    price: 175,
    emoji: "🪖",
    badge: "Nuevo",
    description:
      "Casco off-road con visera MX, ventilación máxima y construcción ABS ligera. Ideal para enduro y motocross.",
    images: ["🪖", "🏔️", "🟠", "🏁"],
  },
];

const FILTERS = ["Todos", "Cascos", "Repuestos", "Accesorios", "Aceites", "Llantas", "Indumentaria"];

export function Catalog() {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () => (filter === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

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
            <ProductCard key={p.id} product={p} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      <ProductDetailDialog
        product={selected}
        open={open}
        onOpenChange={setOpen}
      />
    </section>
  );
}
