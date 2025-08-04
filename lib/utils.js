// lib/utils.js
export function formatDate(dateString) {
  // exemplo: 2025-05-20 -> 20 de maio de 2025
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
