export interface LeadSignals {
  productViews: number;
  categoryViews: number;
  searchFrequency: number;
  repeatVisits: number;
  cartAdditions: number;
  whatsAppClicks: number;
  timeSpentMinutes: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  state: string;
  intentScore: number; // 1-10
  firstPurchaseProbability: number; // 1-10
  priceSensitivityEstimate: number; // 1-10
  bulkPotentialScore: number; // 1-10
  likelyFarmType: 'Poultry' | 'Dairy' | 'Aquaculture' | 'Goat & Sheep' | 'Pig';
  acquisitionSource: 'Facebook' | 'YouTube' | 'WhatsApp' | 'Organic Search' | 'Referral';
  connectivityScore: number; // 1-10
  signals: LeadSignals;
  activitySignals: string[];
  dateRegistered: string;
}

export interface CategoryPreference {
  primary: string;
  secondary: string;
  emerging: string;
}

export interface SearchBehavior {
  zeroResultCount: number;
  frequentMisspellings: string[];
  searchToPurchaseRate: number; // 0-100%
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  district: string;
  state: string;
  tenureDays: number;
  averageOrderValue: number;
  averageQuantity: number;
  purchaseFrequency: 'Weekly' | 'Fortnightly' | 'Monthly' | 'Occasional' | 'One-Time' | 'Inactive';
  totalOrders: number;
  lifetimeValue: number;
  churnRisk: 'Active' | 'High Intent' | 'Monitoring' | 'At-Risk' | 'Dormant'; // Customer Status Classification
  predictedNextPurchaseDate: string;
  purchaseCycleOverdueDays: number; // days elapsed since predicted date, 0 if not overdue
  confidenceScore: number; // 1-100 indicating prediction confidence
  recommendedProduct: string;
  acquisitionSource: 'Facebook' | 'YouTube' | 'WhatsApp';
  deviceType: 'Mobile' | 'Desktop';
  viewedButNotPurchased: string[];
  actualPriceSensitivityScore: number; // 1-10
  digitalMaturity: 'DIGITAL_NATIVE' | 'DIGITAL_LEARNING' | 'PHYSICAL_PREFERRED';
  returnVisitsScore: number; // 1-10 (Organic Loyalty score)
  bulkBuyerScore: number; // 1-10
  categoryPreference: CategoryPreference;
  searchBehavior: SearchBehavior;
  loyaltyScore: number; // 1-10
}

export interface DistrictInsight {
  district: string;
  state: string;
  digitalAccessibilityScore: number; // 1-10
  factors: {
    mobileInternetCoverage: number; // 1-10
    broadbandPenetration: number; // 1-10
    averageNetworkQuality: number; // 1-10
    androidPenetration: number; // % eg 85
    smartphoneOwnership: number; // % eg 78
    upiAdoption: number; // % eg 92
    onlinePaymentSuccessRate: number; // % eg 95
    codDependency: number; // % eg 15
    avgSessionDuration: number; // minutes
    productPageViews: number; // average per session
    registrationRate: number; // % conversion
    addToCartRate: number; // %
    checkoutInitiationRate: number; // %
    firstOrderConversionRate: number; // %
  };
  metrics: {
    visitors: number;
    registrations: number;
    addToCartCount: number;
    firstPurchaseConversions: number;
  };
  loyaltyIndex: number; // 1-10 (features 15)
  loyaltyFactors: {
    repeatPurchaseRate: number; // %
    retentionRate: number; // %
    ordersPerCustomer: number; // average
    organicReturnRate: number; // %
  };
  inference: string;
}
