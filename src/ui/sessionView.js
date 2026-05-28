import { sessionTemplates } from "../data/sessionTemplates.js";

export function renderSession() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Session builder</p>
        <h1>Choose your session</h1>
      </div>

      <div class="stack">
        ${sessionTemplates.map(template => `
          <button class="session-card" data-template-id="${template.id}">
            <span>${template.name}</span>
            <strong>${template.priority}</strong>
            <small>${template.goal}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}
