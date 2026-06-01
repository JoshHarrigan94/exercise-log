import { getAllExercises } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";
import { renderMethodFields } from "./methodFields.js";
import { renderQuickChips } from "./quickChips.js";
import { renderMethodPreview } from "./methodPreview.js";
import { renderMethodMemoryPanel } from "./methodMemoryPanel.js";

export function renderSetLogger() {
  const allExercises = getAllExercises();

  return `
    <article class="logger-card compact-logger">
      <div class="compact-logger-header">
        <div>
          <p class="eyebrow">Log</p>
          <h2>Training exposure</h2>
        </div>

        <button class="secondary-button compact-button" id="clear-log-form" type="button">
          Clear
        </button>
      </div>

      <div class="compact-log-row">
        <label class="compact-field compact-field-wide">
          <span>Exercise</span>
          <select id="log-exercise">
            ${allExercises.map(exercise => `
              <option value="${exercise.id}">
                ${exercise.name}
              </option>
            `).join("")}
          </select>
        </label>

        <label class="compact-field compact-field-wide">
          <span>Method</span>
          <select id="log-method">
            ${methodTypes.map(method => `
              <option value="${method.id}">
                ${method.name}
              </option>
            `).join("")}
          </select>
        </label>

        <label class="compact-field compact-field-small">
          <span>RPE</span>
          <input id="log-rpe" type="number" min="1" max="10" step="0.5" placeholder="8" />
        </label>

        <label class="compact-field compact-field-small">
          <span>Pain</span>
          <input id="log-pain" type="number" min="0" max="10" step="1" placeholder="0" />
        </label>

        <button class="primary-button compact-save-button" id="add-exercise-log">
          Save
        </button>
      </div>

      <details class="logger-details">
        <summary>
          Result details
        </summary>

        <div class="logger-details-body">
          ${renderMethodMemoryPanel()}

          <div id="dynamic-method-fields">
            ${renderMethodFields("standard-sets")}
          </div>

          ${renderMethodPreview()}

          <div class="form-grid">
            <label class="form-field">
              <span>RPE</span>
              <input id="log-rpe-detail" type="number" min="1" max="10" step="0.5" placeholder="8" />
              ${renderQuickChips("log-rpe-detail", ["6", "7", "8", "8.5", "9", "9.5", "10"])}
            </label>

            <label class="form-field">
              <span>Pain</span>
              <input id="log-pain-detail" type="number" min="0" max="10" step="1" placeholder="0" />
              ${renderQuickChips("log-pain-detail", ["0", "1", "2", "3", "4"])}
            </label>
          </div>

          <label class="form-field">
            <span>Notes</span>
            <textarea 
              id="log-notes"
              placeholder="Strict reps, good lockout, calf felt fine..."
            ></textarea>
          </label>
        </div>
      </details>

      <input id="editing-log-id" type="hidden" value="" />
    </article>
  `;
}