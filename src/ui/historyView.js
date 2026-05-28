import { store } from "../state/store.js";

export function renderHistory() {
  const sessions = store.data.sessions;

  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">History</p>
        <h1>Recent sessions</h1>
      </div>

      ${
        sessions.length === 0
          ? `
            <article class="insight-card">
              <h2>No sessions yet</h2>
              <p>
                Complete and save a session to build your progression history.
              </p>
            </article>
          `
          : `
            <div class="timeline">
              ${sessions.map(session => `
                <button class="history-card history-button" data-session-id="${session.id}">
                  <span>${formatDate(session.startedAt)}</span>
                  <strong>${session.name}</strong>
                  <small>${session.exercises.length} exercises logged</small>
                </button>
              `).join("")}
            </div>
          `
      }
    </section>
  `;
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short"
  });
}
