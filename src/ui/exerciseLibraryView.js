import {
  getMovementAtlas,
  getAllExercises
} from "../logic/exerciseLibrary.js";

function renderTag(label) {
  return `
    <span class="quick-chip">${label}</span>
  `;
}

function renderFamilyCard(family) {
  return `
    <article class="workspace-card">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Movement family</p>
          <h2>${family.name}</h2>
        </div>

        <strong>${family.baseCount} bases</strong>
      </div>

      <p class="card-copy">${family.description}</p>

      <div class="quick-chip-row">
        ${renderTag(`${family.variantCount} generated variants`)}
        ${family.expressionNames.slice(0, 3).map(renderTag).join("")}
      </div>
    </article>
  `;
}

function renderBaseMovementCard(base) {
  return `
    <article class="exercise-card">
      <div>
        <h2>${base.name}</h2>
        <p>
          ${base.familyName} · ${base.domain} · ${base.variantCount} variants
        </p>

        <div class="quick-chip-row">
          ${base.primaryExpressionNames.slice(0, 2).map(renderTag).join("")}
          ${(base.measurableOutputs || []).slice(0, 3).map(renderTag).join("")}
        </div>
      </div>

      <span>Base</span>
    </article>
  `;
}

function renderCustomMovementCard(customExercises) {
  return `
    <article class="ad-hoc-card">
      <div class="section-header">
        <p class="eyebrow">Custom movement</p>
        <h2>Create niche / complex movement</h2>
      </div>

      <p class="card-copy">
        Use this only for movements the atlas cannot already generate:
        complexes, unusual machines, sport drills, rehab drills, or personal variations.
      </p>

      <button class="secondary-button" type="button">
        Custom Movement page coming next
      </button>

      ${
        customExercises.length
          ? `
            <div class="quick-chip-row">
              ${customExercises.map(exercise => renderTag(exercise.name)).join("")}
            </div>
          `
          : ""
      }
    </article>
  `;
}

export function renderLibrary() {
  const atlas = getMovementAtlas();
  const allExercises = getAllExercises();
  const customExercises = allExercises.filter(
    exercise => exercise.source === "custom"
  );

  const baseMovements = atlas.flatMap(family => family.bases);

  return `
    <section class="screen active-screen">
      <div class="section-header">
        <p class="eyebrow">Movement Atlas</p>
        <h1>Explore the movement system</h1>
      </div>

      <article class="hero-card">
        <p class="eyebrow">Library direction</p>
        <h1>Movement first. Variants second. Custom last.</h1>
        <p class="hero-text">
          This library is now a structured atlas of movement families, base movements,
          expressions, outputs and generated variants — not just a place to add exercises.
        </p>
      </article>

      ${renderCustomMovementCard(customExercises)}

      <div class="section-header">
        <p class="eyebrow">Explore</p>
        <h2>Movement families</h2>
      </div>

      <div class="stack">
        ${atlas.map(renderFamilyCard).join("")}
      </div>

      <div class="section-header">
        <p class="eyebrow">Base movements</p>
        <h2>Generated from the atlas</h2>
      </div>

      <div class="stack">
        ${baseMovements.map(renderBaseMovementCard).join("")}
      </div>
    </section>
  `;
}