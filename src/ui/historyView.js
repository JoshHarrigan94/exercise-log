import { store } from "../state/store.js";

import {
  getTotalSessions,
  getTotalLogs,
  getTrainingDaysThisMonth,
  getAverageLogsPerSession,
  getConsistencySummary,
  getRecentSessions,
  getPainFlags,
  getHighEffortLogs
} from "../logic/analytics.js";

export function renderHistory() {
  const sessions = store.data.sessions;

  const totalSessions = getTotalSessions(sessions);
  const totalLogs = getTotalLogs(sessions);
  const trainingDays = getTrainingDaysThisMonth(sessions);
  const averageLogs = getAverageLogsPerSession(sessions);

  const consistency = getConsistencySummary(sessions);
  const painFlags = getPainFlags(sessions);
  const highEffortLogs = getHighEffortLogs(sessions);

  const recentSessions = getRecentSessions(sessions, 8);

  return `
    <section class="screen active-screen">

      <div class="section-header">
        <p class="eyebrow">Review</p>
        <h1>Training Insights</h1>
      </div>

      <div class="review-metric-grid">

        <article class="metric-card">
          <span>Sessions</span>
          <strong>${totalSessions}</strong>
          <small>Total completed</small>
        </article>

        <article class="metric-card">
          <span>Training Days</span>
          <strong>${trainingDays}</strong>
          <small>This month</small>
        </article>

        <article class="metric-card">
          <span>Logs</span>
          <strong>${totalLogs}</strong>
          <small>Total exposures</small>
        </article>

        <article class="metric-card">
          <span>Avg Logs</span>
          <strong>${averageLogs}</strong>
          <small>Per session</small>
        </article>

      </div>

      <article class="insight-card">
        <span class="quiet-label">Consistency</span>
        <h2>${consistency}</h2>
        <p>
          Sessions, logging frequency and consistency will become the foundation
          of progression tracking.
        </p>
      </article>

      <div class="review-insight-grid">

        <article class="workspace-card">
          <div class="workspace-card-header">
            <div>
              <p class="eyebrow">Recovery</p>
              <h2>Pain Flags</h2>
            </div>
          </div>

          ${
            painFlags.length === 0
              ? `<p>No pain flags logged.</p>`
              : `
                <div class="desktop-card-list">
                  ${painFlags.slice(0, 5).map(log => `
                    <div class="desktop-list-row">
                      <div>
                        <strong>${log.sessionName}</strong>
                        <small>Pain ${log.pain}/10</small>
                      </div>
                    </div>
                  `).join("")}
                </div>
              `
          }
        </article>

        <article class="workspace-card">
          <div class="workspace-card-header">
            <div>
              <p class="eyebrow">Intensity</p>
              <h2>High Effort Logs</h2>
            </div>
          </div>

          ${
            highEffortLogs.length === 0
              ? `<p>No RPE 9+ logs.</p>`
              : `
                <div class="desktop-card-list">
                  ${highEffortLogs.slice(0, 5).map(log => `
                    <div class="desktop-list-row">
                      <div>
                        <strong>${log.sessionName}</strong>
                        <small>RPE ${log.rpe}</small>
                      </div>
                    </div>
                  `).join("")}
                </div>
              `
          }
        </article>

      </div>

      <article class="workspace-card">
        <div class="workspace-card-header">
          <div>
            <p class="eyebrow">History</p>
            <h2>Recent Sessions</h2>
          </div>
        </div>

        ${
          recentSessions.length === 0
            ? `
              <p>
                Complete and save a session to build your progression history.
              </p>
            `
            : `
              <div class="desktop-card-list">
                ${recentSessions.map(session => `
                  <button
                    class="desktop-list-row"
                    data-session-id="${session.id}"
                  >
                    <div>
                      <strong>${session.name}</strong>
                      <small>
                        ${formatDate(session.startedAt)}
                        ·
                        ${session.exercises.length} logs
                      </small>
                    </div>

                    <span>
                      ${session.goal || "Session"}
                    </span>
                  </button>
                `).join("")}
              </div>
            `
        }
      </article>

    </section>
  `;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
}