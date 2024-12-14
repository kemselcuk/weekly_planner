import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Note } from '../types/planner';
import { X, Clock, CheckCircle2, Circle, Timer } from 'lucide-react';
import { StatusSelector } from './StatusSelector';

interface MonthlyNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: string;
  notes: Note[];
  onAddNote: (date: string, content: string, time?: string, status?: 'pending' | 'in-progress' | 'completed') => void;
  onDeleteNote: (date: string, noteId: string) => void;
}

export const MonthlyNotesModal: React.FC<MonthlyNotesModalProps> = ({
  isOpen,
  onClose,
  day,
  notes,
  onAddNote,
  onDeleteNote,
}) => {
  const { isDarkMode } = useTheme();
  const [noteContent, setNoteContent] = useState('');
  const [noteTime, setNoteTime] = useState('');
  const [status, setStatus] = useState<'pending' | 'in-progress' | 'completed'>('pending');

  if (!isOpen) return null;

  const formattedDate = new Date(day).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim()) {
      onAddNote(day, noteContent, noteTime, status);
      setNoteContent('');
      setNoteTime('');
      setStatus('pending');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`w-full max-w-md rounded-xl shadow-lg ${
        isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'
      } backdrop-blur-sm`}>
        <div className="p-6 border-b border-gray-200/20 flex justify-between items-center">
          <h2 className="text-xl font-semibold tracking-wide">{formattedDate}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200/20 transition-colors"
          >
            <X />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Add a note..."
              className={`w-full p-3 rounded-lg border transition-all focus:ring-2 ${
                isDarkMode 
                  ? 'bg-gray-800/50 border-gray-700 focus:ring-purple-500/20' 
                  : 'bg-white border-gray-200 focus:ring-purple-500/30'
              }`}
            />
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="time"
                value={noteTime}
                onChange={(e) => setNoteTime(e.target.value)}
                className={`w-full pl-10 p-3 rounded-lg border transition-all focus:ring-2 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-gray-700 focus:ring-purple-500/20' 
                    : 'bg-white border-gray-200 focus:ring-purple-500/30'
                }`}
              />
            </div>
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

          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-lg border-l-4 transition-all ${
                  isDarkMode 
                    ? 'bg-gray-800/40 hover:bg-gray-800/60' 
                    : 'bg-gray-50 hover:bg-gray-100/70'
                }`}
                style={{ borderLeftColor: note.color }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    {note.time && (
                      <div className="text-xs font-medium mb-1" style={{ color: note.color }}>
                        {note.time}
                      </div>
                    )}
                    <p>{note.content}</p>
                  </div>
                  <button
                    onClick={() => onDeleteNote(day, note.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
