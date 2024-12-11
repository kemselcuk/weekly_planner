import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { MonthlyNotesModal } from '../components/MonthlyNotesModal';

interface Note {
  id: string;
  content: string;
  time?: string;
}

const MonthlyPlanner: React.FC = () => {
  const { isDarkMode } = useTheme();

  const days = Array.from({ length: 28 }, (_, i) => i + 1);

  // State to store notes for each day
  const [monthNotes, setMonthNotes] = useState<Record<number, Note[]>>({
    5: [
      { id: '1', content: 'Meeting with team at 10am', time: '10:00' },
      { id: '2', content: 'Lunch with Sarah', time: '12:30' },
    ],
    10: [{ id: '3', content: 'Project deadline', time: 'All day' }],
    15: [
      { id: '4', content: 'Gym workout', time: '7:00' },
      { id: '5', content: 'Call mom', time: '19:00' },
    ],
  });

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(
    new Date(currentYear, currentMonth, 1)
  );

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDayClick = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const handleAddNote = (day: number, content: string, time?: string) => {
    setMonthNotes((prev) => ({
      ...prev,
      [day]: [
        ...(prev[day] || []),
        {
          id: crypto.randomUUID(),
          content,
          time,
        },
      ],
    }));
  };

  const selectedDayNotes = selectedDay ? monthNotes[selectedDay] || [] : [];

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-8 shadow-xl`}
    >
      <h1 className="text-3xl font-bold mb-8">
        {monthName} {currentYear}
      </h1>
      <div className="max-w-3xl w-full">
        <div className="grid grid-cols-7 grid-rows-4 gap-4">
          {days.map((dayNumber) => {
            const isToday = dayNumber === currentDay;
            return (
              <button
                key={dayNumber}
                onClick={() => handleDayClick(dayNumber)}
                className={`
                  flex items-center justify-center rounded-lg p-4 border shadow-md 
                  transition-colors cursor-pointer
                  ${isDarkMode ? 'border-gray-700 bg-black bg-opacity-15 hover:bg-transparent' : 'border-gray-200 bg-white'}
                  ${isToday
                    ? isDarkMode 
                      ? 'bg-black bg-opacity-60 text-white border-purple-600' 
                      : 'bg-purple-200 text-purple-900 border-purple-300'
                    : ''
                  }
                  hover:shadow-lg hover:scale-105
                `}
              >
                {dayNumber}
              </button>
            );
          })}
        </div>
      </div>
      
      {isModalOpen && selectedDay !== null && (
        <MonthlyNotesModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          day={selectedDay}
          notes={selectedDayNotes}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
};

export default MonthlyPlanner;
