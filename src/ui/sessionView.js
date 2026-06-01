import { getAllTemplates } from "../logic/templateLibrary.js";
import { getAllExercises, getExerciseById } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";

function isCustomTemplate(template) {
  return template.id.startsWith("custom-template-");
}

function getMethodName(id) {
  return methodTypes.find(method => method.id === id)?.name || "Method";
}

function getWorkoutMovementCount(workout) {
  return (workout.exercises || []).length;
}

function getBlockMovementCount(template) {
  return (template.weeks || []).reduce((total, week) => {
    return total + (week.workouts || []).reduce((weekTotal, workout) => {
      return weekTotal + getWorkoutMovementCount(workout);
    }, 0);
  }, 0);
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

function renderMovementRows(template, workout) {
  const planned = workout.exercises || [];

  if (planned.length === 0) {
    return `<div class="block-empty-row">No movements planned.</div>`;
  }

  return `
    <div class="block-movement-list">
      ${planned.map(item => {
        const exercise = getExerciseById(item.exerciseId);

        return `
          <div class="block-movement-row">
            <div>
              <strong>${exercise?.name || "Exercise"}</strong>
              <small>${getMethodName(item.methodId)} · ${renderSetSummary(item)}</small>
            </div>

            ${
              isCustomTemplate(template)
                ? `
                  <div class="planned-exercise-actions">
                    <button class="mini-action-button" data-template-id="${template.id}" data-edit-template-exercise="${item.id}">
                      Edit
                    </button>

                    <button class="mini-delete-button" data-template-id="${template.id}" data-remove-template-exercise="${item.id}">
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

function renderWorkout(template, week, workout) {
  return `
    <details class="workout-panel">
      <summary>
        <span>${workout.name}</span>
        <small>${getWorkoutMovementCount(workout)} movements</small>
      </summary>

      <div class="workout-panel-body">
        <button
          class="secondary-button compact-button"
          data-template-id="${template.id}"
          data-workout-id="${workout.id}"
        >
          Start workout
        </button>

        ${renderMovementRows(template, workout)}
      </div>
    </details>
  `;
}

function renderWeek(template, week) {
  return `
    <details class="block-week-panel" open>
      <summary>${week.name}</summary>

      <div class="block-week-body">
  ${(week.workouts || []).map(workout =>
    renderWorkout(template, week, workout)
  ).join("")}

  ${
    isCustomTemplate(template)
      ? `
        <button
          class="mini-action-button block-add-button"
          data-template-id="${template.id}"
          data-add-workout-to-week="${week.id}"
        >
          + Add workout
        </button>
      `
      : ""
  }
</div>
    </details>
  `;
}

function renderBlockCard(template) {
  const movementCount = getBlockMovementCount(template);

  return `
    <article class="training-block-card">
      <div class="training-block-top">
        <button class="training-block-title" data-template-id="${template.id}">
          <span>${template.priority || "Block"}</span>
          <strong>${template.name}</strong>
          <small>${template.goal || "No goal set"} · ${movementCount} movements</small>
        </button>

        ${
          isCustomTemplate(template)
            ? `
              <div class="template-actions">
                <button class="mini-action-button" data-edit-template-id="${template.id}">
                  Edit
                </button>

                <button class="mini-delete-button" data-delete-custom-template="${template.id}">
                  ×
                </button>
              </div>
            `
            : ""
        }
      </div>

      <div class="block-structure">
  ${(template.weeks || []).map(week =>
    renderWeek(template, week)
  ).join("")}

  ${
    isCustomTemplate(template)
      ? `
        <button
          class="mini-action-button block-add-button"
          data-add-week-to-template="${template.id}"
        >
          + Add week
        </button>
      `
      : ""
  }
</div>
    </article>
  `;
}

function renderQuickStart() {
  return `
    <details class="block-utility-panel">
      <summary>Start ad hoc session</summary>

      <div class="block-utility-body">
        <input id="adhoc-session-name" type="text" placeholder="Session name" />
        <input id="adhoc-session-goal" type="text" placeholder="Goal optional" />

        <button class="primary-button" id="start-adhoc-session">
          Start
        </button>
      </div>
    </details>
  `;
}

function renderCreateBlock() {
  return `
    <details class="block-utility-panel" open>
      <summary>Create training block</summary>

      <div class="block-utility-body">
        <input id="custom-template-name" type="text" placeholder="Block name" />
        <input id="custom-template-goal" type="text" placeholder="Goal" />
        <input id="custom-template-priority" type="text" placeholder="Focus" />

        <input id="editing-template-id" type="hidden" value="" />

        <button class="primary-button" id="add-custom-template">
          Save
        </button>
      </div>
    </details>
  `;
}

function renderMovementBuilder(templates, exercises) {
  const customTemplates = templates.filter(isCustomTemplate);

  return `
    <details class="block-utility-panel" open>
      <summary>Add movement to Week 1 / Workout A</summary>

      ${
        customTemplates.length === 0
          ? `<p>Create a custom block first.</p>`
          : `
            <div class="block-builder-grid">
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
                Save movement
              </button>
            </div>
          `
      }
    </details>
  `;
}

export function renderSession() {
  const templates = getAllTemplates();
  const exercises = getAllExercises();

  return `
    <section class="screen active-screen blocks-screen">
      <div class="section-header">
        <p class="eyebrow">Training blocks</p>
        <h1>Plan the block. Execute the day.</h1>
      </div>

      <div class="blocks-primary-list">
        ${templates.map(renderBlockCard).join("")}
      </div>

      <div class="blocks-builder-area">
        ${renderCreateBlock()}
        ${renderMovementBuilder(templates, exercises)}
        ${renderQuickStart()}
      </div>
    </section>
  `;
}