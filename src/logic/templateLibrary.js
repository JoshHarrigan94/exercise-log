import { sessionTemplates } from "../data/sessionTemplates.js";
import { store } from "../state/store.js";

export function getAllTemplates() {
  return [
    ...sessionTemplates,
    ...(store.data.customTemplates || [])
  ];
}

export function getTemplateById(id) {
  return getAllTemplates().find(
    template => template.id === id
  );
}

export function getTemplateWeeks(templateId) {
  const template = getTemplateById(templateId);

  return template?.weeks || [];
}

export function getTemplateWorkouts(templateId) {
  const weeks = getTemplateWeeks(templateId);

  return weeks.flatMap(
    week => week.workouts || []
  );
}

export function getWorkoutById(templateId, workoutId) {
  return getTemplateWorkouts(templateId).find(
    workout => workout.id === workoutId
  );
}