import { renderExerciseCard } from "../components/exerciseCard.js";

export function renderLibrary() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Exercise library</p>
        <h1>Your movements</h1>
      </div>

      <div class="stack">
        ${renderExerciseCard("Weighted Pull-Up", "Vertical Pull", "Top Set + Ladder")}
        ${renderExerciseCard("Weighted Dip", "Vertical Push", "Top Set + Ladder")}
        ${renderExerciseCard("Push-Up", "Horizontal Push", "Volume Ladder")}
        ${renderExerciseCard("Hack Squat", "Squat", "Heavy Set + Back-Off")}
        ${renderExerciseCard("Reverse Hyper", "Posterior Chain", "Controlled Sets")}
        ${renderExerciseCard("Calf Isometric", "Rehab", "Timed Hold")}
      </div>
    </section>
  `;
}
