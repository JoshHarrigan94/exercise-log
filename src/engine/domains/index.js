import {
  classifyExerciseDomain,
  classifyWorkoutDomain,
  classifyBlockDomain,
  classifyBlocks
} from "./domainClassifier.js";

import {
  matchProgrammeArchetypes,
  getBestProgrammeMatch,
  getProgrammeArchetypes
} from "./programmeMatcher.js";

export function analyseBlockDomain(block = {}) {
  const classification = classifyBlockDomain(block);
  const programmeMatches = matchProgrammeArchetypes(block, classification);
  const bestProgrammeMatch = programmeMatches[0] || null;

  return {
    blockId: block.id,
    blockName: block.name,
    classification,
    programmeMatches,
    bestProgrammeMatch
  };
}

export function analyseBlocksDomain(blocks = []) {
  return blocks.map(analyseBlockDomain);
}

export {
  classifyExerciseDomain,
  classifyWorkoutDomain,
  classifyBlockDomain,
  classifyBlocks,
  matchProgrammeArchetypes,
  getBestProgrammeMatch,
  getProgrammeArchetypes
};