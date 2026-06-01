import { store } from "../state/store.js";
import { renderSetLogger } from "../components/setLogger.js";
import { getExerciseById } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";

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

function renderExerciseBlock(session, item, index) {
  const loggedCount = getLoggedCountForExercise(session, item.exerciseId);

  return `
    <article class="exercise-block">
      <div class="exercise-block-header">
        <div>
          <span class="quiet-label">Exercise ${index + 1}</span>
          <h2>${getExerciseName(item.exerciseId)}</h2>
          <p>${getMethodName(item.methodId)} · ${item.target || "No target set"}</p>
        </div>

        <span class="exercise-log-count">
          ${loggedCount} logged
        </span>
      </div>

      ${
        item.notes
          ? `<p class="exercise-block-note">${item.notes}</p>`
          : ""
      }

      <div class="set-table">
        <div class="set-table-head">
          <span>Load</span>
          <span>Reps / result</span>
          <span>RPE</span>
          <span></span>
        </div>

        <div class="set-table-row">
          <input
            data-planned-load="${item.exerciseId}"
            type="text"
            placeholder="Load"
          />

          <input
            data-planned-reps="${item.exerciseId}"
            type="text"
            placeholder="Reps"
          />

          <input
            data-planned-rpe="${item.exerciseId}"
            type="number"
            step="0.5"
            placeholder="8"
          />

          <button
            class="primary-button compact-save-button"
            data-log-planned-exercise="${item.exerciseId}"
            data-method-id="${item.methodId}"
            data-target="${item.target || ""}"
          >
            Log
          </button>
        </div>
      </div>
    </article>
  `;
}

function renderLoggedSummary(session) {
  if (session.exercises.length === 0) {
    return `
      <article class="quiet-card">
        <div>
          <span class="quiet-label">Session log</span>
          <h2>No results yet</h2>
          <p>Log each exercise as you complete it.</p>
        </div>
      </article>
    `;
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
                ${log.data?.load || "No load"} ·
                ${log.data?.reps || "No reps"} ·
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
          <p class="hero-text">
            Choose a plan or start an ad hoc session.
          </p>

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

          ${
            activeSession.goal
              ? `<p>${activeSession.goal}</p>`
              : ""
          }
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