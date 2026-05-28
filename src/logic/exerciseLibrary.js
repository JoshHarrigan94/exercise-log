import { exercises } from "../data/exercises.js";
import { store } from "../state/store.js";

export function getAllExercises() {
  return [
    ...exercises,
    ...(store.data.customExercises || [])
  ];
}

export function getExerciseById(id) {
  return getAllExercises().find(exercise => exercise.id === id);
}
