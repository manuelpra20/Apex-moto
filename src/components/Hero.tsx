import { ChevronRight } from "lucide-react";
import heroVideo from "@/assets/video-moto.gif";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden text-white"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Video de fondo a todo lo ancho */}
      <img
        src={heroVideo}
        
        
        
        
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />

      {/* Overlay con el gradiente del hero para mantener identidad de marca */}
      <div
        aria-hidden
        className="absolute inset-0"
        // style={{
        //   background:
        //     "linear-gradient(120deg, oklch(0.18 0.03 250 / 0.85) 0%, oklch(0.18 0.03 250 / 0.55) 50%, oklch(0.18 0.03 250 / 0.85) 100%)",
        // }}
      />

      {/* Acentos rojos radiales */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        // style={{
        //   backgroundImage:
        //     "radial-gradient(circle at 20% 30%, oklch(0.58 0.22 27 / 0.6) 0%, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.58 0.22 27 / 0.4) 0%, transparent 50%)",
        // }}
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-6 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 backdrop-blur">
            Tienda #1 en Venezuela
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Vive la <span className="text-primary">velocidad</span>,
            <br />
            equipa tu moto.
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/80 md:text-lg">
            Cascos, repuestos y accesorios originales para que ruedes seguro,
            con estilo y al mejor precio. Envíos a toda Venezuela.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-transform hover:scale-105"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            >
              Ver catálogo <ChevronRight className="h-4 w-4" />
            </a>
            <a
              href="#categorias"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              Categorías
            </a>
          </div>

          <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
            {[
              { n: "+5K", l: "Clientes" },
              { n: "+800", l: "Productos" },
              { n: "24h", l: "Despacho" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-black text-primary md:text-3xl">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-white/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fade inferior para transición suave a la siguiente sección */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.15 0.02 250) 100%)",
        }}
      />
    </section>
  );
}
