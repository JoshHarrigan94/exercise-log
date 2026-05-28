import { calculateMethodExposure } from "../logic/methodCalculations.js";
import { formatMethodData } from "../utils/format.js";

export function renderMethodPreview() {
  return `
    <article class="method-preview" id="method-preview">
      <span>Preview</span>
      <strong>No exposure entered yet</strong>
      <small>Totals will update as you log.</small>
    </article>
  `;
}

export function updateMethodPreview() {
  const methodSelect = document.querySelector("#log-method");
  const preview = document.querySelector("#method-preview");

  if (!methodSelect || !preview) return;

  const methodId = methodSelect.value;
  const data = {};

  document.querySelectorAll("[id^='dynamic-']").forEach(field => {
    data[field.id.replace("dynamic-", "")] = field.value;
  });

  const exposure = calculateMethodExposure(methodId, data);
  const summary = formatMethodData(data, methodId);

  preview.innerHTML = `
    <span>Preview</span>
    <strong>${summary}</strong>
    <small>${exposure.exposureLabel} · ${exposure.densityLabel}</small>
  `;
}
