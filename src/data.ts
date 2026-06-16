import { Lead, Customer, DistrictInsight } from './types';

// Exact global metrics from the BRD to ensure executive summary dashboard consistency
export const BRD_METRICS = {
  platformHealthScore: 7.8,
  lifecycleDistribution: [
    { name: 'Active Buyers', value: 38, count: 380, color: '#10B981' }, // emerald
    { name: 'High Intent Customers', value: 14, count: 140, color: '#3B82F6' }, // blue
    { name: 'Monitoring Segment', value: 22, count: 220, color: '#F59E0B' }, // amber
    { name: 'At-Risk Customers', value: 18, count: 180, color: '#EF4444' }, // red
    { name: 'Dormant Customers', value: 8, count: 80, color: '#6B7280' }, // gray
  ],
  attentionMetrics: {
    purchaseCycleOverdue: {
      customers: 1284,
      avgDelayDays: 12,
      potentialRevenueLakhs: 18.4,
    },
    highIntentNonBuyers: {
      customers: 842,
      condition: 'Viewed Products 5+ Times & No Purchase Recorded',
    },
    atRiskCustomers: {
      customers: 624,
      condition: 'No purchases for 90+ days',
    },
  },
  revenueAtRisk: {
    customersAtRisk: 624,
    historicalSpendLakhs: 42.0,
    revenueAtRiskLakhs: 8.3,
  },
  engagementMomentum: {
    growing: 42,    // % of customers
    stable: 38,     // % of customers
    declining: 20,  // % of customers
  },
  nextPurchaseReadiness: [
    { segment: 'Ready to Purchase (within 7 days)', count: 1124, color: '#10B981', ltvEstimate: 34.5 },
    { segment: 'Likely to Purchase (within 30 days)', count: 2842, color: '#3B82F6', ltvEstimate: 85.2 },
    { segment: 'Future Opportunity (beyond 30 days)', count: 6912, color: '#6B7280', ltvEstimate: 210.8 },
  ],
  firstTimeBuyerFunnel: [
    { name: 'Casual Visitors', count: 12450, step: 1, color: '#9CA3AF' },
    { name: 'Exploring Farmers', count: 4820, step: 2, color: '#F59E0B' },
    { name: 'High Intent Farmers', count: 1980, step: 3, color: '#3B82F6' },
    { name: 'Ready to Purchase', count: 742, step: 4, color: '#10B981' },
  ],
  externalPlatformsLTV: [
    { platform: 'Facebook Referrals', avgLTV: 18400, repeatRate: 68 },
    { platform: 'YouTube Guides', avgLTV: 24500, repeatRate: 82 },
    { platform: 'WhatsApp Commerce', avgLTV: 14200, repeatRate: 59 },
  ],
  searchBehaviorReport: {
    zeroResultQueries: [
      { term: 'organic sheep medicine', searchesCount: 450, possibleMatch: 'Dewormers / Vaccines' },
      { term: 'automated pond oxygen', searchesCount: 320, possibleMatch: 'Oxygen boosters' },
      { term: 'antibiotic layer booster', searchesCount: 290, possibleMatch: 'Antibiotic searches' },
      { term: 'goat growth syrup super', searchesCount: 210, possibleMatch: 'Growth supplements' },
    ],
    misspellingsResolved: [
      { typed: 'broder mash', corrected: 'brooder equipment', conversionsCount: 140 },
      { typed: 'latation feed', corrected: 'lactation supplements', conversionsCount: 112 },
      { typed: 'fish starter pend', corrected: 'starter feed aquaculture', conversionsCount: 95 },
      { typed: 'deworner', corrected: 'dewormers', conversionsCount: 180 },
    ],
    categoryDemandShare: [
      { category: 'Poultry Feed & Equipment', share: 45, trend: '+12%' },
      { category: 'Dairy Supplements & Milkers', share: 28, trend: '+8%' },
      { category: 'Aquaculture Feed & Chemistry', share: 15, trend: '+22%' },
      { category: 'Goat / Sheep / Pig Nutrition', share: 12, trend: '-3%' },
    ],
    searchToPurchaseRate: 14.5, // %
  },
};

