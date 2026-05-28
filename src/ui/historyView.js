export function renderHistory() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">History</p>
        <h1>Recent sessions</h1>
      </div>

      <div class="timeline">
        <article class="history-card">
          <span>Pull Strength</span>
          <strong>Weighted pull-up + ladder</strong>
          <small>Top set: +25kg × 2 @ RPE 9</small>
        </article>

        <article class="history-card">
          <span>Dip Strength</span>
          <strong>Weighted dips</strong>
          <small>Top set: +20kg × 5</small>
        </article>

        <article class="history-card">
          <span>Push Volume</span>
          <strong>Push-up ladder</strong>
          <small>Rung 8 / 64 reps</small>
        </article>
      </div>
    </section>
  `;
}
