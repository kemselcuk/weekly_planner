import React, { useState, useEffect } from 'react';
import { X, Clock, Calendar } from 'lucide-react'; // Import Calendar icon
import { useTheme } from '../context/ThemeContext';
import { StatusSelector } from './StatusSelector';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (date: string, content: string, time?: string, status?: 'pending' | 'in-progress' | 'completed') => void;
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
  const [date, setDate] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen && selectedDay) {
      setDate(selectedDay);
    } else {
      setContent('');
      setTime('');
      setDate('');
      setStatus('pending');
    }
  }, [isOpen, selectedDay]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && date) {
      onAddNote(date, content, time, status);
      setContent('');
      setTime('');
      setStatus('pending');
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
            <label htmlFor="date" className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
              Date
            </label>
            <div className="relative">
              <div 
                onClick={() => {
                  document.getElementById('date')?.showPicker();
                }}
                className="absolute inset-y-0 left-0 flex items-center pl-3 cursor-pointer w-10 h-full"
              >
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onClick={(e) => {
                  // This ensures the native date picker opens
                  (e.target as HTMLInputElement).showPicker();
                }}
                className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  isDarkMode 
                    ? 'bg-black border-gray-600 text-gray-100'
                    : 'border-gray-300  text-gray-900 bg-white'
                }`}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="time" className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
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
            <label htmlFor="content" className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-1`}>
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
          <div>
            <label className={`block text-sm font-medium ${
              isDarkMode ? 'text-gray-300' : 'text-gray-700'
            } mb-2`}>
              Status
            </label>
            <StatusSelector
              status={status}
              onChange={setStatus}
              isDarkMode={isDarkMode}
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
