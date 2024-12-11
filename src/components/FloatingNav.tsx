import React from 'react';
import { Calendar, Settings, Search, PlusCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FloatingNavProps {
  onOpenSearch: () => void;
  onOpenAddNote: () => void;
  onOpenSettings: () => void;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({
  onOpenSearch,
  onOpenAddNote,
  onOpenSettings,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <nav className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 ${
      isDarkMode 
        ? 'bg-transparent hover:bg-transparent' 
        : 'bg-white/80 border-purple-100/50'
    } backdrop-blur-lg rounded-full shadow-lg px-6 py-1 border border-slate-700`}>
      <ul className="flex items-center space-x-8">
        <li>
          <button
            className={`p-2 ${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-700' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'
            } rounded-full transition-all`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Calendar className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={`p-2 ${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-700' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'
            } rounded-full transition-all`}
            onClick={onOpenSearch}
          >
            <Search className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={`p-2 ${
              isDarkMode 
                ? 'bg-purple-500 hover:bg-purple-600' 
                : 'bg-purple-600 hover:bg-purple-700'
            } text-white rounded-full transition-all`}
            onClick={onOpenAddNote}
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </li>
        <li>
          <button
            className={`p-2 ${
              isDarkMode 
                ? 'text-purple-400 hover:text-purple-300 hover:bg-gray-700' 
                : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'
            } rounded-full transition-all`}
            onClick={onOpenSettings}
          >
            <Settings className="w-5 h-5" />
          </button>
        </li>
      </ul>
    </nav>
  );
};