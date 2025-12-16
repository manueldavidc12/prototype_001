// Creative Outdoor Florida - Real Business Data
// Annual Revenue: $3.5M | Annual Marketing Spend: $300K
// Data reflects 2025 performance

// ==========================================
// METRIC DEFINITIONS (Simple explanations)
// ==========================================
const metricDefinitions = {
  cac: {
    name: "CAC",
    fullName: "Customer Acquisition Cost",
    formula: "Marketing Spend ÷ New Customers",
    simple: "How much you pay to get each new customer",
    example: "$25,000 spend ÷ 50 customers = $500 per customer"
  },
  roas: {
    name: "ROAS",
    fullName: "Return on Ad Spend",
    formula: "Revenue ÷ Marketing Spend",
    simple: "For every $1 spent, how many dollars come back",
    example: "$292,000 revenue ÷ $25,000 spend = $11.67 back per $1"
  }
};

// ==========================================
// COMPANY TOTALS (Annual & Monthly)
// ==========================================
const companyData = {
  annual: {
    revenue: 3500000,
    spend: 300000,
    customers: 600,
    leads: 2400
  },
  monthly: {
    revenue: 291667,  // $3.5M / 12
    spend: 25000,     // $300K / 12
    customers: 50,    // 600 / 12
    leads: 200        // 2400 / 12
  },
  // Calculated metrics
  get cac() { return this.annual.spend / this.annual.customers; }, // ~$500
  get roas() { return this.annual.revenue / this.annual.spend; },   // ~$11.67
  get avgJobValue() { return this.annual.revenue / this.annual.customers; } // ~$5,833
};

// ==========================================
// 10 FLORIDA LOCATIONS (Monthly averages)
// ==========================================
const locations = [
  { name: "Fort Myers",     spend: 2000,  customers: 6,  revenue: 42000,  leads: 24 },
  { name: "Naples",         spend: 2200,  customers: 6,  revenue: 38000,  leads: 22 },
  { name: "Tampa",          spend: 3500,  customers: 7,  revenue: 45000,  leads: 28 },
  { name: "Sarasota",       spend: 2800,  customers: 6,  revenue: 35000,  leads: 22 },
  { name: "Cape Coral",     spend: 2400,  customers: 5,  revenue: 30000,  leads: 20 },
  { name: "Orlando",        spend: 3200,  customers: 5,  revenue: 28000,  leads: 25 },
  { name: "St. Petersburg", spend: 2600,  customers: 5,  revenue: 29000,  leads: 20 },
  { name: "Clearwater",     spend: 2300,  customers: 4,  revenue: 22000,  leads: 16 },
  { name: "Bradenton",      spend: 2000,  customers: 3,  revenue: 15000,  leads: 13 },
  { name: "Lakeland",       spend: 2000,  customers: 3,  revenue: 8667,   leads: 10 }
].map(loc => ({
  ...loc,
  cac: loc.spend / loc.customers,
  roas: loc.revenue / loc.spend,
  convRate: (loc.customers / loc.leads * 100)
}));

// ==========================================
// 4 SERVICES (Monthly averages)
// ==========================================
const services = [
  {
    name: "Pool & Spa",
    shortName: "Pool & Spa",
    spend: 10000,
    customers: 20,
    revenue: 125000,
    leads: 80,
    avgJob: 6250
  },
  {
    name: "Pool Cages",
    shortName: "Pool Cages",
    spend: 6000,
    customers: 14,
    revenue: 70000,
    leads: 50,
    avgJob: 5000
  },
  {
    name: "Resurfacing",
    shortName: "Resurfacing",
    spend: 5500,
    customers: 10,
    revenue: 55000,
    leads: 45,
    avgJob: 5500
  },
  {
    name: "Outdoor Kitchens",
    shortName: "Outdoor Kitchens",
    spend: 3500,
    customers: 6,
    revenue: 41667,
    leads: 25,
    avgJob: 6944
  }
].map(svc => ({
  ...svc,
  cac: svc.spend / svc.customers,
  roas: svc.revenue / svc.spend,
  convRate: (svc.customers / svc.leads * 100)
}));

// ==========================================
// 2 CHANNELS (Monthly averages)
// ==========================================
const channels = [
  {
    name: "SEO",
    spend: 10000,
    customers: 25,
    revenue: 150000,
    leads: 90
  },
  {
    name: "Paid Ads",
    spend: 15000,
    customers: 25,
    revenue: 141667,
    leads: 110
  }
].map(ch => ({
  ...ch,
  cac: ch.spend / ch.customers,
  roas: ch.revenue / ch.spend,
  convRate: (ch.customers / ch.leads * 100)
}));

// ==========================================
// HISTORICAL DATA (3 Years - Annual)
// ==========================================
const historicalData = {
  2023: { revenue: 2800000, spend: 240000, customers: 480 },
  2024: { revenue: 3100000, spend: 270000, customers: 530 },
  2025: { revenue: 3500000, spend: 300000, customers: 600 }
};