// District insights based on Feature 5 and 5.1 of BRD (focusing on West Bengal agricultural areas)
export const DISTRICT_INSIGHTS: DistrictInsight[] = [
  {
    district: 'Murshidabad',
    state: 'West Bengal',
    digitalAccessibilityScore: 8.5,
    factors: {
      mobileInternetCoverage: 9.0,
      broadbandPenetration: 7.2,
      averageNetworkQuality: 8.2,
      androidPenetration: 92,
      smartphoneOwnership: 80,
      upiAdoption: 88,
      onlinePaymentSuccessRate: 94,
      codDependency: 12,
      avgSessionDuration: 14.5,
      productPageViews: 8.2,
      registrationRate: 85,
      addToCartRate: 35,
      checkoutInitiationRate: 28,
      firstOrderConversionRate: 8.5,
    },
    metrics: {
      visitors: 14500,
      registrations: 12325,
      addToCartCount: 4310,
      firstPurchaseConversions: 1047, // High traffic, but low conversion rate compared to potential (Opportunity Region!)
    },
    loyaltyIndex: 8.2, // Loyal Region
    loyaltyFactors: {
      repeatPurchaseRate: 74,
      retentionRate: 65,
      ordersPerCustomer: 4.8,
      organicReturnRate: 62,
    },
    inference: 'Region is digitally mature. Conversion issues are likely due to pricing, trust, or product-market fit rather than infrastructure. Targeted discounts or combo pricing can unlock high conversions.',
  },
  {
    district: 'Purulia',
    state: 'West Bengal',
    digitalAccessibilityScore: 4.2,
    factors: {
      mobileInternetCoverage: 4.8,
      broadbandPenetration: 2.5,
      averageNetworkQuality: 4.0,
      androidPenetration: 65,
      smartphoneOwnership: 58,
      upiAdoption: 38,
      onlinePaymentSuccessRate: 62,
      codDependency: 78,
      avgSessionDuration: 6.2,
      productPageViews: 2.8,
      registrationRate: 42,
      addToCartRate: 12,
      checkoutInitiationRate: 8,
      firstOrderConversionRate: 2.5,
    },
    metrics: {
      visitors: 3200,
      registrations: 1344,
      addToCartCount: 161,
      firstPurchaseConversions: 40,
    },
    loyaltyIndex: 3.5, // Emerging Region
    loyaltyFactors: {
      repeatPurchaseRate: 28,
      retentionRate: 22,
      ordersPerCustomer: 1.5,
      organicReturnRate: 18,
    },
    inference: 'Adoption barriers are likely tied to digital readiness and infrastructure. High COD dependency (78%) and low network signal mean a heavy reliance on WhatsApp commerce and offline local dealers is recommended.',
  },
  {
    district: 'Nadia',
    state: 'West Bengal',
    digitalAccessibilityScore: 7.8,
    factors: {
      mobileInternetCoverage: 8.2,
      broadbandPenetration: 6.5,
      averageNetworkQuality: 7.9,
      androidPenetration: 88,
      smartphoneOwnership: 75,
      upiAdoption: 82,
      onlinePaymentSuccessRate: 91,
      codDependency: 22,
      avgSessionDuration: 12.0,
      productPageViews: 7.1,
      registrationRate: 78,
      addToCartRate: 29,
      checkoutInitiationRate: 24,
      firstOrderConversionRate: 7.8,
    },
    metrics: {
      visitors: 9800,
      registrations: 7644,
      addToCartCount: 2216,
      firstPurchaseConversions: 604,
    },
    loyaltyIndex: 8.8, // Strategic Stronghold potential
    loyaltyFactors: {
      repeatPurchaseRate: 71,
      retentionRate: 58,
      ordersPerCustomer: 4.2,
      organicReturnRate: 59,
    },
    inference: 'Strong poultry farming base with high digital payment adoption. High repeat purchase rates. Ideal testbed for digital subscription rolls and high-value equipment launches.',
  },
  {
    district: 'Malda',
    state: 'West Bengal',
    digitalAccessibilityScore: 6.1,
    factors: {
      mobileInternetCoverage: 6.5,
      broadbandPenetration: 4.8,
      averageNetworkQuality: 6.0,
      androidPenetration: 76,
      smartphoneOwnership: 68,
      upiAdoption: 60,
      onlinePaymentSuccessRate: 80,
      codDependency: 45,
      avgSessionDuration: 9.8,
      productPageViews: 5.2,
      registrationRate: 62,
      addToCartRate: 22,
      checkoutInitiationRate: 18,
      firstOrderConversionRate: 5.2,
    },
    metrics: {
      visitors: 7100,
      registrations: 4402,
      addToCartCount: 968,
      firstPurchaseConversions: 228,
    },
    loyaltyIndex: 5.8, // Developing Region
    loyaltyFactors: {
      repeatPurchaseRate: 48,
      retentionRate: 38,
      ordersPerCustomer: 2.8,
      organicReturnRate: 32,
    },
    inference: 'Mixed payment behavior. Growing livestock and fisheries infrastructure. Responds very well to regional WhatsApp outreach and localized bulk-buyer discounts.',
  },
  {
    district: 'Birbhum',
    state: 'West Bengal',
    digitalAccessibilityScore: 5.5,
    factors: {
      mobileInternetCoverage: 5.9,
      broadbandPenetration: 3.8,
      averageNetworkQuality: 5.6,
      androidPenetration: 72,
      smartphoneOwnership: 62,
      upiAdoption: 52,
      onlinePaymentSuccessRate: 76,
      codDependency: 55,
      avgSessionDuration: 8.5,
      productPageViews: 4.5,
      registrationRate: 55,
      addToCartRate: 18,
      checkoutInitiationRate: 13,
      firstOrderConversionRate: 4.0,
    },
    metrics: {
      visitors: 5900,
      registrations: 3245,
      addToCartCount: 584,
      firstPurchaseConversions: 130,
    },
    loyaltyIndex: 5.2, // Developing Region
    loyaltyFactors: {
      repeatPurchaseRate: 42,
      retentionRate: 32,
      ordersPerCustomer: 2.2,
      organicReturnRate: 26,
    },
    inference: 'Moderate connectivity with growing dairy operations. Heavy dependence on promotional prompts. Providing local starter-pack bundles will trigger better organic retention.',
  },
];

