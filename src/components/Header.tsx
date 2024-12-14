import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 ${
        isDarkMode 
          ? 'bg-black/30' 
          : 'bg-white/70'
      } backdrop-blur-md border-b ${isDarkMode ? 'border-slate-800' : 'border-purple-100'} shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4 grid grid-cols-3 items-center">
          {/* Left column remains the same */}
          <div className="flex items-center space-x-3">
            <Calendar
              className={`w-8 h-8 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`}
            />
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
            >
              <Link to="/">Weekly Planner</Link>
            </h1>
          </div>
          
          {/* Center column - Enhanced date display */}
          <div className="text-center">
            <p
              className={`text-sm font-medium tracking-wide ${
                isDarkMode ? 'text-purple-300' : 'text-purple-700'
              }`}
            >
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          
          {/* Right column - Improved menu */}
          <div className="flex justify-end relative">
            <button
              className={`p-3 rounded-lg transition-all duration-200 ease-in-out
                ${isDarkMode 
                  ? 'bg-slate-800/50 hover:bg-slate-700/70 text-purple-300' 
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                } border ${isDarkMode ? 'border-slate-700' : 'border-purple-200'}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12h18m-18 6h18m-18-12h18"
                />
              </svg>
            </button>

            {/* Enhanced Dropdown Menu */}
            <nav
              className={`absolute right-0 mt-14 w-48 transform transition-all duration-200 ease-in-out
                ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
                ${isDarkMode 
                  ? 'bg-slate-900/95 border-slate-700' 
                  : 'bg-white/95 border-purple-100'
                } border rounded-lg shadow-lg backdrop-blur-sm`}
            >
              {[
                { to: '/meetings', label: 'Meetings' },
                { to: '/monthly-planner', label: 'Monthly Planner' },
                { to: '/pricing', label: 'Pricing' },
                { to: '/about-us', label: 'About Us' },
                { to: '/user', label: 'User' }
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-2 text-sm font-medium transition-colors duration-150
                    ${isDarkMode 
                      ? 'text-gray-300 hover:bg-slate-800/70 hover:text-purple-300' 
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
