import { generateCoachingReport } from "../../logic/coachingEngine.js";

function formatLabel(value = "") {
  return value
    .split("-")
    .map(word =>
      word.charAt(0).toUpperCase() +
      word.slice(1)
    )
    .join(" ");
}

export function renderCoachingInsightCard(session) {
  const report =
    generateCoachingReport(session);

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
          report.observations.length
            ? `
              <ul class="coach-list">
                ${report.observations.map(item => `
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
          report.recommendations.length
            ? `
              <ul class="coach-list">
                ${report.recommendations.map(item => `
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
          report.requiredMetrics.length
            ? `
              <div class="metric-chip-row">
                ${report.requiredMetrics.map(metric => `
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
