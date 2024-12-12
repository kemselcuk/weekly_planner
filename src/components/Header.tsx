import React , { useState }from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

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
          <div className='pl-80'>
          <div
        className={`p-3 cursor-pointer border border-gray-800 rounded-lg shadow-lg w-12 ${
                isDarkMode ? 'bg-black bg-opacity-15 hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
        onClick={() => setMenuOpen(!menuOpen)}
        onMouseEnter={() => setMenuOpen(true)} // Optional: Enable hover functionality
        onMouseLeave={() => setMenuOpen(false)} // Optional: Close on hover out
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 12h18m-18 6h18m-18-12h18"
          />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {menuOpen && (
        <nav
          className="absolute right-0 mt-2 bg-white border shadow-lg rounded-lg p-4 space-y-2 dark:bg-gray-800 dark:border-gray-700"
          onMouseEnter={() => setMenuOpen(true)} // Optional: Keep open on hover
          onMouseLeave={() => setMenuOpen(false)} // Optional: Close on hover out
        >
          <Link
            to="/user"
            className={`block text-sm font-medium px-3 py-1 rounded hover:underline ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            Meetings
          </Link>
          <Link
            to="/monthly-planner"
            className={`block text-sm font-medium px-3 py-1 rounded hover:underline ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            Monthly Planner
          </Link>
          <Link
            to="/pricing"
            className={`block text-sm font-medium px-3 py-1 rounded hover:underline ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            Pricing
          </Link>
          <Link
            to="/about-us"
            className={`block text-sm font-medium px-3 py-1 rounded hover:underline ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            About Us
          </Link>
          <Link
            to="/user"
            className={`block text-sm font-medium px-3 py-1 rounded hover:underline ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            User
          </Link>
        </nav>)}
        </div>
        </div>
      </div>
    </header>
  );
};
