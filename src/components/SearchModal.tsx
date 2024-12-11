import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { WeekPlan, SearchResult } from '../types/planner';
import { useTheme } from '../context/ThemeContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  weekPlan: WeekPlan;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, weekPlan }) => {
  const { isDarkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  
  const searchResults: SearchResult[] = weekPlan.flatMap(day =>
    day.notes
      .filter(note => 
        note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.time?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(note => ({ day: day.day, note }))
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-lg shadow-lg ${
        isDarkMode ? 'bg-black bg-opacity-40 text-gray-100' : 'bg-white text-gray-900'
      }`}>
        <div className={`p-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className="text-lg font-semibold">Search Notes</h2>
          <button onClick={onClose} 
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode 
                  ? 'bg-black border-gray-600 text-gray-100 placeholder-gray-400'
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            />
          </div>
          <div className="mt-4 max-h-96 overflow-y-auto">
            {searchResults.map(({ day, note }) => (
              <div
                key={note.id}
                className={`p-3 rounded-md mb-2 border-l-4 ${
                  isDarkMode ? 'bg-gray-700' : 'bg-white'
                }`}
                style={{
                  borderLeftColor: note.color || (isDarkMode ? '#a855f7' : '#8B5CF6'),
                  // Adding a slight background tint if you want:
                  backgroundColor: isDarkMode ? '#2d2d2d' : '#f9f9f9'
                }}
              >
                <div className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-gray-200' : 'text-gray-600'
                }`}>{day}</div>
                {note.time && (
                  <div 
                    className="text-xs font-medium mb-1"
                    style={{ color: note.color }}
                  >
                    {note.time}
                  </div>
                )}
                <p className={isDarkMode ? 'text-gray-100' : 'text-gray-700'}>{note.content}</p>
              </div>
            ))}
            {searchQuery && searchResults.length === 0 && (
              <p className="text-center py-4 text-gray-500">No results found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
