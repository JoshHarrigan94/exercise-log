import { loadData, saveData } from "./storage.js";

const persistedData = loadData();

export const store = {
  activeView: "dashboard",
  activeSession: null,
  selectedSessionId: null,
  data: persistedData
};

export function setView(viewId) {
  store.activeView = viewId;
}

export function selectSession(sessionId) {
  store.selectedSessionId = sessionId;
  store.activeView = "session-detail";
}

export function clearSelectedSession() {
  store.selectedSessionId = null;
}

export function startSession(sessionData = {}) {
  store.activeSession = {
    id: crypto.randomUUID(),
    templateId: sessionData.templateId || null,
    name: sessionData.name || "Untitled Session",
    goal: sessionData.goal || "",
    startedAt: new Date().toISOString(),
    exercises: []
  };
}

export function cancelActiveSession() {
  store.activeSession = null;
}

export function saveSession() {
  if (!store.activeSession) return;

  store.data.sessions.unshift(store.activeSession);
  saveData(store.data);
  store.activeSession = null;
}

export function deleteSession(sessionId) {
  store.data.sessions = store.data.sessions.filter(
    session => session.id !== sessionId
  );

  saveData(store.data);
  clearSelectedSession();
}

export function addCustomExercise(exercise) {
  const newExercise = {
    id: `custom-${crypto.randomUUID()}`,
    name: exercise.name,
    category: exercise.category || "Custom",
    pattern: exercise.pattern || "Custom",
    equipment: exercise.equipment || [],
    loadType: exercise.loadType || "custom",
    defaultMethod: exercise.defaultMethod || "standard-sets",
    cues: exercise.cues || []
  };

  store.data.customExercises.push(newExercise);
  saveData(store.data);
}

export function deleteCustomExercise(exerciseId) {
  store.data.customExercises = store.data.customExercises.filter(
    exercise => exercise.id !== exerciseId
  );

  saveData(store.data);
}

export function addExerciseLog(exerciseLog) {
  if (!store.activeSession) return;

  store.activeSession.exercises.push({
    id: crypto.randomUUID(),
    loggedAt: new Date().toISOString(),
    ...exerciseLog
  });
}

export function removeExerciseLog(logId) {
  if (!store.activeSession) return;

  store.activeSession.exercises = store.activeSession.exercises.filter(
    log => log.id !== logId
  );
}

export function updateExerciseLog(logId, updatedLog) {
  if (!store.activeSession) return;

  store.activeSession.exercises = store.activeSession.exercises.map(log =>
    log.id === logId
      ? {
          ...log,
          ...updatedLog,
          updatedAt: new Date().toISOString()
        }
      : log
  );
}

export function duplicateExerciseLog(logId) {
  if (!store.activeSession) return;

  const log = store.activeSession.exercises.find(item => item.id === logId);

  if (!log) return;

  store.activeSession.exercises.push({
    ...log,
    id: crypto.randomUUID(),
    loggedAt: new Date().toISOString(),
    duplicatedFrom: logId
  });
}

export function addCustomTemplate(template) {
  const newTemplate = {
    id: `custom-template-${crypto.randomUUID()}`,
    name: template.name,
    goal: template.goal || "",
    priority: template.priority || "Custom",
    estimatedMinutes: template.estimatedMinutes || "",
    exercises: template.exercises || [],
    createdAt: new Date().toISOString()
  };

  store.data.customTemplates.push(newTemplate);
  saveData(store.data);
}

export function deleteCustomTemplate(templateId) {
  store.data.customTemplates = store.data.customTemplates.filter(
    template => template.id !== templateId
  );

  saveData(store.data);
}
