import { store } from "../state/store.js";

import {
  getTotalSessions,
  getTotalLogs,
  getTrainingDaysThisMonth,
  getAverageLogsPerSession,
  getConsistencySummary,
  getRecentSessions,
  getHighEffortLogs
} from "../logic/analytics.js";

import {
  analyseSessionWithProgramme,
  analyseBlockDomain
} from "../engine/index.js";

function getLatestAnalysis(sessions = [], blocks = []) {
  const latest = sessions[0];
  if (!latest) return null;

  const block = blocks.find(item => item.id === latest.templateId);
  const blockAnalysis = block ? analyseBlockDomain(block) : null;

  return analyseSessionWithProgramme(
    latest,
    blockAnalysis?.bestProgrammeMatch || null
  );
}

function renderEngineFeedback(analysis) {
  if (!analysis) {
    return `
      <article class="insight-card">
        <span class="quiet-label">Engine</span>
        <h2>No completed sessions yet</h2>
        <p>Complete a planned workout to unlock planned versus actual feedback.</p>
      </article>
    `;
  }

  return `
    <article class="engine-card">
      <div>
        <span class="quiet-label">Engine feedback</span>
        <h2>${analysis.feedback.title}</h2>
        <p>${analysis.feedback.message}</p>
      </div>

      <div class="engine-score-row">
        <div>
          <span>Completion</span>
          <strong>${analysis.feedback.completionRate}%</strong>
        </div>

        <div>
          <span>Logged</span>
          <strong>${analysis.compliance.loggedSets}/${analysis.compliance.plannedSets}</strong>
        </div>

        <div>
          <span>Deviations</span>
          <strong>${analysis.deviations.length}</strong>
        </div>
      </div>

      <div class="engine-bullet-list">
        ${analysis.feedback.bullets.map(bullet => `
          <p>${bullet}</p>
        `).join("")}
      </div>

      <div class="engine-recommendation">
  <span>Recommendation</span>
  <p>${analysis.feedback.recommendation}</p>
</div>

${
  analysis.coachingDecision
    ? `
      <div class="engine-recommendation">
        <span>Programme-aware decision</span>
        <strong>${analysis.coachingDecision.decision}</strong>
        <p>${analysis.coachingDecision.reason}</p>
        <small>${analysis.coachingDecision.programmeName} · ${analysis.coachingDecision.model}</small>
      </div>
    `
    : ""
}
    </article>
  `;
}

function renderDeviationList(analysis) {
  const deviations = analysis?.deviations || [];

  return `
    <article class="workspace-card">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Execution</p>
          <h2>Planned vs actual</h2>
        </div>
      </div>

      ${
        deviations.length === 0
          ? `<p>No deviations detected.</p>`
          : `
            <div class="desktop-card-list">
              ${deviations.slice(0, 8).map(item => `
                <div class="desktop-list-row deviation-row deviation-${item.severity}">
                  <div>
                    <strong>${item.label}</strong>
                    <small>${item.message}</small>
                  </div>
                </div>
              `).join("")}
            </div>
          `
      }
    </article>
  `;
}

function renderHighEffortLogs(highEffortLogs) {
  return `
    <article class="workspace-card">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Intensity</p>
          <h2>High effort logs</h2>
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
  `;
}

export function renderHistory() {
  const sessions = store.data.sessions;

  const totalSessions = getTotalSessions(sessions);
  const totalLogs = getTotalLogs(sessions);
  const trainingDays = getTrainingDaysThisMonth(sessions);
  const averageLogs = getAverageLogsPerSession(sessions);

  const consistency = getConsistencySummary(sessions);
  const highEffortLogs = getHighEffortLogs(sessions);
  const recentSessions = getRecentSessions(sessions, 8);
  const latestAnalysis = getLatestAnalysis(
  sessions,
  store.data.customTemplates || []
);

  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Review</p>
        <h1>Training Intelligence</h1>
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

      ${renderEngineFeedback(latestAnalysis)}

      <article class="insight-card">
        <span class="quiet-label">Consistency</span>
        <h2>${consistency}</h2>
        <p>
          Consistency, completion and planned-versus-actual execution are now the foundation of the coaching engine.
        </p>
      </article>

      <div class="review-insight-grid">
        ${renderDeviationList(latestAnalysis)}
        ${renderHighEffortLogs(highEffortLogs)}
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
              <p>Complete and save a session to build your progression history.</p>
            `
            : `
              <div class="desktop-card-list">
                ${recentSessions.map(session => `
                  <button class="desktop-list-row" data-session-id="${session.id}">
                    <div>
                      <strong>${session.name}</strong>
                      <small>
                        ${formatDate(session.startedAt)}
                        ·
                        ${session.exercises.length} logs
                      </small>
                    </div>

                    <span>${session.goal || "Session"}</span>
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