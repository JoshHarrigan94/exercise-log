import { bindQuickChips } from "./components/quickChips.js";
import { renderDashboard } from "./ui/dashboardView.js";
import { renderSession } from "./ui/sessionView.js";
import { renderLibrary } from "./ui/exerciseLibraryView.js";
import { renderProgress } from "./ui/progressView.js";
import { renderHistory } from "./ui/historyView.js";
import {
  renderSessionDetail,
  bindSessionDetailActions
} from "./ui/sessionDetailView.js";

import { renderNav } from "./components/nav.js";

import {
  store,
  setView,
  startSession,
  saveSession,
  addExerciseLog,
  removeExerciseLog,
  cancelActiveSession,
  selectSession
} from "./state/store.js";

import { sessionTemplates } from "./data/sessionTemplates.js";

const app = document.querySelector("#app");

const views = {
  dashboard: renderDashboard,
  session: renderSession,
  library: renderLibrary,
  progress: renderProgress,
  history: renderHistory,
  "session-detail": renderSessionDetail
};

function getViewTitle() {
  const titles = {
    dashboard: "Today",
    session: "Start Session",
    library: "Exercise Library",
    progress: "Progress",
    history: "Training History",
    "session-detail": "Session Detail"
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

function bindHistoryActions() {
  document.querySelectorAll("[data-session-id]").forEach(button => {
    button.addEventListener("click", () => {
      selectSession(button.dataset.sessionId);
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

  const cancelButton = document.querySelector(".cancel-session-button");

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      const confirmed = confirm("Discard this active session?");

      if (!confirmed) return;

      cancelActiveSession();
      renderApp();
    });
  }

  document.querySelectorAll("[data-remove-log-id]").forEach(button => {
    button.addEventListener("click", () => {
      removeExerciseLog(button.dataset.removeLogId);
      renderApp();
    });
  });

  const methodSelect = document.querySelector("#log-method");

  if (methodSelect) {
    methodSelect.addEventListener("change", async event => {
      const { renderMethodFields } = await import("./components/methodFields.js");

      document.querySelector("#dynamic-method-fields").innerHTML =
        renderMethodFields(event.target.value);
    });
  }

  const addButton = document.querySelector("#add-exercise-log");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const exerciseId = document.querySelector("#log-exercise").value;
      const methodId = document.querySelector("#log-method").value;
      const rpe = document.querySelector("#log-rpe").value;
      const pain = document.querySelector("#log-pain").value;
      const notes = document.querySelector("#log-notes").value;

      const dynamicData = {};

      document.querySelectorAll("[id^='dynamic-']").forEach(field => {
        dynamicData[field.id.replace("dynamic-", "")] = field.value;
      });

      addExerciseLog({
        exerciseId,
        methodId,
        rpe,
        pain,
        notes,
        data: dynamicData
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

      ${store.activeView === "session-detail" ? "" : renderNav(store.activeView)}
    </main>
  `;

  bindNavigation();
  bindSessionStart();
  bindHistoryActions();
  bindDashboardActions();
  bindSessionDetailActions(renderApp);
  bindQuickChips();
}

window.renderApp = renderApp;

renderApp();
