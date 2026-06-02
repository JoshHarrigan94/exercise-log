

import {
  getMovementAtlas,
  getAllExercises,
  getResolvedBaseMovement,
  getVariantsForBaseMovement,
  getCompatibleMethodsForBaseMovement,
getCompatibleMethodsForVariant
} from "../logic/exerciseLibrary.js";

let selectedBaseMovementId = null;
const libraryFilters = {
  search: "",
  family: "",
  expression: "",
  output: ""
};

export function setLibrarySearch(value) {
  libraryFilters.search = value || "";
}

export function setLibraryFamilyFilter(value) {
  libraryFilters.family = value || "";
}

export function setLibraryExpressionFilter(value) {
  libraryFilters.expression = value || "";
}

export function setLibraryOutputFilter(value) {
  libraryFilters.output = value || "";
}

export function clearLibraryFilters() {
  libraryFilters.search = "";
  libraryFilters.family = "";
  libraryFilters.expression = "";
  libraryFilters.output = "";
}

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

  const outputs = [
    ...(variant.base?.measurableOutputs || []),
    ...(variant.modifiers || []).flatMap(modifier =>
      modifier.effects?.outputAdjustments || []
    )
  ];

  const compatibility = getCompatibleMethodsForVariant(variant.id);
  const bestMethods = compatibility.recommended.slice(0, 3);

  return `
    <article class="workspace-card">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Generated variant</p>
          <h2>${variant.name}</h2>
        </div>

        <strong>${variant.family?.name || "Movement"}</strong>
      </div>

      <p class="card-copy">
        ${variant.base?.name || "Base movement"} variation built from:
        ${modifierNames.length ? modifierNames.join(", ") : "standard execution"}.
      </p>

      <div class="coaching-summary-grid">
        <div class="coaching-summary-item">
          <span>Base</span>
          <strong>${variant.base?.name || "Unknown"}</strong>
        </div>

        <div class="coaching-summary-item">
          <span>Modifiers</span>
          <strong>${modifierNames.join(", ") || "None"}</strong>
        </div>

        <div class="coaching-summary-item">
          <span>Expression Bias</span>
          <strong>${expressionNames.slice(0, 2).join(", ") || "General"}</strong>
        </div>

        <div class="coaching-summary-item">
          <span>Best Methods</span>
          <strong>
            ${
              bestMethods.length
                ? bestMethods.map(item => item.method.name).join(", ")
                : "Standard Sets"
            }
          </strong>
        </div>
      </div>

      <div class="section-header">
        <p class="eyebrow">Tracked outputs</p>
      </div>

      <div class="quick-chip-row">
        ${
          Array.from(new Set(outputs)).length
            ? Array.from(new Set(outputs)).slice(0, 6).map(renderTag).join("")
            : renderTag("reps")
        }
      </div>
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

function getUniqueValues(values) {
  return Array.from(new Set(values.filter(Boolean))).sort();
}

function baseMatchesFilters(base) {
  const search = libraryFilters.search.toLowerCase().trim();

  const searchableText = [
    base.name,
    base.familyName,
    base.domain,
    ...(base.primaryExpressionNames || []),
    ...(base.secondaryExpressionNames || []),
    ...(base.measurableOutputs || [])
  ].join(" ").toLowerCase();

  const expressionIds = [
    ...(base.primaryExpressions || []),
    ...(base.secondaryExpressions || [])
  ];

  const matchesSearch =
    !search || searchableText.includes(search);

  const matchesFamily =
    !libraryFilters.family || base.family === libraryFilters.family;

  const matchesExpression =
    !libraryFilters.expression || expressionIds.includes(libraryFilters.expression);

  const matchesOutput =
    !libraryFilters.output || (base.measurableOutputs || []).includes(libraryFilters.output);

  return matchesSearch && matchesFamily && matchesExpression && matchesOutput;
}

function renderLibraryFilters(atlas, baseMovements) {
  const familyOptions = atlas.map(family => ({
    id: family.id,
    name: family.name
  }));

  const expressionOptions = getUniqueValues(
    baseMovements.flatMap(base => [
      ...(base.primaryExpressionNames || []),
      ...(base.secondaryExpressionNames || [])
    ])
  );

  const outputOptions = getUniqueValues(
    baseMovements.flatMap(base => base.measurableOutputs || [])
  );

  return `
    <article class="workspace-card">
      <div class="workspace-card-header">
        <div>
          <p class="eyebrow">Atlas controls</p>
          <h2>Search and filter</h2>
        </div>

        <button 
          class="secondary-button" 
          type="button"
          data-clear-library-filters
        >
          Clear
        </button>
      </div>

      <div class="form-grid">
        <label class="form-field">
          <span>Search</span>
          <input 
            id="library-search"
            type="search"
            value="${libraryFilters.search}"
            placeholder="Pull up, hinge, power, reps..."
          />
        </label>

        <label class="form-field">
          <span>Family</span>
          <select id="library-family-filter">
            <option value="">All families</option>
            ${familyOptions.map(family => `
              <option 
                value="${family.id}"
                ${libraryFilters.family === family.id ? "selected" : ""}
              >
                ${family.name}
              </option>
            `).join("")}
          </select>
        </label>

        <label class="form-field">
          <span>Expression</span>
          <select id="library-expression-filter">
            <option value="">All expressions</option>
            ${expressionOptions.map(expression => `
              <option 
                value="${expression}"
                ${libraryFilters.expression === expression ? "selected" : ""}
              >
                ${expression}
              </option>
            `).join("")}
          </select>
        </label>

        <label class="form-field">
          <span>Output</span>
          <select id="library-output-filter">
            <option value="">All outputs</option>
            ${outputOptions.map(output => `
              <option 
                value="${output}"
                ${libraryFilters.output === output ? "selected" : ""}
              >
                ${output}
              </option>
            `).join("")}
          </select>
        </label>
      </div>
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
const filteredBaseMovements = baseMovements.filter(baseMatchesFilters);

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

      ${renderLibraryFilters(atlas, baseMovements)}
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
        ${
  filteredBaseMovements.length
    ? filteredBaseMovements.map(renderBaseMovementCard).join("")
    : `
      <article class="workspace-card">
        <p class="card-copy">
          No base movements match these filters yet.
        </p>
      </article>
    `
}
      </div>
    </section>
  `;
}