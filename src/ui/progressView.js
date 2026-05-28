export function renderProgress() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Progress tracking</p>
        <h1>Performance trends</h1>
      </div>

      <div class="grid two-col">
        <article class="metric-card">
          <span>Best Pull-Up</span>
          <strong>+25kg × 2</strong>
          <small>Strength marker</small>
        </article>

        <article class="metric-card">
          <span>Best Push-Up Ladder</span>
          <strong>Rung 8</strong>
          <small>64 total reps</small>
        </article>

        <article class="metric-card">
          <span>Best Dip</span>
          <strong>+20kg × 5</strong>
          <small>Top set</small>
        </article>

        <article class="metric-card">
          <span>Conditioning</span>
          <strong>20 rounds</strong>
          <small>KB swing intervals</small>
        </article>
      </div>

      <article class="insight-card">
        <h2>Next upgrade</h2>
        <p>
          Add logging depth so each metric is calculated from real saved sessions.
        </p>
      </article>
    </section>
  `;
}
