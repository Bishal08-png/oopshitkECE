import { Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Topbar({ onMenuClick }) {
  const { dark, toggle } = useTheme();

  const bg     = dark ? 'bg-gray-950/80 border-gray-800' : 'bg-white/80 border-gray-200';
  const btn    = dark ? 'text-gray-400 hover:text-gray-100 hover:bg-gray-800' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100';

  return (
    <header className={`sticky top-0 z-10 flex items-center justify-between px-4 h-12 border-b backdrop-blur-md ${bg}`}>
      {/* Hamburger — mobile only */}
      <button
        id="hamburger-menu-btn"
        onClick={onMenuClick}
        className={`lg:hidden p-1.5 rounded-md transition-all cursor-pointer ${btn}`}
        aria-label="Open sidebar"
      >
        <Menu size={18} />
      </button>

      <div className="hidden lg:block" />

      {/* Dark mode toggle */}
      <button
        id="dark-mode-toggle"
        onClick={toggle}
        className={`p-1.5 rounded-md transition-all cursor-pointer ${btn}`}
        aria-label="Toggle dark mode"
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </header>
  );
}
