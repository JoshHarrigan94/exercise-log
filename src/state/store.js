import { loadData, saveData } from "./storage.js";

const persistedData = loadData();

export const store = {
  activeView: "dashboard",

  activeSession: null,

  data: persistedData
};

export function setView(viewId) {
  store.activeView = viewId;
}

export function startSession(template) {
  store.activeSession = {
    id: crypto.randomUUID(),
    templateId: template.id,
    name: template.name,
    startedAt: new Date().toISOString(),
    exercises: []
  };
}

export function saveSession() {
  if (!store.activeSession) return;

  store.data.sessions.unshift(store.activeSession);

  saveData(store.data);

  store.activeSession = null;
}

export function addExerciseLog(exerciseLog) {
  if (!store.activeSession) return;

  store.activeSession.exercises.push(exerciseLog);
}
