import { useSyncExternalStore } from "react";

type Listener = () => void;
const listeners = new Set<Listener>();
let query = "";
let page = 1;
let filter = "Todos";

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: Listener): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getQuerySnapshot(): string {
  return query;
}

function getPageSnapshot(): number {
  return page;
}

function getFilterSnapshot(): string {
  return filter;
}

export function setSearchQuery(next: string) {
  query = next;
  emit();
}

export function setCatalogPage(next: number) {
  page = next;
  emit();
}

export function setCatalogFilter(next: string) {
  filter = next;
  emit();
}

export function resetCatalog() {
  query = "";
  page = 1;
  filter = "Todos";
  emit();
}

export function useSearchQuery(): string {
  return useSyncExternalStore(subscribe, getQuerySnapshot, () => "");
}

export function useCatalogPage(): number {
  return useSyncExternalStore(subscribe, getPageSnapshot, () => 1);
}

export function useCatalogFilter(): string {
  return useSyncExternalStore(subscribe, getFilterSnapshot, () => "Todos");
}

export function scrollToCatalog() {
  if (typeof document === "undefined") return;
  const el = document.getElementById("catalogo");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
