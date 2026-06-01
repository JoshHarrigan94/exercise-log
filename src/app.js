import { renderDashboard } from "./ui/dashboardView.js";
import { renderSession } from "./ui/sessionView.js";
import { renderLiveSession } from "./ui/liveSessionView.js";
import { renderLibrary } from "./ui/exerciseLibraryView.js";
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
  selectCalendarDate,
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
  updateCustomTemplate,
  updateExerciseInTemplate
} from "./state/store.js";

import { getTemplateById } from "./logic/templateLibrary.js";

const app = document.querySelector("#app");

function getViewTitle() {
  if (store.activeView === "dashboard" && store.activeSession) {
    return "Live Session";
  }

  const titles = {
    dashboard: "Today",
    session: "Plans",
    library: "Library",
    history: "Review",
    "session-detail": "Session Detail"
  };

  return titles[store.activeView] || "Progression Lab";
}

function renderView() {
  if (store.activeView === "dashboard" && store.activeSession) {
    return renderLiveSession();
  }

  const views = {
    dashboard: renderDashboard,
    session: renderSession,
    library: renderLibrary,
    history: renderHistory,
    "session-detail": renderSessionDetail
  };

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

      setView("dashboard");
      renderApp();
    });
  });

  document.querySelector("#start-adhoc-session")?.addEventListener("click", () => {
    startSession({
      name: document.querySelector("#adhoc-session-name")?.value?.trim() || "Ad Hoc Session",
      goal: document.querySelector("#adhoc-session-goal")?.value?.trim() || ""
    });

    setView("dashboard");
    renderApp();
  });

  document.querySelector("#add-custom-template")?.addEventListener("click", () => {
    const name = document.querySelector("#custom-template-name")?.value?.trim();
    const goal = document.querySelector("#custom-template-goal")?.value?.trim();
    const priority = document.querySelector("#custom-template-priority")?.value?.trim();
    const editingTemplateId = document.querySelector("#editing-template-id")?.value;

    if (!name) {
      alert("Add a template name first.");
      return;
    }

    if (editingTemplateId) {
      updateCustomTemplate(editingTemplateId, { name, goal, priority });
    } else {
      addCustomTemplate({ name, goal, priority });
    }

    renderApp();
  });

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
  const exerciseInput = document.querySelector("#log-exercise");
  const methodInput = document.querySelector("#log-method");

  if (!exerciseInput || !methodInput) return;

  exerciseInput.value = log.exerciseId;
  methodInput.value = log.methodId;
  methodInput.dispatchEvent(new Event("change", { bubbles: true }));

  setTimeout(() => {
    Object.entries(log.data || {}).forEach(([key, value]) => {
      const field = document.querySelector(`#dynamic-${key}`);
      if (field) field.value = value;
    });

    if (document.querySelector("#log-rpe")) {
  document.querySelector("#log-rpe").value = log.rpe || "";
}

if (document.querySelector("#log-rpe-detail")) {
  document.querySelector("#log-rpe-detail").value = log.rpe || "";
}

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
  
  document.querySelectorAll("[data-log-execution-row]").forEach(button => {
  button.addEventListener("click", () => {
    const exerciseId = button.dataset.logExecutionRow;
    const methodId = button.dataset.methodId;
    const rowId = button.dataset.rowId;
    const rowLabel = button.dataset.rowLabel;

    const key = `${exerciseId}-${rowId}`;

    const load = document.querySelector(`[data-exec-load="${key}"]`)?.value || "";
    const result = document.querySelector(`[data-exec-result="${key}"]`)?.value || "";
    const rest = document.querySelector(`[data-exec-rest="${key}"]`)?.value || "";
    const rpe = document.querySelector(`[data-exec-rpe="${key}"]`)?.value || "";

    addExerciseLog({
      exerciseId,
      methodId,
      rpe,
      
      notes: "",
      data: {
        label: rowLabel,
        load,
        result,
        rest
      }
    });

    renderApp();
  });
});

document.querySelectorAll("[data-log-all-execution-rows]").forEach(button => {
  button.addEventListener("click", () => {
    const exerciseId = button.dataset.logAllExecutionRows;
    const methodId = button.dataset.methodId;

    document
      .querySelectorAll(`[data-log-execution-row="${exerciseId}"]`)
      .forEach(rowButton => {
        const rowId = rowButton.dataset.rowId;
        const rowLabel = rowButton.dataset.rowLabel;
        const key = `${exerciseId}-${rowId}`;

        const load = document.querySelector(`[data-exec-load="${key}"]`)?.value || "";
        const result = document.querySelector(`[data-exec-result="${key}"]`)?.value || "";
        const rest = document.querySelector(`[data-exec-rest="${key}"]`)?.value || "";
        const rpe = document.querySelector(`[data-exec-rpe="${key}"]`)?.value || "";

        addExerciseLog({
          exerciseId,
          methodId,
          rpe,
          
          notes: "",
          data: {
            label: rowLabel,
            load,
            result,
            rest
          }
        });
      });

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

  document.querySelector("#log-method")?.addEventListener("change", async event => {
  try {
    const { renderMethodFields } = await import("./components/methodFields.js");

    const container = document.querySelector("#dynamic-method-fields");
    if (!container) return;

    container.innerHTML = renderMethodFields(event.target.value);

    bindQuickChips();
    bindPreviewInputs();
    updateMethodPreview();
    updateMethodMemoryPanel();
        bindMethodMemoryActions();
  } catch (error) {
    console.error(error);
    alert(error.message || "Failed to update method fields.");
  }
});

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

    const rpe =
  document.querySelector("#log-rpe-detail")?.value ||
  document.querySelector("#log-rpe")?.value ||
  "";



const payload = {
  exerciseId,
  methodId,
  rpe,
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

function bindTemplateBuilderActions() {
  document.querySelector("#add-exercise-to-template")?.addEventListener("click", () => {
    const templateId = document.querySelector("#template-builder-template")?.value;
    const exerciseId = document.querySelector("#template-builder-exercise")?.value;
    const methodId = document.querySelector("#template-builder-method")?.value;
    const target = document.querySelector("#template-builder-target")?.value?.trim();
    const notes = document.querySelector("#template-builder-notes")?.value?.trim();
    const editingPlannedExerciseId = document.querySelector("#editing-planned-exercise-id")?.value;

    if (!templateId || !exerciseId || !methodId) return;

    if (editingPlannedExerciseId) {
      updateExerciseInTemplate(templateId, editingPlannedExerciseId, {
        exerciseId,
        methodId,
        target,
        notes
      });
    } else {
      addExerciseToTemplate(templateId, {
        exerciseId,
        methodId,
        target,
        notes
      });
    }

    renderApp();
  });

  document.querySelectorAll("[data-edit-template-id]").forEach(button => {
    button.addEventListener("click", () => {
      const template = getTemplateById(button.dataset.editTemplateId);
      if (!template) return;

      document.querySelector("#custom-template-name").value = template.name || "";
      document.querySelector("#custom-template-goal").value = template.goal || "";
      document.querySelector("#custom-template-priority").value = template.priority || "";
      document.querySelector("#editing-template-id").value = template.id;

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-edit-template-exercise]").forEach(button => {
    button.addEventListener("click", () => {
      const templateId = button.dataset.templateId;
      const plannedExerciseId = button.dataset.editTemplateExercise;

      const template = getTemplateById(templateId);
      const plannedExercise = template?.exercises?.find(
        item => item.id === plannedExerciseId
      );

      if (!plannedExercise) return;

      document.querySelector("#template-builder-template").value = templateId;
      document.querySelector("#template-builder-exercise").value = plannedExercise.exerciseId;
      document.querySelector("#template-builder-method").value = plannedExercise.methodId;
      document.querySelector("#template-builder-target").value = plannedExercise.target || "";
      document.querySelector("#template-builder-notes").value = plannedExercise.notes || "";
      document.querySelector("#editing-planned-exercise-id").value = plannedExercise.id;

      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-remove-template-exercise]").forEach(button => {
    button.addEventListener("click", () => {
      removeExerciseFromTemplate(
        button.dataset.templateId,
        button.dataset.removeTemplateExercise
      );

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

function bindCalendarActions() {
  document.querySelectorAll("[data-calendar-day]").forEach(button => {
    button.addEventListener("click", () => {
      selectCalendarDate(button.dataset.calendarDay);
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
  bindTemplateBuilderActions();
  bindSessionDetailActions(renderApp);
  bindQuickChips();
bindPreviewInputs();

if (document.querySelector("#method-preview")) {
  updateMethodPreview();
}

if (document.querySelector("#method-memory-panel")) {
  updateMethodMemoryPanel();
  bindMethodMemoryActions();
}

bindCalendarActions();
}

window.renderApp = renderApp;

function renderBootError(error) {
  const root = document.querySelector("#app");

  if (!root) {
    console.error("Boot failed and #app was not found", error);
    return;
  }

  root.innerHTML = `
    <main style="
      min-height: 100vh;
      padding: 24px;
      background: #f4f1ea;
      color: #1f2933;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    ">
      <section style="
        max-width: 760px;
        margin: 0 auto;
        background: #fffdf8;
        border: 1px solid rgba(0,0,0,0.08);
        border-radius: 20px;
        padding: 20px;
      ">
        <p style="
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 12px;
          font-weight: 800;
          color: #e85d3f;
        ">
          Progression Lab boot error
        </p>

        <h1 style="margin-top: 8px;">
          The app failed to load.
        </h1>

        <p style="margin-top: 8px; color: #5f6670;">
          Copy this error and send it back into ChatGPT.
        </p>

        <pre style="
          margin-top: 16px;
          padding: 14px;
          overflow: auto;
          white-space: pre-wrap;
          background: #1f2933;
          color: #f8fafc;
          border-radius: 14px;
          font-size: 13px;
          line-height: 1.5;
        ">${error?.stack || error?.message || String(error)}</pre>
      </section>
    </main>
  `;
}

try {
  renderApp();
} catch (error) {
  console.error(error);
  renderBootError(error);
}