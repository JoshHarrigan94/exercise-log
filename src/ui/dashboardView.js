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

export function renderDashboard() {
  const activeSession = store.activeSession;

  return `
    <section class="screen active-screen">
      ${
        activeSession
          ? `
            <article class="hero-card">
              <p class="eyebrow">Active session</p>
              <h1>${activeSession.name}</h1>

              <p class="hero-text">
                Log each exercise with its actual method and progression context.
              </p>

              <div class="target-box">
                <span>Exercises Logged</span>
                <strong>${activeSession.exercises.length}</strong>
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
          `
          : `
            <div class="hero-card">
              <p class="eyebrow">Next planned session</p>
              <h1>Pull Strength</h1>
              <p class="hero-text">
                Heavy top set, strict pull-up ladder, then controlled rows.
              </p>

              <div class="target-box">
                <span>Main Target</span>
                <strong>+25kg × 3 or ladder to rung 5</strong>
              </div>
            </div>

            <div class="grid two-col">
              <article class="metric-card">
                <span>Total Sessions</span>
                <strong>${store.data.sessions.length}</strong>
                <small>Saved locally</small>
              </article>

              <article class="metric-card">
                <span>Active Block</span>
                <strong>Strength</strong>
                <small>Top sets + ladders</small>
              </article>
            </div>

            <article class="insight-card">
              <h2>Start training</h2>
              <p>
                Go to Train, choose a session, then log exercises from the dashboard.
              </p>
            </article>
          `
      }
    </section>
  `;
}
