import React, { useState } from 'react';
import { X, Clock } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (day: string, content: string, time?: string) => void;
  selectedDay?: string;
}

export const AddNoteModal: React.FC<AddNoteModalProps> = ({
  isOpen,
  onClose,
  onAddNote,
  selectedDay,
}) => {
  const { isDarkMode } = useTheme();
  
  const [content, setContent] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState(selectedDay || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && day) {
      onAddNote(day, content, time);
      setContent('');
      setTime('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-lg shadow-lg ${
        isDarkMode ? 'bg-black bg-opacity-60 text-gray-100' : 'bg-white text-gray-900'
      }`}>
        <div className={`p-4 border-b flex items-center justify-between ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className="text-lg font-semibold">Add New Note</h2>
          <button 
            onClick={onClose} 
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="day" className="block text-sm font-medium mb-1">
              Day
            </label>
            <select
              id="day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode 
                  ? 'bg-black border-gray-600 text-gray-100'
                  : 'border-gray-300  text-gray-900 bg-white'
              }`}
              required
            >
              <option value="">Select a day</option>
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">
              Time (optional)
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="time"
                id="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-transparent  border-gray-600 text-gray-100'
                    : 'border-gray-300 text-gray-900 bg-white'
                }`}
              />
            </div>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium mb-1">
              Note
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDarkMode 
                  ? 'bg-black border-gray-600 text-gray-100'
                  : 'border-gray-300 text-gray-900 bg-white'
              }`}
              rows={4}
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className={`px-4 py-2 rounded-md transition-colors ${
                isDarkMode
                  ? 'bg-purple-600 hover:bg-purple-500 text-gray-100'
                  : 'bg-purple-600 hover:bg-purple-500 text-white'
              }`}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
