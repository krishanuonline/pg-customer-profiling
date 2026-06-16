import React from 'react';
import { 
  LayoutDashboard, 
  UserPlus, 
  Users, 
  MapPin, 
  Sparkles, 
  Activity,
  UserCheck,
  TrendingUp,
  Leaf,
  Palette
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentTheme?: string;
  onChangeTheme?: (theme: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab, currentTheme = 'light', onChangeTheme }: SidebarProps) {
  const menuItems = [
    { id: 'summary', name: 'Executive Overview', icon: LayoutDashboard, desc: 'Consolidated performance & KPIs' },
    { id: 'leads', name: 'Lead Intelligence', icon: UserPlus, desc: 'Segment A: Conversion & intent' },
    { id: 'customers', name: 'Existing Customers', icon: Users, desc: 'Segment B: Retention & LTV' },
    { id: 'regional', name: 'Regional Connectivity', icon: MapPin, desc: 'Digital accessibility & potential' },
    { id: 'lookalike', name: 'Lookalike Engine', icon: Sparkles, desc: 'Find top cluster expansions' },
    { id: 'mapper', name: 'Predictive Signal Mapper', icon: Activity, desc: 'Operational mapping tool' },
  ];

  return (
    <aside className="w-80 bg-slate-900 border-r border-slate-800 text-slate-100 flex flex-col h-screen overflow-y-auto shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="bg-indigo-500/10 p-2 rounded-xl text-indigo-400 border border-indigo-500/20">
          <Leaf className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold tracking-tight text-white text-lg">PrraniGanga</h1>
          <p className="text-xs text-slate-400 font-mono">CUSTOMER INTELLIGENCE</p>
        </div>
      </div>

      {/* Navigation Options */}
      <nav className="flex-1 p-4 space-y-1.5 scrollbar-thin">
        <div className="px-3 mb-2 text-slate-500 text-[10px] font-bold tracking-wider uppercase font-mono">
          BI FRAMEWORK VIEWS
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-950/40 translate-x-1' 
                  : 'text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <div className="min-w-0">
                <span className="block font-medium text-sm leading-tight">{item.name}</span>
                <span className={`block text-[11px] leading-normal truncate mt-0.5 ${isActive ? 'text-indigo-200' : 'text-slate-500 group-hover:text-slate-400'}`}>
                  {item.desc}
                </span>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Theme Selection Panel */}
      <div className="p-4.5 border-t border-slate-800 bg-slate-950/20">
        <div className="px-3 mb-3 text-slate-500 text-[10px] font-bold tracking-wider uppercase font-mono flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" />
          CHOOSE COSMETIC THEME
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {[
            { id: 'light', name: 'Clean Slate', indicatorBg: 'bg-indigo-600', border: 'border-slate-700' },
            { id: 'dark', name: 'Cosmic Dark', indicatorBg: 'bg-indigo-400', border: 'border-indigo-500' },
            { id: 'forest', name: 'Forest Emerald', indicatorBg: 'bg-emerald-500', border: 'border-emerald-500' },
            { id: 'warm', name: 'Desert Rose', indicatorBg: 'bg-amber-600', border: 'border-amber-500' },
          ].map((theme) => (
            <button
              key={theme.id}
              onClick={() => onChangeTheme?.(theme.id)}
              className={`flex items-center gap-1.5 p-2 rounded-lg border text-left cursor-pointer transition-all ${
                currentTheme === theme.id
                  ? 'bg-slate-800 border-indigo-500 text-white font-medium shadow-sm shadow-indigo-950/40'
                  : 'bg-slate-950/40 border-slate-850 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${theme.indicatorBg} shrink-0`} />
              <span className="truncate text-[11px] font-mono">{theme.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lower Profile Indicator */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/40">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            BI
          </div>
          <div className="min-w-0">
            <span className="block text-xs font-semibold text-slate-200">Business Team User</span>
            <span className="block text-[10px] text-indigo-400 font-mono truncate">Analysis Mode: Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
