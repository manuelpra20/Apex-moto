import { buildWhatsAppUrl } from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.001 0C5.376 0 .017 5.36.017 11.985c0 2.114.553 4.182 1.604 5.999L0 24l6.155-1.611a11.94 11.94 0 005.846 1.49h.005c6.624 0 11.984-5.36 11.984-11.985C24 5.36 18.626 0 12.001 0zm0 21.987h-.004a9.96 9.96 0 01-5.077-1.39l-.364-.216-3.78.99 1.01-3.685-.237-.378a9.954 9.954 0 01-1.526-5.323c0-5.495 4.475-9.97 9.978-9.97 2.665 0 5.166 1.04 7.045 2.92a9.92 9.92 0 012.918 7.05c0 5.494-4.473 9.967-9.963 9.967z" />
    </svg>
  );
}

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
      <WhatsAppIcon className="h-7 w-7 md:h-8 md:w-8" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-whatsapp" />
      </span>
    </a>
  );
}
