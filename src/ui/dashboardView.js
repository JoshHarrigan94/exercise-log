import { store } from "../state/store.js";

export function renderDashboard() {
  const activeSession = store.activeSession;

  return `
    <section class="screen active-screen">
      <div class="hero-card">
        <p class="eyebrow">
          ${activeSession ? "Session in progress" : "Next planned session"}
        </p>

        <h1>${activeSession ? activeSession.name : "Pull Strength"}</h1>

        <p class="hero-text">
          ${
            activeSession
              ? "You have an active session open. Continue logging in the Live Session screen."
              : "Heavy top set, strict pull-up ladder, then controlled rows."
          }
        </p>

        <div class="target-box">
          <span>${activeSession ? "Exercises Logged" : "Main Target"}</span>
          <strong>
            ${activeSession ? activeSession.exercises.length : "+25kg × 3 or ladder to rung 5"}
          </strong>
        </div>

        ${
          activeSession
            ? `
              <button class="primary-button" data-view="live">
                Continue Session
              </button>
            `
            : `
              <button class="primary-button" data-view="session">
                Start Training
              </button>
            `
        }
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
        <h2>Methodology-first logging</h2>
        <p>
          The app now separates the dashboard from the live session so logging stays focused and the overview stays clean.
        </p>
      </article>
    </section>
  `;
}
