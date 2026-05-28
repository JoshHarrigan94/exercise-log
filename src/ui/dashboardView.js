export function renderDashboard() {


  return `
    <section class="screen active-screen">
      <div class="hero-card">
        <p class="eyebrow">Next planned session</p>
        <h1>Pull Strength</h1>
        <p class="hero-text">
          Heavy top set, strict pull-up ladder, then controlled rows.
        </p>

        <div class="target-box">
          <span>Main Target</span>
          <strong>+25kg × 3 or ladder to rung 5</strong>
        </div>
      </div>

      <div class="grid two-col">
        <article class="metric-card">
          <span>Last Pull-Up</span>
          <strong>+25kg × 2</strong>
          <small>Top set @ RPE 9</small>
        </article>

        <article class="metric-card">
          <span>Weekly Volume</span>
          <strong>146 reps</strong>
          <small>Push / pull / legs</small>
        </article>
      </div>

      <article class="insight-card">
        <h2>Progression note</h2>
        <p>
          Your top set is strong, but the next unlock is repeatable volume.
          Hold intensity and push clean ladder completion.
        </p>
      </article>
    </section>
  `;
}
