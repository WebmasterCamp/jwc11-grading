import * as R from 'ramda'

// Compute the mathematical average for the given list
const average = list => R.sum(list) / list.length

// Scoring ratio used for normalizing the score for each majors
export const scoringRatio = {
  core: 0.9090909091,
  design: 0.9090909091,
  content: 0.6666666667,
  marketing: 0.625,
  programming: 0.8333333333,
}

// Maximum scores for each type of questions
export const maxScores = {
  core: [15, 25, 15],
  design: [20, 20, 20],
  content: [15, 35, 25],
  marketing: [30, 30, 20],
  programming: [15, 15, 30],
}

// Average the scores given by every graders
export function averageScore(evaluations) {
  if (evaluations) {
    const scores = Object.values(evaluations).map(entry => R.sum(entry.scores))

    return average(scores)
  }

  return 0
}

// Compute the averaged and normalized scores for admins
export function computeScores(evaluations, major) {
  const ratio = scoringRatio[major]

  if (evaluations) {
    // First, we average the scores for core questions
    let coreScore = averageScore(evaluations.core)

    // Next, we average the scores for major questions
    let majorScore = averageScore(evaluations.major)
    let extraScore = 0

    coreScore = coreScore * scoringRatio['core']

    // Then, we normalize the major score to 60
    majorScore = majorScore * ratio

    // If the major score exceeds 60, compute the extra score.
    if (majorScore > 60) {
      extraScore = majorScore - 60
      majorScore = 60
    }

    // Finally, we sum the scores
    const totalScore = coreScore + majorScore

    return {coreScore, majorScore, extraScore, totalScore}
  }
}
