export const movementRelationships = {
  "pull-up": {
    regressions: ["band-assisted-pull-up", "eccentric-pull-up"],
    progressions: ["weighted-pull-up", "pause-pull-up", "isometric-pull-up"],
    alternatives: ["chin-up"]
  },

  "chin-up": {
    regressions: ["band-assisted-pull-up"],
    progressions: ["weighted-chin-up", "tempo-chin-up"],
    alternatives: ["pull-up"]
  },

  "push-up": {
    regressions: [],
    progressions: ["weighted-push-up", "tempo-push-up", "pause-push-up"],
    alternatives: ["bench-press", "dip"]
  },

  "dip": {
    regressions: ["tempo-dip"],
    progressions: ["weighted-dip", "pause-dip"],
    alternatives: ["push-up", "bench-press"]
  },

  squat: {
    regressions: ["box-squat", "tempo-squat"],
    progressions: ["pause-squat"],
    alternatives: ["split-squat"]
  },

  "split-squat": {
    regressions: ["tempo-split-squat"],
    progressions: ["rear-foot-elevated-split-squat"],
    alternatives: ["squat", "step-up"]
  },

  deadlift: {
    regressions: ["tempo-deadlift"],
    progressions: ["pause-deadlift"],
    alternatives: ["rdl", "kettlebell-swing"]
  },

  rdl: {
    regressions: ["tempo-rdl"],
    progressions: ["single-leg-rdl"],
    alternatives: ["deadlift"]
  },

  pogo: {
    regressions: ["continuous-pogo"],
    progressions: ["single-leg-pogo", "reactive-pogo"],
    alternatives: ["drop-jump"]
  },

  sprint: {
    regressions: [],
    progressions: ["hill-sprint", "resisted-sprint"],
    alternatives: ["broad-jump"]
  }
};