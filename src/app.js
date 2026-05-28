
const app = document.querySelector("#app");

const state = {
  activeView: "dashboard"
};

const navItems = [
  { id: "dashboard", label: "Today", icon: "🏠" },
  { id: "session", label: "Train", icon: "🔥" },
  { id: "library", label: "Library", icon: "📚" },
  { id: "progress", label: "Progress", icon: "📈" },
  { id: "history", label: "History", icon: "🕘" }
];

function setView(viewId) {
  state.activeView = viewId;
  renderApp();
}

function getViewTitle() {
  const titles = {
    dashboard: "Today",
    session: "Start Session",
    library: "Exercise Library",
    progress: "Progress",
    history: "Training History"
  };

  return titles[state.activeView] || "Progression Lab";
}

function renderDashboard() {
  return `
    <section class="screen active-screen">
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
          <span>Last Pull-Up</span>
          <strong>+25kg × 2</strong>
          <small>Top set @ RPE 9</small>
        </article>

        <article class="metric-card">
          <span>Weekly Volume</span>
          <strong>146 reps</strong>
          <small>Push / pull / legs</small>
        </article>
      </div>

      <article class="insight-card">
        <h2>Progression note</h2>
        <p>
          Your top set is strong, but the next unlock is repeatable volume.
          Hold intensity and push clean ladder completion.
        </p>
      </article>
    </section>
  `;
}

function renderSession() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Session builder</p>
        <h1>Choose your session</h1>
      </div>

      <div class="stack">
        <button class="session-card">
          <span>Pull Strength</span>
          <strong>Top Set + Ladder</strong>
          <small>Weighted pull-up, ladder work, rows</small>
        </button>

        <button class="session-card">
          <span>Dip Strength</span>
          <strong>Top Set + Ladder</strong>
          <small>Weighted dips, deep pauses, push volume</small>
        </button>

        <button class="session-card">
          <span>Lower / Rehab</span>
          <strong>Strength + Tissue Capacity</strong>
          <small>Hack squat, reverse hyper, calf isometrics</small>
        </button>

        <button class="session-card">
          <span>Conditioning</span>
          <strong>Intervals</strong>
          <small>KB swings, step-ups, low-noise conditioning</small>
        </button>
      </div>
    </section>
  `;
}

function renderLibrary() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Exercise library</p>
        <h1>Your movements</h1>
      </div>

      <div class="stack">
        ${renderExerciseCard("Weighted Pull-Up", "Vertical Pull", "Top Set + Ladder")}
        ${renderExerciseCard("Weighted Dip", "Vertical Push", "Top Set + Ladder")}
        ${renderExerciseCard("Push-Up", "Horizontal Push", "Volume Ladder")}
        ${renderExerciseCard("Hack Squat", "Squat", "Heavy Set + Back-Off")}
        ${renderExerciseCard("Reverse Hyper", "Posterior Chain", "Controlled Sets")}
        ${renderExerciseCard("Calf Isometric", "Rehab", "Timed Hold")}
      </div>
    </section>
  `;
}

function renderExerciseCard(name, pattern, method) {
  return `
    <article class="exercise-card">
      <div>
        <h2>${name}</h2>
        <p>${pattern}</p>
      </div>
      <span>${method}</span>
    </article>
  `;
}

function renderProgress() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Progress tracking</p>
        <h1>Performance trends</h1>
      </div>

      <div class="grid two-col">
        <article class="metric-card">
          <span>Best Pull-Up</span>
          <strong>+25kg × 2</strong>
          <small>Strength marker</small>
        </article>

        <article class="metric-card">
          <span>Best Push-Up Ladder</span>
          <strong>Rung 8</strong>
          <small>64 total reps</small>
        </article>

        <article class="metric-card">
          <span>Best Dip</span>
          <strong>+20kg × 5</strong>
          <small>Top set</small>
        </article>

        <article class="metric-card">
          <span>Conditioning</span>
          <strong>20 rounds</strong>
          <small>KB swing intervals</small>
        </article>
      </div>

      <article class="insight-card">
        <h2>Next upgrade</h2>
        <p>
          Add logging depth so each metric is calculated from real saved sessions.
        </p>
      </article>
    </section>
  `;
}

function renderHistory() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">History</p>
        <h1>Recent sessions</h1>
      </div>

      <div class="timeline">
        <article class="history-card">
          <span>Pull Strength</span>
          <strong>Weighted pull-up + ladder</strong>
          <small>Top set: +25kg × 2 @ RPE 9</small>
        </article>

        <article class="history-card">
          <span>Dip Strength</span>
          <strong>Weighted dips</strong>
          <small>Top set: +20kg × 5</small>
        </article>

        <article class="history-card">
          <span>Push Volume</span>
          <strong>Push-up ladder</strong>
          <small>Rung 8 / 64 reps</small>
        </article>
      </div>
    </section>
  `;
}

function renderView() {
  const views = {
    dashboard: renderDashboard,
    session: renderSession,
    library: renderLibrary,
    progress: renderProgress,
    history: renderHistory
  };

  return views[state.activeView]();
}

function renderNav() {
  return `
    <nav class="bottom-nav">
      ${navItems.map(item => `
        <button 
          class="nav-item ${state.activeView === item.id ? "active" : ""}" 
          data-view="${item.id}"
        >
          <span>${item.icon}</span>
          <small>${item.label}</small>
        </button>
      `).join("")}
    </nav>
  `;
}

function renderApp() {
  app.innerHTML = `
    <main class="app-shell">
      <header class="top-bar">
        <div>
          <p class="eyebrow">Progression Lab</p>
          <h1>${getViewTitle()}</h1>
        </div>
        <button class="profile-button">JH</button>
      </header>

      <div class="view-container">
        ${renderView()}
      </div>

      ${renderNav()}
    </main>
  `;

  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
    });
  });
}

renderApp();
