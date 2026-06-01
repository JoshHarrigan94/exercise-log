import { store } from "../state/store.js";
import { renderSetLogger } from "../components/setLogger.js";
import { getExerciseById } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";
import { getExecutionRows } from "../logic/executionRows.js";


function getExerciseName(id) {
  return getExerciseById(id)?.name || "Exercise";
}

function getMethodName(id) {
  return methodTypes.find(method => method.id === id)?.name || "Method";
}

function formatStartTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function getLoggedCountForExercise(session, exerciseId) {
  return session.exercises.filter(log => log.exerciseId === exerciseId).length;
}

function renderExecutionRow(item, row) {
  const key = `${item.exerciseId}-${row.id}`;

  return `
    <div class="execution-line">
      <span class="execution-set-label">${row.label}</span>

      <input
        data-exec-load="${key}"
        value="${row.load || ""}"
        placeholder="Load"
      />

      <input
        data-exec-result="${key}"
        value="${row.result || ""}"
        placeholder="Result"
      />

      <input
        data-exec-rest="${key}"
        value="${row.rest || ""}"
        placeholder="Rest"
      />

      <input
        data-exec-rpe="${key}"
        value="${row.rpe || ""}"
        placeholder="RPE"
      />

      <button
        class="line-log-button"
        data-log-execution-row="${item.exerciseId}"
        data-row-id="${row.id}"
        data-method-id="${item.methodId}"
        data-row-label="${row.label}"
        data-grouped="${row.isGrouped ? "true" : "false"}"
      >
        Log
      </button>
    </div>
  `;
}

function renderExerciseBlock(session, item, index) {
  const rows = getExecutionRows(item);
  const loggedCount = getLoggedCountForExercise(session, item.exerciseId);
  const isComplete = loggedCount >= rows.length;

  return `
    <details class="execution-item ${isComplete ? "execution-item-complete" : ""}" open>
      <summary class="execution-item-top">
        <div class="execution-index">
          ${isComplete ? "✓" : index + 1}
        </div>

        <div class="execution-title">
          <h2>${getExerciseName(item.exerciseId)}</h2>
          <p>${getMethodName(item.methodId)} · ${item.target || "No target"}</p>
        </div>

        <span class="execution-status">
          ${loggedCount}/${rows.length}
        </span>
      </summary>

      ${
        item.notes
          ? `<p class="execution-note">${item.notes}</p>`
          : ""
      }

      <div class="execution-lines">
        ${rows.map(row => renderExecutionRow(item, row)).join("")}
      </div>

      <button
        class="log-all-minimal-button"
        data-log-all-execution-rows="${item.exerciseId}"
        data-method-id="${item.methodId}"
      >
        Log all as planned
      </button>
    </details>
  `;
}

function renderLoggedSummary(session) {
  if (session.exercises.length === 0) return "";

  return `
    <details class="logged-summary-panel">
      <summary>
        Logged results · ${session.exercises.length}
      </summary>

      <div class="logged-summary-list">
        ${session.exercises.map(log => `
          <div class="logged-summary-row">
            <div>
              <strong>${getExerciseName(log.exerciseId)}</strong>
              <small>
                ${log.data?.label || "Set"} ·
                ${log.data?.load || "No load"} ·
                ${log.data?.result || log.data?.reps || "No result"} ·
                RPE ${log.rpe || "-"}
              </small>
            </div>

            <button
              class="mini-delete-button"
              data-remove-log-id="${log.id}"
            >
              ×
            </button>
          </div>
        `).join("")}
      </div>
    </details>
  `;
}

export function renderLiveSession() {
  const activeSession = store.activeSession;

  if (!activeSession) {
    return `
      <section class="screen active-screen">
        <article class="hero-card">
          <p class="eyebrow">No active session</p>
          <h1>Start a session</h1>
          <p class="hero-text">Choose a plan or start an ad hoc session.</p>

          <button class="secondary-button" data-view="session">
            Go to Plans
          </button>
        </article>
      </section>
    `;
  }

  const planned = activeSession.plannedExercises || [];

  return `
    <section class="screen active-screen live-session-screen">
      <div class="session-execution-header">
        <div>
          <p class="eyebrow">Now training</p>
          <h1>${activeSession.name}</h1>
          ${
            activeSession.goal
              ? `<p>${activeSession.goal}</p>`
              : ""
          }
        </div>

        <div class="session-execution-meta">
          <span>${activeSession.exercises.length} logs</span>
          <span>${formatStartTime(activeSession.startedAt)}</span>
        </div>
      </div>

      ${
        planned.length === 0
          ? `
            <div class="execution-empty">
              <p class="eyebrow">Ad hoc session</p>
              <h2>Add movement</h2>
              <p>No planned movements. Use the compact logger below.</p>
            </div>

            ${renderSetLogger()}
          `
          : `
            <div class="execution-list">
              ${planned.map((item, index) =>
                renderExerciseBlock(activeSession, item, index)
              ).join("")}
            </div>

            <details class="logger-details">
              <summary>Add unplanned movement</summary>
              <div class="logger-details-body">
                ${renderSetLogger()}
              </div>
            </details>
          `
      }

      ${renderLoggedSummary(activeSession)}

      <div class="live-session-actions">
        <button class="complete-session-button">
          Complete Session
        </button>

        <button class="secondary-button" id="save-active-as-template">
          Save as Template
        </button>

        <button class="danger-button cancel-session-button">
          Discard
        </button>
      </div>
    </section>
  `;
}