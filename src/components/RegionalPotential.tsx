import React, { useState, useMemo } from 'react';
import { 
  DISTRICT_INSIGHTS 
} from '../data';
import { DistrictInsight } from '../types';
import { 
  Map, 
  MapPin, 
  Wifi, 
  Smartphone, 
  CreditCard, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  HelpCircle,
  Lightbulb,
  CheckCircle,
  ShieldAlert,
  Info,
  Layers,
  ChevronRight,
  TrendingDown,
  Globe
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';

export default function RegionalPotential() {
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInsight>(DISTRICT_INSIGHTS[0]);
  
  // Dynamic Scenario Toolulator to adjust parameter weights or test infrastructure upgrades (Feature 5.1)
  const [coverageSimBonus, setCoverageSimBonus] = useState(0);
  const [upiSimBonus, setUpiSimBonus] = useState(0);

  // Recalculate accessibility score based on dynamic bonuses
  const simulatedAccessibilityScore = useMemo(() => {
    // base score + weighted bonuses (Max 10)
    let base = selectedDistrict.digitalAccessibilityScore;
    let bonus = (coverageSimBonus * 0.4) + (upiSimBonus * 0.6);
    return Math.min(10, parseFloat((base + bonus).toFixed(1)));
  }, [selectedDistrict, coverageSimBonus, upiSimBonus]);

  // Map Loyalty Index to exact BRD classification
  const getLoyaltyClass = (score: number) => {
    if (score >= 9) return { label: 'Strategic Stronghold', desc: 'Exceptionally high customer loyalty and retention. High proportion of organic return visits. Ideal region for pilot launches, premium offerings, referral programs, and lookalike modeling.', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 font-extrabold' };
    if (score >= 7) return { label: 'Loyal Region', desc: 'Strong repeat purchase rates. Healthy customer retention. Consistent ordering behavior across customer segments. Suitable for scaling marketing investments and expanding product offerings.', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' };
    if (score >= 4) return { label: 'Developing Region', desc: 'Moderate levels of repeat purchases and retention. Customers show growing familiarity with the platform. Opportunity exists to strengthen loyalty through targeted engagement and localized campaigns.', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
    return { label: 'Emerging Region', desc: 'Limited repeat purchasing behavior. Low customer retention. Primarily driven by new customer acquisition offline. Requires awareness campaigns and physical trust-building initiatives.', color: 'bg-red-500/15 text-red-500 border-red-500/30' };
  };

  // Convert factors into a simple array for Recharts radar chart visualization
  const radarData = useMemo(() => {
    const f = selectedDistrict.factors;
    return [
      { subject: 'Net Coverage', A: f.mobileInternetCoverage },
      { subject: 'Broadband', A: f.broadbandPenetration },
      { subject: 'Net Quality', A: f.averageNetworkQuality },
      { subject: 'UPI Adoption', A: f.upiAdoption / 10 },
      { subject: 'Online Pay Rate', A: f.onlinePaymentSuccessRate / 10 },
      { subject: 'Cart Rate', A: f.addToCartRate / 10 },
      { subject: 'Conv Rate', A: f.firstOrderConversionRate },
    ];
  }, [selectedDistrict]);

  // Compute weighted loyalty parameters to illustrate Feature 15 formula:
  // Repeat Purchase Rate (40%), Retention Rate (25%), Orders per Customer (20%), Organic Return Rate (15%)
  const loyaltyBreakdownData = useMemo(() => {
    const lf = selectedDistrict.loyaltyFactors;
    return [
      { name: 'Repeat Purchase Rate (40%)', value: lf.repeatPurchaseRate, color: '#10B981' },
      { name: 'Retention Rate (25%)', value: lf.retentionRate, color: '#3B82F6' },
      { name: 'Organic Return Rate (15%)', value: lf.organicReturnRate, color: '#F59E0B' },
      { name: 'Orders per Cust (20%)', value: Math.round(lf.ordersPerCustomer * 15), color: '#8B5CF6' }, // scaled for comparison
    ];
  }, [selectedDistrict]);

  return (
    <div className="space-y-6">
      
      {/* Regional Potential Headline Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight">Geographic Potential & Digital Accessibility Dashboard</h2>
          <p className="text-slate-400 text-xs">
            Analyzing regional loyalty indices, network coverage metrics, device readiness and payment habits to identify expansion holdouts.
          </p>
        </div>
        
        {/* Rapid summary badge */}
        <div className="flex gap-4 items-center bg-slate-950/60 p-4 rounded-xl border border-slate-850">
          <Globe className="w-8 h-8 text-emerald-400 shrink-0" />
          <div className="text-xs">
            <span className="block text-slate-500 font-bold font-mono">PRIORITY OPPORTUNITY</span>
            <span className="block text-sm text-white font-extrabold">Murshidabad District</span>
            <span className="block text-emerald-300 font-mono text-[10px]">High traffic, low conversion region (Unlock Potential)</span>
          </div>
        </div>
      </div>

      {/* Grid containing Districts Sidebar Selection on the left and comparative analytics panel on the right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* District list selector (Left Panel) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
            <Map className="w-4 h-4 text-emerald-400" />
            Districts Directory
          </h3>
          <p className="text-[11px] text-slate-550 leading-relaxed">
            Select a region below to audit local internet coverage, smartphone density, COD dependency and compute custom loyalty indices.
          </p>

          <div className="space-y-2 mt-2">
            {DISTRICT_INSIGHTS.map((dist) => {
              const active = dist.district === selectedDistrict.district;
              const loyaltyInfo = getLoyaltyClass(dist.loyaltyIndex);
              return (
                <div
                  key={dist.district}
                  onClick={() => {
                    setSelectedDistrict(dist);
                    setCoverageSimBonus(0);
                    setUpiSimBonus(0);
                  }}
                  className={`p-4 rounded-xl cursor-pointer border text-left transition-all ${
                    active 
                      ? 'bg-slate-950/90 border-emerald-500 shadow shadow-emerald-500/10' 
                      : 'bg-slate-950/40 border-slate-850 hover:border-slate-800 hover:bg-slate-950/60'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-bold text-sm leading-none ${active ? 'text-emerald-400' : 'text-slate-200'}`}>
                      {dist.district}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Score: {dist.digitalAccessibilityScore}/10</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-450 mt-1.5">
                    <span className="text-[10px]">{dist.state}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${loyaltyInfo.color}`}>
                      {loyaltyInfo.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Audit Details Panel (Right Panel) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
            
            {/* Upper profile header */}
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4 pb-4 border-b border-slate-800">
              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">AGRICULTURAL REGION STUDY</span>
                <h3 className="text-xl font-bold text-white flex items-center gap-1.5">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  {selectedDistrict.district} Zone Study
                </h3>
                <p className="text-xs text-slate-400">Regional state coverage: West Bengal farmers</p>
              </div>

              {/* Aggregated score cards */}
              <div className="flex gap-3">
                <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="block text-[8px] font-mono text-slate-500 font-bold uppercase">Accessibility</span>
                  <span className="block text-base font-bold font-mono text-white">{selectedDistrict.digitalAccessibilityScore} / 10</span>
                </div>
                <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 text-center">
                  <span className="block text-[8px] font-mono text-slate-500 font-bold uppercase">Loyalty Index</span>
                  <span className="block text-base font-bold font-mono text-emerald-400">{selectedDistrict.loyaltyIndex} / 10</span>
                </div>
              </div>
            </div>

            {/* Inference text block (Direct from BRD findings) */}
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-xl relative overflow-hidden flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="block text-[10px] font-mono text-slate-500 font-bold uppercase tracking-wider">Strategic Inference Finding</span>
                <p className="text-xs text-slate-350 leading-relaxed font-sans font-medium">
                  {selectedDistrict.inference}
                </p>
              </div>
            </div>

            {/* Visual Charts: Digital Accessibility Factors & Loyalty indexes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Radar Chart: Factors */}
              <div className="space-y-3 bg-slate-950/40 p-4 border border-slate-850 rounded-xl">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-slate-400">Accessibility Parameter Radar</h4>
                  <p className="text-[10px] text-slate-500">Maturity distribution across core connectivity & hardware vectors</p>
                </div>
                
                <div className="h-56 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                      <PolarGrid stroke="#1E293B" />
                      <PolarAngleAxis dataKey="subject" stroke="#64748B" fontSize={9} />
                      <PolarRadiusAxis angle={30} domain={[0, 10]} stroke="#334155" fontSize={8} />
                      <Radar name="Parameters" dataKey="A" stroke="#10B981" fill="#10B981" fillOpacity={0.15} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: Loyalty Factors Breakdown */}
              <div className="space-y-3 bg-slate-950/40 p-4 border border-slate-850 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-slate-400">Loyalty Drivers Formula Breakdown</h4>
                  <p className="text-[10px] text-slate-500">Feature 15 Weighted Index parameters (%)</p>
                </div>

                <div className="h-44 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      layout="vertical"
                      data={loyaltyBreakdownData}
                      margin={{ top: 5, right: 15, left: -25, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 100]} stroke="#475569" fontSize={9} />
                      <YAxis type="category" dataKey="name" stroke="#64748B" fontSize={8} />
                      <Tooltip formatter={(value: any) => [`${value}% equivalents`, 'Ratio']} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {loyaltyBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Subtext explaining Loyalty index driver logic */}
                <span className="block text-[10px] text-slate-500 italic font-mono leading-tight">
                  *Repeat Purchase Rate accounts for 40% of computed score weight.
                </span>
              </div>

            </div>

            {/* Core factors detailed telemetry parameters */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-slate-400">Regional Factor Audit Parameters</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                {/* Section A: Infrastructure & Device */}
                <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl space-y-2">
                  <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider pb-1 border-b border-slate-900 flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                    Network & Device Readiness
                  </span>
                  <div className="space-y-1.5 font-mono text-[11px] text-slate-350">
                    <div className="flex justify-between">
                      <span>4G Mobile Coverage:</span>
                      <span className="text-white font-bold">{selectedDistrict.factors.mobileInternetCoverage} / 10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Broadband Penetration:</span>
                      <span className="text-white font-bold">{selectedDistrict.factors.broadbandPenetration} / 10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Android OS Density:</span>
                      <span className="text-white font-bold">{selectedDistrict.factors.androidPenetration}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Smartphone Ownership:</span>
                      <span className="text-white font-bold">{selectedDistrict.factors.smartphoneOwnership}%</span>
                    </div>
                  </div>
                </div>

                {/* Section B: Commerce & Payments */}
                <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl space-y-2">
                  <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider pb-1 border-b border-slate-900 flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-blue-400" />
                    Payments & Commerce readiness
                  </span>
                  <div className="space-y-1.5 font-mono text-[11px] text-slate-350">
                    <div className="flex justify-between">
                      <span>UPI Adoption Share:</span>
                      <span className="text-white font-bold">{selectedDistrict.factors.upiAdoption}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Online Payment Success:</span>
                      <span className="text-white font-bold">{selectedDistrict.factors.onlinePaymentSuccessRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>COD Cash Dependency:</span>
                      <span className="text-amber-400 font-bold">{selectedDistrict.factors.codDependency}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conversion Rate threshold:</span>
                      <span className="text-white font-bold">{selectedDistrict.factors.firstOrderConversionRate}%</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Dynamic Forecast Scenario Toolulator (Feature 5.1) */}
            <div className="mt-4 p-5 bg-gradient-to-r from-emerald-950/10 to-slate-950 border border-emerald-900/30 rounded-xl space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-emerald-400 animate-spin" />
                <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider">Infrastructure Impact Scenario Toolulator</span>
              </div>
              <p className="text-xs text-slate-400">
                Simulate business interventions (such as sponsoring local UPI merchant kits or upgrading agricultural regional base towers) to see prediction updates on local digital readiness.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-350">Tower Infrastructure Sponsoring</span>
                    <span className="text-emerald-400 font-bold">+{coverageSimBonus} Coverage rating</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.5"
                    value={coverageSimBonus}
                    onChange={(e) => setCoverageSimBonus(parseFloat(e.target.value))}
                    className="w-full accent-emerald-550 cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-350">UPI Merchant Kits Onboarding</span>
                    <span className="text-emerald-400 font-bold">+{upiSimBonus} Payment score</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="0.5"
                    value={upiSimBonus}
                    onChange={(e) => setUpiSimBonus(parseFloat(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Dynamic computed output */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-850 text-xs">
                <p className="text-slate-400">
                  Computed update for <span className="text-white font-bold">{selectedDistrict.district}</span>:
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 line-through font-mono">Base: {selectedDistrict.digitalAccessibilityScore}</span>
                  <span className="text-white font-bold bg-emerald-600/20 border border-emerald-500/40 py-1 px-3 rounded-lg text-sm font-mono">
                    🎯 Projected: {simulatedAccessibilityScore} / 10
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Regional Loyalty index logic and classification details */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
            <h4 className="text-sm font-bold text-white">Loyalty Index Level & Policy Matrix</h4>
            <p className="text-xs text-slate-400">
              Computed class and strategic policies corresponding to the selected zone's {selectedDistrict.loyaltyIndex} rating:
            </p>

            <div className="p-5 bg-slate-950/60 rounded-xl border border-slate-850 space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">Computed Regional Loyalty Class</span>
                  <span className="block text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    {getLoyaltyClass(selectedDistrict.loyaltyIndex).label}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-mono">Loyalty Ind: {selectedDistrict.loyaltyIndex}</span>
              </div>
              <p className="text-xs text-slate-350 leading-relaxed">
                {getLoyaltyClass(selectedDistrict.loyaltyIndex).desc}
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
