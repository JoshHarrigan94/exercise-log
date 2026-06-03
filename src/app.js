import { renderDashboard } from "./ui/dashboardView.js";
import { renderSession } from "./ui/sessionView.js";
import { renderLiveSession } from "./ui/liveSessionView.js";

import {
  normaliseLoggedMovement
} from "./logic/logNormalization.js";

import {
  normalisePlannedMovement
} from "./logic/templateMovementNormalization.js";

import {
  getMovementAtlas,
  getCompatibleMethodsForVariant
} from "./logic/exerciseLibrary.js";
import {
  searchMovementCatalogue
} from "./logic/movementSearchCatalogue.js";
import {
  validateCustomMovement,
  normaliseCustomMovement
} from "./logic/customMovementValidation.js";

import { methodTypes } from "./data/methodTypes.js";

import {
  renderLibrary,
  selectLibraryBaseMovement,
  clearLibraryBaseMovement,
  selectGeneratedMovement,
  clearGeneratedMovement,
  setLibrarySearch,
  setLibraryFamilyFilter,
  setLibraryExpressionFilter,
  setLibraryOutputFilter,
  clearLibraryFilters,
  openCustomMovementBuilder,
  closeCustomMovementBuilder
} from "./ui/exerciseLibraryView.js";

import { renderHistory } from "./ui/historyView.js";

import {
  renderSessionDetail,
  bindSessionDetailActions
} from "./ui/sessionDetailView.js";

import { renderNav, renderSidebar, renderAdaptMark } from "./components/nav.js";
import { getTheme, toggleTheme } from "./state/theme.js";
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
  updateExerciseInTemplate,
  addWeekToTemplate,
  addWorkoutToWeek
} from "./state/store.js";

import {
  getTemplateById,
  getWorkoutById
} from "./logic/templateLibrary.js";

const app = document.querySelector("#app");

