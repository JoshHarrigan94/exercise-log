import { generateCoachingReport } from "../../logic/coachingEngine.js";

function formatLabel(value = "") {
  return String(value || "")
    .split("-")
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
    )
    .join(" ");
}

export function renderCoachingInsightCard(session) {
  const report =
    generateCoachingReport(session) || {};

  const observations =
    report.observations || [];

  const recommendations =
    report.recommendations || [];

  const requiredMetrics =
    report.requiredMetrics || [];

  return `
    <article class="workspace-card coaching-card">

      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Coach</p>
          <h2>Training Analysis</h2>
        </div>
      </div>

      <div class="coaching-summary-grid">

        <div class="coaching-summary-item">
          <span>Primary Expression</span>
          <strong>
            ${
              formatLabel(
                report.primaryExpression || "Unknown"
              )
            }
          </strong>
        </div>

        <div class="coaching-summary-item">
          <span>Dominant Domain</span>
          <strong>
            ${
              formatLabel(
                report.dominantDomain || "General"
              )
            }
          </strong>
        </div>

      </div>

      <div class="coaching-section">

        <h3>Observations</h3>

        ${
          observations.length
            ? `
              <ul class="coach-list">
                ${observations.map(item => `
                  <li>${item}</li>
                `).join("")}
              </ul>
            `
            : `<p>No observations available.</p>`
        }

      </div>

      <div class="coaching-section">

        <h3>Recommendations</h3>

        ${
          recommendations.length
            ? `
              <ul class="coach-list">
                ${recommendations.map(item => `
                  <li>${item}</li>
                `).join("")}
              </ul>
            `
            : `<p>No recommendations available.</p>`
        }

      </div>

      <div class="coaching-section">

        <h3>Required Metrics</h3>

        ${
          requiredMetrics.length
            ? `
              <div class="metric-chip-row">
                ${requiredMetrics.map(metric => `
                  <span class="metric-chip">
                    ${formatLabel(metric)}
                  </span>
                `).join("")}
              </div>
            `
            : `<p>No metric requirements identified.</p>`
        }

      </div>

    </article>
  `;
}