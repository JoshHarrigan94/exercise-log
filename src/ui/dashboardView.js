import { store } from "../state/store.js";
import { getAllTemplates } from "../logic/templateLibrary.js";

function getRecentSession() {
  return store.data.sessions[0] || null;
}

function getPrimaryTemplate() {
  const templates = getAllTemplates();
  return templates[0] || null;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short"
  });
}

export function renderDashboard() {
  const recentSession = getRecentSession();
  const primaryTemplate = getPrimaryTemplate();

  return `
    <section class="screen active-screen today-screen">
      <div class="today-hero">
        <p class="eyebrow">${formatDate(new Date().toISOString())}</p>

        <h1>Today</h1>

        <p class="today-subtitle">
          Plan quietly. Log quickly. Review when needed.
        </p>

        <div class="today-primary-action">
          <button class="primary-button" data-view="session">
            Start Training
          </button>
        </div>
      </div>

      ${
        primaryTemplate
          ? `
            <article class="quiet-card">
              <div>
                <span class="quiet-label">Suggested plan</span>
                <h2>${primaryTemplate.name}</h2>
                <p>${primaryTemplate.goal || "No goal set"}</p>
              </div>

              <button class="secondary-button compact-button" data-template-id="${primaryTemplate.id}">
                Start
              </button>
            </article>
          `
          : ""
      }

      ${
        recentSession
          ? `
            <article class="quiet-card">
              <div>
                <span class="quiet-label">Last session</span>
                <h2>${recentSession.name}</h2>
                <p>${recentSession.exercises.length} logged exposures</p>
              </div>

              <button class="secondary-button compact-button" data-session-id="${recentSession.id}">
                View
              </button>
            </article>
          `
          : `
            <article class="quiet-card">
              <div>
                <span class="quiet-label">No history yet</span>
                <h2>Start simple</h2>
                <p>Your first saved session will appear here.</p>
              </div>
            </article>
          `
      }

      <div class="today-link-grid">
        <button class="soft-link-card" data-view="session">
          <span>Plans</span>
          <strong>Build or start</strong>
        </button>

        <button class="soft-link-card" data-view="history">
          <span>Review</span>
          <strong>Sessions & progress</strong>
        </button>

        <button class="soft-link-card" data-view="library">
          <span>Library</span>
          <strong>Exercises</strong>
        </button>
      </div>
    </section>
  `;
}