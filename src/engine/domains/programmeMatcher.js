const PROGRAMME_ARCHETYPES = [
  {
    id: "five-three-one",
    name: "5/3/1 style",
    family: "strength",
    domains: {
      strength: 55,
      hypertrophy: 20,
      power: 10,
      conditioning: 5,
      mobility: 0,
      calisthenics: 0,
      plyometrics: 0,
      endurance: 5,
      rehab: 5
    },
    signals: ["5/3/1", "531", "main lift", "assistance", "top set", "amrap"]
  },
  {
    id: "madcow",
    name: "Madcow style",
    family: "strength",
    domains: {
      strength: 65,
      hypertrophy: 20,
      power: 5,
      conditioning: 0,
      mobility: 0,
      calisthenics: 0,
      plyometrics: 0,
      endurance: 0,
      rehab: 10
    },
    signals: ["madcow", "5x5", "ramping sets", "linear progression"]
  },
  {
    id: "sbd-powerlifting",
    name: "SBD / powerlifting style",
    family: "strength",
    domains: {
      strength: 70,
      hypertrophy: 15,
      power: 5,
      conditioning: 0,
      mobility: 0,
      calisthenics: 0,
      plyometrics: 0,
      endurance: 0,
      rehab: 10
    },
    signals: ["squat", "bench", "deadlift", "sbd", "powerlifting", "competition"]
  },
  {
    id: "triphasic",
    name: "Triphasic style",
    family: "power",
    domains: {
      strength: 30,
      hypertrophy: 10,
      power: 35,
      plyometrics: 15,
      conditioning: 0,
      calisthenics: 0,
      mobility: 0,
      endurance: 0,
      rehab: 10
    },
    signals: ["triphasic", "eccentric", "isometric", "concentric", "explosive"]
  },
  {
    id: "bodybuilding",
    name: "Bodybuilding / hypertrophy style",
    family: "hypertrophy",
    domains: {
      strength: 10,
      hypertrophy: 70,
      power: 0,
      conditioning: 0,
      mobility: 0,
      calisthenics: 0,
      plyometrics: 0,
      endurance: 5,
      rehab: 15
    },
    signals: ["hypertrophy", "bodybuilding", "pump", "volume", "ppl", "upper lower"]
  },
  {
    id: "thenx-calisthenics",
    name: "THENX / calisthenics style",
    family: "calisthenics",
    domains: {
      strength: 15,
      hypertrophy: 15,
      power: 5,
      conditioning: 10,
      mobility: 5,
      calisthenics: 45,
      plyometrics: 0,
      endurance: 5,
      rehab: 0
    },
    signals: ["thenx", "calisthenics", "pull-up", "dip", "push-up", "muscle-up", "lever", "planche"]
  },
  {
    id: "crossfit",
    name: "CrossFit / mixed modal style",
    family: "conditioning",
    domains: {
      strength: 15,
      hypertrophy: 5,
      power: 10,
      conditioning: 40,
      mobility: 5,
      calisthenics: 10,
      plyometrics: 5,
      endurance: 10,
      rehab: 0
    },
    signals: ["crossfit", "wod", "metcon", "amrap", "emom", "rx", "mixed modal"]
  },
  {
    id: "tactical",
    name: "Tactical / hybrid style",
    family: "hybrid",
    domains: {
      strength: 20,
      hypertrophy: 10,
      power: 10,
      conditioning: 25,
      mobility: 5,
      calisthenics: 10,
      plyometrics: 5,
      endurance: 15,
      rehab: 0
    },
    signals: ["tactical", "hybrid", "ruck", "work capacity", "military", "selection"]
  },
  {
    id: "plyometric-speed",
    name: "Plyometric / speed development style",
    family: "power",
    domains: {
      strength: 10,
      hypertrophy: 0,
      power: 25,
      conditioning: 5,
      mobility: 5,
      calisthenics: 0,
      plyometrics: 45,
      endurance: 0,
      rehab: 10
    },
    signals: ["plyometric", "plyo", "sprint", "bounds", "pogos", "rsi", "jump"]
  },
  {
    id: "rehab-return-to-run",
    name: "Rehab / return-to-run style",
    family: "rehab",
    domains: {
      strength: 10,
      hypertrophy: 5,
      power: 5,
      conditioning: 5,
      mobility: 10,
      calisthenics: 0,
      plyometrics: 10,
      endurance: 10,
      rehab: 45
    },
    signals: ["rehab", "return to run", "achilles", "calf", "tendon", "isometric", "eccentric"]
  }
];

function distanceBetweenDomains(actual = {}, target = {}) {
  const keys = new Set([
    ...Object.keys(actual),
    ...Object.keys(target)
  ]);

  let totalDistance = 0;

  keys.forEach(key => {
    totalDistance += Math.abs((actual[key] || 0) - (target[key] || 0));
  });

  return totalDistance;
}

function getSignalBonus(block = {}, archetype = {}) {
  const text = [
    block.name,
    block.goal,
    block.priority
  ].join(" ").toLowerCase();

  return archetype.signals.reduce((score, signal) => {
    return text.includes(signal.toLowerCase())
      ? score + 8
      : score;
  }, 0);
}

function scoreProgrammeMatch(block, domainClassification, archetype) {
  const distance = distanceBetweenDomains(
    domainClassification.percentages,
    archetype.domains
  );

  const distanceScore = Math.max(0, 100 - distance);
  const signalBonus = getSignalBonus(block, archetype);

  return Math.min(100, Math.round(distanceScore + signalBonus));
}

export function matchProgrammeArchetypes(block = {}, domainClassification = {}) {
  return PROGRAMME_ARCHETYPES
    .map(archetype => ({
      ...archetype,
      score: scoreProgrammeMatch(block, domainClassification, archetype)
    }))
    .sort((a, b) => b.score - a.score);
}

export function getBestProgrammeMatch(block = {}, domainClassification = {}) {
  return matchProgrammeArchetypes(block, domainClassification)[0] || null;
}

export function getProgrammeArchetypes() {
  return PROGRAMME_ARCHETYPES;
}