import { getAllTemplates } from "../logic/templateLibrary.js";
import {
  analyseBlockDomain,
  analyseBlockMetrics
} from "../engine/index.js";

import { store } from "../state/store.js";
import {
  getAllExercises,
  getExerciseById,
  getMovementAtlas,
  getCompatibleMethodsForVariant
} from "../logic/exerciseLibrary.js";
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

function renderDomainSummary(template) {
  const analysis = analyseBlockDomain(template);

  if (!analysis?.classification) {
    return "";
  }

  const domains =
    analysis.classification.dominantDomains?.slice(0, 3) || [];

  const bestMatch = analysis.bestProgrammeMatch;

  return `
    <div class="block-domain-panel">

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
            <div class="programme-match">
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
  const bestMatch = metrics.domain?.bestProgrammeMatch;
  const latestDecision = metrics.latestDecision;

  const dominantDomains = domain?.dominantDomains?.slice(0, 3) || [];

  return `
    <div class="block-dashboard-panel">
      <div class="block-dashboard-metrics">
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

      <div class="block-domain-tags">
        ${dominantDomains.map(domain => `
          <span class="domain-pill">
            ${domain.percentage}% ${domain.domain}
          </span>
        `).join("")}
      </div>

      ${
        bestMatch
          ? `
            <div class="programme-match">
              <span>Best match</span>
              <strong>${bestMatch.name}</strong>
              <small>${bestMatch.score}% similarity</small>
            </div>
          `
          : ""
      }

      ${
        latestDecision
          ? `
            <div class="programme-match">
              <span>Current signal</span>
              <strong>${latestDecision.decision}</strong>
              <small>${latestDecision.reason}</small>
            </div>
          `
          : `
            <div class="programme-match">
              <span>Current signal</span>
              <strong>Awaiting data</strong>
              <small>Complete a workout from this block to generate coaching feedback.</small>
            </div>
          `
      }
    </div>
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

${renderDomainSummary(template)}
${renderBlockMetrics(template)}

<details class="block-detail-panel">
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

function renderAtlasFamilyOptions(atlas) {
  return atlas.map(family => `
    <option value="${family.id}">
      ${family.name}
    </option>
  `).join("");
}

function renderAtlasExerciseOptions(atlas) {
  return atlas.map(family => `
    <optgroup label="${family.name}">
      ${family.bases.flatMap(base =>
        (base.variants || []).map(variant => `
          <option 
            value="${variant.id}"
            data-family="${family.id}"
            data-base="${base.id}"
          >
            ${variant.name}
          </option>
        `)
      ).join("")}
    </optgroup>
  `).join("");
}

function renderMethodOptionsForExercise(exerciseId) {
  const compatibility = getCompatibleMethodsForVariant(exerciseId);

  const recommended = compatibility.recommended || [];
  const possible = compatibility.possible || [];

  const methods = [
    ...recommended,
    ...possible
  ];

  if (methods.length === 0) {
    return methodTypes.map(method => `
      <option value="${method.id}">
        ${method.name}
      </option>
    `).join("");
  }

  return methods.map(item => `
    <option value="${item.method.id}">
      ${item.method.name}${item.score >= 5 ? " · recommended" : ""}
    </option>
  `).join("");
}

function renderMovementBuilder(templates, exercises) {
  const customTemplates = templates.filter(isCustomTemplate);
  const atlas = getMovementAtlas();
  const firstExerciseId =
    atlas[0]?.bases?.[0]?.variants?.[0]?.id ||
    exercises[0]?.id ||
    "";

  return `
    <details class="block-utility-panel" open>
      <summary>Add atlas movement to workout</summary>

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

              <select id="template-builder-family">
                ${renderAtlasFamilyOptions(atlas)}
              </select>

              <select id="template-builder-exercise">
                ${renderAtlasExerciseOptions(atlas)}
              </select>

              <select id="template-builder-method">
                ${renderMethodOptionsForExercise(firstExerciseId)}
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