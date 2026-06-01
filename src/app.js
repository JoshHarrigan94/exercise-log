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

import { renderNav, renderSidebar } from "./components/nav.js";
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
  selectSession,
  updateExerciseLog,
  duplicateExerciseLog,
  addCustomExercise,
  deleteCustomExercise,
  addCustomTemplate,
  deleteCustomTemplate,
  createTemplateFromSession,
  addExerciseToTemplate,
removeExerciseFromTemplate,
updateCustomTemplate
} from "./state/store.js";

import { getTemplateById } from "./logic/templateLibrary.js";

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
      const template = getTemplateById(button.dataset.templateId);
      if (!template) return;

      startSession({
  templateId: template.id,
  name: template.name,
  goal: template.goal,
  exercises: template.exercises || []
});

      setView("live");
      renderApp();
    });
  });

  const adhocButton = document.querySelector("#start-adhoc-session");

  if (adhocButton) {
    adhocButton.addEventListener("click", () => {
      startSession({
        name: document.querySelector("#adhoc-session-name")?.value?.trim() || "Ad Hoc Session",
        goal: document.querySelector("#adhoc-session-goal")?.value?.trim() || ""
      });

      setView("live");
      renderApp();
    });
  }

  const customTemplateButton = document.querySelector("#add-custom-template");

  if (customTemplateButton) {
    customTemplateButton.addEventListener("click", () => {
      const name = document.querySelector("#custom-template-name")?.value?.trim();
      const goal = document.querySelector("#custom-template-goal")?.value?.trim();
      const priority = document.querySelector("#custom-template-priority")?.value?.trim();

      if (!name) {
        alert("Add a template name first.");
        return;
      }

      const editingTemplateId = document.querySelector("#editing-template-id")?.value;

if (editingTemplateId) {
  updateCustomTemplate(editingTemplateId, {
    name,
    goal,
    priority
  });
} else {
  addCustomTemplate({
    name,
    goal,
    priority
  });
}
      renderApp();
    });
  }

  document.querySelectorAll("[data-delete-custom-template]").forEach(button => {
    button.addEventListener("click", () => {
      if (!confirm("Delete this custom template?")) return;
      deleteCustomTemplate(button.dataset.deleteCustomTemplate);
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

function populateLoggerFromLog(log) {
  document.querySelector("#log-exercise").value = log.exerciseId;
  document.querySelector("#log-method").value = log.methodId;
  document.querySelector("#log-method").dispatchEvent(new Event("change", { bubbles: true }));

  setTimeout(() => {
    Object.entries(log.data || {}).forEach(([key, value]) => {
      const field = document.querySelector(`#dynamic-${key}`);
      if (field) field.value = value;
    });

    document.querySelector("#log-rpe").value = log.rpe || "";
    document.querySelector("#log-pain").value = log.pain || "";
    document.querySelector("#log-notes").value = log.notes || "";
    document.querySelector("#editing-log-id").value = log.id;

    updateMethodPreview();
  }, 0);
}

function bindLiveSessionActions() {
  document.querySelector(".complete-session-button")?.addEventListener("click", () => {
    saveSession();
    setView("history");
    renderApp();
  });

  document.querySelector("#save-active-as-template")?.addEventListener("click", () => {
    if (!store.activeSession) return;
    createTemplateFromSession(store.activeSession.id);
    alert("Saved as template.");
    renderApp();
  });

  document.querySelector(".cancel-session-button")?.addEventListener("click", () => {
    if (!confirm("Discard this active session?")) return;
    cancelActiveSession();
    setView("dashboard");
    renderApp();
  });

  document.querySelectorAll("[data-remove-log-id]").forEach(button => {
    button.addEventListener("click", () => {
      removeExerciseLog(button.dataset.removeLogId);
      renderApp();
    });
  });

  document.querySelectorAll("[data-edit-log-id]").forEach(button => {
    button.addEventListener("click", () => {
      const log = store.activeSession?.exercises.find(
        item => item.id === button.dataset.editLogId
      );

      if (!log) return;

      populateLoggerFromLog(log);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-duplicate-log-id]").forEach(button => {
    button.addEventListener("click", () => {
      duplicateExerciseLog(button.dataset.duplicateLogId);
      renderApp();
    });
  });

  const methodSelect = document.querySelector("#log-method");

  if (methodSelect) {
    methodSelect.addEventListener("change", async event => {
      const { renderMethodFields } = await import("./components/methodFields.js");

      document.querySelector("#dynamic-method-fields").innerHTML =
        renderMethodFields(event.target.value);

      bindQuickChips();
      bindPreviewInputs();
      updateMethodPreview();
      updateMethodMemoryPanel();
      bindMethodMemoryActions();
    });
  }

  document.querySelector("#log-exercise")?.addEventListener("change", () => {
    updateMethodMemoryPanel();
    bindMethodMemoryActions();
  });

  document.querySelector("#clear-log-form")?.addEventListener("click", () => {
    document.querySelectorAll(".logger-card input, .logger-card textarea").forEach(field => {
      field.value = "";
    });

    updateMethodPreview();
  });

  document.querySelector("#add-exercise-log")?.addEventListener("click", () => {
    const exerciseId = document.querySelector("#log-exercise")?.value;
    const methodId = document.querySelector("#log-method")?.value;

    if (!exerciseId || !methodId) return;

    const dynamicData = {};

    document.querySelectorAll("[id^='dynamic-']").forEach(field => {
      dynamicData[field.id.replace("dynamic-", "")] = field.value;
    });

    const payload = {
      exerciseId,
      methodId,
      rpe: document.querySelector("#log-rpe")?.value || "",
      pain: document.querySelector("#log-pain")?.value || "",
      notes: document.querySelector("#log-notes")?.value || "",
      data: dynamicData
    };

    const editingLogId = document.querySelector("#editing-log-id")?.value;

    if (editingLogId) {
      updateExerciseLog(editingLogId, payload);
    } else {
      addExerciseLog(payload);
    }

    renderApp();
  });
}

function bindLibraryActions() {
  document.querySelector("#add-custom-exercise")?.addEventListener("click", () => {
    const name = document.querySelector("#custom-exercise-name")?.value?.trim();

    if (!name) {
      alert("Add an exercise name first.");
      return;
    }

    addCustomExercise({
      name,
      category: document.querySelector("#custom-exercise-category")?.value?.trim(),
      pattern: document.querySelector("#custom-exercise-pattern")?.value?.trim(),
      defaultMethod: document.querySelector("#custom-exercise-method")?.value
    });

    renderApp();
  });

  document.querySelectorAll("[data-delete-custom-exercise]").forEach(button => {
    button.addEventListener("click", () => {
      if (!confirm("Delete this custom exercise?")) return;
      deleteCustomExercise(button.dataset.deleteCustomExercise);
      renderApp();
    });
  });
}

function bindPreviewInputs() {
  document.querySelectorAll("[id^='dynamic-']").forEach(field => {
    field.addEventListener("input", updateMethodPreview);
    field.addEventListener("change", updateMethodPreview);
  });
}

function bindTemplateBuilderActions() {
  const addButton = document.querySelector("#add-exercise-to-template");

  if (addButton) {
    addButton.addEventListener("click", () => {
      const templateId = document.querySelector("#template-builder-template")?.value;
      const exerciseId = document.querySelector("#template-builder-exercise")?.value;
      const methodId = document.querySelector("#template-builder-method")?.value;
      const target = document.querySelector("#template-builder-target")?.value?.trim();
      const notes = document.querySelector("#template-builder-notes")?.value?.trim();

      if (!templateId || !exerciseId || !methodId) return;

      addExerciseToTemplate(templateId, {
        exerciseId,
        methodId,
        target,
        notes
      });

      renderApp();
    });
  }

    document.querySelectorAll("[data-edit-template-id]").forEach(button => {
  button.addEventListener("click", () => {
    const templateId = button.dataset.editTemplateId;
    const template = getTemplateById(templateId);

    if (!template) return;

    document.querySelector("#custom-template-name").value = template.name || "";
    document.querySelector("#custom-template-goal").value = template.goal || "";
    document.querySelector("#custom-template-priority").value = template.priority || "";
    document.querySelector("#editing-template-id").value = template.id;

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

  document.querySelectorAll("[data-remove-template-exercise]").forEach(button => {
    button.addEventListener("click", () => {
      const templateId = button.dataset.templateId;
      const plannedExerciseId = button.dataset.removeTemplateExercise;

      removeExerciseFromTemplate(templateId, plannedExerciseId);
      renderApp();
    });
  });
}

export function renderApp() {
  app.innerHTML = `
    <main class="app-shell">
      ${renderSidebar(store.activeView)}

      <section class="workspace-shell">
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
      </section>

      ${store.activeView === "session-detail" ? "" : renderNav(store.activeView)}
    </main>
  `;

  bindNavigation();
  bindSessionStart();
  bindHistoryActions();
  bindLiveSessionActions();
  bindLibraryActions();
  bindSessionDetailActions(renderApp);
  bindQuickChips();
  bindPreviewInputs();
  updateMethodPreview();
  updateMethodMemoryPanel();
  bindMethodMemoryActions();
  bindTemplateBuilderActions();
}

window.renderApp = renderApp;

renderApp();
