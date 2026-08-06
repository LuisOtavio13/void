export async function search(termo: string) {
  const response = await fetch(`/api/search?termo=${encodeURIComponent(termo)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Erro ao buscar resultados");
  }

  return response.json();
}