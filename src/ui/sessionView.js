export function renderSession() {
  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Session builder</p>
        <h1>Choose your session</h1>
      </div>

      <div class="stack">
        <button class="session-card">
          <span>Pull Strength</span>
          <strong>Top Set + Ladder</strong>
          <small>Weighted pull-up, ladder work, rows</small>
        </button>

        <button class="session-card">
          <span>Dip Strength</span>
          <strong>Top Set + Ladder</strong>
          <small>Weighted dips, deep pauses, push volume</small>
        </button>

        <button class="session-card">
          <span>Lower / Rehab</span>
          <strong>Strength + Tissue Capacity</strong>
          <small>Hack squat, reverse hyper, calf isometrics</small>
        </button>

        <button class="session-card">
          <span>Conditioning</span>
          <strong>Intervals</strong>
          <small>KB swings, step-ups, low-noise conditioning</small>
        </button>
      </div>
    </section>
  `;
}
