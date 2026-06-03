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

function getSignalTone(analysis) {
  if (!analysis) return "neutral";

  const completion = analysis.feedback.completionRate || 0;
  const deviations = analysis.deviations?.length || 0;

  if (completion >= 90 && deviations <= 1) return "positive";
  if (completion >= 65) return "steady";
  return "attention";
}

function getSignalLabel(analysis) {
  if (!analysis) return "No signal yet";

  const completion = analysis.feedback.completionRate || 0;
  const deviations = analysis.deviations?.length || 0;

  if (completion >= 90 && deviations <= 1) return "Clean execution";
  if (completion >= 65) return "Useful signal";
  return "Needs context";
}

function renderEngineFeedback(analysis) {
  const tone = getSignalTone(analysis);

  if (!analysis) {
    return `
      <article class="adapt-review-hero">
        <div class="adapt-review-orb neutral">
          <span>0%</span>
        </div>

        <div class="adapt-review-copy">
          <p class="eyebrow">Training signal</p>
          <h1>No review yet</h1>
          <p>Complete a planned workout and ADAPT will compare what was intended against what actually happened.</p>
        </div>
      </article>
    `;
  }

  return `
    <article class="adapt-review-hero">
      <div class="adapt-review-orb ${tone}">
        <span>${analysis.feedback.completionRate}%</span>
      </div>

      <div class="adapt-review-copy">
        <p class="eyebrow">Training signal</p>
        <h1>${getSignalLabel(analysis)}</h1>
        <p>${analysis.feedback.message}</p>
      </div>

      <div class="adapt-review-actions">
        <span>${analysis.compliance.loggedSets}/${analysis.compliance.plannedSets} logged</span>
        <span>${analysis.deviations.length} deviations</span>
      </div>
    </article>

    <article class="adapt-coach-card">
      <span class="quiet-label">ADAPT read</span>
      <h2>${analysis.feedback.title}</h2>

      <div class="adapt-coach-bullets">
        ${analysis.feedback.bullets.map(bullet => `
          <p>${bullet}</p>
        `).join("")}
      </div>

      <div class="adapt-recommendation-box">
        <span>Recommendation</span>
        <p>${analysis.feedback.recommendation}</p>
      </div>

      ${
        analysis.coachingDecision
          ? `
            <div class="adapt-recommendation-box programme">
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
    <article class="adapt-review-panel">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Execution</p>
          <h2>Planned vs actual</h2>
        </div>

        <span class="adapt-panel-pill">
          ${deviations.length === 0 ? "Clean" : `${deviations.length} found`}
        </span>
      </div>

      ${
        deviations.length === 0
          ? `
            <div class="adapt-empty-read">
              <strong>No deviations detected.</strong>
              <p>The latest session matched the planned structure closely.</p>
            </div>
          `
          : `
            <div class="adapt-deviation-list">
              ${deviations.slice(0, 8).map(item => `
                <div class="adapt-deviation-row deviation-${item.severity}">
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
    <article class="adapt-review-panel">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Intensity</p>
          <h2>High effort logs</h2>
        </div>

        <span class="adapt-panel-pill">
          RPE 9+
        </span>
      </div>

      ${
        highEffortLogs.length === 0
          ? `
            <div class="adapt-empty-read">
              <strong>No high-effort spikes.</strong>
              <p>No RPE 9+ logs have been captured yet.</p>
            </div>
          `
          : `
            <div class="adapt-deviation-list">
              ${highEffortLogs.slice(0, 5).map(log => `
                <div class="adapt-deviation-row">
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

function renderRecentSessions(recentSessions) {
  return `
    <article class="adapt-review-panel adapt-recent-panel">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">History</p>
          <h2>Recent sessions</h2>
        </div>
      </div>

      ${
        recentSessions.length === 0
          ? `
            <div class="adapt-empty-read">
              <strong>No sessions yet.</strong>
              <p>Complete and save a session to build your progression history.</p>
            </div>
          `
          : `
            <div class="adapt-session-list">
              ${recentSessions.map(session => `
                <button class="adapt-session-row" data-session-id="${session.id}">
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
    <section class="screen active-screen adapt-review-screen">
      <div class="section-header adapt-review-header">
        <p class="eyebrow">Review</p>
        <h1>Training intelligence</h1>
        <p>
          Your sessions become a signal. ADAPT compares what you planned, what you logged, and what deserves attention next.
        </p>
      </div>

      <div class="adapt-review-metric-grid">
        <article class="adapt-metric-card">
          <span>Sessions</span>
          <strong>${totalSessions}</strong>
          <small>Total completed</small>
        </article>

        <article class="adapt-metric-card">
          <span>Training days</span>
          <strong>${trainingDays}</strong>
          <small>This month</small>
        </article>

        <article class="adapt-metric-card">
          <span>Logs</span>
          <strong>${totalLogs}</strong>
          <small>Total exposures</small>
        </article>

        <article class="adapt-metric-card">
          <span>Avg logs</span>
          <strong>${averageLogs}</strong>
          <small>Per session</small>
        </article>
      </div>

      ${renderEngineFeedback(latestAnalysis)}

      <article class="adapt-consistency-card">
        <div>
          <span class="quiet-label">Consistency</span>
          <h2>${consistency}</h2>
          <p>Consistency, completion and planned-versus-actual execution are the foundation of the coaching engine.</p>
        </div>

        <div class="adapt-consistency-mark">
          ${trainingDays}
        </div>
      </article>

      <div class="adapt-review-grid">
        ${renderDeviationList(latestAnalysis)}
        ${renderHighEffortLogs(highEffortLogs)}
      </div>

      ${renderRecentSessions(recentSessions)}
    </section>
  `;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
}