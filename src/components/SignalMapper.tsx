import React, { useState, useMemo } from 'react';
import { 
  FARM_ACTIVITY_SIGNALS_MAP 
} from '../data';
import { 
  Activity, 
  HelpCircle, 
  Search, 
  CheckSquare, 
  Square, 
  Sparkles, 
  PhoneCall, 
  ShoppingBag, 
  FileText, 
  Compass, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';

export default function SignalMapper() {
  const [activeCategory, setActiveCategory] = useState<'Poultry' | 'Dairy' | 'Aquaculture' | 'Goat & Sheep' | 'Pig' | 'Cross-Category'>('Poultry');
  
  // Track selected signals in the simulation
  const [selectedSignals, setSelectedSignals] = useState<string[]>([]);

  // Category change resets selected signals
  const handleCategoryChange = (cat: any) => {
    setActiveCategory(cat);
    setSelectedSignals([]);
  };

  // List of all unique signals for the current category based on BRD map rules
  const allCategorySignals = useMemo(() => {
    const rules = FARM_ACTIVITY_SIGNALS_MAP[activeCategory] || [];
    const setOfSignals = new Set<string>();
    rules.forEach((rule) => {
      rule.signals.forEach((sig) => setOfSignals.add(sig));
    });
    return Array.from(setOfSignals);
  }, [activeCategory]);

  const toggleSignal = (sig: string) => {
    setSelectedSignals((prev) => 
      prev.includes(sig) ? prev.filter((s) => s !== sig) : [...prev, sig]
    );
  };

  // Perform operational mapping analysis based on selected signals
  const mappingResult = useMemo(() => {
    if (selectedSignals.length === 0) return null;

    const rules = FARM_ACTIVITY_SIGNALS_MAP[activeCategory] || [];
    let bestMatchRule: any = null;
    let maxOverlap = 0;

    // Check overlap for each rule
    rules.forEach((rule) => {
      const overlapScore = rule.signals.filter((s) => selectedSignals.includes(s)).length;
      if (overlapScore > maxOverlap) {
        maxOverlap = overlapScore;
        bestMatchRule = rule;
      }
    });

    if (maxOverlap === 0) return null;

    return {
      action: bestMatchRule.action,
      requirements: bestMatchRule.requirements,
      matchingSignals: bestMatchRule.signals.filter((s: string) => selectedSignals.includes(s)),
      allRuleSignals: bestMatchRule.signals,
      precisionPercentage: Math.round((maxOverlap / bestMatchRule.signals.length) * 100),
    };
  }, [selectedSignals, activeCategory]);

  // Quick preset triggers to help the business user explore
  const loadPreset = (actionName: string) => {
    const rules = FARM_ACTIVITY_SIGNALS_MAP[activeCategory] || [];
    const matchedRule = rules.find((r) => r.action === actionName);
    if (matchedRule) {
      setSelectedSignals(matchedRule.signals);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Introduction */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">

          <h2 className="text-xl font-bold text-white tracking-tight">Requirement Intelligence Simulator</h2>
          <p className="text-slate-400 text-xs">
            Analyze digital cookie-trails (feed views, vaccine browsing, equipment searches) to decode physical farm cycles, predict immediate SKU needs, and map proactive sales campaigns.
          </p>
        </div>
      </div>

      {/* Category selector options */}
      <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1.5 border border-slate-800 rounded-xl select-none">
        {(['Poultry', 'Dairy', 'Aquaculture', 'Goat & Sheep', 'Pig', 'Cross-Category'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`py-2 px-4 rounded-lg text-xs font-semibold tracking-tight transition-all ${
              activeCategory === cat 
                ? 'bg-emerald-600 text-white' 
                : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
            }`}
          >
            {cat} Farming
          </button>
        ))}
      </div>

      {/* Main operational grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* Left Signal Selector (Columns 2) */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-slate-400">
              {activeCategory} Digital Signals Checklist
            </h3>
            {selectedSignals.length > 0 && (
              <button 
                onClick={() => setSelectedSignals([])}
                className="text-[10px] text-red-400 hover:underline font-mono"
              >
                Clear Selected
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Toggle the behavioral search activities below as logged by the farmer on PrraniGanga pages:
          </p>

          <div className="space-y-1.5 mt-2 overflow-y-auto max-h-[280px] p-1 pr-2 scrollbar-thin">
            {allCategorySignals.map((signal) => {
              const selected = selectedSignals.includes(signal);
              return (
                <button
                  key={signal}
                  onClick={() => toggleSignal(signal)}
                  className={`w-full text-left flex items-center gap-3 p-3.5 rounded-xl border transition-all ${
                    selected 
                      ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-sm' 
                      : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:border-slate-800 hover:text-slate-350'
                  }`}
                >
                  {selected ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-650 shrink-0" />
                  )}
                  <span className="text-xs font-semibold leading-none">{signal}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Preset explores */}
          <div className="pt-4 border-t border-slate-850 space-y-2">
            <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Quick Presets (Explore Cycles)</span>
            <div className="flex flex-wrap gap-1.5">
              {(FARM_ACTIVITY_SIGNALS_MAP[activeCategory] || []).map((rule: any) => (
                <button
                  key={rule.action}
                  onClick={() => loadPreset(rule.action)}
                  className="bg-slate-950 text-slate-400 border border-slate-800 text-[10px] py-1 px-2.5 rounded-lg hover:border-slate-700 hover:text-slate-200"
                >
                  {rule.action}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Computed Outcome Analysis (Columns 3) */}
        <div className="lg:col-span-3 space-y-6">
          
          {!mappingResult ? (
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-center space-y-3">
              <Compass className="w-10 h-10 text-slate-650 animate-pulse" />
              <div className="space-y-1">
                <p className="font-bold text-white">Requirement Classifier Idle</p>
                <p className="text-xs max-w-sm">Select one or more digital signals on the left checklist, or apply a quick preset to model and predict the operational event currently taking place on the farm.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Computed Active Farm operational event */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono font-bold">
                  <Sparkles className="w-4.5 h-4.5 text-amber-500" /> CLASSIFIED OPERATIONAL CHALLENGE
                </div>

                <div className="space-y-1">
                  <span className="block text-slate-500 text-[10px] font-mono tracking-wider font-semibold uppercase">PREDICTED EVENT STAGE</span>
                  <h3 className="text-xl font-bold text-white">{mappingResult.action}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] bg-emerald-600/20 text-emerald-400 px-2.5 py-0.5 border border-emerald-500/20 rounded font-mono font-bold text-[10px]">
                      {mappingResult.precisionPercentage}% Precision Rating
                    </span>
                    <span className="text-xs text-slate-400 italic">Based on {mappingResult.matchingSignals.length} matched digital search signals.</span>
                  </div>
                </div>

                {/* Overlap stats */}
                <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-2">
                  <span className="block text-[10px] text-slate-500 font-mono uppercase font-bold">Matched Cookie Signals Override</span>
                  <div className="flex flex-wrap gap-1.5">
                    {mappingResult.matchingSignals.map((sig: string) => (
                      <span key={sig} className="bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] px-2.5 py-1 rounded-lg font-mono">
                        ✓ {sig}
                      </span>
                    ))}
                    {mappingResult.allRuleSignals.filter((s: string) => !selectedSignals.includes(s)).map((sig: string) => (
                      <span key={sig} className="bg-slate-900 text-slate-550 text-[11px] px-2.5 py-1 rounded-lg font-mono border border-slate-950/60">
                        • {sig} (Unselected)
                      </span>
                    ))}
                  </div>
                </div>

                {/* Predicted SKU requirements driver */}
                <div className="space-y-2 pt-2.5 border-t border-slate-850">
                  <span className="block text-[10px] text-slate-550 font-mono font-bold uppercase">PRESERVED SYSTEM NEXT REQUIREMENTS</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mappingResult.requirements.map((req: string) => (
                      <div key={req} className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">{req}</span>
                        <ShoppingBag className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Pitch Matrix (How the business team takes action) */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-slate-400 flex items-center gap-1.5">
                  <PhoneCall className="w-4.5 h-4.5 text-blue-400" />
                  Tactical Sales Pitch Alignment Matrix (CRM Integration)
                </h4>

                <p className="text-xs text-slate-400">
                  Based on predictive digital signals, standard CRM triggers have compiled the next pitch alignment. Your sales rep should pitch these arguments during contact:
                </p>

                <div className="space-y-3 pt-1">
                  
                  {/* Pitch 1: Sales Arguments */}
                  <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-1">
                    <span className="block text-[9px] text-blue-400 font-mono font-bold uppercase tracking-wider">Suggested Pitch Focus</span>
                    <p className="text-xs font-bold font-sans text-white">
                      "Help the farmer with immediate resource management of [{mappingResult.requirements.join(' and ')}]"
                    </p>
                    <p className="text-[11px] text-slate-450 leading-relaxed pt-1">
                      Emphasize that delay can significantly increase overall operational mortality limits in West Bengal conditions. Highlight bulk supply price points.
                    </p>
                  </div>

                  {/* Pitch 2: Action trigger category */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-slate-950 p-3 border border-slate-850 rounded-xl text-center space-y-0.5">
                      <span className="block text-[8px] text-slate-500 font-mono uppercase">Sales Call Urgency</span>
                      <span className="block text-xs font-bold font-mono text-amber-400">HIGH / PROACTIVE</span>
                    </div>

                    <div className="bg-slate-950 p-3 border border-slate-850 rounded-xl text-center space-y-0.5">
                      <span className="block text-[8px] text-slate-500 font-mono uppercase">Delivery Routing</span>
                      <span className="block text-xs font-bold font-mono text-emerald-400">Direct Express Hub</span>
                    </div>
                  </div>

                  {/* Pitch 3: Preserved catalogs */}
                  <div className="p-3 bg-emerald-950/20 text-emerald-400 text-xs rounded-xl border border-emerald-900/30">
                    👍 <span className="font-bold text-white">System trigger:</span> Catalog compiled automatically featuring latest <span className="underline font-semibold font-mono">{activeCategory} complete packs</span>. Clickable to dispatch instantly via WhatsApp to reference leads list.
                  </div>

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
