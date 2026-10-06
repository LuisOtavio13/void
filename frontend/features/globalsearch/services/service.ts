import type { SearchResult } from "../types";

export async function search(term: string): Promise<SearchResult[]> {
  const response = await fetch(`/api/search?termo=${encodeURIComponent(term)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erro ao buscar resultados");
  }

  return response.json() as Promise<SearchResult[]>;
}