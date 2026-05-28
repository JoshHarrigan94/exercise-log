import {
  addCustomExercise,
  deleteCustomExercise
} from "./state/store.js";
import { renderDashboard } from "./ui/dashboardView.js";
import { renderSession } from "./ui/sessionView.js";
import { renderLiveSession } from "./ui/liveSessionView.js";
import { renderLibrary } from "./ui/exerciseLibraryView.js";
import { renderProgress } from "./ui/progressView.js";
import { renderHistory } from "./ui/historyView.js";
import {
  renderSessionDetail,
  bindSessionDetailActions
} from "./ui/sessionDetailView.js";

import { renderNav } from "./components/nav.js";
import { bindQuickChips } from "./components/quickChips.js";
import { updateMethodPreview } from "./components/methodPreview.js";
import {
  updateMethodMemoryPanel,
  bindMethodMemoryActions
} from "./components/methodMemoryPanel.js";

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
  live: renderLiveSession,
  library: renderLibrary,
  progress: renderProgress,
  history: renderHistory,
  "session-detail": renderSessionDetail
};

function getViewTitle() {
  const titles = {
    dashboard: "Today",
    session: "Start Session",
    live: "Live Session",
    library: "Exercise Library",
    progress: "Progress",
    history: "Training History",
    "session-detail": "Session Detail"
  };

  return titles[store.activeView] || "Progression Lab";
}

function renderView() {
  const view = views[store.activeView] || renderDashboard;
  return view();
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

      if (!template) return;

      startSession({
        templateId: template.id,
        name: template.name,
        goal: template.goal
      });

      setView("live");
     
      function bindLibraryActions() {
  const addButton = document.querySelector("#add-custom-exercise");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const name = document.querySelector("#custom-exercise-name")?.value?.trim();
      const category = document.querySelector("#custom-exercise-category")?.value?.trim();
      const pattern = document.querySelector("#custom-exercise-pattern")?.value?.trim();
      const defaultMethod = document.querySelector("#custom-exercise-method")?.value;

      if (!name) {
        alert("Add an exercise name first.");
        return;
      }

      addCustomExercise({
        name,
        category,
        pattern,
        defaultMethod
      });

      renderApp();
    });
  }

  document.querySelectorAll("[data-delete-custom-exercise]").forEach(button => {
    button.addEventListener("click", () => {
      const confirmed = confirm("Delete this custom exercise?");

      if (!confirmed) return;

      deleteCustomExercise(button.dataset.deleteCustomExercise);
      renderApp();
    });
  });
}
      
      renderApp();
    });
  });

  const adhocButton = document.querySelector("#start-adhoc-session");

  if (adhocButton) {
    adhocButton.addEventListener("click", () => {
      const nameInput = document.querySelector("#adhoc-session-name");
      const goalInput = document.querySelector("#adhoc-session-goal");

      const sessionName =
        nameInput?.value?.trim() || "Ad Hoc Session";

      const sessionGoal =
        goalInput?.value?.trim() || "";

      startSession({
        name: sessionName,
        goal: sessionGoal
      });

      setView("live");
      renderApp();
    });
  }
}

function bindHistoryActions() {
  document.querySelectorAll("[data-session-id]").forEach(button => {
    button.addEventListener("click", () => {
      selectSession(button.dataset.sessionId);
      renderApp();
    });
  });
}

function bindLiveSessionActions() {
  const completeButton = document.querySelector(".complete-session-button");

  if (completeButton) {
    completeButton.addEventListener("click", () => {
      saveSession();
      setView("history");
      renderApp();
    });
  }

  const cancelButton = document.querySelector(".cancel-session-button");

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      const confirmed = confirm("Discard this active session?");

      if (!confirmed) return;

      cancelActiveSession();
      setView("dashboard");
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

      const container = document.querySelector("#dynamic-method-fields");

      if (!container) return;

      container.innerHTML = renderMethodFields(event.target.value);

      bindQuickChips();
      bindPreviewInputs();
      updateMethodPreview();
      updateMethodMemoryPanel();
      bindMethodMemoryActions();
      bindLibraryActions();
    });
  }

  const exerciseSelect = document.querySelector("#log-exercise");

  if (exerciseSelect) {
    exerciseSelect.addEventListener("change", () => {
      updateMethodMemoryPanel();
      bindMethodMemoryActions();
    });
  }

  const addButton = document.querySelector("#add-exercise-log");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const exerciseId = document.querySelector("#log-exercise")?.value;
      const methodId = document.querySelector("#log-method")?.value;
      const rpe = document.querySelector("#log-rpe")?.value || "";
      const pain = document.querySelector("#log-pain")?.value || "";
      const notes = document.querySelector("#log-notes")?.value || "";

      if (!exerciseId || !methodId) return;

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

function bindPreviewInputs() {
  document.querySelectorAll("[id^='dynamic-']").forEach(field => {
    field.addEventListener("input", updateMethodPreview);
    field.addEventListener("change", updateMethodPreview);
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

      ${store.activeView === "session-detail" ? "" : renderNav(store.activeView)}
    </main>
  `;

  bindNavigation();
  bindSessionStart();
  bindHistoryActions();
  bindLiveSessionActions();
  bindSessionDetailActions(renderApp);
  bindQuickChips();
  bindPreviewInputs();
  updateMethodPreview();
  updateMethodMemoryPanel();
  bindMethodMemoryActions();
}

window.renderApp = renderApp;

renderApp();