// Rich individual Leads and Customers generators and collections for detailed search and query
export const GENERATED_LEADS: Lead[] = [
  {
    id: "L-101",
    name: "Subir Das",
    email: "subir.das.poultry@gmail.com",
    phone: "+91 9434190822",
    district: "Murshidabad",
    state: "West Bengal",
    intentScore: 9,
    firstPurchaseProbability: 9, // Ready-to-Purchase Farmer
    priceSensitivityEstimate: 8, // Price-Sensitive Buyer
    bulkPotentialScore: 8, // Commercial Farmer
    likelyFarmType: "Poultry",
    acquisitionSource: "WhatsApp",
    connectivityScore: 8.5,
    signals: {
      productViews: 14,
      categoryViews: 5,
      searchFrequency: 8,
      repeatVisits: 6,
      cartAdditions: 3,
      whatsAppClicks: 5,
      timeSpentMinutes: 48
    },
    activitySignals: ["Chick starter feed views", "Brooder equipment views", "Vitamin searches", "Feed browsing"],
    dateRegistered: "2026-06-01"
  },
  {
    id: "L-102",
    name: "Mukhtar Alam",
    email: "mukhtar.aquafarm@yahoo.com",
    phone: "+91 8116773295",
    district: "Murshidabad",
    state: "West Bengal",
    intentScore: 8,
    firstPurchaseProbability: 8, // High-Intent Farmer
    priceSensitivityEstimate: 3, // Premium Buyer
    bulkPotentialScore: 9, // Dealer/Bulk Buyer
    likelyFarmType: "Aquaculture",
    acquisitionSource: "Facebook",
    connectivityScore: 8.5,
    signals: {
      productViews: 11,
      categoryViews: 3,
      searchFrequency: 4,
      repeatVisits: 4,
      cartAdditions: 2,
      whatsAppClicks: 1,
      timeSpentMinutes: 35
    },
    activitySignals: ["Pond disinfectants", "Water treatment products", "Oxygen boosters"],
    dateRegistered: "2026-06-05"
  },
  {
    id: "L-103",
    name: "Basudeb Mahato",
    email: "basu.mahato77@rediffmail.com",
    phone: "+91 7001423851",
    district: "Purulia",
    state: "West Bengal",
    intentScore: 3,
    firstPurchaseProbability: 2, // Casual Visitor
    priceSensitivityEstimate: 9, // Price-Sensitive Buyer
    bulkPotentialScore: 2, // Small Farmer
    likelyFarmType: "Goat & Sheep",
    acquisitionSource: "Organic Search",
    connectivityScore: 4.2,
    signals: {
      productViews: 2,
      categoryViews: 1,
      searchFrequency: 1,
      repeatVisits: 1,
      cartAdditions: 0,
      whatsAppClicks: 0,
      timeSpentMinutes: 4
    },
    activitySignals: ["Dewormers", "Immunity products"],
    dateRegistered: "2026-06-12"
  },
  {
    id: "L-104",
    name: "Animesh Roy",
    email: "animesh.nadia.dairy@gmail.com",
    phone: "+91 9832214550",
    district: "Nadia",
    state: "West Bengal",
    intentScore: 7,
    firstPurchaseProbability: 7, // High-Intent Farmer
    priceSensitivityEstimate: 5, // Moderate Buyer
    bulkPotentialScore: 6, // Growing Farmer
    likelyFarmType: "Dairy",
    acquisitionSource: "YouTube",
    connectivityScore: 7.8,
    signals: {
      productViews: 8,
      categoryViews: 4,
      searchFrequency: 3,
      repeatVisits: 3,
      cartAdditions: 1,
      whatsAppClicks: 2,
      timeSpentMinutes: 22
    },
    activitySignals: ["Mineral mixtures", "Dairy feed", "Calf starter feed"],
    dateRegistered: "2026-05-28"
  },
  {
    id: "L-105",
    name: "Gobinda Haldar",
    email: "gobinda.h@outlook.com",
    phone: "+91 9153400219",
    district: "Malda",
    state: "West Bengal",
    intentScore: 5,
    firstPurchaseProbability: 5, // Exploring Farmer
    priceSensitivityEstimate: 6, // Moderate Buyer
    bulkPotentialScore: 5, // Growing Farmer
    likelyFarmType: "Aquaculture",
    acquisitionSource: "Facebook",
    connectivityScore: 6.1,
    signals: {
      productViews: 6,
      categoryViews: 2,
      searchFrequency: 4,
      repeatVisits: 2,
      cartAdditions: 1,
      whatsAppClicks: 3,
      timeSpentMinutes: 18
    },
    activitySignals: ["Starter feed", "Probiotics", "Water conditioners"],
    dateRegistered: "2026-06-08"
  },
  {
    id: "L-106",
    name: "Purnima Murmu",
    email: "purnima.murmu9@gmail.com",
    phone: "+91 8900142318",
    district: "Purulia",
    state: "West Bengal",
    intentScore: 6,
    firstPurchaseProbability: 5, // Exploring Farmer
    priceSensitivityEstimate: 9, // Price-Sensitive Buyer
    bulkPotentialScore: 4, // Growing Farmer
    likelyFarmType: "Goat & Sheep",
    acquisitionSource: "WhatsApp",
    connectivityScore: 4.2,
    signals: {
      productViews: 7,
      categoryViews: 3,
      searchFrequency: 5,
      repeatVisits: 4,
      cartAdditions: 1,
      whatsAppClicks: 6,
      timeSpentMinutes: 30
    },
    activitySignals: ["Growth supplements", "Vaccines", "High-nutrition feed"],
    dateRegistered: "2026-06-02"
  },
  {
    id: "L-107",
    name: "Swapan Paul",
    email: "swapan.paul.feeds@gmail.com",
    phone: "+91 9733475902",
    district: "Nadia",
    state: "West Bengal",
    intentScore: 10,
    firstPurchaseProbability: 10, // Ready-to-Purchase Farmer
    priceSensitivityEstimate: 7, // Price-Sensitive Buyer
    bulkPotentialScore: 10, // Dealer/Bulk Buyer potential
    likelyFarmType: "Poultry",
    acquisitionSource: "WhatsApp",
    connectivityScore: 7.8,
    signals: {
      productViews: 22,
      categoryViews: 6,
      searchFrequency: 12,
      repeatVisits: 8,
      cartAdditions: 6,
      whatsAppClicks: 8,
      timeSpentMinutes: 75
    },
    activitySignals: ["Large feed bags", "Bulk feed searches", "Poultry equipment", "Water systems"],
    dateRegistered: "2026-06-10"
  },
  {
    id: "L-108",
    name: "Bikram Ghosh",
    email: "ghosh.b.dairy@gmail.com",
    phone: "+91 8250221345",
    district: "Birbhum",
    state: "West Bengal",
    intentScore: 4,
    firstPurchaseProbability: 4, // Exploring Farmer
    priceSensitivityEstimate: 5, // Moderate Buyer
    bulkPotentialScore: 3, // Small Farmer
    likelyFarmType: "Dairy",
    acquisitionSource: "Referral",
    connectivityScore: 5.5,
    signals: {
      productViews: 5,
      categoryViews: 2,
      searchFrequency: 2,
      repeatVisits: 2,
      cartAdditions: 0,
      whatsAppClicks: 1,
      timeSpentMinutes: 11
    },
    activitySignals: ["Dairy feed", "Vitamins", "Mastitis prevention products"],
    dateRegistered: "2026-06-07"
  },
  {
    id: "L-109",
    name: "Tariqul Islam",
    email: "tariq.poultry.mdsd@gmail.com",
    phone: "+91 9474124905",
    district: "Murshidabad",
    state: "West Bengal",
    intentScore: 8,
    firstPurchaseProbability: 8, // High-Intent Farmer
    priceSensitivityEstimate: 8, // Price-Sensitive Buyer
    bulkPotentialScore: 7, // Commercial Farmer
    likelyFarmType: "Poultry",
    acquisitionSource: "Facebook",
    connectivityScore: 8.5,
    signals: {
      productViews: 12,
      categoryViews: 4,
      searchFrequency: 6,
      repeatVisits: 4,
      cartAdditions: 4,
      whatsAppClicks: 2,
      timeSpentMinutes: 40
    },
    activitySignals: ["Feed conversion improvers", "Growth promoters", "Premium feed comparisons"],
    dateRegistered: "2026-06-11"
  },
  {
    id: "L-110",
    name: "Kartik Bauri",
    email: "kartik.bauri.piggery@gmail.com",
    phone: "+91 7601421389",
    district: "Purulia",
    state: "West Bengal",
    intentScore: 2,
    firstPurchaseProbability: 3, // Casual Visitor
    priceSensitivityEstimate: 10, // Highly Price-Sensitive
    bulkPotentialScore: 2, // Small Farmer
    likelyFarmType: "Pig",
    acquisitionSource: "Organic Search",
    connectivityScore: 4.2,
    signals: {
      productViews: 3,
      categoryViews: 1,
      searchFrequency: 2,
      repeatVisits: 1,
      cartAdditions: 0,
      whatsAppClicks: 0,
      timeSpentMinutes: 5
    },
    activitySignals: ["Piglet feed", "Vaccines"],
    dateRegistered: "2026-06-14"
  }
];

