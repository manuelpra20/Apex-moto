import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const href = buildWhatsAppUrl(
    "Hola Apex Moto 👋, me gustaría recibir más información.",
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl md:h-16 md:w-16"
      style={{
        boxShadow: "0 8px 24px -4px oklch(0.65 0.17 152 / 0.5)",
      }}
    >
      <MessageCircle className="!h-7 !w-7 md:!h-8 md:!w-8" fill="currentColor" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-whatsapp" />
      </span>
    </a>
  );
}
