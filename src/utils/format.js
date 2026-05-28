import { createMethodSummary } from "../logic/methodParsers.js";

export function formatDate(dateString, options = {}) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...options
  });
}

export function formatMethodData(data = {}, methodId = "standard-sets") {
  return createMethodSummary(methodId, data);
}
