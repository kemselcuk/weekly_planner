import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Note {
  id: string;
  content: string;
  time?: string;
}

interface MonthlyNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: number;
  notes: Note[];
  onAddNote: (day: number, content: string, time?: string) => void;
}

export const MonthlyNotesModal: React.FC<MonthlyNotesModalProps> = ({
  isOpen,
  onClose,
  day,
  notes,
  onAddNote,
}) => {
  const { isDarkMode } = useTheme();

  const [noteContent, setNoteContent] = useState('');
  const [noteTime, setNoteTime] = useState('');

  if (!isOpen) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim().length > 0) {
      onAddNote(day, noteContent, noteTime || undefined);
      setNoteContent('');
      setNoteTime('');
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isDarkMode ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-50'
      }`}
    >
      <div
        className={`w-full max-w-md mx-auto p-6 rounded-lg border shadow-lg relative ${
          isDarkMode ? 'bg-black bg-opacity-80 border-gray-700 text-gray-100' : 'bg-white border-gray-200 text-gray-900'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-300"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Notes for Day {day}</h2>
        
        {notes.length > 0 ? (
          <ul className="space-y-3 mb-4">
            {notes.map((note) => (
              <li
                key={note.id}
                className={`p-3 rounded-md border-l-4 ${
                  isDarkMode ? 'bg-black bg-opacity-15 ' : 'bg-gray-50'
                }`}
                style={{ borderLeftColor: isDarkMode ? '#a855f7' : '#8B5CF6' }}
              >
                {note.time && (
                  <div
                    className="text-xs font-medium mb-1"
                    style={{ color: isDarkMode ? '#a855f7' : '#8B5CF6' }}
                  >
                    {note.time}
                  </div>
                )}
                <p className={isDarkMode ? 'text-gray-200' : 'text-gray-700'}>
                  {note.content}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400 mb-4">No notes for this day.</p>
        )}

        {/* Add note form */}
        <form onSubmit={handleAddNote} className="space-y-3">
          <div>
            <label
              htmlFor="noteContent"
              className={`block mb-1 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Note Content
            </label>
            <input
              id="noteContent"
              type="text"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className={`w-full rounded p-2 ${
                isDarkMode
                  ? 'bg-black bg-opacity-15 text-gray-100 border border-gray-600'
                  : 'bg-white text-gray-900 border border-gray-300'
              }`}
              placeholder="Enter your note..."
              required
            />
          </div>
          <div>
            <label
              htmlFor="noteTime"
              className={`block mb-1 text-sm font-medium ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Note Time (optional)
            </label>
            <input
              id="noteTime"
              type="text"
              value={noteTime}
              onChange={(e) => setNoteTime(e.target.value)}
              className={`w-full rounded p-2 ${
                isDarkMode
                  ? 'bg-black bg-opacity-15 text-gray-100 border border-gray-600'
                  : 'bg-white text-gray-900 border border-gray-300'
              }`}
              placeholder="e.g. 10:00 AM"
            />
          </div>
          <button
            type="submit"
            className={`py-2 px-4 font-medium rounded ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-500 text-gray-100'
                : 'bg-purple-600 hover:bg-purple-500 text-white'
            }`}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};
