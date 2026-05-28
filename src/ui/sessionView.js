import { getAllTemplates } from "../logic/templateLibrary.js";

function formatTemplatePriority(template) {
  if (!template.priority) return "Custom";

  if (template.priority.startsWith?.("custom-") || template.priority.includes("-")) {
    return "Saved Session";
  }

  return template.priority;
}

export function renderSession() {
  const templates = getAllTemplates();

  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Session builder</p>
        <h1>Start training</h1>
      </div>

      <article class="ad-hoc-card">
        <div class="section-header">
          <p class="eyebrow">Flexible session</p>
          <h2>Start Empty Session</h2>
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

      <article class="ad-hoc-card">
        <div class="section-header">
          <p class="eyebrow">Custom template</p>
          <h2>Create Template</h2>
        </div>

        <label class="form-field">
          <span>Template Name</span>
          <input
            id="custom-template-name"
            type="text"
            placeholder="Upper Density / Pull Strength / Rehab Day"
          />
        </label>

        <label class="form-field">
          <span>Goal</span>
          <input
            id="custom-template-goal"
            type="text"
            placeholder="Build strict pull-up volume"
          />
        </label>

        <label class="form-field">
          <span>Priority</span>
          <input
            id="custom-template-priority"
            type="text"
            placeholder="Weighted Pull-Up / Hack Squat / Conditioning"
          />
        </label>

        <button class="primary-button" id="add-custom-template">
          Save Template
        </button>
      </article>

      <div class="section-header">
        <p class="eyebrow">Templates</p>
        <h2>Structured sessions</h2>
      </div>

      <div class="stack">
        ${templates.map(template => `
          <div class="template-row-wrap">
            <button 
              class="session-card"
              data-template-id="${template.id}"
            >
              <span>${template.name}</span>
              <strong>${formatTemplatePriority(template)}</strong>
              <small>${template.goal || "No goal set"}</small>
            </button>

            ${
              template.id.startsWith("custom-template-")
                ? `
                  <button 
                    class="mini-delete-button template-delete"
                    data-delete-custom-template="${template.id}"
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
