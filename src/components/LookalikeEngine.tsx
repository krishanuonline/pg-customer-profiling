import React, { useState } from 'react';
import { 
  DISTRICT_INSIGHTS, 
  GENERATED_LEADS, 
  GENERATED_CUSTOMERS 
} from '../data';
import { 
  Sparkles, 
  Target, 
  MapPin, 
  Sliders, 
  Play, 
  CheckCircle, 
  Navigation, 
  Compass, 
  Users, 
  ArrowRight,
  TrendingUp,
  Cpu,
  Bookmark
} from 'lucide-react';

export default function LookalikeEngine() {
  const [selectedFarm, setSelectedFarm] = useState('Poultry');
  const [selectedGeo, setSelectedGeo] = useState('Murshidabad');
  const [selectedFreq, setSelectedFreq] = useState('Monthly');
  const [orderValueRange, setOrderValueRange] = useState(3000);
  const [selectedDevice, setSelectedDevice] = useState('Mobile');

  const [isRunning, setIsRunning] = useState(false);
  const [runCompleted, setRunCompleted] = useState(false);

  // Result matching outputs
  const [matchedMarkets, setMatchedMarkets] = useState<any[]>([]);
  const [matchedFarmers, setMatchedFarmers] = useState<any[]>([]);

  const handleRunMatch = () => {
    setIsRunning(true);
    setRunCompleted(false);

    // Simulate 1.2s analysis computing
    setTimeout(() => {
      setIsRunning(false);
      setRunCompleted(true);

      // Generate realistic matching percentages based on input parameters
      let marketsMatches = [
        { 
          district: 'Nadia', 
          matchPercentage: 94, 
          factors: 'Heavy Poultry dominance (88%), similar AOV thresholds, high WhatsApp channel adoption.', 
          expansionRating: 'Immediate Deployment Recommended / High LTV alignment' 
        },
        { 
          district: 'Malda', 
          matchPercentage: 86, 
          factors: 'Dense animal husbandry profile, matching purchase frequencies, active mobile device share.', 
          expansionRating: 'Targeted Ad Campaigns / Local dealer network push' 
        },
        { 
          district: 'Birbhum', 
          matchPercentage: 72, 
          factors: 'Medium dairy & poultry overlap, moderate connectivity score, responds well to localized bundle promotions.', 
          expansionRating: 'Secondary rollout stage / Regional dealer pilot' 
        }
      ];

      // If they adjusted parameters away from Murshidabad/Poultry, slightly alter match results to behave dynamically
      if (selectedFarm !== 'Poultry') {
        marketsMatches = [
          { 
            district: 'Purulia', 
            matchPercentage: 88, 
            factors: `High affinity for ${selectedFarm} operations, lower online payments, matches cash dependency models.`, 
            expansionRating: 'Offline Field Team Routing / COD priority setup' 
          },
          { 
            district: 'Birbhum', 
            matchPercentage: 81, 
            factors: 'Matching small-to-moderate herd demographics, aligned frequency indicators.', 
            expansionRating: 'WhatsApp promotional drop / Starter Kit campaigns' 
          },
          { 
            district: 'Malda', 
            matchPercentage: 65, 
            factors: 'Moderate alignment with device signals and agricultural priorities.', 
            expansionRating: 'Ad campaigns targeting local search phrases' 
          }
        ];
      }

      // Filter some sample mock participants from the leads list matching looks
      const lookingFarmers = GENERATED_LEADS.filter(f => f.likelyFarmType === selectedFarm || f.district === selectedGeo).slice(0, 3);
      setMatchedFarmers(lookingFarmers);
      setMatchedMarkets(marketsMatches);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* Engine Introduction Banner */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">

          <h2 className="text-xl font-bold text-white tracking-tight">PrraniGanga Lookalike Audience Engine</h2>
          <p className="text-slate-400 text-xs">
            Identify top-performing customer cohorts and audit similar regions to target with programmatic field sales and localized digital catalog ads.
          </p>
        </div>
      </div>

      {/* Input / Control Dashboard Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Controls Frame (Parameters) */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-6">
          <div className="pb-3 border-b border-slate-800">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono text-slate-400 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              Cohort Target Inputs
            </h3>
          </div>

          {/* Preset trigger buttons - directly based on BRD Example! */}
          <div className="space-y-2">
            <span className="block text-[10px] text-slate-500 font-mono font-bold uppercase tracking-wider">Example Presets (BRD)</span>
            <button 
              onClick={() => {
                setSelectedFarm('Poultry');
                setSelectedGeo('Murshidabad');
                setSelectedFreq('Monthly');
                setOrderValueRange(3000);
                setSelectedDevice('Mobile');
              }}
              className="w-full text-left bg-slate-950 border border-emerald-900/30 hover:border-emerald-500/40 p-3 rounded-xl transition-all duration-150 flex items-center justify-between group"
            >
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">Apply Top Poultry Cluster</span>
                <span className="block text-[10px] text-slate-450 truncate">Poultry, Murshidabad, Monthly, ₹3K AOV</span>
              </div>
              <Compass className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Farm Type */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Target Farm Type</label>
            <select
              value={selectedFarm}
              onChange={(e) => setSelectedFarm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Poultry">Poultry Farmers</option>
              <option value="Dairy">Dairy Farmers</option>
              <option value="Aquaculture">Aquaculture Farmers</option>
              <option value="Goat & Sheep">Goat & Sheep Farmers</option>
              <option value="Pig">Pig Farmers</option>
            </select>
          </div>

          {/* Geography seed */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Reference District Hub</label>
            <select
              value={selectedGeo}
              onChange={(e) => setSelectedGeo(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="Murshidabad">Murshidabad (Seed Hub)</option>
              <option value="Nadia">Nadia (Seed Hub)</option>
              <option value="Purulia">Purulia (Seed Hub)</option>
              <option value="Malda">Malda (Seed Hub)</option>
              <option value="Birbhum">Birbhum (Seed Hub)</option>
            </select>
          </div>

          {/* Purchase Frequency */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Purchase Frequency</label>
            <select
              value={selectedFreq}
              onChange={(e) => setSelectedFreq(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-slate-300 rounded-xl py-2 px-3 text-xs focus:outline-none"
            >
              <option value="Weekly font-mono">Weekly Recurring</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Monthly">Monthly Cycle</option>
              <option value="Occasional">Occasional purchases</option>
            </select>
          </div>

          {/* Average Order Value threshold */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Average Order Value (AOV)</label>
              <span className="font-mono text-emerald-400 font-bold">₹{orderValueRange.toLocaleString()}</span>
            </div>
            <input 
              type="range"
              min="1000"
              max="15000"
              step="500"
              value={orderValueRange}
              onChange={(e) => setOrderValueRange(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Primary device type */}
          <div className="space-y-1">
            <label className="block text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider">Primary Device Usage</label>
            <div className="flex gap-2">
              {['Mobile', 'Desktop'].map(dev => (
                <button
                  key={dev}
                  onClick={() => setSelectedDevice(dev)}
                  className={`flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg border text-center transition-all ${
                    selectedDevice === dev 
                      ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm' 
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  {dev}
                </button>
              ))}
            </div>
          </div>

          {/* Match Action trigger */}
          <button 
            onClick={handleRunMatch}
            disabled={isRunning}
            className="w-full mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/10 transition-colors disabled:opacity-50"
          >
            <Cpu className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
            {isRunning ? 'Calculating Similarity Vectors...' : 'Execute Lookalike Matching Analysis'}
          </button>

        </div>

        {/* Dynamic Display Outputs */}
        <div className="lg:col-span-2 space-y-6">
          
          {isRunning && (
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl flex flex-col items-center justify-center text-slate-400 space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin" />
              <div className="text-center space-y-1">
                <p className="font-bold text-white text-sm">Querying Clustering Databases...</p>
                <p className="text-xs text-slate-500">Evaluating agricultural indices against Nadia, Purulia, Malda and Hooghly districts...</p>
              </div>
            </div>
          )}

          {!isRunning && !runCompleted && (
            <div className="bg-slate-900 border border-slate-800 p-12 rounded-2xl flex flex-col items-center justify-center text-slate-400 text-center space-y-3">
              <Target className="w-10 h-10 text-slate-650 animate-bounce" />
              <div className="space-y-1">
                <p className="font-bold text-white">Engine Primed & Waiting</p>
                <p className="text-xs max-w-md">Click the analytical trigger button to start the lookalike algorithms. The engine will match device usage, AOV profiles, and farm types to reveal potential candidate districts and leads.</p>
              </div>
            </div>
          )}

          {runCompleted && !isRunning && (
            <div className="space-y-6">
              
              {/* Part A: Matching Districts */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                  <span className="bg-blue-600/10 text-blue-400 text-xs px-2.5 py-0.5 rounded font-mono font-bold">1</span>
                  Matched Lookalike Markets (Top Districts found)
                </h3>

                <div className="space-y-3">
                  {matchedMarkets.map((market, index) => (
                    <div key={market.district} className="bg-slate-950 p-4 border border-slate-850 rounded-xl space-y-3 relative overflow-hidden">
                      
                      {/* Match percentage highlight */}
                      <div className="absolute right-4 top-4 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-lg text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {market.matchPercentage}% Similarity
                      </div>

                      <div className="space-y-1">
                        <span className="block text-sm font-extrabold text-white flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-emerald-400" />
                          {market.district} District
                        </span>
                        <p className="text-xs text-slate-400 font-mono italic">Expansion rank: #{index + 1} Candidate Zone</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2.5 border-t border-slate-900 text-xs">
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider">Similarity Drivers:</span>
                          <p className="text-slate-300 text-[11px] font-sans mt-0.5">{market.factors}</p>
                        </div>
                        <div>
                          <span className="block text-[9px] uppercase font-bold text-slate-550 font-mono tracking-wider">Strategic Recommendation:</span>
                          <span className="text-emerald-400 font-semibold block mt-0.5">{market.expansionRating}</span>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 text-[11px] text-slate-450 rounded-xl border border-slate-850 text-center font-mono">
                  *Similarity percentages calculated relative to the reference {selectedGeo} cluster profiles.
                </div>
              </div>

              {/* Part B: Candidate Leads Matching Profile */}
              <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2 pb-2 border-b border-slate-800">
                  <span className="bg-emerald-600/10 text-emerald-400 text-xs px-2.5 py-0.5 rounded font-mono font-bold">2</span>
                  Candidate Lead Matches (Immediate Prospect Targets)
                </h3>

                <p className="text-xs text-slate-405">
                  The matching algorithm extracted these offline leads representing identical agricultural triggers in adjacent districts. Recommended for immediate outbound calling or WhatsApp flyers:
                </p>

                <div className="space-y-3">
                  {matchedFarmers.map((f) => (
                    <div key={f.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-slate-950 border border-slate-850">
                      <div>
                        <span className="block text-sm font-bold text-white">{f.name}</span>
                        <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                          <span className="font-mono text-[11px]">Farm: {f.likelyFarmType}</span>
                          <span>•</span>
                          <span>{f.district}, {f.state}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-right">
                        <div>
                          <span className="block text-[9px] uppercase text-slate-500 font-mono font-bold">ACCESSIBILITY</span>
                          <span className="block text-xs font-bold font-mono text-white">{f.connectivityScore} / 10</span>
                        </div>
                        <button 
                          onClick={() => {
                            alert(`Prospect [${f.name}] added to campaign priority stack! Outbound team has been pinged.`);
                          }}
                          className="bg-emerald-600/15 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-all"
                        >
                          Enroll in Campaign
                        </button>
                      </div>
                    </div>
                  ))}
                  {matchedFarmers.length === 0 && (
                    <p className="text-xs text-slate-500 text-center font-mono">No matching prospect leads compiled for this specific type.</p>
                  )}
                </div>

              </div>

              {/* Section C: Business Actions */}
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-3 text-xs">
                <h4 className="font-bold text-slate-200">Suggested Action Plan Matrix</h4>
                <ul className="list-disc pl-4 space-y-2 text-slate-450 leading-relaxed text-[11px]">
                  <li><strong className="text-white">Expansion Planning:</strong> Deploy localized offline dealers to Nadia and Malda to setup stockpoints anticipating high organic return rates.</li>
                  <li><strong className="text-white">Ad Targeting:</strong> Sponsor focused YouTube agricultural guides highlighting {selectedFarm} feed conversion boosters optimized for mobile viewing.</li>
                  <li><strong className="text-white">Field sales deployment:</strong> Route outbound sales team to contact leads with higher connectivity scores (≥ {selectedGeo === 'Murshidabad' ? '8' : '5'}) to unlock immediate wholesale placements.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
