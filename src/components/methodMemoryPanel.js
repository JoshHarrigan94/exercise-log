import {
  getLastLogForExerciseAndMethod,
  getExerciseMemorySummary
} from "../logic/methodMemory.js";

import { store } from "../state/store.js";
import { formatMethodData } from "../utils/format.js";

export function renderMethodMemoryPanel() {
  return `
    <article class="memory-panel" id="method-memory-panel">
      <span>Memory</span>
      <strong>No previous exposure loaded</strong>
      <small>Select exercise and method to check previous structure.</small>
    </article>
  `;
}

export function updateMethodMemoryPanel() {
  const panel = document.querySelector("#method-memory-panel");
  const exerciseSelect = document.querySelector("#log-exercise");
  const methodSelect = document.querySelector("#log-method");

  if (!panel || !exerciseSelect || !methodSelect) return;

  const exerciseId = exerciseSelect.value;
  const methodId = methodSelect.value;

  const lastLog = getLastLogForExerciseAndMethod(
    store.data.sessions,
    store.activeSession,
    exerciseId,
    methodId
  );

  const summary = getExerciseMemorySummary(lastLog);

  panel.innerHTML = lastLog
    ? `
      <span>Memory</span>
      <strong>${formatMethodData(lastLog.data, lastLog.methodId)}</strong>
      <small>${summary.detail}</small>

      <button 
        type="button"
        class="secondary-button compact-button"
        id="load-last-exposure"
      >
        Load Previous
      </button>
    `
    : `
      <span>Memory</span>
      <strong>${summary.label}</strong>
      <small>${summary.detail}</small>
    `;
}

export function bindMethodMemoryActions() {
  const loadButton = document.querySelector("#load-last-exposure");

  if (!loadButton) return;

  loadButton.addEventListener("click", () => {
    const exerciseSelect = document.querySelector("#log-exercise");
    const methodSelect = document.querySelector("#log-method");

    const lastLog = getLastLogForExerciseAndMethod(
      store.data.sessions,
      store.activeSession,
      exerciseSelect.value,
      methodSelect.value
    );

    if (!lastLog?.data) return;

    Object.entries(lastLog.data).forEach(([key, value]) => {
      const field = document.querySelector(`#dynamic-${key}`);

      if (field) {
        field.value = value;
        field.dispatchEvent(new Event("input", { bubbles: true }));
      }
    });
  });
}
