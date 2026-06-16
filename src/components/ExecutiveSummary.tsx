import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertOctagon, 
  DollarSign, 
  Clock, 
  HelpCircle, 
  Heart, 
  Search, 
  FileText, 
  Layers, 
  Globe, 
  CheckCircle,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { 
  BRD_METRICS 
} from '../data';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line,
  CartesianGrid,
  AreaChart,
  Area
} from 'recharts';

export default function ExecutiveSummary() {
  const m = BRD_METRICS;

  // Render tooltip formatted with Rupee symbol
  const currencyTooltipFormatter = (value: any) => [`₹${value} Lakhs`, 'Amount'];
  const countTooltipFormatter = (value: any) => [`${value} Customers`, 'Count'];

  // Simulated trend data for Churn Risk and Engagement over recent 6 months
  const monthlyTrendData = [
    { month: 'Jan', active: 32, churnRisk: 22, engagement: 65 },
    { month: 'Feb', active: 34, churnRisk: 21, engagement: 68 },
    { month: 'Mar', active: 35, churnRisk: 19, engagement: 72 },
    { month: 'Apr', active: 36, churnRisk: 18, engagement: 74 },
    { month: 'May', active: 37, churnRisk: 18, engagement: 76 },
    { month: 'Jun', active: 38, churnRisk: 18, engagement: 78 } // Current (7.8 score matches June)
  ];  return (
    <div className="space-y-6">
      {/* Upper Status Banner & Health Gauge */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        <div className="space-y-1.5 text-center lg:text-left">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Executive Dashboard Summary</h2>
          <p className="text-slate-500 text-xs max-w-xl">
            Real-time visual consensus of customer engagement, active churn risk trends, purchase readiness, and future revenue opportunity indexes from the PrraniGanga customer records.
          </p>
        </div>
        
        {/* Health Score Circular Gauge */}
        <div className="flex items-center gap-4 bg-slate-50 py-3 px-5 rounded-2xl border border-slate-150 self-stretch justify-center lg:justify-start">
          <div className="relative flex items-center justify-center">
            {/* Simple circle wrapper bar */}
            <svg className="w-16 h-16 transform -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#E2E8F0" strokeWidth="6" fill="transparent" />
              <circle cx="32" cy="32" r="28" stroke="#4F46E5" strokeWidth="6" strokeDasharray={175} strokeDashoffset={175 - (175 * m.platformHealthScore) / 10} strokeLinecap="round" fill="transparent" />
            </svg>
            <span className="absolute text-base font-bold text-slate-800 font-mono">{m.platformHealthScore}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase font-bold tracking-wider font-mono text-slate-500">PLATFORM HEALTH</span>
            <span className="block text-sm font-bold text-indigo-600">7.8 / 10 (Healthy Base)</span>
            <span className="block text-[11px] text-slate-500">Based on weighted engagement levels</span>
          </div>
        </div>
      </div>

      {/* Top Level Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* Revenue at Risk Card */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Revenue At Risk</span>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="space-y-1">
            <span className="block text-2.5xl font-bold font-mono text-slate-900">₹{m.revenueAtRisk.revenueAtRiskLakhs} Lakhs</span>
            <p className="text-xs text-slate-550">
              Across <span className="text-red-500 font-semibold">{m.revenueAtRisk.customersAtRisk}</span> decaying or dormant farmers
            </p>
          </div>
          <div className="pt-2 border-t border-slate-150 flex items-center justify-between text-[11px]">
            <span className="text-slate-450">Total historical value</span>
            <span className="text-slate-700 font-mono font-bold">₹{m.revenueAtRisk.historicalSpendLakhs} Lakhs</span>
          </div>
        </div>

        {/* Purchase Cycle Overdue */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Cycle Overdue</span>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>
          <div className="space-y-1">
            <span className="block text-2.5xl font-bold font-mono text-slate-900">₹{m.attentionMetrics.purchaseCycleOverdue.potentialRevenueLakhs} Lakhs</span>
            <p className="text-xs text-slate-550">
              Expected from <span className="text-amber-600 font-semibold">{m.attentionMetrics.purchaseCycleOverdue.customers.toLocaleString()}</span> customers
            </p>
          </div>
          <div className="pt-2 border-t border-slate-150 flex items-center justify-between text-[11px]">
            <span className="text-slate-450">Avg delay threshold</span>
            <span className="text-amber-600 font-mono font-bold">{m.attentionMetrics.purchaseCycleOverdue.avgDelayDays} Days Overdue</span>
          </div>
        </div>

        {/* High-Intent Non-Buyers */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Intent Non-Consolidated</span>
            <Eye className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-1">
            <span className="block text-2.5xl font-bold font-mono text-slate-900">{m.attentionMetrics.highIntentNonBuyers.customers}</span>
            <p className="text-xs text-slate-550">Farmers browsed 5+ times with no transactions</p>
          </div>
          <div className="pt-2 border-t border-slate-150 text-slate-500 text-[11px]">
            🔥 High-priority leads primed for proactive <span className="text-indigo-600 font-bold">Sales Calls</span>
          </div>
        </div>

        {/* Dynamic Launchpad / Conversion Speed */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Search Conversion Rate</span>
            <CheckCircle className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-1">
            <span className="block text-2.5xl font-bold font-mono text-slate-900">{m.searchBehaviorReport.searchToPurchaseRate}%</span>
            <p className="text-xs text-slate-550">Of search actions lead to completed orders</p>
          </div>
          <div className="pt-2 border-t border-slate-150 flex items-center justify-between text-[11px] text-slate-500">
            <span>Platform search efficacy</span>
            <span className="text-indigo-650 font-bold">Healthy Range</span>
          </div>
        </div>

      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Chart 1: Customer Lifecycle Distribution Pie */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Customer Lifecycle Distribution</h3>
            <p className="text-xs text-slate-500 mb-4">Overall active share of customer base mapped by interaction levels</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={m.lifecycleDistribution}
                    className="focus:outline-none"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {m.lifecycleDistribution.map((entry, index) => {
                      // overwrite standard dark green with indigo hues for a neat aesthetic
                      const indColors = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];
                      const col = indColors[index % indColors.length];
                      return <Cell key={`cell-${index}`} fill={col} />;
                    })}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value}% (Sample Base)`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-2">
              {m.lifecycleDistribution.map((item, index) => {
                const indColors = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];
                const col = indColors[index % indColors.length];
                return (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-150">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col }} />
                      <span className="text-xs text-slate-600 font-medium">{item.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-800">{item.value}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart 2: Next Purchase Readiness Forecast */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Next Purchase Readiness</h3>
            <p className="text-xs text-slate-500 mb-4">Immediate, monthly, and secondary forecasted purchase timeline metrics</p>
          </div>

          <div className="h-60 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={m.nextPurchaseReadiness}
                margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis 
                  dataKey="segment" 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false}
                />
                <Tooltip formatter={countTooltipFormatter} contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {m.nextPurchaseReadiness.map((entry, index) => {
                    const barColors = ['#10B981', '#3B82F6', '#6366F1'];
                    return <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-around bg-slate-50 p-3 rounded-xl border border-slate-150 text-center">
            {m.nextPurchaseReadiness.map((entry, index) => (
              <div key={index} className="space-y-0.5">
                <span className="block text-[10px] uppercase font-bold text-slate-450 font-mono tracking-wider">
                  {index === 0 ? '7D High Alert' : index === 1 ? '30D Conversion' : '60D+ Pipeline'}
                </span>
                <span className="block text-base font-extrabold text-slate-800">{entry.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Funnel & Platform LTV Metrics */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* first-time buyer funnel */}
        <div className="xl:col-span-2 bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">First-Time Buyer Funnel Timeline</h3>
            <p className="text-xs text-slate-500 mb-4">Progression steps monitoring new leads converting into their first agricultural order</p>
          </div>
          
          <div className="space-y-4 my-2">
            {m.firstTimeBuyerFunnel.map((step, idx) => {
              // calculate percentage of top visitor size
              const maxVal = m.firstTimeBuyerFunnel[0].count;
              const percent = Math.round((step.count / maxVal) * 100);
              const funnelColors = ['#4F46E5', '#6366F1', '#818CF8', '#A5B4FC', '#C7D2FE'];
              const customCol = funnelColors[idx % funnelColors.length];
              
              return (
                <div key={step.name} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-slate-700">
                      Step {step.step}: {step.name}
                    </span>
                    <span className="font-mono text-slate-500 font-bold">
                      {step.count.toLocaleString()} <span className="text-[10px] text-slate-400">({percent}%)</span>
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-5 rounded-lg overflow-hidden border border-slate-200 flex items-center relative">
                    <div 
                      className="h-full rounded-r-md transition-all duration-500"
                      style={{ 
                        width: `${percent}%`, 
                        backgroundColor: customCol,
                        opacity: 0.9
                      }} 
                    />
                    <span className="absolute left-2.5 text-[9px] font-mono text-slate-700 font-semibold tracking-wide">
                      {percent}% of total discovery volume
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-indigo-700 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100 mt-2">
            💡 <span className="font-bold text-indigo-900">Funnel Insight:</span> There is a steep drop-off between Exploring and High Intent. Providing a targeted, region-specific "Welcome Voucher Combo" can substantially bridge this ready-to-purchase threshold.
          </div>
        </div>

        {/* External Platform Acquisitions & LTV */}
        <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">Acquisition Channel LTV</h3>
            <p className="text-xs text-slate-500 mb-4">Best-performing acquisition channels based on customer lifetime value</p>
          </div>

          <div className="space-y-4 my-3">
            {m.externalPlatformsLTV.map((plat) => (
              <div key={plat.platform} className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800">{plat.platform}</span>
                  <span className="text-xs font-semibold text-indigo-650 font-mono">₹{(plat.avgLTV/100000).toFixed(2)}L Average LTV</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>Repeat-Purchase Rate</span>
                    <span className="font-mono text-slate-700">{plat.repeatRate}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full" style={{ width: `${plat.repeatRate}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-450 italic text-center font-mono">
            *Source signals updated hourly from telemetry parameters.
          </p>
        </div>

      </div>

      {/* Monthly Trends Integration */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        
        {/* Line Chart: Churn Risk and Engagement Trends */}
        <div>
          <h3 className="text-base font-bold text-slate-900 mb-1">Platform Engagement & Churn Trend</h3>
          <p className="text-xs text-slate-500 mb-4">6-Month historical trace representing aggregated loyalty health vs Churn risk percentage index</p>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyTrendData}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" stroke="#64748B" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '8px' }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  name="Engagement Momentum Score (%)" 
                  stroke="#4F46E5" 
                  strokeWidth={2.5} 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="churnRisk" 
                  name="Aggregated Churn Index (%)" 
                  stroke="#EF4444" 
                  strokeWidth={2.5} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Business Category Demand Breakdown & Action Matrix */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900">Aggregated Agricultural Demand</h3>
          <p className="text-xs text-slate-500">Active category view shares and month-on-month trend directions</p>

          <div className="space-y-3">
            {m.searchBehaviorReport.categoryDemandShare.map((cat) => (
              <div key={cat.category} className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-150">
                <div className="min-w-0">
                  <span className="block text-sm font-semibold text-slate-800 truncate">{cat.category}</span>
                  <span className="text-[11px] text-slate-500 font-mono">Category Volume Share</span>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="block text-sm font-bold text-slate-900 font-mono">{cat.share}%</span>
                    <span className="block text-[10px] text-indigo-600 font-bold font-mono">{cat.trend}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border border-slate-150 p-3.5 rounded-xl bg-indigo-50/20 text-xs space-y-1">
            <span className="font-bold text-slate-800 block">General Conversion Path Rule Matrix:</span>
            <ul className="list-disc pl-4 space-y-1 text-slate-650 text-[11px]">
              <li>High-Intent Leads/Customers immediately routing to auto <span className="text-indigo-600 font-bold">Sales Call dispatch queue</span></li>
              <li>Moderate Buying signals mapped to smart <span className="text-indigo-500 font-bold">Cross-Category Recommendations</span></li>
              <li>Standard/Low intent segments routing to general <span className="text-amber-600 font-bold">Awareness Campaigns</span></li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  );
}
