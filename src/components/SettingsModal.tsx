import React from 'react';
import { X, Moon, Sun, Palette } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`${
        isDarkMode ? 'bg-black bg-opacity-30' : 'bg-white'
      } rounded-lg w-full max-w-md`}>
        <div className={`p-4 border-b ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } flex items-center justify-between`}>
          <h2 className={`text-lg font-semibold ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>Settings</h2>
          <button onClick={onClose} className={`${
            isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
          }`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Palette className={`w-5 h-5 ${
                isDarkMode ? 'text-purple-400' : 'text-purple-600'
              }`} />
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Theme Color
              </span>
            </div>
            <select className={`border rounded-md px-3 py-1.5 ${
              isDarkMode 
                ? 'bg-black bg-opacity-30 border-gray-600 text-gray-200' 
                : 'border-gray-300 text-gray-700'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}>
              <option>Purple</option>
              <option>Blue</option>
              <option>Green</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isDarkMode ? (
                <Moon className="w-5 h-5 text-purple-400" />
              ) : (
                <Sun className="w-5 h-5 text-purple-600" />
              )}
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                Dark Mode
              </span>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                isDarkMode ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};