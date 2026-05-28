import {
  store,
  setView,
  clearSelectedSession,
  deleteSession
} from "../state/store.js";

import { exercises } from "../data/exercises.js";
import { methodTypes } from "../data/methodTypes.js";
import { getProgressionRecommendation } from "../logic/progressionEngine.js";
import { renderRecommendationBadge } from "../components/recommendationBadge.js";
import { formatDate, formatMethodData } from "../utils/format.js";

function getExerciseName(id) {
  return exercises.find(exercise => exercise.id === id)?.name || "Exercise";
}

function getMethodName(id) {
  return methodTypes.find(method => method.id === id)?.name || "Method";
}

export function renderSessionDetail() {
  const session = store.data.sessions.find(
    item => item.id === store.selectedSessionId
  );

  if (!session) {
    return `
      <section class="screen active-screen">
        <article class="insight-card">
          <h2>Session not found</h2>
          <p>This session could not be loaded.</p>
          <button class="secondary-button" id="back-to-history">
            Back to History
          </button>
        </article>
      </section>
    `;
  }

  return `
    <section class="screen active-screen">
      <button class="secondary-button" id="back-to-history">
        ← Back to History
      </button>

      <article class="hero-card">
        <p class="eyebrow">
          ${formatDate(session.startedAt, { weekday: "short" })}
        </p>

        <h1>${session.name}</h1>

        <p class="hero-text">
          ${session.exercises.length} exercises logged in this session.
        </p>

        <button class="danger-button" id="delete-session">
          Delete Session
        </button>
      </article>

      <div class="stack">
        ${session.exercises.length === 0
          ? `
            <article class="insight-card">
              <h2>No exercise logs</h2>
              <p>This session was saved without exercise-level data.</p>
            </article>
          `
          : session.exercises.map(log => {
            const recommendation = getProgressionRecommendation(log);

            return `
              <article class="history-card">
                <span>${getMethodName(log.methodId)}</span>
                <strong>${getExerciseName(log.exerciseId)}</strong>

                <small>
                  ${formatMethodData(log.data)} ·
                  RPE ${log.rpe || "-"} ·
                  Pain ${log.pain || "0"}
                </small>

                ${log.notes ? `<p>${log.notes}</p>` : ""}

                ${renderRecommendationBadge(recommendation)}
              </article>
            `;
          }).join("")
        }
      </div>
    </section>
  `;
}

export function bindSessionDetailActions(renderApp) {
  const backButton = document.querySelector("#back-to-history");

  if (backButton) {
    backButton.addEventListener("click", () => {
      clearSelectedSession();
      setView("history");
      renderApp();
    });
  }

  const deleteButton = document.querySelector("#delete-session");

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      const confirmed = confirm("Delete this saved session permanently?");

      if (!confirmed) return;

      deleteSession(store.selectedSessionId);
      setView("history");
      renderApp();
    });
  }
}
