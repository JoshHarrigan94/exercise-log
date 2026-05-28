import { renderDashboard } from "./ui/dashboardView.js";
import { renderSession } from "./ui/sessionView.js";
import { renderLibrary } from "./ui/exerciseLibraryView.js";
import { renderProgress } from "./ui/progressView.js";
import { renderHistory } from "./ui/historyView.js";
import { renderNav } from "./components/nav.js";

import {
  store,
  setView,
  startSession,
  saveSession,
  addExerciseLog
} from "./state/store.js";

import { sessionTemplates } from "./data/sessionTemplates.js";

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

function bindSessionStart() {
  document.querySelectorAll("[data-template-id]").forEach(button => {
    button.addEventListener("click", () => {
      const template = sessionTemplates.find(
        item => item.id === button.dataset.templateId
      );

      startSession(template);
      setView("dashboard");
      renderApp();
    });
  });
}

function bindDashboardActions() {
  const completeButton = document.querySelector(".complete-session-button");

  if (completeButton) {
    completeButton.addEventListener("click", () => {
      saveSession();
      renderApp();
    });
  }

  const addButton = document.querySelector("#add-exercise-log");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const exerciseId = document.querySelector("#log-exercise").value;
      const methodId = document.querySelector("#log-method").value;
      const load = document.querySelector("#log-load").value;
      const reps = document.querySelector("#log-reps").value;
      const rpe = document.querySelector("#log-rpe").value;
      const pain = document.querySelector("#log-pain").value;
      const notes = document.querySelector("#log-notes").value;

      addExerciseLog({
        exerciseId,
        methodId,
        load,
        reps,
        rpe,
        pain,
        notes
      });

      renderApp();
    });
  }
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
  bindSessionStart();
  bindDashboardActions();
}

window.renderApp = renderApp;

renderApp();
