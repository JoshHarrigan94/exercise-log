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
  return `
    <div class="execution-row">
      <span class="execution-row-label">${row.label}</span>

      <input
        data-exec-load="${item.exerciseId}-${row.id}"
        value="${row.load || ""}"
        placeholder="Load"
      />

      <input
        data-exec-result="${item.exerciseId}-${row.id}"
        value="${row.result || ""}"
        placeholder="Result"
      />

      <input
        data-exec-rest="${item.exerciseId}-${row.id}"
        value="${row.rest || ""}"
        placeholder="Rest"
      />

      <input
        data-exec-rpe="${item.exerciseId}-${row.id}"
        value="${row.rpe || ""}"
        placeholder="RPE"
      />

      <button
        class="secondary-button compact-button"
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

  return `
    <article class="execution-block">
      <div class="execution-block-header">
        <div>
          <span class="quiet-label">Exercise ${index + 1}</span>
          <h2>${getExerciseName(item.exerciseId)}</h2>
          <p>${getMethodName(item.methodId)} · ${item.target || "No target"}</p>
        </div>

        <span class="exercise-log-count">${loggedCount}/${rows.length}</span>
      </div>

      ${
        item.notes
          ? `<p class="exercise-block-note">${item.notes}</p>`
          : ""
      }

      <div class="execution-table">
        <div class="execution-table-head">
          <span>Set</span>
          <span>Load</span>
          <span>Result</span>
          <span>Rest</span>
          <span>RPE</span>
          <span></span>
        </div>

        ${rows.map(row => renderExecutionRow(item, row)).join("")}
      </div>

      <button
        class="primary-button log-all-button"
        data-log-all-execution-rows="${item.exerciseId}"
        data-method-id="${item.methodId}"
      >
        Log all as planned
      </button>
    </article>
  `;
}

function renderLoggedSummary(session) {
  if (session.exercises.length === 0) {
    return "";
  }

  return `
    <article class="logged-summary-card">
      <span class="quiet-label">Logged</span>

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
    </article>
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
      <article class="live-session-header">
        <div>
          <p class="eyebrow">Live session</p>
          <h1>${activeSession.name}</h1>
          ${activeSession.goal ? `<p>${activeSession.goal}</p>` : ""}
        </div>

        <div class="live-session-meta">
          <span>${activeSession.exercises.length} logs</span>
          <span>${formatStartTime(activeSession.startedAt)}</span>
        </div>
      </article>

      ${
        planned.length === 0
          ? `
            <article class="quiet-card">
              <div>
                <span class="quiet-label">Ad hoc session</span>
                <h2>Add movement</h2>
                <p>No planned movements. Use the compact logger below.</p>
              </div>
            </article>

            ${renderSetLogger()}
          `
          : `
            <div class="exercise-block-list">
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
        <button class="complete-session-button">Complete Session</button>
        <button class="secondary-button" id="save-active-as-template">Save as Template</button>
        <button class="danger-button cancel-session-button">Discard</button>
      </div>
    </section>
  `;
}