import { getAllTemplates } from "../logic/templateLibrary.js";
import { getAllExercises, getExerciseById } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";

function isCustomTemplate(template) {
  return template.id.startsWith("custom-template-");
}

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

function renderPlanRows(template) {
  const planned = template.exercises || [];

  if (planned.length === 0) {
    return `
      <div class="plan-empty-row">
        No planned movements yet.
      </div>
    `;
  }

  return `
    <div class="plan-row-list">
      ${planned.map(item => {
        const exercise = getExerciseById(item.exerciseId);

        return `
          <div class="plan-row">
            <div class="plan-row-main">
              <strong>${exercise?.name || "Exercise"}</strong>
              <small>${getMethodName(item.methodId)} · ${item.target || "No target"}</small>
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
          <span>${formatTemplatePriority(template)}</span>
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
        <p>Start logging without building a plan first.</p>
      </div>

      <div class="inline-session-form">
        <input
          id="adhoc-session-name"
          type="text"
          placeholder="Upper Pull / Hotel Session / Conditioning"
        />

        <input
          id="adhoc-session-goal"
          type="text"
          placeholder="Goal optional"
        />

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
        <p class="eyebrow">Create</p>
        <h2>New plan</h2>
        <p>Save a reusable plan, then add planned movements below.</p>
      </div>

      <div class="inline-template-form">
        <input
          id="custom-template-name"
          type="text"
          placeholder="Plan name"
        />

        <input
          id="custom-template-goal"
          type="text"
          placeholder="Goal"
        />

        <input
          id="custom-template-priority"
          type="text"
          placeholder="Priority"
        />

        <input id="editing-template-id" type="hidden" value="" />

        <button class="primary-button" id="add-custom-template">
          Save Plan
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
          <p class="eyebrow">Build</p>
          <h2>Add planned movement</h2>
        </div>
      </div>

      ${
        customTemplates.length === 0
          ? `
            <p>Create a custom plan first, then add movements here.</p>
          `
          : `
            <div class="compact-plan-builder-row">
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

              <input
                id="template-builder-target"
                type="text"
                placeholder="Target"
              />

              <input
                id="template-builder-notes"
                type="text"
                placeholder="Notes"
              />

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
        <p class="eyebrow">Plans</p>
        <h1>Build simply. Train cleanly.</h1>
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