import { methodTypes } from "../data/methodTypes.js";
import { renderExerciseCard } from "../components/exerciseCard.js";
import { store } from "../state/store.js";
import { getAllExercises } from "../logic/exerciseLibrary.js";

function getMethodName(methodId) {
  return methodTypes.find(method => method.id === methodId)?.name || "Custom";
}

export function renderLibrary() {
  const allExercises = getAllExercises();

  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Exercise library</p>
        <h1>Your movements</h1>
      </div>

      <article class="ad-hoc-card">
        <div class="section-header">
          <p class="eyebrow">Custom exercise</p>
          <h2>Add movement</h2>
        </div>

        <label class="form-field">
          <span>Name</span>
          <input id="custom-exercise-name" type="text" placeholder="Ring Row / Cable Row / Seated Jump" />
        </label>

        <div class="form-grid">
          <label class="form-field">
            <span>Category</span>
            <input id="custom-exercise-category" type="text" placeholder="Pull / Push / Rehab" />
          </label>

          <label class="form-field">
            <span>Pattern</span>
            <input id="custom-exercise-pattern" type="text" placeholder="Horizontal Pull" />
          </label>
        </div>

        <label class="form-field">
          <span>Default Method</span>
          <select id="custom-exercise-method">
            ${methodTypes.map(method => `
              <option value="${method.id}">${method.name}</option>
            `).join("")}
          </select>
        </label>

        <button class="primary-button" id="add-custom-exercise">
          Add Exercise
        </button>
      </article>

      <div class="stack">
        ${allExercises.map(exercise => `
          <div class="exercise-row-wrap">
            ${renderExerciseCard(
              exercise.name,
              exercise.pattern,
              getMethodName(exercise.defaultMethod)
            )}

            ${
              exercise.id.startsWith("custom-")
                ? `
                  <button 
                    class="mini-delete-button custom-exercise-delete"
                    data-delete-custom-exercise="${exercise.id}"
                  >
                    ×
                  </button>
                `
                : ""
            }
          </div>
        `).join("")}
      </div>
    </section>
  `;
}
