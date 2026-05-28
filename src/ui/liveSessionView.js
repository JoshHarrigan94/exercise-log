import { store } from "../state/store.js";
import { renderSetLogger } from "../components/setLogger.js";
import { exercises } from "../data/exercises.js";
import { methodTypes } from "../data/methodTypes.js";
import { getProgressionRecommendation } from "../logic/progressionEngine.js";
import { renderRecommendationBadge } from "../components/recommendationBadge.js";
import { formatMethodData } from "../utils/format.js";
import { calculateMethodExposure } from "../logic/methodCalculations.js";

function getExerciseName(id) {
  return exercises.find(exercise => exercise.id === id)?.name || "Exercise";
}

function getMethodName(id) {
  return methodTypes.find(method => method.id === id)?.name || "Method";
}

function renderExposureMeta(log) {
  const exposure = calculateMethodExposure(log.methodId, log.data);

  return `
    <div class="exposure-row">
      <span>${exposure.exposureLabel}</span>
      <span>${exposure.densityLabel}</span>
    </div>
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
            Choose a session from Train to open the live logger.
          </p>

          <button class="secondary-button" data-view="session">
            Go to Train
          </button>
        </article>
      </section>
    `;
  }

  return `
    <section class="screen active-screen">
      <article class="hero-card compact-hero">
        <p class="eyebrow">Live session</p>

        <h1>${activeSession.name}</h1>

        <div class="session-meta-grid">
          <div>
            <span>Logged</span>
            <strong>${activeSession.exercises.length}</strong>
          </div>

          <div>
            <span>Started</span>
            <strong>${formatStartTime(activeSession.startedAt)}</strong>
          </div>
        </div>

        <div class="action-row">
          <button class="complete-session-button">
            Complete
          </button>

          <button class="cancel-session-button danger-button">
            Discard
          </button>
        </div>
      </article>

      ${renderSetLogger()}

      <div class="stack">
        ${activeSession.exercises.length === 0
          ? `
            <article class="insight-card">
              <h2>No exercises logged yet</h2>
              <p>Add your first movement above.</p>
            </article>
          `
          : activeSession.exercises.map(log => {
            const recommendation = getProgressionRecommendation(log);

            return `
              <article class="history-card">
                <div class="card-topline">
                  <span>${getMethodName(log.methodId)}</span>

                  <button 
                    class="mini-delete-button"
                    data-remove-log-id="${log.id}"
                    aria-label="Remove log"
                  >
                    ×
                  </button>
                </div>

                <strong>${getExerciseName(log.exerciseId)}</strong>

                <small>
                  ${formatMethodData(log.data, log.methodId)} ·
                  RPE ${log.rpe || "-"} ·
                  Pain ${log.pain || "0"}
                </small>

                ${renderExposureMeta(log)}

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

function formatStartTime(dateString) {
  return new Date(dateString).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit"
  });
}
