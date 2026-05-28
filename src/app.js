import { renderDashboard } from "./ui/dashboardView.js";
import { renderSession } from "./ui/sessionView.js";
import { renderLibrary } from "./ui/exerciseLibraryView.js";
import { renderProgress } from "./ui/progressView.js";
import { renderHistory } from "./ui/historyView.js";
import { renderNav } from "./components/nav.js";

const app = document.querySelector("#app");

const state = {
  activeView: "dashboard"
};

const views = {
  dashboard: renderDashboard,
  session: renderSession,
  library: renderLibrary,
  progress: renderProgress,
  history: renderHistory
};

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

function renderView() {
  return views[state.activeView]();
}

function bindNavigation() {
  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
    });
  });
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

      ${renderNav(state.activeView)}
    </main>
  `;

  bindNavigation();
}

renderApp();

renderApp();