function getViewTitle() {
  if (store.activeView === "dashboard" && store.activeSession) {
    return "Live Session";
  }

  const titles = {
    dashboard: "Today",
    session: "Blocks",
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
      const templateId = button.dataset.templateId;
      const workoutId = button.dataset.workoutId;

      const template = getTemplateById(templateId);
      if (!template) return;

      if (workoutId) {
        const workout = getWorkoutById(templateId, workoutId);
        if (!workout) return;

        startSession({
          templateId: template.id,
          workoutId: workout.id,
          name: `${template.name} · ${workout.name}`,
          goal: workout.goal || template.goal,
          exercises: workout.exercises || []
        });

        setView("dashboard");
        renderApp();
        return;
      }

      const firstWorkout = template.weeks?.[0]?.workouts?.[0];

      startSession({
        templateId: template.id,
        workoutId: firstWorkout?.id || null,
        name: firstWorkout
          ? `${template.name} · ${firstWorkout.name}`
          : template.name,
        goal: firstWorkout?.goal || template.goal,
        exercises: firstWorkout?.exercises || template.exercises || []
      });

      setView("dashboard");
      renderApp();
    });
  });

  document.querySelector("#start-adhoc-session")?.addEventListener("click", () => {
    startSession({
      name:
        document.querySelector("#adhoc-session-name")?.value?.trim() ||
        "Ad Hoc Session",
      goal:
        document.querySelector("#adhoc-session-goal")?.value?.trim() ||
        ""
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
      alert("Add a block name first.");
      return;
    }

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

  document.querySelectorAll("[data-delete-custom-template]").forEach(button => {
    button.addEventListener("click", () => {
      if (!confirm("Delete this block?")) return;

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

function readExecutionRow(button) {
  const exerciseId = button.dataset.logExecutionRow;
  const methodId = button.dataset.methodId;
  const rowId = button.dataset.rowId;
  const rowLabel = button.dataset.rowLabel;
  const key = `${exerciseId}-${rowId}`;

  const rawLog = {
    movementCatalogueId: exerciseId,
    exerciseId,
    methodId,
    rpe: document.querySelector(`[data-exec-rpe="${key}"]`)?.value || "",
    notes: "",
    data: {
      label: rowLabel,
      load: document.querySelector(`[data-exec-load="${key}"]`)?.value || "",
      result: document.querySelector(`[data-exec-result="${key}"]`)?.value || "",
      rest: document.querySelector(`[data-exec-rest="${key}"]`)?.value || ""
    }
  };

  return normaliseLoggedMovement(rawLog);
}

function populateLoggerFromLog(log) {
  const exerciseInput = document.querySelector("#log-exercise");
  const methodInput = document.querySelector("#log-method");

  if (!exerciseInput || !methodInput) return;

  exerciseInput.value =
    log.movementCatalogueId ||
    log.exerciseId ||
    log.movementExpression?.id ||
    "";

  methodInput.value =
    log.methodId ||
    log.movementExpression?.methodId ||
    "";

  methodInput.dispatchEvent(new Event("change", { bubbles: true }));

  setTimeout(() => {
    Object.entries(log.data || log.outputs || {}).forEach(([key, value]) => {
      const field = document.querySelector(`#dynamic-${key}`);
      if (field) field.value = value;
    });

    document.querySelector("#log-rpe").value =
      log.rpe ||
      log.outputs?.rpe ||
      "";

    document.querySelector("#log-notes").value =
      log.notes ||
      log.outputs?.notes ||
      "";

    document.querySelector("#editing-log-id").value = log.id;

    if (document.querySelector("#method-preview")) {
      updateMethodPreview();
    }
  }, 0);
}

function renderLoggerMethodOptions(exerciseId) {
  const compatibility = getCompatibleMethodsForVariant(exerciseId);

  const methods = [
    ...(compatibility.recommended || []),
    ...(compatibility.possible || [])
  ];

  if (!methods.length) {
    return methodTypes.map(method => `
      <option value="${method.id}">
        ${method.name}
      </option>
    `).join("");
  }

  return methods.map(item => `
    <option value="${item.method.id}">
      ${item.method.name}${item.score >= 5 ? " · recommended" : ""}
    </option>
  `).join("");
}

function refreshLoggerMethods() {
  const exerciseInput = document.querySelector("#log-exercise");
 document
  .querySelector("#log-method")
  ?.dispatchEvent(
    new Event("change", {
      bubbles: true
    })
  );
   const methodInput = document.querySelector("#log-method");

  if (!exerciseInput || !methodInput) return;

  methodInput.innerHTML = renderLoggerMethodOptions(exerciseInput.value);
  methodInput.dispatchEvent(new Event("change", { bubbles: true }));
}

function refreshLoggerMovementsForFamily(familyId) {
  const exerciseInput = document.querySelector("#log-exercise");
  if (!exerciseInput) return;

  const atlas = getMovementAtlas();
  const family = atlas.find(item => item.id === familyId);

  if (!family) return;

  exerciseInput.innerHTML = family.bases.flatMap(base =>
    (base.variants || []).map(variant => `
      <option 
        value="${variant.id}"
        data-base="${base.id}"
        data-family="${family.id}"
      >
        ${variant.name}
      </option>
    `)
  ).join("");

  refreshLoggerMethods();
}

function bindLiveSessionActions() {
  document.querySelector("#log-family")?.addEventListener("change", event => {
    refreshLoggerMovementsForFamily(event.target.value);
  });

  document.querySelector("#log-exercise")?.addEventListener("change", () => {
    refreshLoggerMethods();

    if (document.querySelector("#method-memory-panel")) {
      updateMethodMemoryPanel();
      bindMethodMemoryActions();
    }
  });

  document.querySelector(".complete-session-button")?.addEventListener("click", () => {
    saveSession();
    setView("history");
    renderApp();
  });

  document.querySelector("#save-active-as-template")?.addEventListener("click", () => {
    if (!store.activeSession) return;

    createTemplateFromSession(store.activeSession.id);
    alert("Saved as block.");
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
      addExerciseLog(readExecutionRow(button));
      renderApp();
    });
  });

  document.querySelectorAll("[data-log-all-execution-rows]").forEach(button => {
    button.addEventListener("click", () => {
      const exerciseId = button.dataset.logAllExecutionRows;

      document
        .querySelectorAll(`[data-log-execution-row="${exerciseId}"]`)
        .forEach(rowButton => {
          addExerciseLog(readExecutionRow(rowButton));
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

      const selectedMovementId =
  document.querySelector("#log-exercise")?.value;

const movement =
  searchMovementCatalogue()
    .find(item => item.id === selectedMovementId);

container.innerHTML =
  renderMethodFields(
    event.target.value,
    movement?.expression?.outputIds || []
  );

      bindQuickChips();
      bindPreviewInputs();

      if (document.querySelector("#method-preview")) {
        updateMethodPreview();
      }

      if (document.querySelector("#method-memory-panel")) {
        updateMethodMemoryPanel();
        bindMethodMemoryActions();
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to update method fields.");
    }
  });

  document.querySelector("#clear-log-form")?.addEventListener("click", () => {
    document.querySelectorAll(".logger-card input, .logger-card textarea").forEach(field => {
      field.value = "";
    });

    if (document.querySelector("#method-preview")) {
      updateMethodPreview();
    }
  });

  document.querySelector("#add-exercise-log")?.addEventListener("click", () => {
    const movementCatalogueId = document.querySelector("#log-exercise")?.value || "";
    const methodId = document.querySelector("#log-method")?.value || "";

    if (!movementCatalogueId || !methodId) return;

    const dynamicData = {};

    document.querySelectorAll("[id^='dynamic-']").forEach(field => {
      dynamicData[field.id.replace("dynamic-", "")] = field.value;
    });

    const rawLog = {
      movementCatalogueId,
      methodId,
      rpe:
        document.querySelector("#log-rpe-detail")?.value ||
        document.querySelector("#log-rpe")?.value ||
        "",
      notes: document.querySelector("#log-notes")?.value || "",
      data: dynamicData,
      outputs: dynamicData
    };

    const payload = normaliseLoggedMovement(rawLog);

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
  document.querySelectorAll("[data-open-base-movement]").forEach(button => {
    button.addEventListener("click", () => {
      selectLibraryBaseMovement(button.dataset.openBaseMovement);
      renderApp();
    });
  });

  document.querySelectorAll("[data-open-generated-movement]").forEach(button => {
    button.addEventListener("click", () => {
      selectGeneratedMovement(button.dataset.openGeneratedMovement);
      renderApp();
    });
  });

  document.querySelectorAll("[data-close-generated-movement]").forEach(button => {
    button.addEventListener("click", () => {
      clearGeneratedMovement();
      renderApp();
    });
  });

  document.querySelectorAll("[data-close-base-movement]").forEach(button => {
    button.addEventListener("click", () => {
      clearLibraryBaseMovement();
      renderApp();
    });
  });

  document.querySelectorAll("[data-open-custom-movement-builder]").forEach(button => {
    button.addEventListener("click", () => {
      openCustomMovementBuilder();
      renderApp();
    });
  });

  document.querySelectorAll("[data-close-custom-movement-builder]").forEach(button => {
    button.addEventListener("click", () => {
      closeCustomMovementBuilder();
      renderApp();
    });
  });

  document.querySelector("#add-custom-exercise")?.addEventListener("click", () => {
    const rawMovement = {
      name: document.querySelector("#custom-exercise-name")?.value?.trim(),
      category: document.querySelector("#custom-exercise-family")?.value || "",
      pattern: document.querySelector("#custom-exercise-pattern")?.value?.trim() || "",
      closestBaseMovementId: document.querySelector("#custom-exercise-base")?.value || "",
      primaryExpression: document.querySelector("#custom-exercise-expression")?.value || "",
      equipment: document.querySelector("#custom-exercise-equipment")?.value
        ?.split(",")
        .map(item => item.trim())
        .filter(Boolean) || [],
      measurableOutputs: document.querySelector("#custom-exercise-outputs")?.value
        ?.split(",")
        .map(item => item.trim())
        .filter(Boolean) || [],
      movementType: document.querySelector("#custom-exercise-type")?.value || "",
      defaultMethod: document.querySelector("#custom-exercise-method")?.value || "",
      cues: document.querySelector("#custom-exercise-cues")?.value
        ?.split(",")
        .map(item => item.trim())
        .filter(Boolean) || []
    };

    const validation = validateCustomMovement(rawMovement);

    if (!validation.isValid) {
      alert(validation.errors.join("\n"));
      return;
    }

    addCustomExercise(normaliseCustomMovement(rawMovement));

    closeCustomMovementBuilder();
    renderApp();
  });

  document.querySelectorAll("[data-delete-custom-exercise]").forEach(button => {
    button.addEventListener("click", () => {
      if (!confirm("Delete this custom movement?")) return;

      deleteCustomExercise(button.dataset.deleteCustomExercise);
      renderApp();
    });
  });

  document.querySelector("#library-search")?.addEventListener("input", event => {
    setLibrarySearch(event.target.value);
    renderApp();
  });

  document.querySelector("#library-family-filter")?.addEventListener("change", event => {
    setLibraryFamilyFilter(event.target.value);
    renderApp();
  });

  document.querySelector("#library-expression-filter")?.addEventListener("change", event => {
    setLibraryExpressionFilter(event.target.value);
    renderApp();
  });

  document.querySelector("#library-output-filter")?.addEventListener("change", event => {
    setLibraryOutputFilter(event.target.value);
    renderApp();
  });

  document.querySelector("[data-clear-library-filters]")?.addEventListener("click", () => {
    clearLibraryFilters();
    renderApp();
  });
}

function getPlannedSetsFromBuilder() {
  const load = document.querySelector("#template-builder-load")?.value?.trim();
  const sets = Number(document.querySelector("#template-builder-sets")?.value || 1);
  const reps = document.querySelector("#template-builder-reps")?.value?.trim();
  const rest = document.querySelector("#template-builder-rest")?.value?.trim();
  const rpe = document.querySelector("#template-builder-rpe")?.value?.trim();

  return Array.from({ length: Math.max(1, sets) }, (_, index) => ({
    id: `set-${index + 1}`,
    label: `Set ${index + 1}`,
    load,
    reps,
    rest,
    rpe
  }));
}

function buildTargetFromSets(plannedSets) {
  const first = plannedSets[0] || {};
  const setCount = plannedSets.length;

  return `${setCount} × ${first.reps || "?"}${first.load ? ` @ ${first.load}` : ""}${first.rest ? ` · ${first.rest}` : ""}`;
}

function refreshTemplateBuilderMethods() {
  const methodInput = document.querySelector("#template-builder-method");

  if (!methodInput) return;

  methodInput.innerHTML = methodTypes.map(method => `
    <option value="${method.id}">
      ${method.name}
    </option>
  `).join("");
}

function bindTemplateBuilderActions() {
  document.querySelector("#template-builder-exercise")?.addEventListener("change", () => {
    refreshTemplateBuilderMethods();
  });

  document.querySelector("#template-builder-family")?.addEventListener("change", () => {
    refreshTemplateBuilderMethods();
  });

  document.querySelector("#add-exercise-to-template")?.addEventListener("click", () => {
    const workoutChoice =
      document.querySelector("#template-builder-workout")?.value || "";

    const [selectedTemplateId, selectedWorkoutId] =
      workoutChoice.split("::");

    const templateId =
      selectedTemplateId ||
      document.querySelector("#template-builder-template")?.value;

    const workoutId = selectedWorkoutId || "";

    const movementCatalogueId =
      document.querySelector("#template-builder-exercise")?.value || "";

    const methodId =
      document.querySelector("#template-builder-method")?.value || "";

    const notes =
      document.querySelector("#template-builder-notes")?.value?.trim();

    const editingPlannedExerciseId =
      document.querySelector("#editing-planned-exercise-id")?.value;

    if (!templateId || !movementCatalogueId || !methodId) return;

    const plannedSets = getPlannedSetsFromBuilder();
    const target = buildTargetFromSets(plannedSets);

    const rawMovement = {
      movementCatalogueId,
      methodId,
      workoutId,
      target,
      notes,
      sets: plannedSets
    };

    const payload = normalisePlannedMovement(rawMovement);

    if (editingPlannedExerciseId) {
      updateExerciseInTemplate(templateId, editingPlannedExerciseId, payload);
    } else {
      addExerciseToTemplate(templateId, payload);
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

      const firstSet = plannedExercise.sets?.[0] || {};

      document.querySelector("#template-builder-template").value = templateId;
      document.querySelector("#template-builder-exercise").value =
        plannedExercise.movementCatalogueId ||
        plannedExercise.exerciseId ||
        plannedExercise.movementExpression?.id ||
        "";

      document.querySelector("#template-builder-method").value =
        plannedExercise.methodId ||
        plannedExercise.movementExpression?.methodId ||
        "";

      document.querySelector("#template-builder-load").value = firstSet.load || "";
      document.querySelector("#template-builder-sets").value = plannedExercise.sets?.length || 1;
      document.querySelector("#template-builder-reps").value = firstSet.reps || "";
      document.querySelector("#template-builder-rest").value = firstSet.rest || "";
      document.querySelector("#template-builder-rpe").value = firstSet.rpe || "";
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

function bindBlockStructureActions() {
  document.querySelectorAll("[data-add-week-to-template]").forEach(button => {
    button.addEventListener("click", () => {
      addWeekToTemplate(button.dataset.addWeekToTemplate);
      renderApp();
    });
  });

  document.querySelectorAll("[data-add-workout-to-week]").forEach(button => {
    button.addEventListener("click", () => {
      addWorkoutToWeek(
        button.dataset.templateId,
        button.dataset.addWorkoutToWeek
      );

      renderApp();
    });
  });
}

export function renderApp() {
  app.innerHTML = `
    <main class="app-shell" data-theme="${getTheme()}">
      ${renderSidebar(store.activeView)}

      <section class="workspace-shell">
        <header class="top-bar adapt-top-bar">
  <div class="adapt-top-brand">
    ${renderAdaptMark()}

    <div>
      <p class="eyebrow">ADAPT</p>
      <h1>${getViewTitle()}</h1>
    </div>
  </div>

  <div class="adapt-top-actions">
  <button class="theme-toggle-button" id="theme-toggle" type="button">
    ${getTheme() === "dark" ? "☀" : "☾"}
  </button>

  <button class="profile-button">JH</button>
</div>
</header>

        <div class="view-container">
          ${renderView()}
        </div>
      </section>

      ${store.activeView === "session-detail" ? "" : renderNav(store.activeView)}
    </main>
  `;

  bindNavigation();
  document.querySelector("#theme-toggle")?.addEventListener("click", () => {
  toggleTheme();
  renderApp();
});
  bindSessionStart();
  bindHistoryActions();
  bindLiveSessionActions();
  bindLibraryActions();
  bindTemplateBuilderActions();
  bindBlockStructureActions();
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
          color: #b23b32;
        ">
          Progression Lab boot error
        </p>

        <h1 style="margin-top: 8px;">The app failed to load.</h1>

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