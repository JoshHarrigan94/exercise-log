const STORAGE_KEY = "progression-lab-data";

const defaultData = {
  sessions: [],
  settings: {
    unit: "kg"
  }
};

export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    saveData(defaultData);
    return defaultData;
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Storage parse failed", error);
    return defaultData;
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
