#!/usr/bin/env node
/**
 * Prerender script for static deployment (Netlify, etc).
 *
 * Runs after `vite build`. It boots the SSR worker bundle, renders the
 * configured routes to static .html files inside dist/client/, and copies
 * server assets (images, CSS) referenced by the SSR output into the client
 * folder so Netlify can serve everything from a single static directory.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();
const CLIENT_DIR = join(ROOT, "dist", "client");
const SERVER_DIR = join(ROOT, "dist", "server");

// Helper para slugificar (debe coincidir con src/lib/slug.ts)
function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Lista de productos a prerender — debe mantenerse alineada con src/lib/products.ts
// (solo necesitamos los nombres para generar los slugs)
const PRODUCT_NAMES = [
  "Casco Integral AGV K1 Negro Mate",
  "Aceite Motul 5100 10W40 Semi-Sintético",
  "Guantes Cuero Pro Racing",
  "Llanta Pirelli Diablo Rosso 180/55",
  "Cadena DID 520 X-Ring 120 eslabones",
  "Espejos Retrovisores Universal CNC",
  "Casco Modular LS2 Valiant II",
  "Kit de Frenos Brembo Delantero",
  "Chaqueta Cordura Impermeable",
  "Bujías NGK Iridium (Pack 2)",
  "Soporte Celular Manubrio Aluminio",
  "Casco Cross MT Falcon Naranja",
];

// Rutas a prerender. Añade más aquí cuando crees nuevas páginas.
const ROUTES = ["/", ...PRODUCT_NAMES.map((name) => `/producto/${slugify(name)}`)];

if (!existsSync(SERVER_DIR)) {
  console.error("✗ dist/server not found — run `vite build` first.");
  process.exit(1);
}

// Copy server assets into client (CSS, hashed images referenced by SSR HTML)
const serverAssets = join(SERVER_DIR, "assets");
const clientAssets = join(CLIENT_DIR, "assets");
if (existsSync(serverAssets)) {
  cpSync(serverAssets, clientAssets, { recursive: true, force: true });
}

// Find SSR entry
const manifestPath = join(SERVER_DIR, ".vite", "manifest.json");
let entryFile = "index.js";
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const entry = Object.values(manifest).find((m) => m.isEntry);
  if (entry?.file) entryFile = entry.file;
}
const entryPath = join(SERVER_DIR, entryFile);

console.log(`→ Loading SSR entry: ${entryPath}`);

let mod;
try {
  mod = await import(pathToFileURL(entryPath).href);
} catch (err) {
  console.error("✗ Failed to load SSR entry. This static prerender works only");
  console.error("  for apps without server functions / runtime-only APIs.");
  console.error(err);
  process.exit(1);
}

const handler = mod.default?.fetch ?? mod.fetch ?? mod.default;
if (typeof handler !== "function") {
  console.error("✗ SSR entry does not export a fetch handler.");
  process.exit(1);
}

for (const route of ROUTES) {
  const url = `http://localhost${route}`;
  const req = new Request(url);
  const res = await handler(req, { ASSETS: { fetch: () => new Response("", { status: 404 }) } }, { waitUntil: () => {}, passThroughOnException: () => {} });
  const html = await res.text();

  const outPath =
    route === "/"
      ? join(CLIENT_DIR, "index.html")
      : join(CLIENT_DIR, route.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`✓ Prerendered ${route} → ${outPath.replace(ROOT + "/", "")}`);
}

console.log("\n✓ Static export ready in dist/client/");