export const GENERATED_CUSTOMERS: Customer[] = [
  {
    id: "C-201",
    name: "Dr. Alok Sen",
    email: "sen.poultry.farms@outlook.com",
    phone: "+91 9830021456",
    age: 46,
    gender: "Male",
    district: "Murshidabad",
    state: "West Bengal",
    tenureDays: 340,
    averageOrderValue: 24500, // Dealer/Bulk Buyer
    averageQuantity: 120,
    purchaseFrequency: "Weekly",
    totalOrders: 42,
    lifetimeValue: 1029000,
    churnRisk: "Active", // Status: Active Buyer
    predictedNextPurchaseDate: "2026-06-18",
    purchaseCycleOverdueDays: 0,
    confidenceScore: 94,
    recommendedProduct: "Concentrated Broiler Starter Feed - Bulk Pack",
    acquisitionSource: "YouTube",
    deviceType: "Desktop", // Indications of dealer
    viewedButNotPurchased: ["Vaccine cooler unit", "Automated egg collector system"],
    actualPriceSensitivityScore: 2, // Low pricesensitivity -> Premium Buyer
    digitalMaturity: "DIGITAL_NATIVE",
    returnVisitsScore: 9, // Highly Loyal return
    bulkBuyerScore: 10, // Dealer / Bulk Buyer (Score 9-10)
    categoryPreference: {
      primary: "Poultry Feed (Broiler/Layer)",
      secondary: "Vaccines & Bio-security",
      emerging: "Hatchery Equipment"
    },
    searchBehavior: {
      zeroResultCount: 1,
      frequentMisspellings: ["broller smash", "broder mash"],
      searchToPurchaseRate: 48
    },
    loyaltyScore: 9.5
  },
  {
    id: "C-202",
    name: "Rajen Mahato",
    email: "mahato.rajen.dairy@gmail.com",
    phone: "+91 9753421311",
    age: 38,
    gender: "Male",
    district: "Purulia",
    state: "West Bengal",
    tenureDays: 180,
    averageOrderValue: 2400,
    averageQuantity: 8,
    purchaseFrequency: "Monthly",
    totalOrders: 6,
    lifetimeValue: 14400,
    churnRisk: "At-Risk", // Status: At-Risk Customer (Purchase cycle overdue)
    predictedNextPurchaseDate: "2026-05-15",
    purchaseCycleOverdueDays: 31, // Overdue!
    confidenceScore: 45,
    recommendedProduct: "Calcium Pro Liquid Gold - 5L",
    acquisitionSource: "WhatsApp",
    deviceType: "Mobile",
    viewedButNotPurchased: ["Ultrasonic Vet Tester", "Mastitis detection strips"],
    actualPriceSensitivityScore: 9, // Price-Sensitive Buyer
    digitalMaturity: "PHYSICAL_PREFERRED", // COD lover
    returnVisitsScore: 3, // Low return score
    bulkBuyerScore: 2, // Small Farmer
    categoryPreference: {
      primary: "Dairy Supplements",
      secondary: "Milking Aids",
      emerging: "Dewormers"
    },
    searchBehavior: {
      zeroResultCount: 8,
      frequentMisspellings: ["calcem liquid", "mastitis cure"],
      searchToPurchaseRate: 10
    },
    loyaltyScore: 3.2
  },
  {
    id: "C-203",
    name: "Swapna Barman",
    email: "swapna.fisheries@gmail.com",
    phone: "+91 9123445582",
    age: 31,
    gender: "Female",
    district: "Nadia",
    state: "West Bengal",
    tenureDays: 240,
    averageOrderValue: 8600,
    averageQuantity: 35,
    purchaseFrequency: "Fortnightly",
    totalOrders: 18,
    lifetimeValue: 154800,
    churnRisk: "Active", // Status: Active Buyer
    predictedNextPurchaseDate: "2026-06-16",
    purchaseCycleOverdueDays: 0,
    confidenceScore: 88,
    recommendedProduct: "High-Protein Floating Fish Pellets (Pellet Size 2mm)",
    acquisitionSource: "Facebook",
    deviceType: "Mobile",
    viewedButNotPurchased: ["Water pH test kit (Digital)", "Pond netting deluxe"],
    actualPriceSensitivityScore: 5, // Moderate Buyer
    digitalMaturity: "DIGITAL_NATIVE",
    returnVisitsScore: 8,
    bulkBuyerScore: 7, // Commercial Farmer
    categoryPreference: {
      primary: "Aquaculture Feed",
      secondary: "Water Chemistry Solutions",
      emerging: "Pond Equipment"
    },
    searchBehavior: {
      zeroResultCount: 2,
      frequentMisspellings: ["propbiotics fish", "oxy booster"],
      searchToPurchaseRate: 35
    },
    loyaltyScore: 8.4
  },
  {
    id: "C-204",
    name: "Haran Chandra Roy",
    email: "haran.dairy.malda@gmail.com",
    phone: "+91 8001223940",
    age: 55,
    gender: "Male",
    district: "Malda",
    state: "West Bengal",
    tenureDays: 310,
    averageOrderValue: 4800,
    averageQuantity: 15,
    purchaseFrequency: "Monthly",
    totalOrders: 11,
    lifetimeValue: 52800,
    churnRisk: "Monitoring", // Status: Monitoring Segment
    predictedNextPurchaseDate: "2026-06-05",
    purchaseCycleOverdueDays: 10,  // Slightly overdue
    confidenceScore: 72,
    recommendedProduct: "Sudarshan Mineral Block - Crates of 10",
    acquisitionSource: "WhatsApp",
    deviceType: "Mobile",
    viewedButNotPurchased: ["Milking machine single-bucket", "E-colostrum pasteizer"],
    actualPriceSensitivityScore: 7, // Price-Sensitive Buyer
    digitalMaturity: "DIGITAL_LEARNING",
    returnVisitsScore: 6,
    bulkBuyerScore: 5, // Growing Farmer
    categoryPreference: {
      primary: "Dairy Mineral Supplements",
      secondary: "Cattle Grooming & Feeders",
      emerging: "Crying Calf Nipples"
    },
    searchBehavior: {
      zeroResultCount: 4,
      frequentMisspellings: ["lactetion powder", "cow dewormer block"],
      searchToPurchaseRate: 22
    },
    loyaltyScore: 5.6
  },
  {
    id: "C-205",
    name: "SK Latif",
    email: "latif.poultry.murshidabad@gmail.com",
    phone: "+91 9434821560",
    age: 42,
    gender: "Male",
    district: "Murshidabad",
    state: "West Bengal",
    tenureDays: 450,
    averageOrderValue: 12500, // Matches special rule > 10,000!
    averageQuantity: 65,
    purchaseFrequency: "Fortnightly",
    totalOrders: 32,
    lifetimeValue: 400000,
    churnRisk: "High Intent", // Status: High Intent Customer (Heavy views recently)
    predictedNextPurchaseDate: "2026-06-19",
    purchaseCycleOverdueDays: 0,
    confidenceScore: 91,
    recommendedProduct: "Automatic Nipple Drinking System (Poultry Row Pack)",
    acquisitionSource: "YouTube",
    deviceType: "Desktop",
    viewedButNotPurchased: ["Poultry antibiotic liquid 1L", "Thermal insulation foil sheets"],
    actualPriceSensitivityScore: 4, // Moderate Buyer
    digitalMaturity: "DIGITAL_NATIVE",
    returnVisitsScore: 8,
    bulkBuyerScore: 8, // Commercial Farmer
    categoryPreference: {
      primary: "Poultry Automation & Feeders",
      secondary: "Heavy feed bags",
      emerging: "Sanitizers & Biosecurity"
    },
    searchBehavior: {
      zeroResultCount: 0,
      frequentMisspellings: ["autometic drinker", "drinker nipple"],
      searchToPurchaseRate: 40
    },
    loyaltyScore: 8.9
  },
  {
    id: "C-206",
    name: "Pradip Malik",
    email: "malik.pradip.goat@gmail.com",
    phone: "+91 7602052140",
    age: 29,
    gender: "Male",
    district: "Birbhum",
    state: "West Bengal",
    tenureDays: 120,
    averageOrderValue: 1800,
    averageQuantity: 5,
    purchaseFrequency: "Occasional",
    totalOrders: 4,
    lifetimeValue: 7200,
    churnRisk: "Monitoring", // Status: Monitoring Segment
    predictedNextPurchaseDate: "2026-06-12",
    purchaseCycleOverdueDays: 3, // slightly overdue
    confidenceScore: 65,
    recommendedProduct: "Goat Peak Growth Mix - 2kg Bag",
    acquisitionSource: "Facebook",
    deviceType: "Mobile",
    viewedButNotPurchased: ["Electric fleece shearer", "Goat tags and applicator pack"],
    actualPriceSensitivityScore: 8, // Price-Sensitive Buyer
    digitalMaturity: "DIGITAL_LEARNING",
    returnVisitsScore: 5,
    bulkBuyerScore: 2, // Small Farmer
    categoryPreference: {
      primary: "Goat & Kid Feed",
      secondary: "Dewormers & Sprays",
      emerging: "Farm tags"
    },
    searchBehavior: {
      zeroResultCount: 3,
      frequentMisspellings: ["goat wait gain", "dewormer got"],
      searchToPurchaseRate: 15
    },
    loyaltyScore: 4.8
  },
  {
    id: "C-207",
    name: "Mohua Chatterjee",
    email: "mohua.chatterjee.aqua@gmail.com",
    phone: "+91 8122904576",
    age: 35,
    gender: "Female",
    district: "Malda",
    state: "West Bengal",
    tenureDays: 200,
    averageOrderValue: 6200,
    averageQuantity: 25,
    purchaseFrequency: "Fortnightly",
    totalOrders: 12,
    lifetimeValue: 74400,
    churnRisk: "Active", // Status: Active Buyer
    predictedNextPurchaseDate: "2026-06-16",
    purchaseCycleOverdueDays: 0,
    confidenceScore: 82,
    recommendedProduct: "Zeolite Pond Detoxifier - 10kg Bag",
    acquisitionSource: "Facebook",
    deviceType: "Mobile",
    viewedButNotPurchased: ["Pond aeration fan paddle wheel", "Dissolved oxygen tester probe"],
    actualPriceSensitivityScore: 6, // Moderate Buyer
    digitalMaturity: "DIGITAL_NATIVE",
    returnVisitsScore: 7,
    bulkBuyerScore: 5, // Growing Farmer
    categoryPreference: {
      primary: "Aquaculture Chemistry & Disinfectants",
      secondary: "Probiotics & Soil conditioners",
      emerging: "Starter feed"
    },
    searchBehavior: {
      zeroResultCount: 2,
      frequentMisspellings: ["pnd disinfectnt", "zeolite pond"],
      searchToPurchaseRate: 25
    },
    loyaltyScore: 7.2
  },
  {
    id: "C-208",
    name: "Kripasindhu Soren",
    email: "kp.soren.dairy@gmail.com",
    phone: "+91 8900451296",
    age: 50,
    gender: "Male",
    district: "Purulia",
    state: "West Bengal",
    tenureDays: 280,
    averageOrderValue: 1200,
    averageQuantity: 4,
    purchaseFrequency: "One-Time",
    totalOrders: 1,
    lifetimeValue: 1200,
    churnRisk: "Dormant", // Status: Dormant Customer (No recent visit or purchases for 120+ days)
    predictedNextPurchaseDate: "2026-02-15",
    purchaseCycleOverdueDays: 121, // Overdue by a lot!
    confidenceScore: 10,
    recommendedProduct: "Cattle Multi-Vitamin Forte - 500ml",
    acquisitionSource: "WhatsApp",
    deviceType: "Mobile",
    viewedButNotPurchased: ["Calf feeding bucket", "Heavy duty cow brush"],
    actualPriceSensitivityScore: 10, // Price-Sensitive Buyer
    digitalMaturity: "PHYSICAL_PREFERRED",
    returnVisitsScore: 1,
    bulkBuyerScore: 1, // Small Farmer
    categoryPreference: {
      primary: "Vitamins & Feed additive",
      secondary: "None",
      emerging: "None"
    },
    searchBehavior: {
      zeroResultCount: 12,
      frequentMisspellings: ["multi viatmin cow", "cow feeding buket"],
      searchToPurchaseRate: 5
    },
    loyaltyScore: 1.5
  },
  {
    id: "C-209",
    name: "Tapash Karmakar",
    email: "tapash.piggery.birbhum@yahoo.com",
    phone: "+91 9322054117",
    age: 39,
    gender: "Male",
    district: "Birbhum",
    state: "West Bengal",
    tenureDays: 160,
    averageOrderValue: 7100,
    averageQuantity: 30,
    purchaseFrequency: "Monthly",
    totalOrders: 5,
    lifetimeValue: 35500,
    churnRisk: "Monitoring", // Status: Monitoring Segment
    predictedNextPurchaseDate: "2026-06-10",
    purchaseCycleOverdueDays: 5,  // slightly overdue
    confidenceScore: 68,
    recommendedProduct: "Sow Gestation Complete Premix Feed - 50kg Bag",
    acquisitionSource: "YouTube",
    deviceType: "Mobile",
    viewedButNotPurchased: ["Pig teeth grinders", "Infrared heat lamp for piglets"],
    actualPriceSensitivityScore: 6, // Moderate Buyer
    digitalMaturity: "DIGITAL_LEARNING",
    returnVisitsScore: 5,
    bulkBuyerScore: 5, // Growing Farmer
    categoryPreference: {
      primary: "Piggery Complete Nutrition",
      secondary: "Heat management systems",
      emerging: "Growth enhancers"
    },
    searchBehavior: {
      zeroResultCount: 1,
      frequentMisspellings: ["pig let feed", "gestetion mash"],
      searchToPurchaseRate: 20
    },
    loyaltyScore: 5.1
  },
  {
    id: "C-210",
    name: "Gourab Saha",
    email: "gourab.saha.dealer@gmail.com",
    phone: "+91 9831411220",
    age: 49,
    gender: "Male",
    district: "Nadia",
    state: "West Bengal",
    tenureDays: 400,
    averageOrderValue: 38200, // Heavy dealer size!
    averageQuantity: 180,
    purchaseFrequency: "Weekly",
    totalOrders: 58,
    lifetimeValue: 2215600,
    churnRisk: "Active", // Active Buyer
    predictedNextPurchaseDate: "2026-06-18",
    purchaseCycleOverdueDays: 0,
    confidenceScore: 97,
    recommendedProduct: "Premium Super-Gold Feed Crumbles (Bulk Truck Load, 5 Tons)",
    acquisitionSource: "YouTube",
    deviceType: "Desktop",
    viewedButNotPurchased: ["Livestock Ventilation Fan 40inch", "Biosecurity automated sprayer gate"],
    actualPriceSensitivityScore: 3, // Low sensitivity -> Premium Buyer
    digitalMaturity: "DIGITAL_NATIVE",
    returnVisitsScore: 10, // Exceptional organic returns
    bulkBuyerScore: 10, // Dealer / Bulk Buyer (Score 9-10)
    categoryPreference: {
      primary: "Wholesale Feed & Concentrates",
      secondary: "Automated Feeders",
      emerging: "Veterinary Clinical Kits"
    },
    searchBehavior: {
      zeroResultCount: 0,
      frequentMisspellings: ["wholesale dealer price", "5ton truck load"],
      searchToPurchaseRate: 55
    },
    loyaltyScore: 9.8
  }
];

