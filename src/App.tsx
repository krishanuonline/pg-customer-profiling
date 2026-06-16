import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ExecutiveSummary from './components/ExecutiveSummary';
import LeadIntelligence from './components/LeadIntelligence';
import CustomerIntelligence from './components/CustomerIntelligence';
import RegionalPotential from './components/RegionalPotential';
import LookalikeEngine from './components/LookalikeEngine';
import SignalMapper from './components/SignalMapper';
import { 
  Users, 
  MapPin, 
  Leaf, 
  Clock, 
  BookmarkCheck,
  Globe,
  Settings
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem('prrani-theme') || 'light';
  });

  const handleSetTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('prrani-theme', newTheme);
  };

  // Today's Date / local time tracker based on provided ISO times
  const formattedDate = "Monday, June 15, 2026";

  return (
    <div className={`flex h-screen w-screen overflow-hidden bg-slate-50 font-sans text-slate-900 antialiased selection:bg-indigo-500 selection:text-white theme-${theme}`}>
      
      {/* Sidebar Selector Panel */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentTheme={theme} 
        onChangeTheme={handleSetTheme} 
      />
      
      {/* Dashboard Main Panel Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* Top Operational Ribbon Nav Bar */}
        <header className="h-16 bg-white border-b border-slate-250 flex items-center justify-between px-8 shrink-0">
          
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold font-mono tracking-wider uppercase text-slate-500">Active Tab Context:</span>
            <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 font-mono text-[11px] px-3 py-1 rounded-lg font-bold">
              {activeTab === 'summary' && 'EXECUTIVE_KPI_SUMMARY_VIEW'}
              {activeTab === 'leads' && 'SEGMENT_A_LEAD_CONVERSION_DIRECTORY'}
              {activeTab === 'customers' && 'SEGMENT_B_EXISTING_CUSTOMER_INTELLIGENCE'}
              {activeTab === 'regional' && 'REGIONAL_POTENTIAL_ACCESSIBILITY_MODEL'}
              {activeTab === 'lookalike' && 'COHORT_LOOKALID_MATCHER_ENGINE'}
              {activeTab === 'mapper' && 'BEHAVIORAL_SIGNAL_CYCLE_MAPPING_TOOL'}
            </span>
          </div>

          {/* Right Clock & Telemetry */}
          <div className="flex items-center gap-6 text-xs text-slate-600">
            
            {/* Clock Indicator */}
            <div className="flex items-center gap-2 font-mono">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-700">{formattedDate}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-550 animate-pulse" />
              <span className="font-mono text-indigo-600 text-[10px] font-bold">PRRANI_NODE_LIVE (PORT 3000)</span>
            </div>

          </div>

        </header>

        {/* Dynamic Frame scroll view of content */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-100/55 scrollbar-thin">
          
          {/* Staggered mount matching Active tab selection */}
          <div className="max-w-7xl mx-auto space-y-6">
            
            {activeTab === 'summary' && <ExecutiveSummary />}
            {activeTab === 'leads' && <LeadIntelligence />}
            {activeTab === 'customers' && <CustomerIntelligence />}
            {activeTab === 'regional' && <RegionalPotential />}
            {activeTab === 'lookalike' && <LookalikeEngine />}
            {activeTab === 'mapper' && <SignalMapper />}

          </div>

          {/* Footer branding */}
          <footer className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <span>© 2026 PrraniGanga Customer Intelligence Framework. Decision support software for professional agrifarming operations.</span>
            <div className="flex gap-4 font-mono">
              <span className="hover:text-indigo-600 hover:underline cursor-pointer">Access Terms</span>
              <span className="hover:text-indigo-600 hover:underline cursor-pointer">Platform Policies</span>
              <span className="hover:text-indigo-600 hover:underline cursor-pointer">API Integration v2.4</span>
            </div>
          </footer>

        </main>

      </div>

    </div>
  );
}
