// AI Recommendation Engine
// Works with the new data.js structure

const AIEngine = {

  // Generate insights based on current data
  generateInsights: function() {
    const avgCAC = companyData.cac;
    const avgROAS = companyData.roas;

    // Find best and worst locations
    const sortedByROAS = getLocationsByROAS();
    const sortedByCAC = getLocationsByCAC();
    const bestLocation = sortedByROAS[0];
    const worstLocation = sortedByROAS[sortedByROAS.length - 1];

    // Find best service
    const sortedServices = getServicesByROAS();
    const topService = sortedServices[0];

    const insights = [];

    // Location opportunity
    insights.push({
      type: 'opportunity',
      priority: 'high',
      title: `${bestLocation.name} delivers best ROAS`,
      description: `${formatROAS(bestLocation.roas)} return per dollar - that's ${((bestLocation.roas / avgROAS - 1) * 100).toFixed(0)}% above average. Consider increasing budget here.`,
      impact: 'Could add 1-2 customers/month',
      action: 'Increase Budget'
    });

    // Location warning
    insights.push({
      type: 'warning',
      priority: 'medium',
      title: `${worstLocation.name} needs review`,
      description: `CAC of ${formatCAC(worstLocation.cac)} is ${((worstLocation.cac / avgCAC - 1) * 100).toFixed(0)}% above average. Review targeting and ad quality.`,
      impact: 'Could save $300-500/month',
      action: 'Review Campaign'
    });

    // Service insight
    insights.push({
      type: 'opportunity',
      priority: 'high',
      title: `${topService.shortName} drives highest returns`,
      description: `${formatROAS(topService.roas)} ROAS - generating ${formatCurrency(topService.revenue)}/month in revenue.`,
      impact: 'Strong growth potential',
      action: 'Scale What Works'
    });

    // Channel insight
    const seo = channels[0];
    const paid = channels[1];
    if (seo.cac < paid.cac) {
      insights.push({
        type: 'info',
        priority: 'medium',
        title: 'SEO delivers lower acquisition cost',
        description: `SEO CAC is ${formatCAC(seo.cac)} vs Paid Ads at ${formatCAC(paid.cac)}. SEO takes longer but is more cost-effective.`,
        impact: 'Long-term savings',
        action: 'Balance Mix'
      });
    }

    return insights;
  },

  // Generate budget recommendations
  generateRecommendations: function(scenario = 'expected') {
    const avgCAC = companyData.cac;
    const sortedByROAS = getLocationsByROAS();
    const sortedByCAC = getLocationsByCAC();

    const bestLoc = sortedByROAS[0];
    const worstLoc = sortedByROAS[sortedByROAS.length - 1];
    const topService = getServicesByROAS()[0];

    const multipliers = {
      conservative: 0.9,
      expected: 1.0,
      aggressive: 1.15
    };

    const multiplier = multipliers[scenario] || 1.0;
    const recommendations = [];

    // Location reallocation
    recommendations.push({
      type: 'reallocation',
      from: worstLoc.name,
      to: bestLoc.name,
      amount: Math.round(500 * multiplier),
      reason: `Shift budget from high-cost ${worstLoc.name} to efficient ${bestLoc.name}`,
      projectedImpact: {
        cac: -8,
        revenue: 5000 * multiplier,
        roas: 0.5
      }
    });

    // Service scale-up
    recommendations.push({
      type: 'increase',
      target: topService.name,
      amount: Math.round(topService.spend * 0.2 * multiplier),
      reason: `${topService.shortName} shows highest ROAS - scale what works`,
      projectedImpact: {
        cac: -3,
        revenue: 15000 * multiplier,
        roas: 0.3
      }
    });

    // Channel mix
    recommendations.push({
      type: 'balance',
      description: 'Optimize channel mix for 2026',
      suggestion: scenario === 'aggressive'
        ? 'Increase SEO to 45% of budget for long-term gains'
        : 'Maintain 40/60 SEO/Paid split, monitor performance',
      projectedImpact: {
        cac: -5,
        revenue: 8000 * multiplier,
        roas: 0.4
      }
    });

    return recommendations;
  },

  // Calculate predictions based on budget allocation
  calculatePredictions: function(allocation, scenario = 'expected') {
    const scenarioFactors = {
      conservative: { revenue: 0.95, cac: 1.05, confidence: 85 },
      expected: { revenue: 1.10, cac: 0.95, confidence: 75 },
      aggressive: { revenue: 1.25, cac: 0.90, confidence: 60 }
    };

    const factors = scenarioFactors[scenario] || scenarioFactors.expected;
    const totalAllocation = Object.values(allocation).reduce((sum, val) => sum + val, 0);
    const baseMonthly = companyData.monthly;

    return {
      projectedRevenue: Math.round(baseMonthly.revenue * 12 * factors.revenue),
      projectedCAC: Math.round(companyData.cac * factors.cac),
      projectedROAS: (companyData.roas * factors.revenue * 0.95).toFixed(2),
      confidence: factors.confidence,
      scenario: scenario
    };
  },

  // Get top recommendation for dashboard
  getTopRecommendation: function() {
    const insights = this.generateInsights();
    return insights.find(i => i.priority === 'high') || insights[0];
  },

  // Chat responses
  getChatResponse: function(question) {
    const q = question.toLowerCase();

    if (q.includes('best') && q.includes('location')) {
      const best = getLocationsByROAS()[0];
      return `Based on current data, **${best.name}** delivers the best ROAS at ${formatROAS(best.roas)} - that's ${formatCurrency(best.roas)} back for every $1 spent. I recommend increasing investment here.`;
    }

    if (q.includes('service') || q.includes('product')) {
      const top = getServicesByROAS()[0];
      return `**${top.name}** is your top performer with ${formatROAS(top.roas)} ROAS. It generates ${formatCurrency(top.revenue)}/month in revenue. Strong candidate for budget increase.`;
    }

    if (q.includes('channel') || q.includes('seo') || q.includes('paid')) {
      const seo = channels[0];
      const paid = channels[1];
      return `**SEO** delivers ROAS of ${formatROAS(seo.roas)} vs **Paid Ads** at ${formatROAS(paid.roas)}. SEO has lower CAC (${formatCAC(seo.cac)} vs ${formatCAC(paid.cac)}) but takes 60-90 days. Recommend a balanced approach.`;
    }

    if (q.includes('budget') || q.includes('allocate') || q.includes('spend')) {
      const best = getLocationsByROAS()[0];
      const worst = getLocationsByROAS().slice(-1)[0];
      const topSvc = getServicesByROAS()[0];
      return `For 2026, I recommend:\n\n1. **Increase** ${best.name} budget by 20% (best ROAS)\n2. **Review** ${worst.name} spend (lowest ROAS)\n3. **Scale** ${topSvc.shortName} marketing by 15%\n4. **Balance** SEO/Paid at 40/60 split\n\nProjected impact: +12% revenue, -10% CAC`;
    }

    return `I can help you with:\n\n- **Location analysis**: "Which location should I invest more in?"\n- **Service performance**: "What's my best performing service?"\n- **Channel comparison**: "How does SEO compare to Paid Ads?"\n- **Budget planning**: "How should I allocate my 2026 budget?"\n\nWhat would you like to know?`;
  }
};