// Interactive tool data to predict operational need based on selected signals (Feature 2)
export const FARM_ACTIVITY_SIGNALS_MAP = {
  Poultry: [
    {
      action: "Preparing New Poultry Batch",
      signals: ["Feed browsing", "Chick starter feed views", "Brooder equipment views", "Vitamin searches"],
      requirements: ["New flock placement", "Feed planning", "Brooding setup"]
    },
    {
      action: "Disease Prevention",
      signals: ["Vaccine browsing", "Immunity products", "Biosecurity products", "Sanitizer products"],
      requirements: ["Preventive health management"]
    },
    {
      action: "Disease Outbreak Concern",
      signals: ["Antibiotic searches", "Respiratory medicines", "Anti-stress products", "Veterinary content consumption"],
      requirements: ["Active flock health issue"]
    },
    {
      action: "Mortality Investigation",
      signals: ["Disease symptom searches", "Multiple medicine categories viewed", "Technical article consumption"],
      requirements: ["Identifying causes of mortality"]
    },
    {
      action: "Production Optimization",
      signals: ["Growth promoters", "Feed conversion improvers", "Premium feed comparisons"],
      requirements: ["Better FCR and faster growth"]
    },
    {
      action: "Egg Production Improvement",
      signals: ["Layer feed", "Calcium supplements", "Egg quality products"],
      requirements: ["Higher egg production", "Improved shell quality"]
    },
    {
      action: "Seasonal Stress Management",
      signals: ["Electrolytes", "Vitamin C", "Heat stress products"],
      requirements: ["Summer stress mitigation"]
    },
    {
      action: "Farm Expansion",
      signals: ["Large feed bags", "Poultry equipment", "Water systems"],
      requirements: ["Increasing flock size and production capacity"]
    }
  ],
  Dairy: [
    {
      action: "Milk Yield Improvement",
      signals: ["Mineral mixtures", "Lactation supplements", "Dairy feed"],
      requirements: ["Increased milk production"]
    },
    {
      action: "Fertility & Reproductive Management",
      signals: ["Fertility supplements", "Breeding products", "Reproductive health products"],
      requirements: ["Improved breeding performance"]
    },
    {
      action: "Calf Management",
      signals: ["Calf starter feed", "Milk replacers", "Growth supplements"],
      requirements: ["Young animal development"]
    },
    {
      action: "Disease Prevention",
      signals: ["Dewormers", "Vaccines", "Mastitis prevention products"],
      requirements: ["Herd health management"]
    },
    {
      action: "Nutritional Deficiency Investigation",
      signals: ["Vitamins", "Mineral supplements", "Feed additive browsing"],
      requirements: ["Addressing production decline"]
    },
    {
      action: "Herd Expansion",
      signals: ["Increased feed quantity searches", "Breeding products", "Farm equipment"],
      requirements: ["Growing herd size"]
    }
  ],
  Aquaculture: [
    {
      action: "Pond Preparation",
      signals: ["Pond disinfectants", "Water treatment products"],
      requirements: ["Preparing pond before stocking"]
    },
    {
      action: "Stocking Preparation",
      signals: ["Starter feed", "Probiotics", "Water conditioners"],
      requirements: ["Fingerling stocking"]
    },
    {
      action: "Water Quality Management",
      signals: ["Water testing kits", "Oxygen boosters", "Water treatment chemicals"],
      requirements: ["Water quality correction"]
    },
    {
      action: "Disease Outbreak Concern",
      signals: ["Fish medicines", "Anti-fungal products", "Treatment protocols"],
      requirements: ["Active disease challenge"]
    },
    {
      action: "Growth Optimization",
      signals: ["Growth feed", "Feed additives", "Probiotics"],
      requirements: ["Faster growth and improved yield"]
    },
    {
      action: "Harvest Preparation",
      signals: ["Finisher feed", "Growth enhancers"],
      requirements: ["Preparing stock for harvest"]
    },
    {
      action: "Farm Expansion",
      signals: ["Bulk feed searches", "Aeration equipment", "Farm infrastructure products"],
      requirements: ["Increased production capacity"]
    }
  ],
  "Goat & Sheep": [
    {
      action: "Herd Expansion",
      signals: ["Feed supplements", "Breeding products"],
      requirements: ["Increasing herd size"]
    },
    {
      action: "Weight Gain Program",
      signals: ["Growth supplements", "High-nutrition feed"],
      requirements: ["Market readiness"]
    },
    {
      action: "Disease Prevention",
      signals: ["Vaccines", "Dewormers", "Immunity products"],
      requirements: ["Preventive healthcare"]
    },
    {
      action: "Young Stock Management",
      signals: ["Starter feed", "Growth supplements"],
      requirements: ["Kid/Lamb development"]
    }
  ],
  Pig: [
    {
      action: "Piglet Management",
      signals: ["Piglet feed", "Growth supplements"],
      requirements: ["Early-stage pig management"]
    },
    {
      action: "Growth Acceleration",
      signals: ["Growth promoters", "Premium feed"],
      requirements: ["Faster weight gain"]
    },
    {
      action: "Disease Prevention",
      signals: ["Vaccines", "Veterinary medicines"],
      requirements: ["Health management"]
    },
    {
      action: "Farm Expansion",
      signals: ["Bulk feed searches", "Equipment browsing"],
      requirements: ["Scaling operations"]
    }
  ],
  "Cross-Category": [
    {
      action: "Disease Management",
      signals: ["Heavy medicine browsing", "Disease symptom searches", "Veterinary content consumption"],
      requirements: ["Active health challenge"]
    },
    {
      action: "Veterinary Assistance",
      signals: ["Veterinary service page visits", "Consultation requests"],
      requirements: ["Expert intervention"]
    },
    {
      action: "Nutrition Optimization",
      signals: ["Feed comparisons", "Supplement browsing"],
      requirements: ["Improved productivity"]
    },
    {
      action: "Cost Optimization",
      signals: ["Price sorting", "Offer page visits", "Coupon usage"],
      requirements: ["Reduced farm operating costs"]
    },
    {
      action: "Farm Expansion",
      signals: ["Equipment browsing", "Bulk pack searches", "Multi-category activity"],
      requirements: ["Scaling farm operations"]
    },
    {
      action: "Technology Adoption",
      signals: ["Testing kits", "Equipment", "Automation-related products"],
      requirements: ["Modernization and efficiency improvement"]
    },
    {
      action: "Dealer / Distributor Identification",
      signals: ["Wholesale product browsing", "GST-related activity", "Multi-brand product exploration", "High-volume product interest"],
      requirements: ["Resale or distribution business"]
    }
  ]
};
