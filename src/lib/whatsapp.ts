export const WHATSAPP_NUMBER = "584124970042";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildProductMessage(productName: string, price: string): string {
  return `Hola Apex Moto 👋, estoy interesado en comprar:\n\n*${productName}*\nPrecio: ${price}\n\n¿Está disponible?`;
}
