const CATEGORIES = [
  { name: "Cascos", icon: "🪖", count: 12 },
  { name: "Repuestos", icon: "⚙️", count: 32 },
  { name: "Accesorios", icon: "🧰", count: 21 },
  { name: "Aceites", icon: "🛢️", count: 15 },
  { name: "Cauchos", icon: "🛞", count: 6 },
  { name: "Indumentaria", icon: "🧥", count: 9 },
  { name: "Herramientas", icon: "🛠️", count: 24 },
];

export function Categories() {
  return (
    <section
      id="categorias"
      className="relative py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary" style={{ color: 'white' , fontWeight: '900'}}>
              Explora
            </span>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">
              Categorías
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <a
              key={c.name}
              href="#catalogo"
              className="group flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary hover:bg-white/10"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="text-4xl transition-transform group-hover:scale-110">
                {c.icon}
              </div>
              <div className="mt-3 text-sm font-bold text-white">{c.name}</div>
              <div className="mt-1 text-xs text-white/60">
                {c.count} productos
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