// Add calculated metrics to historical
Object.keys(historicalData).forEach(year => {
  const data = historicalData[year];
  data.cac = data.spend / data.customers;
  data.roas = data.revenue / data.spend;
});

// ==========================================
// MONTHLY DATA BY YEAR
// ==========================================
const monthlyDataByYear = {
  2024: [
    { month: "Jan", monthNum: 1, spend: 20000, revenue: 230000, customers: 40, leads: 160 },
    { month: "Feb", monthNum: 2, spend: 21000, revenue: 245000, customers: 42, leads: 168 },
    { month: "Mar", monthNum: 3, spend: 22000, revenue: 280000, customers: 48, leads: 192 },
    { month: "Apr", monthNum: 4, spend: 23000, revenue: 290000, customers: 50, leads: 200 },
    { month: "May", monthNum: 5, spend: 25000, revenue: 310000, customers: 53, leads: 212 },
    { month: "Jun", monthNum: 6, spend: 25000, revenue: 320000, customers: 55, leads: 220 },
    { month: "Jul", monthNum: 7, spend: 24000, revenue: 300000, customers: 52, leads: 208 },
    { month: "Aug", monthNum: 8, spend: 23000, revenue: 280000, customers: 48, leads: 192 },
    { month: "Sep", monthNum: 9, spend: 22000, revenue: 260000, customers: 45, leads: 180 },
    { month: "Oct", monthNum: 10, spend: 22000, revenue: 250000, customers: 43, leads: 172 },
    { month: "Nov", monthNum: 11, spend: 21000, revenue: 240000, customers: 41, leads: 164 },
    { month: "Dec", monthNum: 12, spend: 22000, revenue: 195000, customers: 35, leads: 140 }
  ],
  2025: [
    { month: "Jan", monthNum: 1, spend: 22000, revenue: 260000, customers: 45, leads: 180 },
    { month: "Feb", monthNum: 2, spend: 23000, revenue: 275000, customers: 47, leads: 188 },
    { month: "Mar", monthNum: 3, spend: 25000, revenue: 310000, customers: 52, leads: 208 },
    { month: "Apr", monthNum: 4, spend: 26000, revenue: 320000, customers: 55, leads: 220 },
    { month: "May", monthNum: 5, spend: 28000, revenue: 340000, customers: 58, leads: 232 },
    { month: "Jun", monthNum: 6, spend: 28000, revenue: 350000, customers: 60, leads: 240 },
    { month: "Jul", monthNum: 7, spend: 27000, revenue: 330000, customers: 55, leads: 220 },
    { month: "Aug", monthNum: 8, spend: 26000, revenue: 300000, customers: 52, leads: 208 },
    { month: "Sep", monthNum: 9, spend: 25000, revenue: 280000, customers: 48, leads: 192 },
    { month: "Oct", monthNum: 10, spend: 24000, revenue: 270000, customers: 46, leads: 184 },
    { month: "Nov", monthNum: 11, spend: 23000, revenue: 260000, customers: 44, leads: 176 },
    { month: "Dec", monthNum: 12, spend: 23000, revenue: 205000, customers: 38, leads: 152 }
  ],
  2026: [
    { month: "Jan", monthNum: 1, spend: 24000, revenue: 285000, customers: 48, leads: 192, projected: true },
    { month: "Feb", monthNum: 2, spend: 25000, revenue: 300000, customers: 50, leads: 200, projected: true },
    { month: "Mar", monthNum: 3, spend: 27000, revenue: 340000, customers: 56, leads: 224, projected: true },
    { month: "Apr", monthNum: 4, spend: 28000, revenue: 350000, customers: 58, leads: 232, projected: true },
    { month: "May", monthNum: 5, spend: 30000, revenue: 370000, customers: 62, leads: 248, projected: true },
    { month: "Jun", monthNum: 6, spend: 30000, revenue: 380000, customers: 64, leads: 256, projected: true },
    { month: "Jul", monthNum: 7, spend: 29000, revenue: 360000, customers: 60, leads: 240, projected: true },
    { month: "Aug", monthNum: 8, spend: 28000, revenue: 330000, customers: 55, leads: 220, projected: true },
    { month: "Sep", monthNum: 9, spend: 27000, revenue: 310000, customers: 52, leads: 208, projected: true },
    { month: "Oct", monthNum: 10, spend: 26000, revenue: 295000, customers: 49, leads: 196, projected: true },
    { month: "Nov", monthNum: 11, spend: 25000, revenue: 285000, customers: 47, leads: 188, projected: true },
    { month: "Dec", monthNum: 12, spend: 25000, revenue: 225000, customers: 40, leads: 160, projected: true }
  ]
};

// Legacy support - monthlyTrend points to 2025 data
const monthlyTrend = monthlyDataByYear[2025];

// Get filtered data by date range
function getFilteredData(year, startMonth = 1, endMonth = 12) {
  const yearData = monthlyDataByYear[year] || monthlyDataByYear[2025];
  return yearData.filter(m => m.monthNum >= startMonth && m.monthNum <= endMonth);
}

