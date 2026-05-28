export const exercises = [
  {
    id: "weighted-pull-up",
    name: "Weighted Pull-Up",
    category: "Pull",
    pattern: "Vertical Pull",
    equipment: ["Pull-up bar", "Dip belt"],
    loadType: "bodyweight-plus-load",
    defaultMethod: "top-set-ladder",
    cues: [
      "Full scapular depression",
      "Strict full ROM",
      "Technical failure before mechanical failure",
      "No loose kipping"
    ]
  },
  {
    id: "weighted-dip",
    name: "Weighted Dip",
    category: "Push",
    pattern: "Vertical Push",
    equipment: ["Dip bars", "Dip belt"],
    loadType: "bodyweight-plus-load",
    defaultMethod: "top-set-ladder",
    cues: [
      "Deep controlled lower",
      "Pause in bottom position",
      "Explosive press",
      "Avoid shoulder irritation"
    ]
  },
  {
    id: "push-up",
    name: "Push-Up",
    category: "Push",
    pattern: "Horizontal Push",
    equipment: ["Bodyweight"],
    loadType: "bodyweight",
    defaultMethod: "ladder",
    cues: [
      "Chest to floor",
      "Controlled tempo",
      "Clean lockout",
      "Stop before form collapse"
    ]
  },
  {
    id: "hack-squat",
    name: "Hack Squat",
    category: "Legs",
    pattern: "Squat",
    equipment: ["Hack squat machine"],
    loadType: "external-load",
    defaultMethod: "top-set-backoff",
    cues: [
      "Controlled depth",
      "Stable foot pressure",
      "Drive through whole foot",
      "Avoid lumbar compensation"
    ]
  },
  {
    id: "reverse-hyper",
    name: "Reverse Hyper",
    category: "Posterior Chain",
    pattern: "Hip Extension",
    equipment: ["Reverse hyper"],
    loadType: "external-load",
    defaultMethod: "standard-sets",
    cues: [
      "Controlled swing",
      "No aggressive lumbar extension",
      "Glutes and hamstrings lead",
      "Smooth reps"
    ]
  },
  {
    id: "calf-isometric",
    name: "Calf Isometric",
    category: "Rehab",
    pattern: "Ankle Extension",
    equipment: ["Bodyweight", "Bands", "Step"],
    loadType: "timed-hold",
    defaultMethod: "isometric",
    cues: [
      "Strong mid-foot pressure",
      "Big toe grounded",
      "Hold without bouncing",
      "Pain no higher than 3/10"
    ]
  },
  {
    id: "kb-swing",
    name: "Kettlebell Swing",
    category: "Conditioning",
    pattern: "Hinge",
    equipment: ["Kettlebell"],
    loadType: "external-load",
    defaultMethod: "intervals",
    cues: [
      "Snap hips",
      "Relaxed arms",
      "Brace hard",
      "Crisp single reps"
    ]
  }
];
