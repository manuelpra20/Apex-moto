import type { Product } from "@/components/ProductCard";
import { slugify } from "@/lib/slug";

import cascoIntegral from "@/assets/products/casco-integral.jpg";
import aceiteMotul from "@/assets/products/motul.jpeg";
import guantes from "@/assets/products/guantes.jpg";
import llantaPirelli from "@/assets/products/llanta-pirelli.jpg";
import cadena from "@/assets/products/cadena.jpg";
import espejos from "@/assets/products/retrovisor-dr.jpeg";
import cascoModular from "@/assets/products/casco-modular.jpg";
import soporteCelular from "@/assets/products/porta-telefono.jpeg";
import cascoCross from "@/assets/products/casco-cross.jpg";
import Guaya from "@/assets/products/guaya-acelerador.jpg";
import Radios from "@/assets/products/radios-par.jpg";
import FaroLedCuadrado from "@/assets/products/lupas-dos.jpg";
import JuegoDados from "@/assets/products/juegos-dados.jpg";
import FarolupasCuadrada from "@/assets/products/lupas-cuadrado.jpg";
import LedBuho from "@/assets/products/mini-buho.jpg";
import Bases from "@/assets/products/bases-par.jpg";
import cepilloCadena from "@/assets/products/cepillo-cadena.jpg";
import LuzLedLupa from "@/assets/products/lupas-uno.jpg";
import MallaPulo from "@/assets/products/malla-moto.jpg";
import ProtectorZapato from "@/assets/products/protector-zapato.jpg";
import Portaplaca from "@/assets/products/porta-placas.jpg";
import FaroLedRectangular from "@/assets/products/lupas-rectangular.jpg";
import Forro from "@/assets/products/forro-asient.jpg";
import Candado from "@/assets/products/candado-moto.jpg";
import Suiche from "@/assets/products/suiche.jpeg";
import Extintor from "@/assets/products/extintor.jpeg";
import FiltroGasolina from "@/assets/products/filtro-gasolina.jpeg";
import PortaTelefono from "@/assets/products/porta-telefono-dos.jpeg";

