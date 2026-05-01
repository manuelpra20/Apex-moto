import type { Product } from "@/components/ProductCard";
import { slugify } from "@/lib/slug";

import cascoIntegral from "@/assets/products/casco-integral.jpg";
import aceiteMotul from "@/assets/products/aceite-motul.jpg";
import guantes from "@/assets/products/guantes.jpg";
import llantaPirelli from "@/assets/products/llanta-pirelli.jpg";
import cadena from "@/assets/products/cadena.jpg";
import espejos from "@/assets/products/espejos.jpg";
import cascoModular from "@/assets/products/casco-modular.jpg";
import frenosBrembo from "@/assets/products/frenos-brembo.jpg";
import chaqueta from "@/assets/products/chaqueta.jpg";
import bujias from "@/assets/products/bujias.jpg";
import soporteCelular from "@/assets/products/soporte-celular.jpg";
import cascoCross from "@/assets/products/casco-cross.jpg";

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Casco Integral AGV K1 Negro Mate",
    category: "Cascos",
    price: 189,
    image: cascoIntegral,
    badge: "Nuevo",
    description:
      "Casco integral deportivo con calota de policarbonato HIR-TH, ventilación dinámica y visera anti-rayaduras. Homologación ECE 22.05.",
    images: [cascoIntegral, cascoModular, cascoCross],
  },
  {
    id: "2",
    name: "Aceite Motul 5100 10W40 Semi-Sintético",
    category: "Aceites",
    price: 18,
    image: aceiteMotul,
    description:
      "Aceite semi-sintético tecnología Ester con aditivos especiales para motores 4T. Ideal para uso urbano y carretera.",
    images: [aceiteMotul],
  },
  {
    id: "3",
    name: "Guantes Cuero Pro Racing",
    category: "Indumentaria",
    price: 45,
    image: guantes,
    description:
      "Guantes de cuero genuino con protecciones de carbono en nudillos y refuerzo en palma. Cierre con velcro ajustable.",
    images: [guantes],
  },
  {
    id: "4",
    name: "Llanta Pirelli Diablo Rosso 180/55",
    category: "Llantas",
    price: 220,
    image: llantaPirelli,
    badge: "Oferta",
    description:
      "Neumático deportivo de alto agarre en seco y mojado. Compuesto bi-mezcla para mayor duración. Medida 180/55 ZR17.",
    images: [llantaPirelli],
  },
  {
    id: "5",
    name: "Cadena DID 520 X-Ring 120 eslabones",
    category: "Repuestos",
    price: 95,
    image: cadena,
    description:
      "Cadena de transmisión con sellos X-Ring de larga duración. 120 eslabones, paso 520. Incluye candado de unión.",
    images: [cadena],
  },
  {
    id: "6",
    name: "Espejos Retrovisores Universal CNC",
    category: "Accesorios",
    price: 35,
    image: espejos,
    description:
      "Par de espejos CNC en aluminio mecanizado. Rosca universal M10. Diseño aerodinámico con ajuste 360°.",
    images: [espejos],
  },
  {
    id: "7",
    name: "Casco Modular LS2 Valiant II",
    category: "Cascos",
    price: 245,
    image: cascoModular,
    description:
      "Casco modular con sistema 180° flip-back. Doble visera con pantalla solar interna. Forros desmontables y lavables.",
    images: [cascoModular, cascoIntegral, cascoCross],
  },
  {
    id: "8",
    name: "Kit de Frenos Brembo Delantero",
    category: "Repuestos",
    price: 130,
    image: frenosBrembo,
    badge: "Top",
    description:
      "Kit completo de pastillas y discos Brembo para freno delantero. Mayor mordida y resistencia a alta temperatura.",
    images: [frenosBrembo],
  },
  {
    id: "9",
    name: "Chaqueta Cordura Impermeable",
    category: "Indumentaria",
    price: 165,
    image: chaqueta,
    description:
      "Chaqueta de Cordura 600D con membrana impermeable, protecciones CE en hombros, codos y espalda. Forro térmico extraíble.",
    images: [chaqueta],
  },
  {
    id: "10",
    name: "Bujías NGK Iridium (Pack 2)",
    category: "Repuestos",
    price: 22,
    image: bujias,
    description:
      "Pack de 2 bujías NGK con electrodo central de iridio. Mejor encendido, menor consumo y mayor vida útil.",
    images: [bujias],
  },
  {
    id: "11",
    name: "Soporte Celular Manubrio Aluminio",
    category: "Accesorios",
    price: 28,
    image: soporteCelular,
    description:
      'Soporte universal de aluminio con sistema anti-vibración. Compatible con celulares de 4.7" a 7". Rotación 360°.',
    images: [soporteCelular],
  },
  {
    id: "12",
    name: "Casco Cross MT Falcon Naranja",
    category: "Cascos",
    price: 175,
    image: cascoCross,
    badge: "Nuevo",
    description:
      "Casco off-road con visera MX, ventilación máxima y construcción ABS ligera. Ideal para enduro y motocross.",
    images: [cascoCross, cascoIntegral, cascoModular],
  },
];

export const CATEGORIES = [
  "Todos",
  "Cascos",
  "Repuestos",
  "Accesorios",
  "Aceites",
  "Llantas",
  "Indumentaria",
];
