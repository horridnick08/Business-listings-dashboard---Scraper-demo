import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  List,
  BarChart3,
  Bot,
  Database,
  X,
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Listings', to: '/listings', icon: List },
  { name: 'Analytics', to: '/analytics', icon: BarChart3 },
  { name: 'Scraper', to: '/scraper', icon: Bot },
];

/**
 * Sidebar Component
 * =================
 * Collapsible sidebar with navigation links and branding.
 */
export default function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-64 transform
        bg-surface-800 text-white transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500 shadow-glow">
            <Database className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">BizDash</h1>
            <p className="text-[10px] text-white/50 font-medium tracking-wider uppercase">
              Analytics
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 hover:bg-white/10 transition md:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-500/20 text-brand-300 shadow-sm'
                  : 'text-white/60 hover:bg-white/5 hover:text-white/90'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`h-5 w-5 transition-colors ${
                    isActive ? 'text-brand-400' : 'text-white/40 group-hover:text-white/70'
                  }`}
                />
                {item.name}
                {isActive && (
                  <div className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-400" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
        <div className="rounded-xl bg-white/5 p-3">
          <p className="text-[10px] font-medium uppercase tracking-widest text-white/30">
            Business Listings
          </p>
          <p className="mt-1 text-xs text-white/50">Dashboard v1.0.0</p>
        </div>
      </div>
    </aside>
  );
}
