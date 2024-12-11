import React from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <header
      className={`${
        isDarkMode 
          ? 'bg-transparent' 
          : 'bg-white/50 border-purple-100'
      } backdrop-blur-sm border-b border-slate-700 shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Use a 3-column grid to position items: left (title), center (date), right (nav) */}
        <div className="py-6 grid grid-cols-3 items-center">
          
          {/* Left Column: Logo & Title */}
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
          
          {/* Center Column: Date */}
          <div className="text-center">
            <p
              className={`text-sm font-medium ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
            >
              {new Date().toLocaleDateString('en-US', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
          
          {/* Right Column: Nav Links with Border */}
          <nav className="flex items-center justify-end space-x-3">
            <Link
              to="/monthly-planner"
              className={`text-sm font-medium px-3 py-1 border rounded hover:underline ${
                isDarkMode ? 'border-hidden shadow-lg' : 'border-hidden shadow-lg text-black'
              }`}
            >
              Monthly Planner
            </Link>
            <Link
              to="/pricing"
              className={`text-sm font-medium px-3 py-1 border rounded hover:underline ${
                isDarkMode ? 'border-hidden shadow-lg' : 'border-hidden shadow-lg text-black'
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/about-us"
              className={`text-sm font-medium px-3 py-1 border rounded hover:underline ${
                isDarkMode ? 'border-hidden shadow-lg' : 'border-hidden shadow-lg text-black'
              }`}
            >
              About Us
            </Link>
            <Link
              to="/user"
              className={`text-sm font-medium px-3 py-1 border rounded hover:underline ${
                isDarkMode ? 'border-hidden shadow-lg' : 'border-hidden shadow-lg text-black'
              }`}
            >
              User 
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
