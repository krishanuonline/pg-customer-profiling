import React, { useState, useMemo } from 'react';
import { 
  GENERATED_LEADS, 
  FARM_ACTIVITY_SIGNALS_MAP 
} from '../data';
import { Lead } from '../types';
import { 
  Search, 
  Filter, 
  Sliders, 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  User, 
  Play, 
  RefreshCw, 
  X, 
  CheckCircle,
  HelpCircle,
  Info
} from 'lucide-react';

export default function LeadIntelligence() {
  const [leadsList, setLeadsList] = useState<Lead[]>(GENERATED_LEADS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmType, setSelectedFarmType] = useState<string>('All');
  const [selectedProbability, setSelectedProbability] = useState<string>('All');
  const [selectedAcquisition, setSelectedAcquisition] = useState<string>('All');
  const [minConnectivity, setMinConnectivity] = useState<number>(1);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // Note tracker to add interactive customer notes
  const [leadNotes, setLeadNotes] = useState<{ [id: string]: string }>({});
  const [pendingNote, setPendingNote] = useState('');

  // Filtering logic - "as much filtering as possible"
  const filteredLeads = useMemo(() => {
    return leadsList.filter((lead) => {
      // 1. Text Search matches Name, Email, District or Likely Farm Type
      const textToSearch = `${lead.name} ${lead.email} ${lead.phone} ${lead.district} ${lead.likelyFarmType}`.toLowerCase();
      const matchesSearch = textToSearch.includes(searchQuery.toLowerCase());

      // 2. Farm Type Filter
      const matchesFarmType = selectedFarmType === 'All' || lead.likelyFarmType === selectedFarmType;

      // 3. Acquisition Filter
      const matchesAcquisition = selectedAcquisition === 'All' || lead.acquisitionSource === selectedAcquisition;

      // 4. Connectivity Score
      const matchesConnectivity = lead.connectivityScore >= minConnectivity;

      // 5. Probability classification
      // Score 1-3: Casual Visitor, 4-6: Exploring, 7-8: High Intent, 9-10: Ready to Purchase
      let matchesProbability = true;
      if (selectedProbability !== 'All') {
        const score = lead.firstPurchaseProbability;
        if (selectedProbability === 'Casual') matchesProbability = score >= 1 && score <= 3;
        else if (selectedProbability === 'Exploring') matchesProbability = score >= 4 && score <= 6;
        else if (selectedProbability === 'HighIntent') matchesProbability = score >= 7 && score <= 8;
        else if (selectedProbability === 'Ready') matchesProbability = score >= 9 && score <= 10;
      }

      return matchesSearch && matchesFarmType && matchesAcquisition && matchesConnectivity && matchesProbability;
    });
  }, [leadsList, searchQuery, selectedFarmType, selectedProbability, selectedAcquisition, minConnectivity]);

  // Handle Note Submit
  const handleSaveNote = (id: string) => {
    if (!pendingNote.trim()) return;
    setLeadNotes(prev => ({ ...prev, [id]: pendingNote }));
    setPendingNote('');
  };

  // Convert Lead Mock Action
  const handleConvertLead = (id: string) => {
    alert(`Mock Conversion: Lead ${id} has been flagged for prioritized outbound sales calling immediately!`);
    setLeadsList(prev => prev.map(lead => {
      if (lead.id === id) {
        // Boost score
        return {
          ...lead,
          firstPurchaseProbability: 10,
          intentScore: 10
        };
      }
      return lead;
    }));
    // update drawer reference
    if (selectedLead && selectedLead.id === id) {
      setSelectedLead(prev => prev ? { ...prev, firstPurchaseProbability: 10, intentScore: 10 } : null);
    }
  };

  // Map probability score to readable label and color
  const getProbabilityStyles = (score: number) => {
    if (score >= 9) return { label: 'Ready-to-Purchase Farmer', color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
    if (score >= 7) return { label: 'High-Intent Farmer', color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' };
    if (score >= 4) return { label: 'Exploring Farmer', color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
    return { label: 'Casual Visitor', color: 'bg-slate-500/15 text-slate-400 border-slate-500/30' };
  };

  const getBulkPotentialStyles = (score: number) => {
    if (score >= 9) return 'Dealer / Bulk Buyer';
    if (score >= 7) return 'Commercial Farmer';
    if (score >= 4) return 'Growing Farmer';
    return 'Small Farmer';
  };

  const getPriceSensitivityStyles = (score: number) => {
    if (score >= 7) return 'Price-Sensitive Buyer';
    if (score >= 4) return 'Moderate Buyer';
    return 'Premium Buyer';
  };

  // Farmer Activity Mapping (Feature 2 of BRD)
  // Dynamically map a lead to a predicted farming cycle requirement based on signals
  const mapActivityIntelligence = (farmType: string, signals: string[]) => {
    // Check signals map
    const categoryKey = farmType as keyof typeof FARM_ACTIVITY_SIGNALS_MAP;
    const rules = FARM_ACTIVITY_SIGNALS_MAP[categoryKey] || FARM_ACTIVITY_SIGNALS_MAP['Cross-Category'];
    
    // Find matching rule with highest signal overlap
    let bestRule = rules[0];
    let maxOverlapCount = -1;

    for (const rule of rules) {
      const matchCount = rule.signals.filter(sig => signals.includes(sig)).length;
      if (matchCount > maxOverlapCount) {
        maxOverlapCount = matchCount;
        bestRule = rule;
      }
    }
    return bestRule;
  };

  return (
    <div className="space-y-6">
      
      {/* Overview stats header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-slate-200 shadow-sm p-6 rounded-2xl">
        <div className="space-y-1.5">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Segment A: Lead Intelligence Directory</h2>
          <p className="text-slate-500 text-xs">
            Identify potential buyers before they purchase. Evaluate intent, estimated price sensitivity and digital connectivity metrics.
          </p>
        </div>
        
        {/* Quick totals summary */}
        <div className="flex items-center gap-6 divide-x divide-slate-200">
          <div className="text-center md:text-left">
            <span className="block text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">ACTIVE DIRECTORY SIZE</span>
            <span className="block text-xl font-bold font-mono text-slate-900">{filteredLeads.length} Leads</span>
          </div>
          <div className="pl-6 text-center md:text-left">
            <span className="block text-[10px] text-slate-500 font-mono font-bold tracking-wider uppercase">HIGH INTENT SEGMENTS</span>
            <span className="block text-xl font-bold font-mono text-indigo-650">
              {leadsList.filter(l => l.firstPurchaseProbability >= 7).length} Registered
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Left Filters, Right Directory List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* Advanced Filter Panel - "As much filtering as possible" */}
        <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl space-y-6 lg:sticky lg:top-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-600" />
              Intelligence Filters
            </h3>
            {(selectedFarmType !== 'All' || selectedProbability !== 'All' || selectedAcquisition !== 'All' || searchQuery !== '' || minConnectivity > 1) && (
              <button 
                onClick={() => {
                  setSelectedFarmType('All');
                  setSelectedProbability('All');
                  setSelectedAcquisition('All');
                  setSearchQuery('');
                  setMinConnectivity(1);
                }}
                className="text-[10px] text-indigo-600 font-mono hover:underline font-bold"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Text / Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, phone, district..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-450"
              />
            </div>
          </div>

          {/* Farm Type Filter selection */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Likely Farm Type</label>
            <div className="grid grid-cols-2 gap-1.5">
              {['All', 'Poultry', 'Dairy', 'Aquaculture', 'Goat & Sheep', 'Pig'].map((farm) => (
                <button
                  key={farm}
                  onClick={() => setSelectedFarmType(farm)}
                  className={`py-1.5 px-2 text-[11px] font-semibold rounded-lg border text-center transition-all ${
                    selectedFarmType === farm 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm' 
                      : 'bg-slate-50 border-slate-200 text-slate-650 hover:bg-slate-100 hover:text-slate-800'
                  }`}
                >
                  {farm}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Probability Classification */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Purchase Probabilities</label>
            <select
              value={selectedProbability}
              onChange={(e) => setSelectedProbability(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
            >
              <option value="All">All Probabilities</option>
              <option value="Casual">Casual Visitor (Score 1-3)</option>
              <option value="Exploring">Exploring Farmer (Score 4-6)</option>
              <option value="HighIntent">High-Intent Farmer (Score 7-8)</option>
              <option value="Ready">Ready-to-Purchase (Score 9-10)</option>
            </select>
          </div>

          {/* Acquisition Channels */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Acquisition Source</label>
            <select
              value={selectedAcquisition}
              onChange={(e) => setSelectedAcquisition(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl py-2 px-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
            >
              <option value="All">All Channels</option>
              <option value="Facebook">Facebook</option>
              <option value="YouTube">YouTube</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Organic Search">Organic Search</option>
              <option value="Referral">Referral</option>
            </select>
          </div>

          {/* Slider for connectivity score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider">Min Accessibility Score</label>
              <span className="text-xs font-bold font-mono text-indigo-650">{minConnectivity.toFixed(1)} / 10</span>
            </div>
            <input 
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={minConnectivity}
              onChange={(e) => setMinConnectivity(parseFloat(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <span className="block text-[9px] text-slate-500 italic">
              Filters leads registered in digitally ready geographic zones.
            </span>
          </div>

        </div>

        {/* Directory List Pane */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Active filter pills indicator */}
          <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 px-4 py-3 rounded-xl text-xs text-slate-500 shadow-sm">
            <span className="font-bold text-slate-700">Segment Filters:</span>
            {selectedFarmType !== 'All' && (
              <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] text-slate-700 flex items-center gap-1.5">
                Farm: {selectedFarmType}
                <button onClick={() => setSelectedFarmType('All')} className="hover:text-red-500 font-bold">×</button>
              </span>
            )}
            {selectedProbability !== 'All' && (
              <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] text-slate-700 flex items-center gap-1.5">
                Prob: {selectedProbability}
                <button onClick={() => setSelectedProbability('All')} className="hover:text-red-500 font-bold">×</button>
              </span>
            )}
            {selectedAcquisition !== 'All' && (
              <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] text-slate-700 flex items-center gap-1.5">
                Acq: {selectedAcquisition}
                <button onClick={() => setSelectedAcquisition('All')} className="hover:text-red-400 font-bold">×</button>
              </span>
            )}
            {minConnectivity > 1 && (
              <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] text-slate-700 flex items-center gap-1.5">
                Conn: ≥ {minConnectivity}
                <button onClick={() => setMinConnectivity(1)} className="hover:text-red-400 font-bold">×</button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md text-[11px] text-slate-700 flex items-center gap-1.5">
                Term: "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="hover:text-red-400 font-bold">×</button>
              </span>
            )}
            {selectedFarmType === 'All' && selectedProbability === 'All' && selectedAcquisition === 'All' && minConnectivity === 1 && !searchQuery && (
              <span className="text-slate-450 italic text-[11px]">No active overrides. Displaying full directory pool.</span>
            )}
          </div>

          {/* Directory Grid of results */}
          {filteredLeads.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-2">
              <Info className="w-8 h-8 text-amber-500 mx-auto" />
              <p className="font-semibold text-slate-800">No Lead records matched your queries.</p>
              <p className="text-xs text-slate-500">Try softening the minimum connectivity threshold or selecting different categorical filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLeads.map((lead) => {
                const prob = getProbabilityStyles(lead.firstPurchaseProbability);
                return (
                  <div 
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`bg-white border ${
                      selectedLead?.id === lead.id ? 'border-indigo-500 ring-2 ring-indigo-50 shadow-md' : 'border-slate-200 hover:border-slate-350 hover:shadow-sm'
                    } p-5 rounded-2xl cursor-pointer transition-all duration-150 relative overflow-hidden group`}
                  >
                    {/* Upper Badges */}
                    <div className="flex items-center justify-between mb-3 gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold font-mono tracking-wider uppercase border ${prob.color}`}>
                        {prob.label}
                      </span>
                      <span className="text-[10px] text-slate-450 font-mono font-semibold">ID: {lead.id}</span>
                    </div>

                    {/* Member overview */}
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-650 transition-colors flex items-center justify-between">
                        {lead.name}
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-650 group-hover:translate-x-1 transition-all" />
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{lead.district}, {lead.state}</span>
                      </div>
                    </div>

                    {/* Simple analytical matrix values */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 text-center">
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-150">
                        <span className="block text-[8px] uppercase text-slate-450 font-mono font-bold">INTENT</span>
                        <span className="block text-xs font-bold font-mono text-slate-800">{lead.intentScore} / 10</span>
                      </div>
                      <div className="bg-slate-50 p-2 rounded-lg border border-slate-150">
                        <span className="block text-[8px] uppercase text-slate-450 font-mono font-bold">ACCESSIBILITY</span>
                        <span className="block text-xs font-bold font-mono text-slate-800">{lead.connectivityScore} / 10</span>
                      </div>
                      <div className="bg-indigo-50/40 p-2 rounded-lg border border-indigo-100">
                        <span className="block text-[8px] uppercase text-indigo-700 font-mono font-bold">FARM TYPE</span>
                        <span className="block text-[11px] font-bold text-indigo-750 truncate">{lead.likelyFarmType}</span>
                      </div>
                    </div>

                    {/* Saved note indicator */}
                    {leadNotes[lead.id] && (
                      <div className="mt-3 bg-indigo-50 border border-indigo-100 p-2 rounded-lg text-[10px] text-indigo-750">
                        💬 <span className="font-semibold text-indigo-900">Interaction Note:</span> "{leadNotes[lead.id]}"
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* Side Slide-out Drawer / Overlay modal when Lead clicked */}
      {selectedLead && (() => {
        const pStyles = getProbabilityStyles(selectedLead.firstPurchaseProbability);
        const mappedActivity = mapActivityIntelligence(selectedLead.likelyFarmType, selectedLead.activitySignals);
        
        return (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex justify-end transition-opacity duration-300">
            <div className="w-full max-w-xl bg-white h-screen shadow-2xl border-l border-slate-200 flex flex-col justify-between overflow-y-auto transform transition-transform duration-300 text-slate-900">
              
              {/* Drawer Scroll Container */}
              <div className="p-6 space-y-6">
                
                {/* Drawer Header */}
                <div className="flex items-start justify-between border-b border-slate-150 pb-5">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">LEAD INTEL PROFILE DETAILED</span>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">{selectedLead.name}</h3>
                    <p className="text-xs text-slate-500 font-mono">{selectedLead.email} | {selectedLead.phone}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedLead(null);
                      setPendingNote('');
                    }}
                    className="p-1.5 bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scorecards grid */}
                <div className="grid grid-cols-2 gap-4">
                  
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">First Purchase Probability</span>
                    <span className="block text-lg font-bold font-mono text-indigo-650">
                      {selectedLead.firstPurchaseProbability} / 10
                    </span>
                    <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded uppercase font-bold border font-mono ${pStyles.color}`}>
                      {pStyles.label}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">Intent Score Range</span>
                    <span className="block text-lg font-bold font-mono text-slate-800">{selectedLead.intentScore} / 10</span>
                    <span className="block text-[11px] text-slate-500 italic">
                      {selectedLead.intentScore >= 9 ? '🎯 Imminent readiness' : selectedLead.intentScore >= 7 ? '⚡ High activity' : '⏳ Exploration phase'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">Estimated Price Sensitivity</span>
                    <span className="block text-lg font-bold font-mono text-slate-800">{selectedLead.priceSensitivityEstimate} / 10</span>
                    <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-semibold inline-block font-mono">
                      {getPriceSensitivityStyles(selectedLead.priceSensitivityEstimate)}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                    <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">Bulk Purchase Potential</span>
                    <span className="block text-lg font-bold font-mono text-slate-800">{selectedLead.bulkPotentialScore} / 10</span>
                    <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-600 font-semibold inline-block font-mono">
                      {getBulkPotentialStyles(selectedLead.bulkPotentialScore)}
                    </span>
                  </div>

                </div>

                {/* Geography, acquisition & connectivity parameters */}
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl space-y-3 text-xs">
                  <h4 className="font-bold text-slate-500 uppercase tracking-wider text-[10px] font-mono">Demographic & Access Context</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-550 font-mono font-bold uppercase">District Geography</span>
                      <span className="text-slate-800 font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-450" />
                        {selectedLead.district}, {selectedLead.state}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <span className="block text-[10px] text-slate-550 font-mono font-bold uppercase">Acquisition Channel</span>
                      <span className="text-indigo-650 font-bold font-mono">{selectedLead.acquisitionSource}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-slate-200">
                      <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
                        <span className="font-bold font-mono text-[10px] uppercase">Digital Accessibility Score</span>
                        <span className="font-mono font-bold text-slate-800">{selectedLead.connectivityScore} / 10</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-indigo-600 h-full rounded-full" 
                          style={{ width: `${selectedLead.connectivityScore * 10}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Telemetry/Engagement Signals Section (Signals mapping) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">Digital Engagement Telemetry Signals</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <span className="block text-[9px] font-mono text-slate-500">PROD VIEWS</span>
                      <span className="font-bold text-slate-800 font-mono">{selectedLead.signals.productViews}</span>
                    </div>
                    <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <span className="block text-[9px] font-mono text-slate-500">CAT VIEWS</span>
                      <span className="font-bold text-slate-800 font-mono">{selectedLead.signals.categoryViews}</span>
                    </div>
                    <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <span className="block text-[9px] font-mono text-slate-500">SEARCH FREQ</span>
                      <span className="font-bold text-slate-800 font-mono">{selectedLead.signals.searchFrequency}</span>
                    </div>
                    <div className="bg-slate-50 p-2 border border-slate-200 rounded-lg">
                      <span className="block text-[9px] font-mono text-slate-500">CART ADDITION</span>
                      <span className="font-bold text-slate-800 font-mono">{selectedLead.signals.cartAdditions}</span>
                    </div>
                  </div>
                  
                  {/* Detailed summary lists */}
                  <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Repeat Platform Visits:</span>
                      <span className="text-slate-800 font-semibold">{selectedLead.signals.repeatVisits} sessions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Total Duration Logged:</span>
                      <span className="text-slate-800 font-semibold">{selectedLead.signals.timeSpentMinutes} mins spent</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-150 pt-1.5 mt-1.5">
                      <span className="text-slate-500">WhatsApp Query Clicks:</span>
                      <span className="text-indigo-650 font-bold">{selectedLead.signals.whatsAppClicks} triggers</span>
                    </div>
                  </div>
                </div>

                {/* Farmer Activity Mapping (Feature 2 of BRD) */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                  <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2">
                    <Sparkles className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">Farmer Activity Mapping Intel</span>
                  </div>
                  
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">Discovered Digital Search Signals:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {selectedLead.activitySignals.map((sig) => (
                          <span key={sig} className="bg-white border border-slate-200 text-slate-700 text-[10px] px-2.5 py-1 rounded-full font-semibold font-mono">
                            🔍 {sig}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-150 mt-2">
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-slate-550 font-mono tracking-wider">Operational Mapping Stage:</span>
                        <span className="text-sm font-bold text-slate-850">{mappedActivity.action}</span>
                      </div>
                      <div>
                        <span className="block text-[9px] uppercase font-bold text-slate-550 font-mono tracking-wider">Likely Core Requirement:</span>
                        <div className="space-y-0.5 font-mono text-indigo-650 text-xs font-bold">
                          {mappedActivity.requirements.map(req => (
                            <span key={req} className="block">• {req}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Business recommended action */}
                    <div className="mt-3 p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs space-y-1">
                      <span className="font-bold text-indigo-900 block font-mono uppercase tracking-wider text-[10px]">Predicted Action Matrix Recommendation:</span>
                      <p className="text-slate-700 text-[11px] leading-relaxed">
                        {selectedLead.firstPurchaseProbability >= 7 ? (
                          <span>🔥 <strong className="text-indigo-950">High Intent &gt; Outbound Call:</strong> Contact at once on {selectedLead.phone} to present customized combo recommendations for {mappedActivity.requirements.join(' and ')}.</span>
                        ) : selectedLead.firstPurchaseProbability >= 4 ? (
                          <span>💡 <strong className="text-indigo-950">Medium Intent &gt; Products Dispatch:</strong> Push automatic product recommendations to WhatsApp for {mappedActivity.requirements.join(' / ')}.</span>
                        ) : (
                          <span>✉️ <strong className="text-indigo-950">Low Intent &gt; General Content:</strong> Retarget on social networks with informative vlogs on preventive health.</span>
                        )}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Follow-up Note Logger */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider font-mono text-slate-500">Interaction & Activity Logs</label>
                  
                  {leadNotes[selectedLead.id] ? (
                    <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-xs">
                      <div className="flex justify-between text-[10px] text-slate-450 font-mono pb-1 mb-1 border-b border-slate-200">
                        <span>Logged Business Note</span>
                        <span>Just now</span>
                      </div>
                      <p className="text-slate-755 italic text-slate-700">" {leadNotes[selectedLead.id]} "</p>
                      <button 
                        onClick={() => setLeadNotes(prev => {
                          const copy = { ...prev };
                          delete copy[selectedLead.id];
                          return copy;
                        })}
                        className="text-[10px] text-red-600 hover:underline mt-2 font-mono block text-right font-bold"
                      >
                        Delete Note
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <textarea 
                        rows={2}
                        value={pendingNote}
                        onChange={(e) => setPendingNote(e.target.value)}
                        placeholder="Log notes eg. 'Emailed catalog pack', 'Requested phone callback Tuesday'... "
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 rounded-xl p-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-slate-400"
                      />
                      <button 
                        onClick={() => handleSaveNote(selectedLead.id)}
                        disabled={!pendingNote.trim()}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold py-2 px-3 rounded-xl text-xs transition-colors disabled:opacity-40"
                      >
                        Save Interaction Note
                      </button>
                    </div>
                  )}
                </div>

              </div>

              {/* Drawer Bottom Action Drawer */}
              <div className="border-t border-slate-200 bg-slate-50 p-4 flex gap-3 text-center">
                <button 
                  onClick={() => handleConvertLead(selectedLead.id)}
                  className="flex-1 bg-indigo-650 hover:bg-indigo-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  Prioritize Outbound Calling
                </button>
                <button 
                  onClick={() => {
                    const mappedActivity = mapActivityIntelligence(selectedLead.likelyFarmType, selectedLead.activitySignals);
                    alert(`Dispatched automated promotional flyer targeting [${mappedActivity.requirements.join(' & ')}] directly to ${selectedLead.phone} WhatsApp channel!`);
                  }}
                  className="bg-white hover:bg-slate-100 text-slate-700 border border-slate-250 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
                >
                  Send WhatsApp Flyer
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
