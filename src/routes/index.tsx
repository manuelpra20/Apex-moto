import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Catalog } from "@/components/Catalog";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Apex Moto — Repuestos y accesorios para tu moto" },
      {
        name: "description",
        content:
          "Tienda online de cascos, repuestos y accesorios para motos en Venezuela. Compra al instante por WhatsApp con envío a todo el país.",
      },
      { property: "og:title", content: "Apex Moto — Tu tienda de motos" },
      {
        property: "og:description",
        content:
          "Cascos, repuestos y accesorios originales. Compra rápido por WhatsApp.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    // esperar a que monte el contenido
    const t = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <div style={{ background: "var(--gradient-dark-wine)" }}>
          <Categories />
          <Catalog />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
