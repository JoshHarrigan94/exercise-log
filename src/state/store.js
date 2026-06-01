import { loadData, saveData } from "./storage.js";

const persistedData = loadData();

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function normalisePlannedExercise(exercisePlan = {}) {
  return {
    id: exercisePlan.id || crypto.randomUUID(),
    exerciseId: exercisePlan.exerciseId,
    methodId: exercisePlan.methodId,
    target: exercisePlan.target || "",
    notes: exercisePlan.notes || "",
    sets: exercisePlan.sets || buildSetsFromLegacyTarget(exercisePlan.target)
  };
}

function buildSetsFromLegacyTarget(target = "") {
  const text = String(target || "").trim();

  const loadMatch = text.match(/(?:BW|\+?\d+(?:\.\d+)?\s?kg)/i);
  const load = loadMatch ? loadMatch[0].replace(/\s/g, "") : "";

  const restMatch = text.match(/(?:rest\s*)?(\d+)\s?(?:s|sec|seconds|m|min|minutes)/i);
  const rest = restMatch ? restMatch[0].replace(/^rest\s*/i, "") : "";

  const setsMatch = text.match(/(\d+)\s?[x×]\s?(\d+)/i);

  if (setsMatch) {
    const sets = Number(setsMatch[1]);
    const reps = setsMatch[2];

    return Array.from({ length: sets }, (_, index) => ({
      id: `set-${index + 1}`,
      label: `Set ${index + 1}`,
      load,
      reps,
      rest,
      rpe: ""
    }));
  }

  return [
    {
      id: "set-1",
      label: "Set 1",
      load,
      reps: text,
      rest,
      rpe: ""
    }
  ];
}

function normaliseTemplate(template) {
  return {
    ...template,
    exercises: (template.exercises || []).map(normalisePlannedExercise)
  };
}

export const store = {
  activeView: "dashboard",
  activeSession: null,
  selectedSessionId: null,
  selectedCalendarDate: todayKey(),
  data: {
    ...persistedData,
    sessions: persistedData.sessions || [],
    customExercises: persistedData.customExercises || [],
    customTemplates: (persistedData.customTemplates || []).map(normaliseTemplate)
  }
};

export function setView(viewId) {
  store.activeView = viewId;
}

export function selectCalendarDate(dateKey) {
  store.selectedCalendarDate = dateKey;
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
    plannedExercises: (sessionData.exercises || []).map(normalisePlannedExercise),
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

export function addCustomTemplate(template) {
  const newTemplate = normaliseTemplate({
    id: `custom-template-${crypto.randomUUID()}`,
    name: template.name,
    goal: template.goal || "",
    priority: template.priority || "Custom",
    estimatedMinutes: template.estimatedMinutes || "",
    exercises: template.exercises || [],
    createdAt: new Date().toISOString()
  });

  store.data.customTemplates.push(newTemplate);
  saveData(store.data);
}

export function deleteCustomTemplate(templateId) {
  store.data.customTemplates = store.data.customTemplates.filter(
    template => template.id !== templateId
  );

  saveData(store.data);
}

export function updateCustomTemplate(templateId, updates) {
  const template = store.data.customTemplates.find(
    item => item.id === templateId
  );

  if (!template) return;

  Object.assign(template, {
    ...updates,
    updatedAt: new Date().toISOString()
  });

  saveData(store.data);
}

export function addExerciseToTemplate(templateId, exercisePlan) {
  const template = store.data.customTemplates.find(item => item.id === templateId);

  if (!template) return;

  template.exercises = template.exercises || [];
  template.exercises.push(normalisePlannedExercise(exercisePlan));

  saveData(store.data);
}

export function removeExerciseFromTemplate(templateId, plannedExerciseId) {
  const template = store.data.customTemplates.find(item => item.id === templateId);

  if (!template) return;

  template.exercises = (template.exercises || []).filter(
    item => item.id !== plannedExerciseId
  );

  saveData(store.data);
}

export function updateExerciseInTemplate(templateId, plannedExerciseId, updates) {
  const template = store.data.customTemplates.find(item => item.id === templateId);

  if (!template) return;

  template.exercises = (template.exercises || []).map(item =>
    item.id === plannedExerciseId
      ? normalisePlannedExercise({
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        })
      : item
  );

  saveData(store.data);
}

export function createTemplateFromSession(sessionId) {
  const session =
    store.activeSession?.id === sessionId
      ? store.activeSession
      : store.data.sessions.find(item => item.id === sessionId);

  if (!session) return;

  const template = normaliseTemplate({
    id: `custom-template-${crypto.randomUUID()}`,
    name: `${session.name} Template`,
    goal: session.goal || "",
    priority: session.exercises[0]?.exerciseId || "Custom",
    estimatedMinutes: "",
    createdFromSessionId: session.id,
    createdAt: new Date().toISOString(),
    exercises: session.exercises.map(log => ({
      exerciseId: log.exerciseId,
      methodId: log.methodId,
      target: log.data?.target || "",
      notes: log.notes || "",
      sets: [
        {
          id: "set-1",
          label: log.data?.label || "Set 1",
          load: log.data?.load || "",
          reps: log.data?.result || log.data?.reps || "",
          rest: log.data?.rest || "",
          rpe: log.rpe || ""
        }
      ]
    }))
  });

  store.data.customTemplates.push(template);
  saveData(store.data);
}