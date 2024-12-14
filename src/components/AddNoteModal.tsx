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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'
      } backdrop-blur-sm`}>
        <div className="p-6 border-b border-gray-200/20 flex justify-between items-center">
          <h2 className="text-xl font-semibold tracking-wide">Add New Note</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full pl-10 p-3 rounded-lg border transition-all focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 focus:ring-purple-500/20' 
                    : 'bg-white border-gray-200 focus:ring-purple-500/30'
                }`}
                required
              />
            </div>
          </div>

          {/* Time Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Time (optional)</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={`w-full pl-10 p-3 rounded-lg border transition-all focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 focus:ring-purple-500/20' 
                    : 'bg-white border-gray-200 focus:ring-purple-500/30'
                }`}
              />
            </div>
          </div>

          {/* Note Content */}
          <div>
            <label className="block text-sm font-medium mb-2">Note</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className={`w-full p-3 rounded-lg border transition-all focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 focus:ring-purple-500/20' 
                  : 'bg-white border-gray-200 focus:ring-purple-500/30'
              }`}
              rows={4}
              required
            />
          </div>

          {/* Status Selector */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <StatusSelector
              status={status}
              onChange={setStatus}
              isDarkMode={isDarkMode}
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 rounded-lg bg-purple-600 hover:bg-purple-500 
              text-white font-medium transition-all hover:shadow-lg
              hover:shadow-purple-500/20"
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
