// Function to calculate Borda Count results

function calculateBordaCount(choices, userRankings) {
  // Initialize an object to store choice scores
  const choiceScores = {};

  // Initialize choice scores to zero
  choices.forEach((choice) => {
    choiceScores[choice.id] = 0;
  });

  // Iterate through user rankings and update choice scores based on Borda Count method
  userRankings.forEach((ranking, index) => {
    const choiceId = ranking.choice_id;
    const score = choices.length - index;
    choiceScores[choiceId] += score;
  });

  // Convert choice scores object to an array of { choice, score } objects
  const results = Object.keys(choiceScores).map((choiceId) => ({
    choice: choices.find((choice) => choice.id === parseInt(choiceId, 10)),
    score: choiceScores[choiceId],
  }));

  // Sort results in descending order of scores
  results.sort((a, b) => b.score - a.score);

  return results;
}

module.exports = calculateBordaCount;