// Calculate totals for filtered data
function getFilteredTotals(year, startMonth = 1, endMonth = 12) {
  const filtered = getFilteredData(year, startMonth, endMonth);
  const totals = filtered.reduce((acc, m) => ({
    revenue: acc.revenue + m.revenue,
    spend: acc.spend + m.spend,
    customers: acc.customers + m.customers,
    leads: acc.leads + m.leads
  }), { revenue: 0, spend: 0, customers: 0, leads: 0 });

  totals.roas = totals.spend > 0 ? totals.revenue / totals.spend : 0;
  totals.cac = totals.customers > 0 ? totals.spend / totals.customers : 0;
  totals.isProjected = filtered.some(m => m.projected);
  totals.monthCount = filtered.length;

  return totals;
}

// ==========================================
// WEEKLY INSIGHTS (Monday Reports)
// ==========================================
const weeklyInsights = [
  {
    week: "Dec 15, 2025",
    status: "current",
    summary: "Fort Myers outperforming. Orlando needs attention.",
    weeklySpend: 6250,
    weeklyRevenue: 72917,
    weeklyCustomers: 12,
    insights: [
      {
        type: "opportunity",
        title: "Fort Myers performing above average",
        detail: "ROAS of $21 vs company average of $11.67. Getting more customers for less money here.",
        action: "Consider shifting $500/month from Orlando",
        impact: "Could add 1-2 extra customers/month"
      },
      {
        type: "warning",
        title: "Orlando acquisition costs are high",
        detail: "Spending $3,200/month but only $8.75 ROAS. CAC is $640 vs $500 average.",
        action: "Review ad targeting and keywords",
        impact: "Fix could save $400/month"
      },
      {
        type: "info",
        title: "Pool & Spa driving 43% of revenue",
        detail: "Strongest service line with $12.50 ROAS. Winter is peak season.",
        action: "Maintain current spend levels",
        impact: "On track for Q1 goals"
      }
    ]
  },
  {
    week: "Dec 8, 2025",
    status: "past",
    summary: "Seasonal slowdown starting. Normal for December.",
    weeklySpend: 5800,
    weeklyRevenue: 65000,
    weeklyCustomers: 11,
    insights: [
      {
        type: "info",
        title: "Lead volume down 15% - expected",
        detail: "December historically slower. January picks back up.",
        action: "Reduce paid ads 10% until Jan 1",
        impact: "Save $600 without losing quality leads"
      }
    ]
  }
];

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
function formatCurrency(amount) {
  if (amount >= 1000000) {
    return '$' + (amount / 1000000).toFixed(1) + 'M';
  }
  if (amount >= 1000) {
    return '$' + (amount / 1000).toFixed(0) + 'K';
  }
  return '$' + Math.round(amount);
}

function formatCurrencyFull(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

function formatROAS(roas) {
  return '$' + roas.toFixed(2);
}

function formatCAC(cac) {
  return '$' + Math.round(cac);
}

// Get locations sorted by performance
function getLocationsByROAS() {
  return [...locations].sort((a, b) => b.roas - a.roas);
}

function getLocationsByCAC() {
  return [...locations].sort((a, b) => a.cac - b.cac);
}

// Get services sorted by performance
function getServicesByROAS() {
  return [...services].sort((a, b) => b.roas - a.roas);
}

// Get current week insights
function getCurrentWeekInsights() {
  return weeklyInsights[0];
}

// Calculate year over year changes
function getYoYChanges() {
  const y2024 = historicalData[2024];
  const y2025 = historicalData[2025];

  return {
    revenue: ((y2025.revenue - y2024.revenue) / y2024.revenue * 100),
    spend: ((y2025.spend - y2024.spend) / y2024.spend * 100),
    customers: ((y2025.customers - y2024.customers) / y2024.customers * 100),
    cac: ((y2025.cac - y2024.cac) / y2024.cac * 100),
    roas: ((y2025.roas - y2024.roas) / y2024.roas * 100)
  };
}

// ==========================================
// EXPORTS
// ==========================================
window.companyData = companyData;
window.locations = locations;
window.services = services;
window.channels = channels;
window.historicalData = historicalData;
window.monthlyTrend = monthlyTrend;
window.weeklyInsights = weeklyInsights;
window.metricDefinitions = metricDefinitions;

window.formatCurrency = formatCurrency;
window.formatCurrencyFull = formatCurrencyFull;
window.formatNumber = formatNumber;
window.formatROAS = formatROAS;
window.formatCAC = formatCAC;

window.getLocationsByROAS = getLocationsByROAS;
window.getLocationsByCAC = getLocationsByCAC;
window.getServicesByROAS = getServicesByROAS;
window.getCurrentWeekInsights = getCurrentWeekInsights;
window.getYoYChanges = getYoYChanges;
window.monthlyDataByYear = monthlyDataByYear;
window.getFilteredData = getFilteredData;
window.getFilteredTotals = getFilteredTotals;
