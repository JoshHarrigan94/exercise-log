import { exercises } from "../data/exercises.js";
import { methodTypes } from "../data/methodTypes.js";

export function renderSetLogger() {
  return `
    <article class="logger-card">
      <div class="section-header">
        <p class="eyebrow">Quick log</p>
        <h1>Add exercise</h1>
      </div>

      <label class="form-field">
        <span>Exercise</span>
        <select id="log-exercise">
          ${exercises.map(exercise => `
            <option value="${exercise.id}">${exercise.name}</option>
          `).join("")}
        </select>
      </label>

      <label class="form-field">
        <span>Method</span>
        <select id="log-method">
          ${methodTypes.map(method => `
            <option value="${method.id}">${method.name}</option>
          `).join("")}
        </select>
      </label>

      <div class="form-grid">
        <label class="form-field">
          <span>Load</span>
          <input id="log-load" type="text" placeholder="+25kg / 80kg / BW" />
        </label>

        <label class="form-field">
          <span>Reps / Structure</span>
          <input id="log-reps" type="text" placeholder="5 / 1-2-3-4-5 / 10+3+2" />
        </label>
      </div>

      <div class="form-grid">
        <label class="form-field">
          <span>RPE</span>
          <input id="log-rpe" type="number" min="1" max="10" step="0.5" placeholder="8" />
        </label>

        <label class="form-field">
          <span>Pain</span>
          <input id="log-pain" type="number" min="0" max="10" step="1" placeholder="0" />
        </label>
      </div>

      <label class="form-field">
        <span>Notes</span>
        <textarea id="log-notes" placeholder="Strict reps, good lockout, calf felt fine..."></textarea>
      </label>

      <button class="primary-button" id="add-exercise-log">
        Add to Session
      </button>
    </article>
  `;
}
