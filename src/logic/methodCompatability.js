import { methodTypes } from "../data/methodTypes.js";

const UNIVERSAL_METHODS = [
  "standard-sets"
];

const FAMILY_METHOD_RULES = {
  "vertical-pull": [
    "top-set",
    "top-set-backoff",
    "ladder",
    "top-set-ladder",
    "rest-pause",
    "cluster",
    "isometric"
  ],

  "horizontal-push": [
    "top-set",
    "top-set-backoff",
    "ladder",
    "top-set-ladder",
    "rest-pause",
    "cluster",
    "isometric"
  ],

  "vertical-push": [
    "top-set",
    "top-set-backoff",
    "ladder",
    "top-set-ladder",
    "rest-pause",
    "cluster",
    "isometric"
  ],

  squat: [
    "top-set",
    "top-set-backoff",
    "cluster",
    "rest-pause",
    "isometric"
  ],

  lunge: [
    "standard-sets",
    "rest-pause",
    "isometric"
  ],

  hinge: [
    "top-set",
    "top-set-backoff",
    "cluster",
    "intervals"
  ],

  jump: [
    "plyometric",
    "intervals",
    "cluster"
  ],

  carry: [
    "intervals",
    "isometric"
  ],

  core: [
    "standard-sets",
    "isometric",
    "intervals"
  ],

  mobility: [
    "isometric",
    "intervals"
  ],

  rehab: [
    "isometric",
    "standard-sets",
    "intervals"
  ]
};

const EXPRESSION_METHOD_RULES = {
  "max-strength": [
    "top-set",
    "top-set-backoff",
    "cluster"
  ],

  "relative-strength": [
    "top-set",
    "top-set-backoff",
    "ladder",
    "top-set-ladder",
    "cluster",
    "isometric"
  ],

  hypertrophy: [
    "standard-sets",
    "top-set-backoff",
    "rest-pause"
  ],

  "strength-endurance": [
    "ladder",
    "top-set-ladder",
    "rest-pause",
    "intervals"
  ],

  power: [
    "plyometric",
    "cluster",
    "intervals"
  ],

  "motor-control": [
    "standard-sets",
    "isometric"
  ],

  "tissue-tolerance": [
    "isometric",
    "standard-sets",
    "intervals"
  ]
};

const MODIFIER_METHOD_RULES = {
  weighted: [
    "top-set",
    "top-set-backoff",
    "cluster"
  ],

  tempo: [
    "standard-sets",
    "top-set-backoff",
    "rest-pause"
  ],

  pause: [
    "standard-sets",
    "top-set-backoff",
    "isometric"
  ],

  isometric: [
    "isometric"
  ],

  eccentric: [
    "standard-sets",
    "cluster"
  ],

  "band-assisted": [
    "standard-sets",
    "ladder",
    "rest-pause"
  ]
};

function unique(values) {
  return Array.from(new Set(values.filter(Boolean)));
}

function getMethodById(methodId) {
  return methodTypes.find(method => method.id === methodId);
}

function scoreMethod(methodId, base, variant = null) {
  let score = 0;
  const reasons = [];

  if (UNIVERSAL_METHODS.includes(methodId)) {
    score += 1;
    reasons.push("Universal logging method.");
  }

  const familyRules = FAMILY_METHOD_RULES[base.family] || [];

  if (familyRules.includes(methodId)) {
    score += 3;
    reasons.push(`Fits the ${base.family} movement family.`);
  }

  const expressions = unique([
    ...(base.primaryExpressions || []),
    ...(base.secondaryExpressions || [])
  ]);

  expressions.forEach(expression => {
    const expressionRules = EXPRESSION_METHOD_RULES[expression] || [];

    if (expressionRules.includes(methodId)) {
      score += 2;
      reasons.push(`Supports ${expression} expression.`);
    }
  });

  const modifiers = variant?.modifiers || [];

  modifiers.forEach(modifier => {
    const modifierRules = MODIFIER_METHOD_RULES[modifier] || [];

    if (modifierRules.includes(methodId)) {
      score += 2;
      reasons.push(`Works well with ${modifier} variants.`);
    }
  });

  return {
    method: getMethodById(methodId),
    score,
    reasons
  };
}

export function getMethodCompatibility(base, variant = null) {
  if (!base) {
    return {
      recommended: [],
      possible: methodTypes,
      limited: []
    };
  }

  const scored = methodTypes
    .map(method => scoreMethod(method.id, base, variant))
    .filter(item => item.method);

  return {
    recommended: scored
      .filter(item => item.score >= 5)
      .sort((a, b) => b.score - a.score),

    possible: scored
      .filter(item => item.score >= 2 && item.score < 5)
      .sort((a, b) => b.score - a.score),

    limited: scored
      .filter(item => item.score < 2)
      .sort((a, b) => b.score - a.score)
  };
}