const RAW_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Suiche Universal dos Pases",
    category: "Accesorios",
    price: 5,
    image: Suiche,
    badge: "Nuevo",
    description:
      "Switch/suiche Universal Para Moto Luces On/on/of 2 Pases 12v. Ideal para controlar las luces de tu motocicleta de manera fácil y eficiente. Compatible con la mayoría de las motocicletas. Diseño resistente al agua y vibraciones, garantizando durabilidad y rendimiento en cualquier condición de conducción.",
    images: [Suiche],
  },
  {
    id: "2",
    name: "Extintor Portatil para Moto",
    category: "Herramientas",
    price: 4,
    image: Extintor,
    badge: "Nuevo",
    description:
      "Extintor Portátil para Moto. Ideal para brindar seguridad adicional durante tus viajes en moto. Este extintor compacto y fácil de usar es esencial para combatir incendios pequeños y proteger tu seguridad en la carretera. Compatible con la mayoría de las motocicletas, su diseño resistente al agua y vibraciones garantiza durabilidad y confiabilidad en cualquier situación de emergencia.",
    images: [Extintor],
  },
  {
    id: "3",
    name: "Filtro De Gasolina Universal",
    category: "Repuestos",
    price: 3,
    image: FiltroGasolina,
    badge: "Nuevo",
    description:
      "Filtro De Gasolina Universal Para Moto. Ideal para mantener el sistema de combustible de tu motocicleta limpio y funcionando de manera eficiente. Este filtro de gasolina universal es compatible con la mayoría de las motocicletas, ayudando a prevenir obstrucciones y garantizar un rendimiento óptimo del motor. Su diseño resistente al agua y vibraciones asegura durabilidad y confiabilidad en cualquier condición de conducción.",
    images: [FiltroGasolina],
  },
    {
    id: "4",
    name: "PORTA TELEFONO",
    category: "Accesorios",
    price: 3,
    image: PortaTelefono,
    badge: "Nuevo",
    description:
      "PORTA TELEFONO UNIVERSAL PARA MOTO. Ideal para mantener tu smartphone seguro y accesible durante tus viajes en moto. Este porta teléfono universal es compatible con la mayoría de los smartphones, brindando un soporte resistente al agua y vibraciones para garantizar la seguridad de tu dispositivo en cualquier condición de conducción.",
    images: [PortaTelefono],
  },
   {
    id: "5",
    name: "JUEGO DE RADIOS CON AURICULAR BAOFENG",
    category: "Accesorios",
    price: 32,
    image: Radios,
    badge: "Mas Vendido",
    description:
      "Radio Walkie Talkie Baofeng 888s 16 Canales Pack De 2und. Ideal para comunicación en Rutas.",
    images: [Radios],
  },
  {
    id: "6",
    name: "Aceite Motul 5100 15W50 Semi-Sintético",
    category: "Aceites",
    price: 18,
    image: aceiteMotul,
    description:
      "El Motul 5100 4T es un lubricante semisintético de alto rendimiento, reforzado con Esteres, diseñado para motores de motocicletas de 4 tiempos (carretera, enduro, trail, cross), garantizando la protección del motor y caja de cambios. Destaca por mejorar la suavidad en los cambios de marcha y ofrecer alta resistencia a altas temperaturas.",
    images: [aceiteMotul],
  },
  {
    id: "7",
    name: "PAR FAROS LED 4 LUPAS 5 TONOS 6X6cm",
    category: "Accesorios",
    price: 18,
    image: FarolupasCuadrada,
    badge: "Mas Vendido",
    description: "Par Faros led Auxiliares 4 Lupas, Iluminación potente con 5 tonos de luz: (Ambar, blanco frío, Ambar y blanco, Estrobo y rojo).",
    images: [FarolupasCuadrada],
  },
  {
    id: "8",
    name: "PAR Cauchos Timsun",
    category: "Cauchos",
    price: 220,
    image: llantaPirelli,
    badge: "Agotado",
    description:
      "Caucho multiproposito de alto agarre en seco y mojado. Compuesto bi-mezcla para mayor duración. Medida 110/80-19 Y 150/70-17.",
    images: [llantaPirelli],
  },
  {
    id: "9",
    name: "BASE DE LUCES AUXILIARES PAR MOTOS",
    category: "Accesorios",
    price: 12,
    image: Bases,
    badge: "Nuevo",
    description:
      "Par Bases De Metal Soportes De Luces Exploradoras Auxiliares Para Motos. Compatible con la mayoría de las luces auxiliares del mercado. Diseño resistente al agua y vibraciones.",
    images: [Bases],
  },
  {
    id: "10",
    name: "Espejos Retrovisores DR",
    category: "Accesorios",
    price: 14,
    image: espejos,
    description:
      "Espejos Retrovisores Kit Suzuki Dr 650. Rosca universal de metal. Diseño aerodinámico con ajuste, Ideal para tx, lechuza, Rex, GR.",
    images: [espejos],
  },
  {
    id: "11",
    name: "PAR FAROS LED TIPO LUPAS 4 TONOS",
    category: "Accesorios",
    price: 14,
    badge: "Mas Vendido",
    image: FaroLedCuadrado,
    description:
      "Faro Led Tipo Lupa Con Base y tornillos para defensas de Moto. Iluminación potente con 4 tonos de luz (Rojo, Ambar, blanco frío y Estrobo). Diseño resistente al agua y vibraciones. Ideal para mejorar la visibilidad en rutas nocturnas o condiciones climáticas adversas.",
    images: [FaroLedCuadrado],
  },
  {
    id: "12",
    name: "JUEGO DE DADOS 12 PZ",
    category: "Herramientas",
    price: 12,
    image: JuegoDados,
    description:  "Juego De Dados Milimétricos De 12 Piezas Con Rachet Grande y extensor",
    images: [JuegoDados],
  },
  {
    id: "13",
    name: "PROTECTOR DE ZAPATO NEGRO PARA MOTOS",
    category: "Indumentaria",
    price: 5,
    image: ProtectorZapato,
    description:
      "Protector De Zapatos Para Motociclista (Pedal de Cambio)",
    images: [ProtectorZapato],
  },
  {
    id: "14",
    name: "PAR FAROS LED MINI BUHO 4 TONOS",
    category: "Accesorios",
    price: 16,
    image: LedBuho,
    description:
      "Faros Led Mini Buo AntiNiebla De Conducción Para Motocicleta. Iluminación potente con 4 tonos de luz: (Ambar, blanco frío, Ambar y blanco y Estrobo). Diseño resistente al agua y vibraciones. Ideal para mejorar la visibilidad en rutas nocturnas o condiciones climáticas adversas.",
    images: [LedBuho],
  },
  {
    id: "15",
    name: "SOPORTE PORTA TELEFONO IMPERMEABLE",
    category: "Accesorios",
    price: 10,
    image: soporteCelular,
    description:
      'Soporte universal y/o Base Porta Teléfono Impermeable Para Volante de Motos. Compatible con la mayoría de los smartphones. Diseño resistente al agua y vibraciones.',
    images: [soporteCelular],
  },
  {
    id: "16",
    name: "CEPILLO LIMPIA CADENA PARA MOTOS",
    category: "Herramientas",
    price: 4,
    image: cepilloCadena,
    description:
      "Cepillo Limpia Cadena Motocicleta 1 pieza. Diseño de cerdas duraderas para eliminar suciedad y grasa. Mango ergonómico para un agarre cómodo durante la limpieza de la cadena.  Ideal para mantener la cadena de tu moto o bicicleta en óptimas condiciones, prolongando su vida útil y mejorando el rendimiento.",
    images: [cepilloCadena],
  },
  {
    id: "17",
    name: "GUAYA ACELERADOR TX150, DSR",
    category: "Repuestos",
    price: 10,
    image: Guaya,
    description:
      "Guaya De Aceleracion (tx 150), DSR. Repuesto original de alta calidad para garantizar un rendimiento óptimo y duradero en tu motocicleta. Compatible con modelos específicos, esta guaya de aceleración es fácil de instalar y proporciona una respuesta suave y precisa al acelerar, mejorando la experiencia de conducción.",
    images: [Guaya],
  },
  {
    id: "18",
    name: "Casco Cross MT Falcon Naranja",
    category: "Cascos",
    price: 175,
    image: cascoCross,
    badge: "Agotado",
    description:
      "Casco off-road con visera MX, ventilación máxima y construcción ABS ligera. Ideal para enduro y motocross.",
    images: [cascoCross, cascoIntegral, cascoModular],
  },
  {
    id: "19",
    name: "PAR FAROS LED TIPO LUPAS 2 TONOS",
    category: "Accesorios",
    price: 9,
    image: LuzLedLupa,
    description:
      "Faro Led Tipo Lupa con tornillos e interructor, diseñada para defensas de Moto. Iluminación potente con 2 tonos de luz (Ambar y blanco frío). Ideal para mejorar la visibilidad en rutas nocturnas o condiciones climáticas adversas.",
    images: [LuzLedLupa],
  },
  {
    id: "20",
    name: "MALLA TIPO PULPO PARA CARGA MOTO",
    category: "Accesorios",
    price: 5,
    image: MallaPulo,
    description:
      "Red Malla Para Motos Con Ganchos Elastica Equipaje 6 Puntas. Ideal para asegurar tu carga de manera rápida y eficiente durante tus viajes en moto. La malla elástica se adapta a diferentes formas y tamaños de objetos, mientras que los ganchos resistentes garantizan una sujeción segura en cualquier tipo de moto.",
    images: [MallaPulo],
  },
  {
    id: "21",
    name: "Guantes Cuero Pro Racing",
    category: "Indumentaria",
    price: 40,
    badge: "Agotado",
    image: guantes,
    description:
      "Guantes de cuero genuino con protecciones de carbono en nudillos y refuerzo en palma. Cierre con velcro ajustable.",
    images: [guantes],
  },
  {
    id: "22",
    name: "PORTAPLACA METALICO UNIVERSAL NEGRO",
    category: "Accesorios",
    price: 6,
    image: Portaplaca,
    description:
      "Portaplacas Salvaplaca Decorativo Universal Para Motos. Compatible con la mayoría de las motocicletas. Diseño resistente al agua y vibraciones. Ideal para proteger tu placa de matrícula y agregar un toque personalizado a tu moto.",
    images: [Portaplaca],
  },
  {
    id: "23",
    name: "PAR FAROS LED 4 LUPAS 4 TONOS 13X4cm",
    category: "Accesorios",
    price: 20,
    image: FaroLedRectangular,
    description:
      "Par Faros led Auxiliares 4 Lupas Rectangulares, Iluminación potente con 4 tonos de luz: (Ambar, blanco frío, Ambar y blanco, Estrobo).",
    images: [FaroLedRectangular],
  },
   {
    id: "24",
    name: "FORRO ASIENTO TIPO MALLA",
    category: "Accesorios",
    price: 6,
    image: Forro,
    description:
      "Forro De Asiento Tipo Malla Para Moto TX, Kavak, Lechuza, Rex, tigrito. Compatible con la mayoría de los asientos de motocicletas. Diseño de malla transpirable para mayor comodidad y ventilación durante tus viajes en moto. Ideal para proteger tu asiento y mejorar tu experiencia de conducción.",
    images: [Forro],
  },
     {
    id: "25",
    name: "CANDADO PARA MOTO CON ALARMA",
    category: "Accesorios",
    price: 18,
    image: Candado,
    description:
      "Candado Con Alarma De Disco Para Moto sistema Antirrobo",
    images: [Candado],
  },
 
];

export const PRODUCTS: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  slug: p.slug ?? slugify(p.name),
}));

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const CATEGORIES = [
  "Todos",
  "Cascos",
  "Repuestos",
  "Accesorios",
  "Aceites",
  "Cauchos",
  "Indumentaria",
  "Herramientas",
];
