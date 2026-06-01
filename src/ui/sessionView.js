import { getAllTemplates } from "../logic/templateLibrary.js";
import { getAllExercises, getExerciseById } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";

function isCustomTemplate(template) {
  return template.id.startsWith("custom-template-");
}

function getMethodName(id) {
  return methodTypes.find(method => method.id === id)?.name || "Method";
}

function renderSetSummary(item) {
  const sets = item.sets || [];

  if (sets.length === 0) return item.target || "No target";

  if (sets.length === 1) {
    const set = sets[0];
    return `${set.load || "Load"} × ${set.reps || "Result"}${set.rest ? ` · ${set.rest}` : ""}${set.rpe ? ` · RPE ${set.rpe}` : ""}`;
  }

  const first = sets[0];
  return `${sets.length} sets · ${first.load || "Load"} × ${first.reps || "Reps"}${first.rest ? ` · ${first.rest}` : ""}`;
}

function renderPlanRows(template) {
  const planned = template.exercises || [];

  if (planned.length === 0) {
    return `<div class="plan-empty-row">No planned movements yet.</div>`;
  }

  return `
    <div class="plan-row-list">
      ${planned.map(item => {
        const exercise = getExerciseById(item.exerciseId);

        return `
          <div class="plan-row">
            <div class="plan-row-main">
              <strong>${exercise?.name || "Exercise"}</strong>
              <small>${getMethodName(item.methodId)} · ${renderSetSummary(item)}</small>
            </div>

            ${
              item.notes
                ? `<p>${item.notes}</p>`
                : ""
            }

            ${
              isCustomTemplate(template)
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

function renderPlanCard(template) {
  return `
    <article class="plan-card">
      <div class="plan-card-header">
        <button 
          class="plan-title-button"
          data-template-id="${template.id}"
        >
          <span>${template.priority || "Training block"}</span>
          <strong>${template.name}</strong>
          <small>${template.goal || "No goal set"}</small>
        </button>

        ${
          isCustomTemplate(template)
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

      ${renderPlanRows(template)}
    </article>
  `;
}

function renderQuickStart() {
  return `
    <article class="plan-create-card">
      <div>
        <p class="eyebrow">Quick start</p>
        <h2>Ad hoc session</h2>
        <p>Start logging without a plan.</p>
      </div>

      <div class="inline-session-form">
        <input id="adhoc-session-name" type="text" placeholder="Session name" />
        <input id="adhoc-session-goal" type="text" placeholder="Goal optional" />

        <button class="primary-button" id="start-adhoc-session">
          Start
        </button>
      </div>
    </article>
  `;
}

function renderCreateTemplatePanel() {
  return `
    <article class="plan-create-card">
      <div>
        <p class="eyebrow">Create block</p>
        <h2>Training block / plan</h2>
        <p>Create the container first, then add planned movements.</p>
      </div>

      <div class="inline-template-form">
        <input id="custom-template-name" type="text" placeholder="Block name" />
        <input id="custom-template-goal" type="text" placeholder="Goal" />
        <input id="custom-template-priority" type="text" placeholder="Focus" />

        <input id="editing-template-id" type="hidden" value="" />

        <button class="primary-button" id="add-custom-template">
          Save
        </button>
      </div>
    </article>
  `;
}

function renderMovementBuilder(templates, exercises) {
  const customTemplates = templates.filter(isCustomTemplate);

  return `
    <article class="plan-builder-card">
      <div class="plan-builder-header">
        <div>
          <p class="eyebrow">Add movement</p>
          <h2>Planned exercise</h2>
        </div>
      </div>

      ${
        customTemplates.length === 0
          ? `<p>Create a custom block first.</p>`
          : `
            <div class="compact-plan-builder-row structured-builder-row">
              <select id="template-builder-template">
                ${customTemplates.map(template => `
                  <option value="${template.id}">${template.name}</option>
                `).join("")}
              </select>

              <select id="template-builder-exercise">
                ${exercises.map(exercise => `
                  <option value="${exercise.id}">${exercise.name}</option>
                `).join("")}
              </select>

              <select id="template-builder-method">
                ${methodTypes.map(method => `
                  <option value="${method.id}">${method.name}</option>
                `).join("")}
              </select>

              <input id="template-builder-load" type="text" placeholder="Load" />
              <input id="template-builder-sets" type="number" min="1" placeholder="Sets" />
              <input id="template-builder-reps" type="text" placeholder="Reps / pattern" />
              <input id="template-builder-rest" type="text" placeholder="Rest" />
              <input id="template-builder-rpe" type="text" placeholder="RPE" />
              <input id="template-builder-notes" type="text" placeholder="Notes" />

              <input id="template-builder-target" type="hidden" value="" />
              <input id="editing-planned-exercise-id" type="hidden" value="" />

              <button class="primary-button" id="add-exercise-to-template">
                Save
              </button>
            </div>
          `
      }
    </article>
  `;
}

export function renderSession() {
  const templates = getAllTemplates();
  const exercises = getAllExercises();

  return `
    <section class="screen active-screen plans-screen">
      <div class="section-header">
        <p class="eyebrow">Blocks</p>
        <h1>Plan the work. Execute simply.</h1>
      </div>

      ${renderQuickStart()}
      ${renderCreateTemplatePanel()}
      ${renderMovementBuilder(templates, exercises)}

      <div class="plans-list">
        ${templates.map(renderPlanCard).join("")}
      </div>
    </section>
  `;
}