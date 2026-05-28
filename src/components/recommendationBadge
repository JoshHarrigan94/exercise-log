export function renderRecommendationBadge(recommendation) {
  if (!recommendation) return "";

  return `
    <div class="recommendation-badge recommendation-${recommendation.status}">
      <span>${recommendation.label}</span>
      <strong>${recommendation.action}</strong>
      <p>${recommendation.message}</p>
    </div>
  `;
}
