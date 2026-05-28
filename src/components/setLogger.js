import { getAllExercises } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";
import { renderMethodFields } from "./methodFields.js";
import { renderQuickChips } from "./quickChips.js";
import { renderMethodPreview } from "./methodPreview.js";
import { renderMethodMemoryPanel } from "./methodMemoryPanel.js";

export function renderSetLogger() {
 const allExercises = getAllExercises();
  return `
    <article class="logger-card">
      <div class="section-header">
        <p class="eyebrow">Quick log</p>
        <h1>Add exercise</h1>
      </div>

      <label class="form-field">
        <span>Exercise</span>

        <select id="log-exercise">
          ${allExercises.map(exercise => `
            <option value="${exercise.id}">
              ${exercise.name}
            </option>
          `).join("")}
        </select>
      </label>

      <label class="form-field">
        <span>Method</span>

        <select id="log-method">
          ${methodTypes.map(method => `
            <option value="${method.id}">
              ${method.name}
            </option>
          `).join("")}
        </select>
      </label>

      ${renderMethodMemoryPanel()}

      <div id="dynamic-method-fields">
        ${renderMethodFields("standard-sets")}
      </div>

      ${renderMethodPreview()}

      <div class="form-grid">
        <label class="form-field">
          <span>RPE</span>
          <input id="log-rpe" type="number" min="1" max="10" step="0.5" placeholder="8" />
          ${renderQuickChips("log-rpe", ["6", "7", "8", "8.5", "9", "9.5", "10"])}
        </label>

        <label class="form-field">
          <span>Pain</span>
          <input id="log-pain" type="number" min="0" max="10" step="1" placeholder="0" />
          ${renderQuickChips("log-pain", ["0", "1", "2", "3", "4"])}
        </label>
      </div>

      <label class="form-field">
        <span>Notes</span>

        <textarea 
          id="log-notes"
          placeholder="Strict reps, good lockout, calf felt fine..."
        ></textarea>
      </label>

      <button class="primary-button" id="add-exercise-log">
        Add to Session
      </button>
    </article>
  `;
}
