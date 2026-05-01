export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9\s-]/g, "") // solo alfanuméricos
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
