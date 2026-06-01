import { getAllTemplates } from "../logic/templateLibrary.js";
import { getAllExercises, getExerciseById } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";

function formatTemplatePriority(template) {
  if (!template.priority) return "Custom";

  if (template.priority.startsWith?.("custom-") || template.priority.includes("-")) {
    return "Saved Session";
  }

  return template.priority;
}

function getMethodName(id) {
  return methodTypes.find(method => method.id === id)?.name || "Method";
}

function renderTemplateBuilder(templates, exercises) {
  const customTemplates = templates.filter(template =>
    template.id.startsWith("custom-template-")
  );

  return `
    <article class="workspace-card desktop-plan-builder">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Plan builder</p>
          <h2>Add exercises to templates</h2>
        </div>
      </div>

      ${
        customTemplates.length === 0
          ? `
            <p>Create a custom template first, then add planned exercises here.</p>
          `
          : `
            <div class="form-grid">
              <label class="form-field">
                <span>Template</span>
                <select id="template-builder-template">
                  ${customTemplates.map(template => `
                    <option value="${template.id}">${template.name}</option>
                  `).join("")}
                </select>
              </label>

              <label class="form-field">
                <span>Exercise</span>
                <select id="template-builder-exercise">
                  ${exercises.map(exercise => `
                    <option value="${exercise.id}">${exercise.name}</option>
                  `).join("")}
                </select>
              </label>
            </div>

            <label class="form-field">
              <span>Method</span>
              <select id="template-builder-method">
                ${methodTypes.map(method => `
                  <option value="${method.id}">${method.name}</option>
                `).join("")}
              </select>
            </label>

            <label class="form-field">
              <span>Target</span>
              <input
                id="template-builder-target"
                type="text"
                placeholder="+25kg × 3 / 1-2-3-4-5 × 2 / 30s × 3"
              />
            </label>

            <label class="form-field">
              <span>Notes</span>
              <textarea
                id="template-builder-notes"
                placeholder="Strict ROM, technical failure, pain cap, tempo..."
              ></textarea>
            </label>

            <input id="editing-planned-exercise-id" type="hidden" value="" />

<button class="primary-button" id="add-exercise-to-template">
  Save Planned Exercise
</button>
          `
      }
    </article>
  `;
}

function renderTemplateExerciseList(template) {
  const planned = template.exercises || [];

  if (planned.length === 0) {
    return `<small>No planned exercises yet.</small>`;
  }

  return `
    <div class="planned-exercise-list">
      ${planned.map(item => {
        const exercise = getExerciseById(item.exerciseId);

        return `
          <div class="planned-exercise-row">
            <div>
              <strong>${exercise?.name || "Exercise"}</strong>
              <small>${getMethodName(item.methodId)} · ${item.target || "No target"}</small>
              ${item.notes ? `<p>${item.notes}</p>` : ""}
            </div>

            ${
              template.id.startsWith("custom-template-")
                ? `
                  <div class="planned-exercise-actions">
  <button
    class="mini-action-button"
    data-template-id="${template.id}"
    data-edit-template-exercise="${item.id}"
  >
    Edit
  </button>

  <button
    class="mini-delete-button"
    data-template-id="${template.id}"
    data-remove-template-exercise="${item.id}"
  >
    ×
  </button>
</div>
                `
                : ""
            }
          </div>
        `;
      }).join("")}
    </div>
  `;
}

export function renderSession() {
  const templates = getAllTemplates();
  const exercises = getAllExercises();

  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Session builder</p>
        <h1>Plan or start training</h1>
      </div>

      <article class="ad-hoc-card">
        <div class="section-header">
          <p class="eyebrow">Flexible session</p>
          <h2>Start Empty Session</h2>
        </div>

        <p class="card-copy">
          Create an ad hoc session and build it as you train.
        </p>

        <label class="form-field">
          <span>Session Name</span>
          <input
            id="adhoc-session-name"
            type="text"
            placeholder="Upper Pull / Hotel Session / Conditioning"
          />
        </label>

        <label class="form-field">
          <span>Goal (optional)</span>
          <input
            id="adhoc-session-goal"
            type="text"
            placeholder="Strength / Density / Rehab / Hybrid"
          />
        </label>

        <button class="primary-button" id="start-adhoc-session">
          Start Empty Session
        </button>
      </article>

      <article class="ad-hoc-card">
        <div class="section-header">
          <p class="eyebrow">Custom template</p>
          <h2>Create Template</h2>
        </div>

        <label class="form-field">
          <span>Template Name</span>
          <input
            id="custom-template-name"
            type="text"
            placeholder="Upper Density / Pull Strength / Rehab Day"
          />
        </label>

        <label class="form-field">
          <span>Goal</span>
          <input
            id="custom-template-goal"
            type="text"
            placeholder="Build strict pull-up volume"
          />
        </label>

        <label class="form-field">
  <span>Priority</span>
  <input
    id="custom-template-priority"
    type="text"
    placeholder="Weighted Pull-Up / Hack Squat / Conditioning"
  />
</label>

<input id="editing-template-id" type="hidden" value="" />

<button class="primary-button" id="add-custom-template">
  Save Template
</button>
      </article>

      ${renderTemplateBuilder(templates, exercises)}

      <div class="section-header">
        <p class="eyebrow">Templates</p>
        <h2>Structured sessions</h2>
      </div>

      <div class="stack">
        ${templates.map(template => `
          <div class="template-row-wrap">
            <button 
              class="session-card"
              data-template-id="${template.id}"
            >
              <span>${template.name}</span>
              <strong>${formatTemplatePriority(template)}</strong>
              <small>${template.goal || "No goal set"}</small>
            </button>

            <div class="template-plan-preview">
              ${renderTemplateExerciseList(template)}
            </div>

            ${
  template.id.startsWith("custom-template-")
    ? `
      <div class="template-actions">
        <button
          class="mini-action-button"
          data-edit-template-id="${template.id}"
        >
          Edit
        </button>

        <button 
          class="mini-delete-button"
          data-delete-custom-template="${template.id}"
        >
          ×
        </button>
      </div>
    `
    : ""
}
          </div>
        `).join("")}
      </div>
    </section>
  `;
}