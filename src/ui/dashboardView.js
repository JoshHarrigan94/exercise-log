import { store, saveSession } from "../state/store.js";

import { renderApp } from "../app.js";

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
                Session started and ready for exercise logging.
              </p>

              <div class="target-box">
                <span>Exercises Logged</span>
                <strong>${activeSession.exercises.length}</strong>
              </div>

              <button class="complete-session-button">
                Complete Session
              </button>
            </article>
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
          `
      }

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
        <h2>Progression note</h2>

        <p>
          The app now has real persistence. Next step is exercise-by-exercise
          logging and advanced set capture.
        </p>
      </article>
    </section>
  `;
}

setTimeout(bindDashboardButtons);

function bindDashboardButtons() {
  const completeButton = document.querySelector(".complete-session-button");

  if (!completeButton) return;

  completeButton.addEventListener("click", () => {
    saveSession();
    renderApp();
  });
}
