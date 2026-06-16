import React, { useState, useMemo } from 'react';
import { 
  GENERATED_CUSTOMERS 
} from '../data';
import { Customer } from '../types';
import { 
  Search, 
  Filter, 
  Sliders, 
  AlertTriangle, 
  DollarSign, 
  ShoppingBag, 
  UserCheck, 
  Laptop, 
  Smartphone, 
  Calendar, 
  Percent, 
  MapPin, 
  Eye, 
  Coins, 
  TrendingUp, 
  ChevronRight,
  Info,
  Check,
  X,
  Compass
} from 'lucide-react';

export default function CustomerIntelligence() {
  const [customersList, setCustomersList] = useState<Customer[]>(GENERATED_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('All');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('All');
  const [selectedDevice, setSelectedDevice] = useState<string>('All');
  const [selectedMaturity, setSelectedMaturity] = useState<string>('All');
  const [onlyDealers, setOnlyDealers] = useState<boolean>(false);
  const [hasLtvMin, setHasLtvMin] = useState<number>(0);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Filter notes
  const [customerNotes, setCustomerNotes] = useState<{ [id: string]: string }>({});
  const [noteText, setNoteText] = useState('');

  // Filtering Customers
  const filteredCustomers = useMemo(() => {
    return customersList.filter((customer) => {
      // search match
      const textToSearch = `${customer.name} ${customer.email} ${customer.phone} ${customer.district} ${customer.recommendedProduct}`.toLowerCase();
      const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());

      // risk match
      const matchesRisk = selectedRisk === 'All' || customer.churnRisk === selectedRisk;

      // frequency match
      const matchesFreq = selectedFrequency === 'All' || customer.purchaseFrequency === selectedFrequency;

      // device match
      const matchesDevice = selectedDevice === 'All' || customer.deviceType === selectedDevice;

      // digital vs physical maturity
      const matchesMaturity = selectedMaturity === 'All' || customer.digitalMaturity === selectedMaturity;

      // Special dealer conditions (Bulk buy score >= 9 or Orders > 10,000 threshold or Desktop device with big orders)
      let matchesDealer = true;
      if (onlyDealers) {
        matchesDealer = customer.averageOrderValue >= 10000 || customer.bulkBuyerScore >= 9;
      }

      // minimum LTV
      const matchesLtv = customer.lifetimeValue >= hasLtvMin * 10000;

      return matchesSearch && matchesRisk && matchesFreq && matchesDevice && matchesMaturity && matchesDealer && matchesLtv;
    });
  }, [customersList, searchQuery, selectedRisk, selectedFrequency, selectedDevice, selectedMaturity, onlyDealers, hasLtvMin]);

  // Handle Note Save
  const handleSaveNote = (id: string) => {
    if (!noteText.trim()) return;
    setCustomerNotes(prev => ({ ...prev, [id]: noteText }));
    setNoteText('');
  };

  // Status mapping
  const getRiskStyles = (status: Customer['churnRisk']) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'High Intent':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case 'Monitoring':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'At-Risk':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'Dormant':
        return 'bg-slate-100 text-slate-705 border-slate-205';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const getMaturityLabel = (type: Customer['digitalMaturity']) => {
    switch (type) {
      case 'DIGITAL_NATIVE': return { text: 'Digital Native (App/UPI)', styles: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      case 'DIGITAL_LEARNING': return { text: 'Digital Learning (Mixed)', styles: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
      case 'PHYSICAL_PREFERRED': return { text: 'Offline / COD Heavy', styles: 'bg-amber-50 text-amber-800 border-amber-200' };
    }
  };

  // special actions based on Price Sensitivity (Feature 5 from Section B BRD)
  const getActionRecommendation = (score: number) => {
    if (score >= 7) {
      return { action: 'High Sensitivity → Push Discounts/Coupons', color: 'bg-amber-50 text-amber-900 border-amber-200', note: 'Frequent price comparison. Highly likely to convert via combo bundles or target price-drop alerts.' };
    }
    return { action: 'Low Sensitivity → Propose Premium Tier', color: 'bg-emerald-50 text-emerald-900 border-emerald-200', note: 'Prioritizes quality over discounts. Eligible for subscription re-order triggers or premium launches.' };
  };

  // Special Dealer tracker criteria (orders above 10K, category frequency)
  const isHighValueDealer = (cust: Customer) => {
    return cust.averageOrderValue >= 10000;
  };

  return (
    <div className="space-y-6">
      
      {/* Segment B Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1.5">
            <span className="block text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">AGGREGATED LIFETIME VALUE</span>
            <span className="block text-xl font-bold font-mono text-slate-900">₹31.54 Lakhs</span>
            <span className="block text-[11px] text-emerald-700 font-mono flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              +14.5% month-on-month velocity
            </span>
          </div>
          <Coins className="w-10 h-10 text-emerald-600/15 shrink-0" />
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1.5">
            <span className="block text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">ACTIVE ACQUISITION SOURCE LTV</span>
            <span className="text-xs font-bold text-slate-800 block">YouTube Referrals: ₹24,500</span>
            <span className="block text-[11px] text-slate-500 italic">WhatsApp second place at ₹14,200 avg</span>
          </div>
          <Laptop className="w-10 h-10 text-indigo-600/15 shrink-0" />
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-1.5">
            <span className="block text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">SPECIAL RULE DEALER COUNT</span>
            <span className="block text-xl font-bold font-mono text-slate-900">
              {customersList.filter(isHighValueDealer).length} Assigned
            </span>
            <span className="text-[11px] text-slate-500">Average Order Value above ₹10,000 threshold</span>
          </div>
          <UserCheck className="w-10 h-10 text-indigo-650/15 shrink-0" />
        </div>

      </div>        {/* Main filterable directory body */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Advanced Customer Filters */}
        <div className="bg-white border border-slate-200 shadow-sm p-4.5 rounded-2xl space-y-5 lg:sticky lg:top-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Intelligence Filters
            </h3>
            {(selectedRisk !== 'All' || selectedFrequency !== 'All' || selectedDevice !== 'All' || selectedMaturity !== 'All' || onlyDealers || hasLtvMin > 0 || searchQuery !== '') && (
              <button 
                onClick={() => {
                  setSelectedRisk('All');
                  setSelectedFrequency('All');
                  setSelectedDevice('All');
                  setSelectedMaturity('All');
                  setOnlyDealers(false);
                  setHasLtvMin(0);
                  setSearchQuery('');
                }}
                className="text-[10px] text-indigo-600 font-mono hover:underline font-bold"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Search Term */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Customer Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, recommended product, tag..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-450"
              />
            </div>
          </div>

          {/* Customer Risk status */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Customer Health Risk (BRD)</label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
            >
              <option value="All">All Customer Segments</option>
              <option value="Active">Active Buyer (Healthy base)</option>
              <option value="High Intent">High Intent Customer</option>
              <option value="Monitoring">Monitoring Segment</option>
              <option value="At-Risk">At-Risk Customer</option>
              <option value="Dormant">Dormant Customer</option>
            </select>
          </div>

          {/* Purchase Frequency */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Purchase Frequencies</label>
            <select
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer"
            >
              <option value="All">All Frequencies</option>
              <option value="Weekly">Weekly</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Monthly">Monthly</option>
              <option value="Occasional">Occasional</option>
              <option value="One-Time">One-Time</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Device Type Tracker */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Browsing / Purchase Device</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { key: 'All', icon: Compass },
                { key: 'Mobile', icon: Smartphone },
                { key: 'Desktop', icon: Laptop }
              ].map((device) => {
                const IconComp = device.icon;
                return (
                  <button
                    key={device.key}
                    onClick={() => setSelectedDevice(device.key)}
                    className={`py-1.5 px-1.5 text-[10px] font-bold rounded-lg border flex flex-col items-center gap-1 transition-all ${
                      selectedDevice === device.key 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-850'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{device.key}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[9px] text-slate-500 italic mt-1 font-mono">
              *Desktop + large orders = dealer signals tracking
            </p>
          </div>

          {/* Digital vs Physical Maturity */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Digital Maturity Class</label>
            <select
              value={selectedMaturity}
              onChange={(e) => setSelectedMaturity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all select-none cursor-pointer"
            >
              <option value="All">All Maturity States</option>
              <option value="DIGITAL_NATIVE">DIGITAL_NATIVE (Online/App)</option>
              <option value="DIGITAL_LEARNING">DIGITAL_LEARNING (Mixed)</option>
              <option value="PHYSICAL_PREFERRED">PHYSICAL_PREFERRED (COD-Heavy)</option>
            </select>
          </div>

          {/* Slide Filter: Lifetime Value Min */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Minimum LTV Tier</label>
               <span className="font-mono text-indigo-650 font-bold">₹{(hasLtvMin).toLocaleString()} Lakhs+</span>
            </div>
            <input 
              type="range"
              min="0"
              max="20"
              step="1"
              value={hasLtvMin}
              onChange={(e) => setHasLtvMin(parseInt(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          {/* Special rule Checkbox Tracker */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="block text-[11px] font-bold text-slate-800 uppercase font-mono">Special Dealer Rule</span>
              <span className="block text-[9px] text-slate-500 leading-tight">Filter orders &gt; ₹10,000 threshold or high bulk scoring</span>
            </div>
            <button 
              onClick={() => setOnlyDealers(!onlyDealers)}
              className={`w-10 h-6 rounded-full transition-all duration-200 relative flex items-center p-1 cursor-pointer ${
                onlyDealers ? 'bg-indigo-650' : 'bg-slate-100 border border-slate-250'
              }`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${onlyDealers ? 'translate-x-4' : 'translate-x-0'}`} />
            </button>
          </div>

        </div>

        {/* Customer Directory Area */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Active filter display */}
          <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl text-xs text-slate-500 shadow-sm select-none">
            <span className="font-bold text-slate-700">Acquired Filters:</span>
            {selectedRisk !== 'All' && <span className="bg-slate-105 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-mono text-slate-705">Risk: {selectedRisk}</span>}
            {selectedFrequency !== 'All' && <span className="bg-slate-105 border border-slate-200 px-2.5 py-1 rounded text-[11px] text-slate-705">Freq: {selectedFrequency}</span>}
            {selectedDevice !== 'All' && <span className="bg-slate-105 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-mono text-slate-705">Device: {selectedDevice}</span>}
            {selectedMaturity !== 'All' && <span className="bg-slate-105 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-mono text-slate-705">Maturity: {selectedMaturity}</span>}
            {hasLtvMin > 0 && <span className="bg-slate-105 border border-slate-200 px-2.5 py-1 rounded text-[11px] font-mono text-slate-705">LTV &gt; ₹{hasLtvMin}L</span>}
            {onlyDealers && <span className="bg-indigo-50 border border-indigo-200 text-indigo-750 px-2.5 py-1 rounded text-[11px] font-bold">★ Dealer Filter Active</span>}
            {!searchQuery && selectedRisk === 'All' && selectedFrequency === 'All' && selectedDevice === 'All' && selectedMaturity === 'All' && !onlyDealers && hasLtvMin === 0 && (
              <span className="text-slate-450 italic text-[11px]">Displaying all existing customer database records dynamically.</span>
            )}
          </div>

          {/* Customer Table/List entries */}
          {filteredCustomers.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-2">
              <Info className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="font-semibold text-slate-800">No Customer Profiles found.</p>
              <p className="text-xs">Loosen some filters to explore other customer profiles.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredCustomers.map((cust) => {
                const riskStyle = getRiskStyles(cust.churnRisk);
                const mat = getMaturityLabel(cust.digitalMaturity);
                const isOverdue = cust.purchaseCycleOverdueDays > 0;
                const isDealer = isHighValueDealer(cust);

                return (
                  <div
                    key={cust.id}
                    onClick={() => setSelectedCustomer(cust)}
                    className={`bg-white border ${
                      selectedCustomer?.id === cust.id ? 'border-indigo-500 ring-2 ring-indigo-50 shadow-md' : 'border-slate-200 hover:border-slate-350 hover:shadow-sm'
                    } p-4.5 rounded-xl cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4`}
                  >
                    {/* Customer Core Identity */}
                    <div className="flex items-start gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-50 flex flex-col items-center justify-center border border-slate-200 text-slate-500 shrink-0 select-none">
                        <span className="text-[9px] font-bold font-mono">AGE</span>
                        <span className="text-xs font-bold text-slate-800 font-mono">{cust.age}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 truncate">{cust.name}</h4>
                          {isDealer && (
                            <span className="bg-indigo-50 border border-indigo-200 text-indigo-750 text-[9px] px-1.5 py-0.5 rounded font-bold font-mono tracking-wider">
                              ★ SPECIAL RULE DEALER
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {cust.district}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-indigo-650 font-bold">{cust.purchaseFrequency} Frequency</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Metric Snapshot */}
                    <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end border-t border-slate-100 md:border-0 pt-3 md:pt-0">
                      
                      {/* Overdue/Cycle indicator */}
                      <div>
                        {isOverdue ? (
                          <div className="text-right">
                            <span className="bg-red-50 border border-red-200 text-red-800 text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded flex items-center gap-1 inline-flex">
                              <AlertTriangle className="w-3 h-3 text-red-500" /> Overdue
                            </span>
                            <span className="block text-[10px] text-red-650 font-mono font-medium">{cust.purchaseCycleOverdueDays} days delay</span>
                          </div>
                        ) : (
                          <div className="text-right">
                            <span className="bg-emerald-55/40 border border-emerald-200 text-emerald-800 text-[10px] uppercase font-bold font-mono px-2 py-0.5 rounded inline-flex">
                              On Track
                            </span>
                            <span className="block text-[10px] text-slate-500 font-mono italic">Expected Next: {cust.predictedNextPurchaseDate}</span>
                          </div>
                        )}
                      </div>

                      {/* LTV & order values */}
                      <div className="text-right">
                        <span className="block text-[10px] text-slate-450 font-mono uppercase font-bold">LIFETIME spend</span>
                        <span className="block text-sm font-bold font-mono text-slate-900">₹{cust.lifetimeValue.toLocaleString()}</span>
                        <span className="block text-[10px] text-slate-500 font-mono">Avg order: ₹{cust.averageOrderValue.toLocaleString()}</span>
                      </div>

                      {/* Status Risk Pill */}
                      <div className="text-right min-w-[120px]">
                        <span className={`block text-[10px] font-bold font-mono border uppercase tracking-wider text-center py-1 px-2.5 rounded-full ${riskStyle}`}>
                          {cust.churnRisk}
                        </span>
                      </div>

                      {/* Action Chevron */}
                      <ChevronRight className="w-5 h-5 text-slate-400 hidden md:block" />

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Slide out customer detail view */}
      {selectedCustomer && (() => {
        const styleRisk = getRiskStyles(selectedCustomer.churnRisk);
        const sensitivityAction = getActionRecommendation(selectedCustomer.actualPriceSensitivityScore);
        const mat = getMaturityLabel(selectedCustomer.digitalMaturity);

        return (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end">
            <div className="w-full max-w-2xl bg-white h-screen shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto text-slate-800">
              
              {/* Profile body content container */}
              <div className="p-6 space-y-6">
                
                {/* Header Profile Identity */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-indigo-650 uppercase tracking-widest font-bold flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-indigo-505" /> EXISTING CUSTOMER PROFILE DOSSIER
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      {selectedCustomer.name}
                      {isHighValueDealer(selectedCustomer) && (
                        <span className="bg-indigo-50 border border-indigo-200 text-indigo-755 text-[10px] py-0.5 px-2 rounded font-mono font-bold">
                          ★ SPECIAL RULE DEALER
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      {selectedCustomer.email} | {selectedCustomer.phone}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCustomer(null);
                      setNoteText('');
                    }}
                    className="p-1.5 bg-slate-50 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scorecards grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">Customer Health Segment</span>
                    <span className={`inline-block text-[10px] py-0.5 px-2.5 border uppercase font-mono font-bold rounded-full ${styleRisk}`}>
                      {selectedCustomer.churnRisk}
                    </span>
                    <span className="block text-[11px] text-slate-500 shrink-0 pt-1 font-mono">
                      Loyalty: {selectedCustomer.loyaltyScore} / 10
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">Estimated LTV</span>
                    <span className="block text-base font-extrabold font-mono text-slate-900">₹{selectedCustomer.lifetimeValue.toLocaleString()}</span>
                    <span className="block text-[10px] text-slate-500 font-mono italic">
                      Over {selectedCustomer.totalOrders} total orders
                    </span>
                  </div>

                  <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-205 space-y-1">
                    <span className="block text-[9px] uppercase font-bold text-indigo-800 font-mono tracking-wider">Actual Price Sensitivity</span>
                    <span className="block text-base font-extrabold font-mono text-indigo-900">{selectedCustomer.actualPriceSensitivityScore} / 10</span>
                    <span className="block text-[10px] text-indigo-850 truncate font-medium">
                      {selectedCustomer.actualPriceSensitivityScore >= 7 ? '💰 Highly sensitive' : '💎 Prioritizes quality'}
                    </span>
                  </div>

                </div>

                {/* Overdue details & next expected purchase cycles */}
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <h4 className="font-bold text-slate-600 uppercase tracking-wider text-[10px] font-mono">Predictive Purchase Cycle Prediction</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Predicted Next Order Date</span>
                      <span className="text-slate-800 font-medium font-mono flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-slate-450" />
                        {selectedCustomer.predictedNextPurchaseDate}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Cycle Prediction Confidence</span>
                      <span className="font-bold font-mono text-indigo-600">
                        {selectedCustomer.confidenceScore}% Confidence Index
                      </span>
                    </div>

                    {selectedCustomer.purchaseCycleOverdueDays > 0 && (
                      <div className="col-span-2 bg-red-50 border border-red-200 p-3 rounded-lg flex items-center gap-3 text-red-800">
                        <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
                        <div>
                          <p className="font-bold">Estimated Order Date Overdue</p>
                          <p className="text-[11px] text-slate-600">This client has exceeded their typical agricultural purchase pipeline by <strong className="text-red-700">{selectedCustomer.purchaseCycleOverdueDays} days</strong>. Risk team warns immediate intervention needed.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Viewed but Not Purchased - Upsell Catalog */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-705 uppercase tracking-wider font-mono">Products Viewed but Not Purchased (Cross-sell / Upsell candidates)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {selectedCustomer.viewedButNotPurchased.map((product) => (
                      <div key={product} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2">
                        <span className="text-slate-700 font-medium truncate font-sans">{product}</span>
                        <span className="bg-indigo-50 border border-indigo-150 text-indigo-750 text-[9px] px-1.5 py-0.5 rounded font-bold font-mono shrink-0 uppercase">
                          Viewed 3x
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Recommended next order */}
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                    <span className="block text-[9px] text-slate-500 uppercase font-bold font-mono">System Recommended Immediate SKU Purchase</span>
                    <p className="text-indigo-650 font-bold text-sm">🎯 {selectedCustomer.recommendedProduct}</p>
                    <p className="text-slate-500 text-[11px]">Recommended based on regional {selectedCustomer.district} farm trends and typical livestock maturation cycles.</p>
                  </div>
                </div>

                {/* Search Behaviour Reports */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 text-xs">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] font-mono">Platform Search telemetry & Efficacy</span>
                    <span className="text-slate-450 font-mono text-[10px]">Efficacy Ratio</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 font-mono text-[11px]">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-500 uppercase">Search-to-Purchase Conversion</span>
                      <span className="text-slate-800 font-bold text-sm">{selectedCustomer.searchBehavior.searchToPurchaseRate}% Conversion</span>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-500 uppercase">Zero-Result Query Count</span>
                      <span className="text-slate-800 font-bold text-sm">{selectedCustomer.searchBehavior.zeroResultCount} occurrences</span>
                    </div>

                    {selectedCustomer.searchBehavior.frequentMisspellings.length > 0 && (
                      <div className="col-span-2 space-y-1 pt-2 border-t border-slate-200">
                        <span className="block text-[10px] text-slate-500 uppercase">Recently Corrected Search Terms</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {selectedCustomer.searchBehavior.frequentMisspellings.map(t => (
                            <span key={t} className="bg-white text-slate-700 text-[10px] px-2 py-0.5 rounded border border-slate-200 font-mono">
                              "{t}"
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Core Segment Action recommended action */}
                <div className={`p-4 rounded-xl border border-slate-200 border-l-4 border-l-indigo-650 bg-indigo-50/50 space-y-2`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-slate-600">Recommended Action Matrix Option</span>
                    <Percent className="w-4 h-4 text-indigo-500" />
                  </div>
                  <span className="block text-sm font-bold text-indigo-900 leading-snug">{sensitivityAction.action}</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{sensitivityAction.note}</p>
                </div>

                {/* Geography, Device & Demographics info */}
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] font-mono">Session Devices & Digital Maturity</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Acquisition Source Channel</span>
                      <span className="text-slate-800 font-medium font-mono">{selectedCustomer.acquisitionSource}</span>
                    </div>

                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Primary purchasing device</span>
                      <span className="text-slate-800 font-medium font-mono flex items-center gap-1.5">
                        {selectedCustomer.deviceType === 'Desktop' ? <Laptop className="w-4 h-4 text-indigo-500" /> : <Smartphone className="w-4 h-4 text-indigo-500" />}
                        {selectedCustomer.deviceType}
                      </span>
                    </div>

                    <div className="col-span-2 space-y-1 pt-2 border-t border-slate-200">
                      <span className="block text-[10px] text-slate-500 font-mono uppercase">Digital vs Physical Maturity Stage</span>
                      <span className={`inline-block text-[11px] px-2 py-1 border rounded-lg font-bold ${mat?.styles}`}>
                        {mat?.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Follow up Comment logs */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider font-mono text-slate-500">Activity Note Logger</label>
                  {customerNotes[selectedCustomer.id] ? (
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs">
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono pb-1 mb-1 border-b border-slate-200">
                        <span>Customer Service Log Note</span>
                        <span>Just now</span>
                      </div>
                      <p className="text-slate-800 italic">" {customerNotes[selectedCustomer.id]} "</p>
                      <button 
                        onClick={() => setCustomerNotes(prev => {
                          const copy = { ...prev };
                          delete copy[selectedCustomer.id];
                          return copy;
                        })}
                        className="text-[10px] text-red-650 hover:underline mt-2 font-mono block text-right"
                      >
                        Delete note entry
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea 
                        rows={2}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Log notes eg. 'Approved 5% dealer discount package', 'Enrolled in WhatsApp alert subscription'..."
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                      <button 
                        onClick={() => handleSaveNote(selectedCustomer.id)}
                        disabled={!noteText.trim()}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-all disabled:opacity-40 cursor-pointer text-center"
                      >
                        Save Interaction Note
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Quick actions */}
              <div className="border-t border-slate-200 bg-slate-50 p-4 flex gap-3 text-center">
                <button 
                  onClick={() => {
                    alert(`Dispatched discount code "LOYALTYPRO" and floating flyer for ${selectedCustomer.recommendedProduct} directly to ${selectedCustomer.phone}!`);
                  }}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
                >
                  Send Promo offer (SMS)
                </button>
                <button 
                  onClick={() => {
                    alert(`Flagged ${selectedCustomer.name} in CRM queue for high-priority Relationship Manager assignment.`);
                  }}
                  className="bg-white text-slate-750 hover:bg-slate-100 border border-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Assign Dedicated Manager
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
