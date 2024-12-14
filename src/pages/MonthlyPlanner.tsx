import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MonthlyNotesModal } from '../components/MonthlyNotesModal';
import { Note } from '../types/planner';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MonthlyPlannerProps {
  token: string;
  isDarkMode: boolean;
  onNoteAdded: () => void;
}

const MonthlyPlanner: React.FC<MonthlyPlannerProps> = ({ token, isDarkMode, onNoteAdded }) => {
  const [monthNotes, setMonthNotes] = useState<Record<string, Note[]>>({});
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeMonth = (delta: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const today = new Date();
  const isCurrentMonth = today.getMonth() === currentMonth && today.getFullYear() === currentYear;

  // Completely new calendar generation logic
  const getDaysInMonth = () => {
    const dates: (string | null)[] = [];
    
    // Get the first day of the current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    // Get the last day of the current month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Calculate the Monday before the first day of the month
    const firstMonday = new Date(firstDay);
    firstMonday.setDate(firstDay.getDate() - ((firstDay.getDay() + 6) % 7));
    
    // Calculate the Sunday after the last day of the month
    const lastSunday = new Date(lastDay);
    lastSunday.setDate(lastDay.getDate() + (7 - lastDay.getDay()) % 7);
    
    // Fill the calendar with dates
    const currentDate = new Date(firstMonday);
    while (currentDate <= lastSunday) {
      const dateString = currentDate.toISOString().split('T')[0];
      
      // If date is from current month, add it; otherwise add null
      if (currentDate.getMonth() === currentMonth) {
        dates.push(dateString);
      } else {
        dates.push(null);
      }
      
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  };

  const monthDates = getDaysInMonth();
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!token) return;

      try {
        const res = await fetch('http://localhost:5000/api/notes', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('Failed to fetch notes');
        }

        const notes = await res.json();

        const notesByDate = notes.reduce((acc: Record<string, Note[]>, note: any) => {
          if (!acc[note.date]) {
            acc[note.date] = [];
          }
          acc[note.date].push({
            id: note._id,
            content: note.content,
            time: note.time,
            status: note.status || 'pending',
            color: note.color || (isDarkMode ? '#a855f7' : '#8B5CF6')
          });
          return acc;
        }, {});

        setMonthNotes(notesByDate);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [token, isDarkMode]);

  const handleDayClick = (date: string) => {
    setSelectedDay(date);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const handleAddNote = async (
    date: string, 
    content: string, 
    time?: string, 
    status: 'pending' | 'in-progress' | 'completed' = 'pending'
  ) => {
    if (!token) return;

    try {
      const res = await fetch('http://localhost:5000/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ date, content, time, status })
      });

      if (!res.ok) throw new Error('Failed to add note');

      const newNote = await res.json();

      setMonthNotes(prev => ({
        ...prev,
        [date]: [
          ...(prev[date] || []),
          {
            id: newNote._id,
            content: newNote.content,
            time: newNote.time,
            status: newNote.status,
            color: newNote.color || (isDarkMode ? '#a855f7' : '#8B5CF6')
          }
        ]
      }));

      // Call the callback to update WeeklyPlanner
      onNoteAdded();
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleDeleteNote = async (date: string, noteId: string) => {
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error('Failed to delete note');

      setMonthNotes(prev => ({
        ...prev,
        [date]: prev[date].filter(note => note.id !== noteId)
      }));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center py-8`}>
      <div className="flex items-center justify-between w-full max-w-7xl mb-8">
        <button
          onClick={() => changeMonth(-1)}
          className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <h1 className="text-3xl font-bold">
          {monthName} {currentYear}
        </h1>
        
        <button
          onClick={() => changeMonth(1)}
          className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-7xl w-full">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-semibold">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {monthDates.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="min-h-[100px]" />;
            }

            const dayNumber = new Date(date).getDate();
            const isToday = date === today.toISOString().split('T')[0];
            const hasNotes = monthNotes[date]?.length > 0;
            
            return (
              <button
                key={date}
                onClick={() => handleDayClick(date)}
                className={`
                  flex flex-col items-center justify-center rounded-lg p-4 border
                  relative min-h-[100px] transition-all duration-200 ease-in-out
                  transform hover:scale-105 hover:shadow-xl
                  ${isDarkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'}
                  ${isToday ? 'border-purple-500 border-2' : ''}
                `}
              >
                <span className={`text-lg ${isToday ? 'text-purple-500 font-bold' : ''}`}>
                  {dayNumber}
                </span>
                {hasNotes && (
                  <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-purple-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {isModalOpen && selectedDay && (
        <MonthlyNotesModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          day={selectedDay}
          notes={monthNotes[selectedDay] || []}
          onAddNote={handleAddNote}
          onDeleteNote={handleDeleteNote}
        />
      )}
    </div>
  );
};

export default MonthlyPlanner;