// Helper functions for other pages to use
function getLocationInsightsLegacy() {
  const sortedByROAS = getLocationsByROAS();
  const sortedByCAC = getLocationsByCAC();
  return {
    bestROAS: sortedByROAS[0],
    worstROAS: sortedByROAS[sortedByROAS.length - 1],
    bestCAC: sortedByCAC[0],
    worstCAC: sortedByCAC[sortedByCAC.length - 1],
    locationsWithMetrics: locations
  };
}

function getServiceInsightsLegacy() {
  return services.map(svc => {
    const totalRevenue = services.reduce((sum, s) => sum + s.revenue, 0);
    const totalSpend = services.reduce((sum, s) => sum + s.spend, 0);
    return {
      ...svc,
      revenueShare: (svc.revenue / totalRevenue * 100),
      spendShare: (svc.spend / totalSpend * 100)
    };
  });
}

function getChannelInsightsLegacy() {
  const totalRevenue = channels.reduce((sum, c) => sum + c.revenue, 0);
  const totalSpend = channels.reduce((sum, c) => sum + c.spend, 0);
  return channels.map(ch => ({
    ...ch,
    revenueShare: (ch.revenue / totalRevenue * 100),
    spendShare: (ch.spend / totalSpend * 100)
  }));
}

// Export
window.AIEngine = AIEngine;
window.getLocationInsightsLegacy = getLocationInsightsLegacy;
window.getServiceInsightsLegacy = getServiceInsightsLegacy;
window.getChannelInsightsLegacy = getChannelInsightsLegacy;
