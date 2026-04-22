import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden text-white"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.58 0.22 27 / 0.6) 0%, transparent 50%), radial-gradient(circle at 80% 70%, oklch(0.58 0.22 27 / 0.4) 0%, transparent 50%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:items-center md:px-6 md:py-24">
        <div>
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Tienda #1 en Venezuela
          </span>
          <h1 className="mt-6 text-4xl font-black leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
            Vive la <span className="text-primary">velocidad</span>,
            <br />
            equipa tu moto.
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/70 md:text-lg">
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
              className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              Categorías
            </a>
          </div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { n: "+5K", l: "Clientes" },
              { n: "+800", l: "Productos" },
              { n: "24h", l: "Despacho" },
            ].map((s) => (
              <div key={s.l}>
                <div className="text-2xl font-black text-primary md:text-3xl">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative aspect-square">
            <div
              className="absolute inset-0 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div className="relative flex h-full items-center justify-center text-[18rem] leading-none">
              🏍️
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
