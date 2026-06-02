

import {
  getMovementAtlas,
  getAllExercises,
  getResolvedBaseMovement,
  getVariantsForBaseMovement,
  getCompatibleMethodsForBaseMovement
} from "../logic/exerciseLibrary.js";

let selectedBaseMovementId = null;

export function selectLibraryBaseMovement(baseMovementId) {
  selectedBaseMovementId = baseMovementId;
}

export function clearLibraryBaseMovement() {
  selectedBaseMovementId = null;
}

function renderTag(label) {
  if (!label) return "";

  return `
    <span class="quick-chip">${label}</span>
  `;
}

function renderMethodTag(method) {
  return `
    <span class="quick-chip">${method.name}</span>
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
    <button 
      class="exercise-card"
      type="button"
      data-open-base-movement="${base.id}"
    >
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

      <span>Open</span>
    </button>
  `;
}

function renderVariantCard(variant) {
  const modifierNames = (variant.modifiers || [])
    .map(modifier => modifier.name)
    .filter(Boolean);

  const expressionNames = (variant.expressions || [])
    .map(expression => expression.name)
    .filter(Boolean);

  return `
    <article class="exercise-card">
      <div>
        <h2>${variant.name}</h2>
        <p>
          ${variant.family?.name || "Movement"} · ${variant.base?.name || "Base movement"}
        </p>

        <div class="quick-chip-row">
          ${modifierNames.slice(0, 3).map(renderTag).join("")}
          ${expressionNames.slice(0, 2).map(renderTag).join("")}
        </div>
      </div>

      <span>Variant</span>
    </article>
  `;
}

function renderMethodCompatibilityCard(baseMovementId) {
  const compatibility = getCompatibleMethodsForBaseMovement(baseMovementId);

  return `
    <article class="workspace-card">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Method compatibility</p>
          <h2>Best ways to train this movement</h2>
        </div>
      </div>

      <p class="card-copy">
        Methods are now matched against the movement family, expression profile,
        measurable outputs and variant logic.
      </p>

      <div class="section-header">
        <p class="eyebrow">Recommended</p>
      </div>

      <div class="quick-chip-row">
        ${
          compatibility.recommended.length
            ? compatibility.recommended.map(item => renderMethodTag(item.method)).join("")
            : renderTag("No strong matches yet")
        }
      </div>

      <div class="section-header">
        <p class="eyebrow">Possible</p>
      </div>

      <div class="quick-chip-row">
        ${
          compatibility.possible.length
            ? compatibility.possible.map(item => renderMethodTag(item.method)).join("")
            : renderTag("None")
        }
      </div>

      <div class="section-header">
        <p class="eyebrow">Limited fit</p>
      </div>

      <div class="quick-chip-row">
        ${
          compatibility.limited.length
            ? compatibility.limited.slice(0, 4).map(item => renderMethodTag(item.method)).join("")
            : renderTag("None")
        }
      </div>
    </article>
  `;
}

function renderMovementDetail(baseMovementId) {
  const base = getResolvedBaseMovement(baseMovementId);
  const variants = getVariantsForBaseMovement(baseMovementId);

  if (!base) {
    return `
      <article class="workspace-card">
        <p class="card-copy">Movement could not be found.</p>
        <button 
          class="secondary-button"
          type="button"
          data-close-base-movement
        >
          Back to atlas
        </button>
      </article>
    `;
  }

  return `
    <section class="screen active-screen">
      <button 
        class="secondary-button"
        type="button"
        data-close-base-movement
      >
        ← Back to Movement Atlas
      </button>

      <article class="hero-card">
        <p class="eyebrow">Base movement</p>
        <h1>${base.name}</h1>
        <p class="hero-text">
          ${base.familyName} · ${base.domain}
        </p>

        <div class="quick-chip-row">
          ${base.primaryExpressionNames.map(renderTag).join("")}
          ${base.secondaryExpressionNames.map(renderTag).join("")}
        </div>
      </article>

      <article class="workspace-card">
        <div class="workspace-card-header">
          <div>
            <p class="eyebrow">Movement profile</p>
            <h2>What this movement captures</h2>
          </div>
        </div>

        <div class="coaching-summary-grid">
          <div class="coaching-summary-item">
            <span>Family</span>
            <strong>${base.familyName}</strong>
          </div>

          <div class="coaching-summary-item">
            <span>Domain</span>
            <strong>${base.domain || "General"}</strong>
          </div>

          <div class="coaching-summary-item">
            <span>Generated Variants</span>
            <strong>${variants.length}</strong>
          </div>

          <div class="coaching-summary-item">
            <span>Tracked Outputs</span>
            <strong>${(base.measurableOutputs || []).join(", ") || "Reps"}</strong>
          </div>
        </div>
      </article>

      ${renderMethodCompatibilityCard(base.id)}

      <div class="section-header">
        <p class="eyebrow">Generated variants</p>
        <h2>${base.name} variations</h2>
      </div>

      <div class="stack">
        ${
          variants.length
            ? variants.map(renderVariantCard).join("")
            : `
              <article class="workspace-card">
                <p class="card-copy">
                  No variants exist yet for this base movement.
                </p>
              </article>
            `
        }
      </div>
    </section>
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
  if (selectedBaseMovementId) {
    return renderMovementDetail(selectedBaseMovementId);
  }

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
          This library is a structured atlas of movement families, base movements,
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