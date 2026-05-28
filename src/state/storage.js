const STORAGE_KEY = "progression-lab-data-v1";

const defaultData = {
  sessions: [],
  customExercises: [],
  customTemplates: [],
  settings: {
    unit: "kg"
  }
};

export function loadData() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    saveData(defaultData);
    return structuredClone(defaultData);
  }

  try {
    const parsed = JSON.parse(raw);

    return {
      ...defaultData,
      ...parsed,
      customExercises: parsed.customExercises || [],
      customTemplates: parsed.customTemplates || []
    };
  } catch (error) {
    console.error("Failed to load storage", error);
    return structuredClone(defaultData);
  }
}

export function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
