import { store } from "../state/store.js";
import { getExerciseById } from "../logic/exerciseLibrary.js";
import { methodTypes } from "../data/methodTypes.js";

import {
  getTotalSessions,
  getTotalLogs,
  getMethodBreakdown,
  getPainFlags,
  getHighEffortLogs,
  getExerciseFrequency,
  getRecentLogs
} from "../logic/analytics.js";

function getExerciseName(id) {
  return getExerciseById(id)?.name || "Exercise";
}

function getMethodName(id) {
  return methodTypes.find(method => method.id === id)?.name || id;
}

function getTopFrequencyLabel(frequencyMap) {
  const entries = Object.entries(frequencyMap);

  if (entries.length === 0) return "None yet";

  const [exerciseId, count] = entries.sort((a, b) => b[1] - a[1])[0];

  return `${getExerciseName(exerciseId)} × ${count}`;
}

function renderMethodBreakdown(methodMap) {
  const entries = Object.entries(methodMap);

  if (entries.length === 0) {
    return `<p>No method exposure yet.</p>`;
  }

  return `
    <div class="method-list">
      ${entries.map(([methodId, count]) => `
        <div class="method-row">
          <span>${getMethodName(methodId)}</span>
          <strong>${count}</strong>
        </div>
      `).join("")}
    </div>
  `;
}

function renderRecentLogs(logs) {
  if (logs.length === 0) {
    return `<p>No logs yet. Start a session and add your first exercise.</p>`;
  }

  return `
    <div class="timeline">
      ${logs.map(log => `
        <article class="history-card">
          <span>${new Date(log.sessionDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short"
          })}</span>

          <strong>${getExerciseName(log.exerciseId)}</strong>

          <small>
            ${getMethodName(log.methodId)} ·
            RPE ${log.rpe || "-"} ·
            Pain ${log.pain || "0"}
          </small>
        </article>
      `).join("")}
    </div>
  `;
}

export function renderProgress() {
  const sessions = store.data.sessions;

  const totalSessions = getTotalSessions(sessions);
  const totalLogs = getTotalLogs(sessions);
  const methodBreakdown = getMethodBreakdown(sessions);
  const painFlags = getPainFlags(sessions);
  const highEffortLogs = getHighEffortLogs(sessions);
  const frequency = getExerciseFrequency(sessions);
  const recentLogs = getRecentLogs(sessions, 5);

  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Progress tracking</p>
        <h1>Training analytics</h1>
      </div>

      <div class="grid two-col">
        <article class="metric-card">
          <span>Total Sessions</span>
          <strong>${totalSessions}</strong>
          <small>Saved locally</small>
        </article>

        <article class="metric-card">
          <span>Exercise Logs</span>
          <strong>${totalLogs}</strong>
          <small>Total exposures</small>
        </article>

        <article class="metric-card">
          <span>High Effort</span>
          <strong>${highEffortLogs.length}</strong>
          <small>RPE 9+</small>
        </article>

        <article class="metric-card">
          <span>Pain Flags</span>
          <strong>${painFlags.length}</strong>
          <small>Pain 3+</small>
        </article>
      </div>

      <article class="insight-card">
        <h2>Most Trained</h2>
        <p>${getTopFrequencyLabel(frequency)}</p>
      </article>

      <article class="insight-card">
        <h2>Method Exposure</h2>
        ${renderMethodBreakdown(methodBreakdown)}
      </article>

      <article class="insight-card">
        <h2>Recent Training Logs</h2>
        ${renderRecentLogs(recentLogs)}
      </article>
    </section>
  `;
}
