import { store } from "../state/store.js";
import { getAllTemplates } from "../logic/templateLibrary.js";
import { getAllExercises } from "../logic/exerciseLibrary.js";

function getRecentSessions(limit = 4) {
  return store.data.sessions.slice(0, limit);
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
}

export function renderDashboard() {
  const activeSession = store.activeSession;
  const templates = getAllTemplates();
  const exercises = getAllExercises();
  const recentSessions = getRecentSessions();

  return `
    <section class="screen active-screen">
      <div class="desktop-dashboard-grid">
        <div class="desktop-main-column">
          <div class="hero-card">
            <p class="eyebrow">
              ${activeSession ? "Session in progress" : "Training workspace"}
            </p>

            <h1>${activeSession ? activeSession.name : "Build, log, review."}</h1>

            <p class="hero-text">
              ${
                activeSession
                  ? "You have an active session open. Continue logging in the Live Session screen."
                  : "Plan sessions on desktop, capture training on mobile, and keep advanced methods structured."
              }
            </p>

            <div class="target-box">
              <span>${activeSession ? "Exercises Logged" : "Methodology Focus"}</span>
              <strong>
                ${activeSession ? activeSession.exercises.length : "Top sets · ladders · clusters · intervals"}
              </strong>
            </div>

            ${
              activeSession
                ? `<button class="primary-button" data-view="live">Continue Session</button>`
                : `<button class="primary-button" data-view="session">Start or Build Session</button>`
            }
          </div>

          <article class="workspace-card">
            <div class="workspace-card-header">
              <div>
                <p class="eyebrow">Plans</p>
                <h2>Session Templates</h2>
              </div>

              <button class="secondary-button compact-button" data-view="session">
                Manage
              </button>
            </div>

            <div class="desktop-card-list">
              ${templates.slice(0, 5).map(template => `
                <button class="desktop-list-row" data-template-id="${template.id}">
                  <div>
                    <strong>${template.name}</strong>
                    <small>${template.goal || "No goal set"}</small>
                  </div>
                  <span>${template.priority || "Custom"}</span>
                </button>
              `).join("")}
            </div>
          </article>

          <article class="workspace-card">
            <div class="workspace-card-header">
              <div>
                <p class="eyebrow">Recent</p>
                <h2>Training History</h2>
              </div>

              <button class="secondary-button compact-button" data-view="history">
                View All
              </button>
            </div>

            ${
              recentSessions.length === 0
                ? `<p>No saved sessions yet.</p>`
                : `
                  <div class="desktop-card-list">
                    ${recentSessions.map(session => `
                      <button class="desktop-list-row" data-session-id="${session.id}">
                        <div>
                          <strong>${session.name}</strong>
                          <small>${formatDate(session.startedAt)} · ${session.exercises.length} logs</small>
                        </div>
                        <span>${session.goal || "Session"}</span>
                      </button>
                    `).join("")}
                  </div>
                `
            }
          </article>
        </div>

        <aside class="desktop-side-panel">
          <article class="metric-card">
            <span>Total Sessions</span>
            <strong>${store.data.sessions.length}</strong>
            <small>Saved locally</small>
          </article>

          <article class="metric-card">
            <span>Templates</span>
            <strong>${templates.length}</strong>
            <small>Default + custom</small>
          </article>

          <article class="metric-card">
            <span>Exercises</span>
            <strong>${exercises.length}</strong>
            <small>Library size</small>
          </article>

          <article class="insight-card">
            <h2>Product mode</h2>
            <p>
              Desktop is now the workspace. Mobile remains the training logger.
            </p>
          </article>
        </aside>
      </div>
    </section>
  `;
}