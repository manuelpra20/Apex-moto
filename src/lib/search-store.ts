import { useSyncExternalStore } from "react";

type Listener = () => void;
const listeners = new Set<Listener>();
let query = "";

function subscribe(l: Listener): () => void {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot(): string {
  return query;
}

export function setSearchQuery(next: string) {
  query = next;
  listeners.forEach((l) => l());
}

export function useSearchQuery(): string {
  return useSyncExternalStore(subscribe, getSnapshot, () => "");
}

export function scrollToCatalog() {
  if (typeof document === "undefined") return;
  const el = document.getElementById("catalogo");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
