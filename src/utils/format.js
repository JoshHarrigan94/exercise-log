export function formatDate(dateString, options = {}) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...options
  });
}

export function formatMethodData(data = {}) {
  const values = Object.values(data).filter(Boolean);
  return values.length ? values.join(" · ") : "No method data";
}
