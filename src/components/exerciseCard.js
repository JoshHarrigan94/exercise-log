export function renderExerciseCard(name, pattern, method) {
  return `
    <article class="exercise-card">
      <div>
        <h2>${name}</h2>
        <p>${pattern}</p>
      </div>
      <span>${method}</span>
    </article>
  `;
}
