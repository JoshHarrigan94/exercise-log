import { sessionTemplates } from "../data/sessionTemplates.js";

export function renderSession() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Session builder</p>
        <h1>Start training</h1>
      </div>

      <article class="ad-hoc-card">
        <div class="card-header">
          <div>
            <span class="eyebrow">Flexible session</span>
            <h2>Start Empty Session</h2>
          </div>
        </div>

        <p class="card-copy">
          Create an ad hoc session and build it as you train.
        </p>

        <label class="form-field">
          <span>Session Name</span>

          <input
            id="adhoc-session-name"
            type="text"
            placeholder="Upper Pull / Hotel Session / Conditioning"
          />
        </label>

        <label class="form-field">
          <span>Goal (optional)</span>

          <input
            id="adhoc-session-goal"
            type="text"
            placeholder="Strength / Density / Rehab / Hybrid"
          />
        </label>

        <button class="primary-button" id="start-adhoc-session">
          Start Empty Session
        </button>
      </article>

      <div class="section-header">
        <p class="eyebrow">Templates</p>
        <h2>Structured sessions</h2>
      </div>

      <div class="stack">
        ${sessionTemplates.map(template => `
          <button 
            class="session-card"
            data-template-id="${template.id}"
          >
            <span>${template.name}</span>
            <strong>${template.priority}</strong>
            <small>${template.goal}</small>
          </button>
        `).join("")}
      </div>
    </section>
  `;
}
