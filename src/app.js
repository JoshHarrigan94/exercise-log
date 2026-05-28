import { renderDashboard } from "./ui/dashboardView.js";
import { renderSession } from "./ui/sessionView.js";
import { renderLibrary } from "./ui/exerciseLibraryView.js";
import { renderProgress } from "./ui/progressView.js";
import { renderHistory } from "./ui/historyView.js";
import { renderNav } from "./components/nav.js";

import { store, setView } from "./state/store.js";

const app = document.querySelector("#app");

const views = {
  dashboard: renderDashboard,
  session: renderSession,
  library: renderLibrary,
  progress: renderProgress,
  history: renderHistory
};

function getViewTitle() {
  const titles = {
    dashboard: "Today",
    session: "Start Session",
    library: "Exercise Library",
    progress: "Progress",
    history: "Training History"
  };

  return titles[store.activeView] || "Progression Lab";
}

function renderView() {
  return views[store.activeView]();
}

function bindNavigation() {
  document.querySelectorAll("[data-view]").forEach(button => {
    button.addEventListener("click", () => {
      setView(button.dataset.view);
      renderApp();
    });
  });
}

export function renderApp() {
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

      ${renderNav(store.activeView)}
    </main>
  `;

  bindNavigation();
}

renderApp();
