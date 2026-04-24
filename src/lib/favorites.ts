import { useSyncExternalStore } from "react";

const STORAGE_KEY = "apex-moto:favorites";

type Listener = () => void;
const listeners = new Set<Listener>();

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

let cache: string[] = read();

function write(next: string[]) {
  cache = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot(): string[] {
  return cache;
}

function getServerSnapshot(): string[] {
  return [];
}

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isFavorite = (id: string) => ids.includes(id);

  const toggle = (id: string) => {
    if (cache.includes(id)) {
      write(cache.filter((x) => x !== id));
    } else {
      write([...cache, id]);
    }
  };

  const remove = (id: string) => {
    write(cache.filter((x) => x !== id));
  };

  return { ids, count: ids.length, isFavorite, toggle, remove };
}
