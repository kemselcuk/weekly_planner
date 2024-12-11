import React from 'react';
import { Plus } from 'lucide-react';
import { DayPlan } from '../types/planner';
import { useTheme } from '../context/ThemeContext';

interface DayCardProps {
  day: DayPlan;
  onAddNote: (day: string) => void;
  onDeleteNote: (day: string, noteId: string) => void;
}

export const DayCard: React.FC<DayCardProps> = ({ day, onAddNote, onDeleteNote }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${
      isDarkMode 
        ? 'bg-black bg-opacity-15 hover:bg-transparent hover:opacity-1' 
        : 'bg-transparent hover:bg-gray-50'
    } rounded-lg shadow-lg p-4 transition-all hover:shadow-2xl border border-gray-800 hover:border-dotted `}>
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-xl font-semibold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>{day.day}</h2>
        <button
          onClick={() => onAddNote(day.day)}
          className={`p-2 ${
            isDarkMode 
              ? 'hover:bg-gray-700 text-purple-400 hover:text-purple-300' 
              : 'hover:bg-purple-50 text-purple-600 hover:text-purple-700'
          } rounded-full transition-colors`}
          aria-label="Add note"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="space-y-2">
        {day.notes.map((note) => (
          <div
            key={note.id}
            className={`p-3 rounded-md text-sm border-l-4 ${
              isDarkMode ? 'bg-black bg-opacity-15' : 'bg-white'
            }`}
            style={{ borderLeftColor: note.color }}
          >
            {note.time && (
              <div className="text-xs font-medium mb-1" style={{ color: note.color }}>
                {note.time}
              </div>
            )}
            <div className="flex justify-between items-start gap-2">
              <p className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                {note.content}
              </p>
              <button
                onClick={() => onDeleteNote(day.day, note.id)}
                className="text-gray-400 hover:text-gray-300 text-xs"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        {day.notes.length === 0 && (
          <div className="text-center py-4 text-gray-400 text-sm">
            No plans yet
          </div>
        )}
      </div>
    </div>
  );
};