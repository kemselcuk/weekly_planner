import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Timer, Clock, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { DayPlan } from '../types/planner';
import { useTheme } from '../context/ThemeContext';

interface DayCardProps {
  day: DayPlan;
  onAddNote: (date: string) => void;
  onDeleteNote: (date: string, noteId: string) => void;
  onUpdateNoteStatus: (date: string, noteId: string, newStatus: 'pending' | 'in-progress' | 'completed') => void;
  onUpdateNoteContent: (date: string, noteId: string, newContent: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export const DayCard: React.FC<DayCardProps> = ({ 
  day, 
  onAddNote, 
  onDeleteNote,
  onUpdateNoteStatus,
  onUpdateNoteContent,
  isExpanded,
  onToggleExpand
}) => {
  const { isDarkMode } = useTheme();
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [newContent, setNewContent] = useState<string>('');

  const formatDayAndDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return {
      dayName: days[date.getDay()],
      fullDate: dateStr,
      isToday: new Date().toISOString().split('T')[0] === dateStr
    };
  };

  const { dayName, fullDate, isToday } = formatDayAndDate(day.date);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          icon: <CheckCircle2 className="w-4 h-4" />,
          color: 'text-green-500',
          bgColor: isDarkMode ? 'bg-green-500/10' : 'bg-green-50'
        };
      case 'in-progress':
        return {
          icon: <Timer className="w-4 h-4" />,
          color: 'text-yellow-500',
          bgColor: isDarkMode ? 'bg-yellow-500/10' : 'bg-yellow-50'
        };
      default:
        return {
          icon: <Circle className="w-4 h-4" />,
          color: 'text-gray-400',
          bgColor: isDarkMode ? 'bg-gray-500/10' : 'bg-gray-50'
        };
    }
  };

  const getNextStatus = (currentStatus: string) => {
    const statusOrder = ['pending', 'in-progress', 'completed'] as const;
    const currentIndex = statusOrder.indexOf(currentStatus as any);
    return statusOrder[(currentIndex + 1) % statusOrder.length];
  };

  const handleNoteDoubleClick = (noteId: string, currentContent: string) => {
    setEditingNoteId(noteId);
    setNewContent(currentContent);
  };

  const handleNoteContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContent(e.target.value);
  };

  const handleNoteContentBlur = (date: string, noteId: string) => {
    if (newContent.trim() !== '') {
      onUpdateNoteContent(date, noteId, newContent);
    }
    setEditingNoteId(null);
  };

  const handleNoteContentKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, date: string, noteId: string) => {
    if (e.key === 'Enter') {
      handleNoteContentBlur(date, noteId);
    }
  };

  const handleSaveClick = async (date: string, noteId: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent any default behavior
    e.stopPropagation(); // Prevent event bubbling
    
    console.log('Saving note:', { date, noteId, newContent }); // Debug log
    
    if (newContent.trim() !== '') {
      await onUpdateNoteContent(date, noteId, newContent);
      console.log('Note saved successfully'); // Debug log
      setEditingNoteId(null);
    }
  };

  return (
    <div className="relative group">
      <div className={`
        shadow-lg transition-all duration-200
        ${isDarkMode 
          ? 'bg-gray-900/50' 
          : 'bg-white/70'
        }
        ${isToday 
          ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-transparent' 
          : 'border border-gray-200 dark:border-gray-700'
        }
        rounded-xl
        backdrop-blur-sm
        transform group-hover:scale-[1.02] group-hover:shadow-xl
        min-h-[150px] // Ensure all DayCards have a minimum height
        p-4 // Add padding to ensure content is not too close to the edges
      `}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className={`
              font-medium tracking-wide
              ${isToday 
                ? 'text-2xl text-purple-500 font-bold' 
                : 'text-xl text-gray-700 dark:text-gray-200'
              }
            `}>
              {dayName}
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {fullDate}
            </span>
          </div>
          <div className="flex gap-2">
            {day.notes.length > 0 && (
              <button
                onClick={onToggleExpand}
                className={`
                  p-2 rounded-lg transition-all duration-200
                  ${isDarkMode 
                    ? 'bg-gray-800/50 hover:bg-purple-500/20 text-purple-400' 
                    : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
                  }
                `}
              >
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            )}
            <button
              onClick={() => onAddNote(day.date)}
              className={`
                p-2 rounded-lg transition-all duration-200
                ${isDarkMode 
                  ? 'bg-gray-800/50 hover:bg-purple-500/20 text-purple-400' 
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-600'
                }
              `}
              aria-label="Add note"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {day.notes.length > 0 && (
        <div className={`
          relative -mt-3 pt-4 pb-1 px-2
          ${isExpanded ? 'block' : 'hidden'}
        `}>
          <div className={`
            rounded-b-xl border shadow-lg transition-all duration-200
            ${isDarkMode 
              ? 'bg-gray-800/50 border-gray-700/50' 
              : 'bg-white/90 border-gray-100'
            }
            backdrop-blur-sm
            transform group-hover:scale-[1.02] group-hover:shadow-xl
          `}>
            <div className="space-y-3 p-4">
              {day.notes.map((note) => (
                <div
                  key={note.id}
                  className={`
                    p-4 rounded-lg border-l-4 transition-all duration-200
                    ${isDarkMode 
                      ? 'bg-gray-900/40 hover:bg-gray-900/60' 
                      : 'bg-gray-50/80 hover:bg-white'
                    }
                    backdrop-blur-sm
                  `}
                  onDoubleClick={() => handleNoteDoubleClick(note.id, note.content)}
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {note.time && (
                          <div className="text-xs font-semibold mb-1 flex items-center gap-1">
                            <Clock className="w-3 h-3" style={{ color: note.color }} />
                            <span style={{ color: note.color }}>{note.time}</span>
                          </div>
                        )}
                        {editingNoteId === note.id ? (
                          <input
                            type="text"
                            value={newContent}
                            onChange={handleNoteContentChange}
                            onBlur={() => handleNoteContentBlur(day.date, note.id)}
                            onKeyPress={(e) => handleNoteContentKeyPress(e, day.date, note.id)}
                            className={`
                              ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}
                              w-full p-2 rounded-lg border transition-all focus:ring-2
                              ${isDarkMode 
                                ? 'bg-gray-800/50 border-gray-700 focus:ring-purple-500/20' 
                                : 'bg-white border-gray-200 focus:ring-purple-500/30'
                              }
                            `}
                            autoFocus
                          />
                        ) : (
                          <p className={`
                            ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}
                            line-clamp-2
                          `}>
                            {note.content}
                          </p>
                        )}
                      </div>
                      <div className="flex items-start gap-2 ml-3">
                        {note.status && (
                          <button
                            onClick={() => onUpdateNoteStatus(day.date, note.id, getNextStatus(note.status))}
                            className={`
                              flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium
                              transition-all duration-200 hover:ring-2 hover:ring-offset-1
                              ${getStatusInfo(note.status).bgColor} 
                              ${getStatusInfo(note.status).color}
                            `}
                          >
                            {getStatusInfo(note.status).icon}
                            <span className="capitalize">{note.status}</span>
                          </button>
                        )}
                        {editingNoteId === note.id && (
                          <button
                            onClick={(e) => handleSaveClick(day.date, note.id, e)}
                            className="text-gray-400 hover:text-green-400 transition-colors p-1 rounded-full hover:bg-gray-200/20"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => onDeleteNote(day.date, note.id)}
                          className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-full hover:bg-gray-200/20"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};