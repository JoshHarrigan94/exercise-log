import { getAllTemplates } from "../logic/templateLibrary.js";

import {
  analyseBlockDomain,
  analyseBlockMetrics
} from "../engine/index.js";

import { store } from "../state/store.js";

import {
  searchMovementCatalogue
} from "../logic/movementSearchCatalogue.js";

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

function getWorkoutCount(template) {
  return (template.weeks || []).reduce((total, week) => {
    return total + (week.workouts || []).length;
  }, 0);
}

function getMovementName(item) {
  return (
    item.movementExpression?.displayName ||
    item.exerciseName ||
    item.name ||
    "Movement"
  );
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
    return `<div class="adapt-empty-read">No movements planned.</div>`;
  }

  return `
    <div class="adapt-plan-movement-list">
      ${planned.map(item => `
        <div class="adapt-plan-movement-row">
          <div>
            <strong>${getMovementName(item)}</strong>
            <small>${getMethodName(item.methodId || item.movementExpression?.methodId)} · ${renderSetSummary(item)}</small>
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
      `).join("")}
    </div>
  `;
}

function renderWorkout(template, week, workout) {
  return `
    <details class="adapt-workout-panel">
      <summary>
        <div>
          <strong>${workout.name}</strong>
          <small>${workout.goal || `${getWorkoutMovementCount(workout)} planned movements`}</small>
        </div>

        <span>${getWorkoutMovementCount(workout)}</span>
      </summary>

      <div class="adapt-workout-body">
        <button
          class="primary-button compact-button"
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
    <details class="adapt-week-panel" open>
      <summary>${week.name}</summary>

      <div class="adapt-week-body">
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

function renderDomainSummary(template) {
  const analysis = analyseBlockDomain(template);

  if (!analysis?.classification) return "";

  const domains =
    analysis.classification.dominantDomains?.slice(0, 3) || [];

  const bestMatch = analysis.bestProgrammeMatch;

  return `
    <div class="adapt-plan-domain">
      <div class="block-domain-tags">
        ${domains.map(domain => `
          <span class="domain-pill">
            ${domain.percentage}% ${domain.domain}
          </span>
        `).join("")}
      </div>

      ${
        bestMatch
          ? `
            <div class="adapt-programme-match">
              <span>Best match</span>
              <strong>${bestMatch.name}</strong>
              <small>${bestMatch.score}% similarity</small>
            </div>
          `
          : ""
      }
    </div>
  `;
}

function renderBlockMetrics(template) {
  const metrics = analyseBlockMetrics(
    template,
    store.data.sessions || []
  );

  const domain = metrics.domain?.classification;
  const latestDecision = metrics.latestDecision;
  const dominantDomains = domain?.dominantDomains?.slice(0, 3) || [];

  return `
    <div class="adapt-plan-metrics">
      <div>
        <span>Completed</span>
        <strong>${metrics.completedSessions}/${metrics.plannedWorkouts}</strong>
      </div>

      <div>
        <span>Compliance</span>
        <strong>${metrics.averageCompletion}%</strong>
      </div>

      <div>
        <span>Warnings</span>
        <strong>${metrics.warningCount}</strong>
      </div>
    </div>

    ${
      dominantDomains.length
        ? `
          <div class="adapt-plan-tags">
            ${dominantDomains.map(domain => `
              <span>${domain.percentage}% ${domain.domain}</span>
            `).join("")}
          </div>
        `
        : ""
    }

    <div class="adapt-programme-match">
      <span>Current signal</span>
      <strong>${latestDecision ? latestDecision.decision : "Awaiting data"}</strong>
      <small>
        ${
          latestDecision
            ? latestDecision.reason
            : "Complete a workout from this block to generate coaching feedback."
        }
      </small>
    </div>
  `;
}

function renderBlockCard(template) {
  const movementCount = getBlockMovementCount(template);
  const workoutCount = getWorkoutCount(template);

  return `
    <article class="adapt-plan-card">
      <div class="adapt-plan-art"></div>

      <div class="adapt-plan-top">
        <button class="adapt-plan-title" data-template-id="${template.id}">
          <span>${template.priority || "Training block"}</span>
          <strong>${template.name}</strong>
          <small>${template.goal || "No goal set"}</small>
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

      <div class="adapt-plan-stats">
        <div>
          <span>Weeks</span>
          <strong>${template.weeks?.length || 0}</strong>
        </div>

        <div>
          <span>Workouts</span>
          <strong>${workoutCount}</strong>
        </div>

        <div>
          <span>Movements</span>
          <strong>${movementCount}</strong>
        </div>
      </div>

      ${renderDomainSummary(template)}
      ${renderBlockMetrics(template)}

      <details class="adapt-plan-detail">
        <summary>Open block structure</summary>

        <div class="adapt-plan-detail-body">
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
      </details>
    </article>
  `;
}

function renderQuickStart() {
  return `
    <details class="adapt-builder-panel">
      <summary>
        <div>
          <span class="quiet-label">Flexible</span>
          <strong>Start ad hoc session</strong>
        </div>
      </summary>

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
    <details class="adapt-builder-panel" open>
      <summary>
        <div>
          <span class="quiet-label">Builder</span>
          <strong>Create training block</strong>
        </div>
      </summary>

      <div class="block-utility-body">
        <input id="custom-template-name" type="text" placeholder="Block name" />
        <input id="custom-template-goal" type="text" placeholder="Goal" />
        <input id="custom-template-priority" type="text" placeholder="Focus" />

        <input id="editing-template-id" type="hidden" value="" />

        <button class="primary-button" id="add-custom-template">
          Save block
        </button>
      </div>
    </details>
  `;
}

function renderMovementCatalogueOptions() {
  return searchMovementCatalogue()
    .map(item => `
      <option value="${item.id}">
        ${item.label}
      </option>
    `)
    .join("");
}

function renderMethodOptions() {
  return methodTypes.map(method => `
    <option value="${method.id}">
      ${method.name}
    </option>
  `).join("");
}

function renderMovementBuilder(templates) {
  const customTemplates = templates.filter(isCustomTemplate);

  return `
    <details class="adapt-builder-panel" open>
      <summary>
        <div>
          <span class="quiet-label">Movement design</span>
          <strong>Add movement to workout</strong>
        </div>
      </summary>

      ${
        customTemplates.length === 0
          ? `<div class="adapt-empty-read">Create a custom block first.</div>`
          : `
            <div class="block-builder-grid">
              <select id="template-builder-template">
                ${customTemplates.map(template => `
                  <option value="${template.id}">${template.name}</option>
                `).join("")}
              </select>

              <select id="template-builder-week">
                ${customTemplates.flatMap(template =>
                  (template.weeks || []).map(week => `
                    <option value="${template.id}::${week.id}">
                      ${template.name} · ${week.name}
                    </option>
                  `)
                ).join("")}
              </select>

              <select id="template-builder-workout">
                ${customTemplates.flatMap(template =>
                  (template.weeks || []).flatMap(week =>
                    (week.workouts || []).map(workout => `
                      <option value="${template.id}::${workout.id}">
                        ${template.name} · ${week.name} · ${workout.name}
                      </option>
                    `)
                  )
                ).join("")}
              </select>

              <select id="template-builder-exercise">
                ${renderMovementCatalogueOptions()}
              </select>

              <select id="template-builder-method">
                ${renderMethodOptions()}
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

  return `
    <section class="screen active-screen blocks-screen adapt-plans-screen">
      <section class="adapt-plans-hero adapt-signal-patterning">
        <div>
          <p class="eyebrow">Plans</p>
          <h1>Build the block. Trust the signal.</h1>
          <p>
            Programmes are where intent becomes measurable. Pick the next exposure, start clean, and let ADAPT compare the plan against reality.
          </p>
        </div>

        <div class="adapt-plans-summary">
          <span>${templates.length} blocks</span>
          <span>${templates.reduce((total, template) => total + getWorkoutCount(template), 0)} workouts</span>
          <span>${templates.reduce((total, template) => total + getBlockMovementCount(template), 0)} movements</span>
        </div>
      </section>

      <div class="adapt-plan-list">
        ${templates.map(renderBlockCard).join("")}
      </div>

      <section class="adapt-builder-area">
        <div class="section-header compact-section-header">
          <p class="eyebrow">Build</p>
          <h2>Custom structure</h2>
        </div>

        ${renderCreateBlock()}
        ${renderMovementBuilder(templates)}
        ${renderQuickStart()}
      </section>
    </section>
  `;
}