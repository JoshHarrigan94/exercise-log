export const sessionTemplates = [
  {
    id: "pull-strength",
    name: "Pull Strength",
    goal: "Build strict weighted pull-up strength and repeatable ladder volume.",
    estimatedMinutes: 55,
    priority: "Weighted Pull-Up",
    fatigueTarget: "Moderate-high",
    exercises: [
      {
        exerciseId: "weighted-pull-up",
        methodId: "top-set-ladder",
        target: "+25kg × 3 or ladder to rung 5"
      },
      {
        exerciseId: "reverse-hyper",
        methodId: "standard-sets",
        target: "3–4 controlled sets"
      }
    ]
  },
  {
    id: "dip-strength",
    name: "Dip Strength",
    goal: "Build weighted dip strength with deep controlled volume.",
    estimatedMinutes: 50,
    priority: "Weighted Dip",
    fatigueTarget: "Moderate-high",
    exercises: [
      {
        exerciseId: "weighted-dip",
        methodId: "top-set-ladder",
        target: "+20kg × 5+ or clean ladder volume"
      },
      {
        exerciseId: "push-up",
        methodId: "ladder",
        target: "Submaximal technical volume"
      }
    ]
  },
  {
    id: "push-volume",
    name: "Push Volume",
    goal: "Build push-up capacity without trashing joints.",
    estimatedMinutes: 35,
    priority: "Push-Up",
    fatigueTarget: "Moderate",
    exercises: [
      {
        exerciseId: "push-up",
        methodId: "ladder",
        target: "Rung 8 repeat or cleaner tempo"
      }
    ]
  },
  {
    id: "lower-rehab",
    name: "Lower / Rehab",
    goal: "Maintain leg strength while rebuilding lower-leg tissue capacity.",
    estimatedMinutes: 60,
    priority: "Hack Squat",
    fatigueTarget: "Moderate",
    exercises: [
      {
        exerciseId: "hack-squat",
        methodId: "top-set-backoff",
        target: "Heavy controlled set, then back-off volume"
      },
      {
        exerciseId: "reverse-hyper",
        methodId: "standard-sets",
        target: "4 × 8 controlled"
      },
      {
        exerciseId: "calf-isometric",
        methodId: "isometric",
        target: "30–60 second holds, pain ≤ 3/10"
      }
    ]
  },
  {
    id: "conditioning",
    name: "Conditioning",
    goal: "Low-noise conditioning that supports fat loss and work capacity.",
    estimatedMinutes: 25,
    priority: "Kettlebell Swing",
    fatigueTarget: "Moderate",
    exercises: [
      {
        exerciseId: "kb-swing",
        methodId: "intervals",
        target: "1 hard rep every 30 seconds × 20 rounds"
      }
    ]
  }
];
