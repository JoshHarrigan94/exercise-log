import { exercises } from "../data/exercises.js";
import { methodTypes } from "../data/methodTypes.js";
import { renderExerciseCard } from "../components/exerciseCard.js";

function getMethodName(methodId) {
  return methodTypes.find(method => method.id === methodId)?.name || "Custom";
}

export function renderLibrary() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Exercise library</p>
        <h1>Your movements</h1>
      </div>

      <div class="stack">
        ${exercises.map(exercise => 
          renderExerciseCard(
            exercise.name,
            exercise.pattern,
            getMethodName(exercise.defaultMethod)
          )
        ).join("")}
      </div>
    </section>
  `;
}
